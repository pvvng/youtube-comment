import { ObjectId } from "mongodb";

export interface PopularYoutuberType {
    _id?: ObjectId;
    name: string;
    customUrl: string;
    thumnailUrl: string;
    channelId: string;
    date: string;
    counter: number;
}