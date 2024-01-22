import { Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    AfterViewInit,
    HostListener} from '@angular/core';
import { Observable, of } from 'rxjs';
import { BoundedValue, TimeBucket } from 'src/app/commons/models/select-item.model';
import { SvgTimerGenerator } from 'src/app/commons/models/svg-options.model';
import { SvgStyleGenerator } from 'src/app/commons/models/svg-service.model';
import { SVG, SVG_ANIMATION, SVG_BUILDER, SVG_MATH } from 'src/app/commons/utils/svg.utils';
import { TimelineData, TimelineLoader, TimeLineValueNodes } from './timeline.model';
import { TIMELINE_GRAPH_RENDERING } from './timeline.utils';


const DAY = 60000 * 60 * 24;

@Component({
    selector: 'timeline',
    styleUrls :['./timeline.scss'],
    template: `
        <div [class]="getStyleclass()" #component>
            <svg #container xmlns="http://www.w3.org/2000/svg"></svg>
        </div>
    `
})
export class TimelineComponent implements AfterViewInit{
  
  
    /**************************************************************************
    * ATTRIBUTES
    **************************************************************************/
    @Input()
    public styleclass: string|null = null;
    @Input()
    public from: Date |null =null;
    @Input()
    public until: Date |null =null;
    @Input()
    public resolution: number =100;
    @Input()
    public loader: (from:Date, until:Date, resolution:number)=>Observable<TimeBucket<number>[]>  = (from, until, resolution)=> of([]); 
    @Input()
    public renderer: (data:TimelineData)=>TimeLineValueNodes[] = TIMELINE_GRAPH_RENDERING.histogram;
    @Input()
    public styleGenerator:SvgStyleGenerator= SVG.STYLE.BY_TYPE;
    @Input()
    public timer: SvgTimerGenerator |null = null;
    @Input()
    public delay: number=0;
    @Input()
    public duration: number=750;

    @Output()
    public onChange : EventEmitter<String> = new EventEmitter();

    private parent : HTMLElement|null=null;
    @ViewChild('component')
    private component : ElementRef| undefined |null = null;
    @ViewChild('container')
    private container : ElementRef| undefined |null = null;
  
    //--- DATA
    private data : TimeBucket<number>[] = [];
    private leftBuffer : TimeBucket<number>[] = [];
    private rightBuffer : TimeBucket<number>[] = [];
    private graphNodes : TimeLineValueNodes[] = [];

    //--- SVG components
    private locator : SVGElement|null=null;
    private canvas : SVGElement|null=null;
    private graph : SVGElement|null=null;
    private axis : SVGElement|null=null;
    private axisX : SVGElement|null=null;
    private axisY : SVGElement|null=null;
    private legend : SVGElement|null=null;
    private actions : SVGElement|null=null;
    private tooltips : SVGElement|null=null;
    

    //--- size
    public height : number = 600;
    public width : number = 200;
    private leftMargin: number = 50;
    private rightMargin: number = 20;
    private bottomMargin: number = 30;
    private topMargin: number = 20;

    
    /**************************************************************************
    * CONSTRUCTORS
    **************************************************************************/
    constructor() { }
  
   

    /**************************************************************************
    * INITIALIZE
    **************************************************************************/
    ngAfterViewInit(): void {
        if(this.component && this.container){
            this.resolveParentSize();
            
            this.initializeLayout();
            this.initializeDateRange();
            if(this.from && this.until){
                this.loadData(this.from,this.until, this.resolution);
            }
            
            this.resize();
        }
    }

    private initializeDateRange():void{
        console.log("initializeDateRange");
        if(this.until ==null){
            this.until = new Date();
        }

        if(this.from == null){
            this.from = new Date(this.until.getTime()-DAY);
        }
    }

    private initializeLayout():void{
        this.locator = SVG_BUILDER.createGroup(this.container?.nativeElement, {styleClass:'locator'});
        this.canvas = SVG_BUILDER.createGroup(this.locator, {styleClass:'canvas'});
        
        
        if(this.canvas){
            this.graph = SVG_BUILDER.createGroup(this.canvas, {styleClass:'graph'});
            if(this.graph){
                SVG.TRANSFORM.translateX(this.graph,this.leftMargin);
                SVG.TRANSFORM.translateY(this.graph,this.height-this.bottomMargin);
            }
            
            this.axis = this.renderAxis(this.canvas);
            this.legend = this.renderLegend(this.canvas);
            this.actions = this.renderActions(this.canvas);
            this.tooltips = this.renderTooltips(this.canvas);
        }
    }

