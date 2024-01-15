export interface TransformationInfo{
    x: number|null;
    y: number|null;
    scaleX: number|null;
    scaleY: number|null;
}


export interface Dimension{
    height: number;
    width: number;
    font?: number|null;
}

export interface Position{
    x: number;
    y: number;
    cmd?: string;
}

export interface Size{
    height?: number|null;
    width?: number|null;
    bottom?: number|null;
    left?: number|null;
    right?: number|null;
    top?: number|null;
    x?: number|null;
    y?: number|null;
    fontratio?: number|null;
}

export interface Point{
    x: number;
    y: number;
}

export interface Vector{
    start: Point;
    end: Point;
}