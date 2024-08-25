export interface InuSwitzerlandModel<T> {
    canton  : string;
    selected : boolean;
    value?: T[];
}

export type InuSwitzerlandStyleGenerator = (value: InuSwitzerlandModel<any>)=> string|undefined;