    /**************************************************************************
    * ACTIONS
    **************************************************************************/ 
     private renderAxis(parent:SVGElement):SVGElement|null{
        const result = SVG_BUILDER.createGroup(this.canvas, {styleClass:'axis'});
        
        this.axisX = SVG_BUILDER.createGroup(result, {styleClass:'axisX'});
        if(this.axisX){
            
            SVG_BUILDER.createLine({
                start:{x:this.leftMargin, y:this.height-this.bottomMargin},
                end:{x:this.width-this.rightMargin, y: (this.height-this.bottomMargin)}
            },
            this.axisX);
        }
        
        this.axisY = SVG_BUILDER.createGroup(result, {styleClass:'axisY'});
        if(this.axisY){
            SVG_BUILDER.createLine({
                start:{x:this.leftMargin, y:this.height-this.bottomMargin},
                end:{x:this.leftMargin, y: this.topMargin}
            },
            this.axisY);
        }

        return result;
    }

    private renderLegend(parent:SVGElement):SVGElement|null{
        const result = SVG_BUILDER.createGroup(this.canvas, {styleClass:'legend'});

        return result;
    }

    private renderActions(parent:SVGElement):SVGElement|null{
        const result = SVG_BUILDER.createGroup(this.canvas, {styleClass:'actions'});

        return result;
    }

    private renderTooltips(parent:SVGElement):SVGElement|null{
        const result =  SVG_BUILDER.createGroup(this.canvas, {styleClass:'tooltips'});

        return result;
    }
    /**************************************************************************
    * COMPUTES
    **************************************************************************/
    public resolveParentSize():void{

        if(this.component?.nativeElement && this.component?.nativeElement.parentNode && this.component?.nativeElement.parentNode.parentNode){
            this.parent= this.component?.nativeElement.parentNode.parentNode;
        }

        if(this.parent){
            let parentSize = SVG_MATH.size(this.parent);
            this.height = parentSize.height;
            this.width = parentSize.width;
        }
        
      
        this.container?.nativeElement.setAttribute('style', `display: block; height:${this.height}px;width:${this.width}px`);
    }


    /**************************************************************************
    * ACTIONS
    **************************************************************************/
    public resize():void{

    }

    public loadData(from:Date, until:Date, resolution:number):void{
        this.loader(from, until, resolution).subscribe({
            next: data=> this.refreshData(data,from,until,resolution),
            error : err => console.error(err)
        });

    }

    public refreshData(data:TimeBucket<number>[],from:Date, until:Date, resolution:number){
        let buffer : any = {};
        let stepMaxValue = 0;
        

        for(let item of data){
            let stepMaxValueCursor = 0;

            if(item.items){
                stepMaxValueCursor = 0;
                for(let itemValue of item.items){
                    stepMaxValueCursor = stepMaxValueCursor+ (itemValue.value?itemValue.value:0);
                    if(itemValue.type){
                        const currentValue = itemValue.value ? itemValue.value : 0;
                        const savedValue =  buffer[itemValue.type];
                        buffer[itemValue.type] = savedValue ? savedValue+currentValue :currentValue;
                    }
                }
                if(stepMaxValueCursor> stepMaxValue){
                    stepMaxValue = stepMaxValueCursor;
                }
            }
            
        }
        console.log(stepMaxValue)

        const types:BoundedValue<string,number>[]= [];
        const keys = Object.keys(buffer).sort();

        for(let key  of keys){
            types.push({
                first:key,
                second:buffer[key]
            });
        }

        if(this.graph){
           this.graphNodes=  this.renderer({
                values:data,
                types:types,
                typesValues:keys,
                from:from,
                until:until,
                resolution:resolution,
                stepMaxValue:stepMaxValue,
                stepMinValue:0,
                graph: this.graph,
                height: this.height-(this.topMargin + this.bottomMargin ),
                width : this.width - (this.rightMargin + this.rightMargin ),
                x : this.rightMargin,
                y : this.height-this.bottomMargin,
                styleGenerator:this.styleGenerator,
                timer:this.timer,
                delay:this.delay,
                duration:this.duration,
                graphNodes: this.graphNodes
            });
        }
    }

    /**************************************************************************
    * EVENTS
    **************************************************************************/
    @HostListener('window:resize', ['$event'])
    onResize(event:any) {
        if(this.component && this.container){
            this.resolveParentSize();
            this.resize();
        }
    }

    /**************************************************************************
    * GETTER
    **************************************************************************/
    public getStyleclass():string{
        const result :string[] = ['timeline'];

        if(this.styleclass){
            result.push(this.styleclass);
        }
        return result.join(" ");
    }
  
  }
  