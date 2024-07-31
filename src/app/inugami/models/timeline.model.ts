import { BoundedValue, TimeBucket } from "./select-item.model";
import { SvgTimerGenerator } from "./svg-options.model";
import { SvgStyleGenerator } from "./svg-service.model";

export interface TimelineLoader {
    load(from:Date, until:Date, resolution:number) : TimeBucket<number>[];
}

export interface TimelineData {
    values:TimeBucket<number>[];
    types:BoundedValue<string,number>[];
    typesValues: string[];
    stepMaxValue:number;
    stepMinValue:number;
    from: Date;
    until: Date;
    resolution:number;
    graph: SVGElement;
    height : number;
    width : number;
    x: number;
    y: number;
    styleGenerator:SvgStyleGenerator;
    timer: SvgTimerGenerator|null;
    delay: number;
    duration:number;
    graphNodes :TimeLineValueNodes[];
}

export interface TimeLineValueNodes{
    nodes : Map<string, SVGElement>;
}