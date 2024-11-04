import { ObjectId } from "mongodb";

export interface PopularType {
    _id?: ObjectId;
    name: string;
    thumnailUrl: string;
    dataId: string;
    date: string;
    counter: number;
}