import { Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    AfterViewInit,
    HostListener} from '@angular/core';
import { TimeBucket } from 'src/app/commons/models/select-item.model';
import { SVG_BUILDER, SVG_MATH } from 'src/app/commons/utils/svg.utils';
import { TimelineLoader } from './timeline.model';


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
    public resolution: number =300;
    @Input()
    public loader: (from:Date, until:Date, resolution:number)=>TimeBucket<number>[]  = (from, until, resolution)=> []; 
  
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
    private axisYMargin: number = 50;
    private rightMargin: number = 20;
    private axisXMargin: number = 30;
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
            this.initializeDateRange();
            this.initializeLayout();
            
            if(this.from && this.until){
                this.loadData(this.from,this.until, this.resolution);
            }
            this.resize();
        }
    }

    private initializeDateRange():void{
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
            this.axis = this.renderAxis(this.canvas);
            this.legend = this.renderLegend(this.canvas);
            this.actions = this.renderActions(this.canvas);
            this.tooltips = this.renderTooltips(this.canvas);
        }
    }

    /**************************************************************************
    * ACTIONS
    **************************************************************************/ 
     private renderAxis(parent:SVGElement):SVGElement{
        const result = SVG_BUILDER.createGroup(this.canvas, {styleClass:'axis'});
        
        this.axisX = SVG_BUILDER.createGroup(result, {styleClass:'axisX'});
        if(this.axisX){
            
            SVG_BUILDER.createLine({
                start:{x:this.axisYMargin, y:this.height-this.axisXMargin},
                end:{x:this.width-this.rightMargin, y: (this.height-this.axisXMargin)}
            },
            this.axisX);
        }
        
        this.axisY = SVG_BUILDER.createGroup(result, {styleClass:'axisY'});
        if(this.axisY){
            SVG_BUILDER.createLine({
                start:{x:this.axisYMargin, y:this.height-this.axisXMargin},
                end:{x:this.axisYMargin, y: this.topMargin}
            },
            this.axisY);
        }

        return result;
    }

    private renderLegend(parent:SVGElement):SVGElement{
        const result = SVG_BUILDER.createGroup(this.canvas, {styleClass:'legend'});

        return result;
    }

    private renderActions(parent:SVGElement):SVGElement{
        const result = SVG_BUILDER.createGroup(this.canvas, {styleClass:'actions'});

        return result;
    }

    private renderTooltips(parent:SVGElement):SVGElement{
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

        let parentSize = SVG_MATH.size(this.parent);
        if(parentSize){
            this.height = parentSize.height;
            this.width = parentSize.width;
        }
        console.log("");
        this.container?.nativeElement.setAttribute('style', `display: block; height:${this.height}px;width:${this.width}px`);
    }


    /**************************************************************************
    * ACTIONS
    **************************************************************************/
    public resize():void{

    }

    public loadData(from:Date, until:Date, resolution:number):void{
        this.data = this.loader(from, until, resolution);
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
  