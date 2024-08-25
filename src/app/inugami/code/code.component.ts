import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { INU_ICON } from 'inugami-components/icon';
import { ComponentUtils } from 'inugami-components/utils';
import { ObservableSubscriber } from 'inugami-components/models';


const DEFAULT_TIME_FORMAT = "YYYY-MM-DD HH:mm";

@Component({
    selector: 'inu-code',
    styleUrls: ['./code.component.scss'],
    template: `
        <div [class]="_styleClass">
            <div class="inu-code-header">
                <div  class="inu-code-header-title">
                    <span *ngIf="title">{{title}}</span>
                </div>
                <div  class="inu-code-header-action">
                    <ul>
                        <li  (click)="copyContent()">
                            <inu-icon [icon]="iconCopy" ></inu-icon>
                        </li>
                        <li (click)="toogleCollapse()">
                            <inu-icon [icon]="icon"></inu-icon>
                        </li>
                    </ul>
                </div>
            </div>
            <pre *ngIf="sourceCode && !collapsed">
                <code [languages]="[currentLanguage]" [highlight]="sourceCode">
                </code>
            </pre>
        </div>
    `
})
export class InuCodeComponent implements OnInit, OnChanges {
    //==================================================================================================================
    // ATTRIBUTES
    //==================================================================================================================
    @Input() title: string | undefined = undefined;
    @Input() styleClass: string | undefined = undefined;
    @Input() languages: string | undefined = undefined;
    @Input() source: string | undefined = undefined;
    @Input() collapsed: boolean = false;

    updater : ObservableSubscriber<string> = new  ObservableSubscriber<string>();
    currentLanguage!:string;
    sourceCode: string = '';
    icon : string =  INU_ICON['angleDown'];
    iconCopy : string =  INU_ICON['copy'];
    //==================================================================================================================
    // INIT
    //==================================================================================================================
    constructor(private sanitizer: DomSanitizer, 
        private changeDetectorRef:ChangeDetectorRef) { }
    
    ngOnChanges(changes: any): void {
        if(changes['source'] && changes['source']['currentValue'] ){
            this.sourceCode =  changes['source']['currentValue'];
        }else{
            this.sourceCode = '';
        }
    }


    ngOnInit() {
        this.sourceCode = this.source ? this.source : '';
        this.currentLanguage = this.languages? this.languages: 'plaintext';
    }


    //==================================================================================================================
    // ACTIONS
    //==================================================================================================================
    toogleCollapse() {
        this.collapsed = !this.collapsed;
        if (this.collapsed) {
            this.icon= INU_ICON['angleUp'];
        } else {
            this.icon= INU_ICON['angleDown'];
        }
    }

    copyContent(){
        if(this.source){
            navigator.clipboard.writeText(this.source);
        }
    }

    //==================================================================================================================
    // GETTERS
    //==================================================================================================================
    get _styleClass(): string {
        return ComponentUtils.generateStyleclass('inu-code', this.styleClass);
    }

 
}