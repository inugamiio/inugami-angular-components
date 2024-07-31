export interface MenuLink {
    icon?:string;
    label?:string;
    link?:string;
    tooltips?:string;
    collapsed?:boolean,
    children?: MenuLink[];
}