import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MenuLink } from 'inugami-components/models';


@Component({
    selector: 'inu-menu-links',
    styleUrls: ['./menu-links.component.scss'],
    template: `

        <div [class]="getStyleclass()" *ngIf="data">
            <div class="inu-menu-link-header" (click)="navigate(data)">
                <span *ngIf="data.icon" class="inu-menu-link-header-icon" [innerHTML]="getSafeHtml(data.icon)"></span>
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

export class MenuLinksComponent{
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


    /**************************************************************************
    * CONSTRUCTOR
    **************************************************************************/
    constructor(private sanitizer: DomSanitizer, private router: Router) { }


    navigate(linkData: MenuLink|undefined|null):void {
        if(!linkData){
            return;
        }
        console.log(linkData)
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
    * GETTER
    **************************************************************************/
    getSafeHtml(content: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(content);
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
        const result: string[] = ['inu-menu-links',  this.getCollapsed()];


        for(let i=0; i<this.level; i++){
            result.push('level-'+i);
        }
        if (this.styleclass) {
            result.push(this.styleclass);
        }

        return result.join(' ');
    }




}