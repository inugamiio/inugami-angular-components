import { SelectGroupModel, TimeBucket } from "src/app/commons/models/select-item.model";

export interface TimelineLoader {
    load(from:Date, until:Date, resolution:number) : TimeBucket<number>[];
}