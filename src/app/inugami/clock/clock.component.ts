import { Component, Input, OnInit } from '@angular/core';
import { Formatter } from 'inugami-components/utils';

const DEFAULT_TIME_FORMAT = "YYYY-MM-DD HH:mm";

@Component({
    selector: 'inu-clock',
    template: `
        <div [class]="_styleClass" [ngClass]="'inu-clock'">
            <ng-container *ngIf="time">
                <div class="time">{{time}}</div>
            </ng-container>
        </div>
    `
})
export class InuClockComponent implements OnInit {
    //==================================================================================================================
    // ATTRIBUTES
    //==================================================================================================================
    @Input() styleClass: string | undefined = undefined;
    @Input() timeFormat: string | undefined = undefined;
    time: string | undefined = undefined;


    //==================================================================================================================
    // INIT
    //==================================================================================================================
    constructor() { }

    ngAfterContentInit() {
        this.updateTime();
    }

    ngOnInit() {
        let self = this;
        setInterval(() => {
            self.updateTime();
        }, 1000);
    }

    //==================================================================================================================
    // ACTION
    //==================================================================================================================
    private updateTime() {
        let timeStamp = Math.round(Date.now() / 1000);
        this.time = Formatter.timestampToTimeFormat(timeStamp, this.timeFormat ? this.timeFormat : DEFAULT_TIME_FORMAT);
    }

    //==================================================================================================================
    // GETTERS
    //==================================================================================================================
    get _styleClass(): string {
        if (!this.styleClass) {
            this.styleClass = '';
        }
        return this.styleClass;
    }
}