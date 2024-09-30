import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { InuSwitzerlandModel, InuSwitzerlandStyleGenerator, Position, Vector } from 'inugami-components/models';
import { ComponentUtils, SVG_BUILDER, SVG_MATH, SVG_TRANSFORM } from 'inugami-components/utils';


const SELECTED = 'selected';

export interface BuildingModelDTO {
    name?: string;
    level?: number;
    nbRooms?: number;
}

@Component({
    selector: 'inu-svg-building',
    styleUrls: ['./svg-building.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: InuBuildingComponent,
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: InuBuildingComponent,
            multi: true
        }
    ],
    template: `
        <div [class]="styleClass" #component>
            BUILDING
            <svg #container xmlns="http://www.w3.org/2000/svg"></svg>
        </div>
    `
})
export class InuBuildingComponent implements AfterViewInit, ControlValueAccessor, Validator {
    //==================================================================================================================
    // ATTRIBUTES
    //==================================================================================================================
    @Input() styleClass: string | undefined = undefined;

    @Output() onClicked: EventEmitter<any> = new EventEmitter();
    @Output() onSelected: EventEmitter<any> = new EventEmitter();
    @Output() onDeselected: EventEmitter<any> = new EventEmitter();
    @Output() onChanged: EventEmitter<any> = new EventEmitter();


    data: BuildingModelDTO[] | undefined = undefined;

    //--------------------------------------------------------------------------
    @ViewChild('component')
    private component: ElementRef | undefined | null = null;
    @ViewChild('container')
    private container: ElementRef | undefined | null = null;

    //--------------------------------------------------------------------------
    private parent: HTMLElement | null = null;
    public height: number = 600;
    public width: number = 200;


    public disabled: boolean = false;
    private onChange = (value: any) => { };
    private onTouched = (value: any) => { };

    //--- SVG components
    private locator: SVGElement | null = null;
    private canvas: SVGElement | null = null;
    private graph: SVGElement | null = null;


    //==================================================================================================================
    // INIT
    //==================================================================================================================
    constructor(private changeDetectorRef: ChangeDetectorRef) { }


    ngAfterViewInit(): void {
        if (this.component && this.container) {
            this.resolveParentSize();

            this.initializeLayout();

            this.resize();
        }
    }

    updateValues() {
        if (!this.data) {
            return;
        }
        for (let item of this.data) {
            this.renderFloor(item);
        }
    }


    //==================================================================================================================
    // RENDERING
    //==================================================================================================================
    private initializeLayout(): void {
        this.locator = SVG_BUILDER.createGroup(this.container?.nativeElement, { styleClass: 'locator' });
        this.canvas = SVG_BUILDER.createGroup(this.locator, { styleClass: 'canvas' });


        if (this.canvas) {
            this.graph = SVG_BUILDER.createGroup(this.canvas, { styleClass: 'graph' });
        }

        if (this.graph) {

        }

        this.updateValues();
    }



    renderFloor(value: BuildingModelDTO) {
        const group = SVG_BUILDER.createGroup(this.graph, { styleClass: 'building-floor' });
        if(!group){
            return ;
        }
        const builder: string[] = ['m'];

        const posA :Position= {x:0, y:0};
        const posB :Position= SVG_MATH.rotate(10,0, 35);
        const posC :Position= {x:0, y:0};
        const posD :Position= {x:0, y:0};

        builder.push(`${posA.x}, ${posA.y}`);
        builder.push(`${posB.x}, ${posB.y}`);
        builder.push(`${posC.x}, ${posC.y}`);
        builder.push(`${posD.x}, ${posD.y}`);

        builder.push('');
        // m 60.621777,89.999997 12.99038,-7.499999 8.660254,5 -12.990381,7.499999 z


        const path = builder.join(' ');
        SVG_BUILDER.createPath(path, group);
    }
    //==================================================================================================================
    // RESOLVERS
    //==================================================================================================================
    public resolveParentSize(): void {

        if (this.component?.nativeElement && this.component?.nativeElement.parentNode && this.component?.nativeElement.parentNode.parentNode) {
            this.parent = this.component?.nativeElement.parentNode.parentNode;
        }

        if (this.parent) {
            let parentSize = SVG_MATH.size(this.parent);
            this.height = parentSize.height;
            this.width = parentSize.width;
        }


        this.container?.nativeElement.setAttribute('style', `display: block; height:${this.height}px;width:${this.width}px`);
    }


    //==================================================================================================================
    // ACTIONS
    //==================================================================================================================
    public resize(): void {
        if (this.locator && this.parent) {
            SVG_TRANSFORM.center(this.locator, this.parent, true, true);
        }
    }



    //==================================================================================================================
    // EVENT
    //==================================================================================================================
    onClick(canton: string, node: SVGElement, event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();

    }



    //==================================================================================================================
    // ControlValueAccessor
    //==================================================================================================================
    writeValue(obj: any): void {
        console.log('writeValue', obj);
        if (!obj) {
            this.data = [];
        } else {
            if (!this.data) {
                this.data = [];
            }
            if (Array.isArray(obj)) {
                this.data.push(...obj);
            } else {
                this.data.push(obj);
            }
        }

        this.updateValues();

    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    //==================================================================================================================
    // Validator
    //==================================================================================================================
    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        return null;
    }
    registerOnValidatorChange?(fn: () => void): void {

    }



    //==================================================================================================================
    // GETTERS
    //==================================================================================================================


}