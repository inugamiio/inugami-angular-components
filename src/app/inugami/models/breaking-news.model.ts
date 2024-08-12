export enum BreakingNewsLevel{
    INFO,
    WARN,
    ERROR,
    FATAL
}
export interface BreakingNews {
    title:string;
    message:string;
    uid?:string;
    date?:Date,
    duration?:number;
    level?:BreakingNewsLevel;
    icon?:string;
    type?:string;
    data?:any;
}