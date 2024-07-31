import { Component, Input, OnInit ,SecurityContext} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
    selector: 'inu-icon',
    styleUrls: ['./icon.component.scss'],
    template: `
        <span [class]="getStyleclass()" [innerHTML]="iconContent"></span>
    `
})

export class IconComponent implements OnInit {
    /**************************************************************************
    * ATTRIBUTES
    **************************************************************************/
    @Input()
    public styleclass: string | null = null;

    @Input()
    public icon: string | null = null;


    public iconContent: SafeHtml | null = null;

    /**************************************************************************
    * CONSTRUCTOR
    **************************************************************************/
    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
        console.log(this.icon)
        if (this.icon) {
            this.iconContent = this.sanitizer.bypassSecurityTrustHtml(this.icon);
        }
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




}