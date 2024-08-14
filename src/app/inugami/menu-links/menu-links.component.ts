import { AfterViewInit, ChangeDetectorRef, Component, HostListener, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { INU_ICON } from 'inugami-components/icon';
import { MenuLink } from 'inugami-components/models';


@Component({
    selector: 'inu-menu-links',
    styleUrls: ['./menu-links.component.scss'],
    template: `
        <div [class]="getStyleclass()" *ngIf="data">
            <div class="inu-menu-link-header" (click)="navigate(data)">
                <span *ngIf="data.icon || isSmall" class="inu-menu-link-header-icon" [innerHTML]="getSafeHtml(data.icon)"></span>
                <span *ngIf="data.label" class="inu-menu-link-header-label" >{{data.label}}</span>
                <span *ngIf="data.children">
                    <span class="collapsed-status"></span>
                </span>
            </div>
            <ul *ngIf="data.children">
                <li *ngFor="let link of data.children">
                    <inu-menu-links [data] ="link" [level]="level +1"></inu-menu-links>
                </li>
            </ul>
        </div>
    `
})

export class MenuLinksComponent implements AfterViewInit{
    /**************************************************************************
    * ATTRIBUTES
    **************************************************************************/
    @Input()
    public styleclass: string = '';

    @Input()
    public icon: string | null = null;
    @Input()
    public label: string | null = null;
    @Input()
    public level: number = 0;
    @Input()
    public data!: MenuLink;

    public iconContent: SafeHtml | null = null;
    displayType:string= 'large';
    height : number = 1080;
    /**************************************************************************
    * CONSTRUCTOR
    **************************************************************************/
    constructor(private sanitizer: DomSanitizer,
                private router: Router,
                private changeDetectorRef:ChangeDetectorRef) { }
    ngAfterViewInit(): void {
        this.defineWindowSize();
        this.changeDetectorRef.detectChanges();
    }


    navigate(linkData: MenuLink|undefined|null):void {
        if(!linkData){
            return;
        }
        
        if (linkData.link) {
            this.router.navigate([linkData.link]);
        }else{
            if(linkData.collapsed==undefined||linkData.collapsed==null){
                linkData.collapsed= false;
            }
            else if(linkData.collapsed){
                linkData.collapsed= false;
            }else{
                linkData.collapsed = true;
            }
        }
    }


    /**************************************************************************
    * EVENTS
    **************************************************************************/
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.defineWindowSize();
    }
  
    private defineWindowSize(){
       const width = window.innerWidth;
      
       if(width < 600){
          this.displayType = 'small';
       }
       else if(width < 1020){
        this.displayType = 'medium';
       }
       else{
        this.displayType = 'large';
       }
    }

    /**************************************************************************
    * GETTER
    **************************************************************************/
    getSafeHtml(content: string|undefined): SafeHtml {
        let currentContent =  content;
        if(this.isSmall && !currentContent){
            currentContent = INU_ICON.puzzle;
        }
        return this.sanitizer.bypassSecurityTrustHtml(currentContent?currentContent:'');
    }

    getCollapsed(){
        let result = 'collapsed';

        if(this.data){
            if(this.data.collapsed==undefined || this.data.collapsed==undefined==null){
                result = 'collapsed';
            }else{
                result = this.data.collapsed? 'collapsed' : '' ;
            }
            
        }
        return  result; 
    }
    getCollapsedStatus(){
        return 'inu-menu-link-collapsed-status '+this.getCollapsed();
    }
    getStyleclass(): string {
        const result: string[] = ['inu-menu-links', this.displayType,  this.getCollapsed()];


        for(let i=0; i<this.level; i++){
            result.push('level-'+i);
        }
        if (this.styleclass) {
            result.push(this.styleclass);
        }

        return result.join(' ');
    }

    get isSmall() :boolean{
        return this.level!=0 && this.displayType == 'small';
    }






}