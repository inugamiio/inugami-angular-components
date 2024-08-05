import { AfterViewChecked, Component, Input, OnChanges, OnInit ,SecurityContext} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';


@Component({
    selector: 'inu-icon',
    styleUrls: ['./icon.component.scss'],
    template: `
        <span [class]="getStyleclass()" >
            <ng-container *ngIf="iconContent">
                <span  [innerHTML]="iconContent"></span>
            </ng-container>
        </span>
    `
})

export class IconComponent implements OnInit{
    /**************************************************************************
    * ATTRIBUTES
    **************************************************************************/
    @Input()
    public styleclass: string | null = null;

    @Input()
    public icon: string | null = null;
    
    @Input()
    public refresh$: Observable<string> | undefined = undefined;
    

    private previousIcon : string|undefined = undefined;
    private _iconContent : SafeHtml|undefined= undefined;
    counter : number = 0;

    /**************************************************************************
    * CONSTRUCTOR
    **************************************************************************/
    constructor(private sanitizer: DomSanitizer) { }
    ngOnInit(): void {
        if(this.refresh$){
            this.refresh$.subscribe({
                next: res=> this.updateIcon()
            })
        }
    }
   
   


    /**************************************************************************
    * PUBLIC
    **************************************************************************/
    public updateIcon() : void{
        this._iconContent = this.sanitizer.bypassSecurityTrustHtml(this.icon?this.icon:'');
        this.previousIcon = this.icon?this.icon:'';
    }
     


    /**************************************************************************
    * GETTER
    **************************************************************************/


    getStyleclass(): string {
        const result: string[] = ['inu-icon'];

        if (this.styleclass) {
            result.push(this.styleclass);
        }
        return result.join(' ');
    }


    get iconContent() : SafeHtml|undefined {
        if(this.icon && this.icon!= this.previousIcon){
            console.log('iconContent')
            this._iconContent = this.sanitizer.bypassSecurityTrustHtml(this.icon?this.icon:'');
            this.previousIcon = this.icon;
        }
        
        return this._iconContent;
    };

}