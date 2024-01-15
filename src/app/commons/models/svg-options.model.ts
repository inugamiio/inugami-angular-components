export interface SvgOptionalOption{
    styleClass?: string|null
}


export interface RectOption extends SvgOptionalOption{
    height?: number;
    width?: number;
    round?: number;
}