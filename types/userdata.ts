import { ObjectId } from "mongodb";

export interface DBUserdataType {
    _id: ObjectId;
    name: string;
    email: string;
    image: string | null;
    youtuberHeart: UserHeartedType[];
    videoHeart: UserHeartedType[];
}

export interface UserHeartedType {
    id : string;
    name : string;
    thumbnailUrl : string;
}