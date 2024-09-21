export interface CommentThread {
    kind: 'youtube#commentThreadListResponse';
    etag: string;
    pageInfo: { 
        totalResults: number; 
        resultsPerPage: number; 
    };
    items: RawCommentData[];
    nextPageToken ?: string;
}

export interface RawCommentData {
    kind: string;
    etag: string;
    id: string;
    snippet: RawCommentDataSnippetType;
}

export interface RawCommentDataSnippetType {
    channelId: string;
    videoId: string;
    topLevelComment: CommentType; // Comment 타입을 정의해야 합니다.
    canReply: boolean;
    totalReplyCount: number;
    isPublic: boolean;
}

export interface CommentType {
    // topLevelComment의 구조에 맞춰 추가적인 속성을 정의해야 합니다.
    kind: string;
    etag: string;
    id: string;
    snippet: CommentSnippetType;
}

export interface CommentSnippetType {
    channelId: string;
    videoId: string;
    textDisplay: string;
    textOriginal: string;
    authorDisplayName: string;
    authorProfileImageUrl: string;
    authorChannelUrl: string;
    authorChannelId: { value: string };
    canRate: boolean;
    viewerRating: string;
    likeCount: number;
    publishedAt: string;
    updatedAt: string;
}

export interface FilteredCommentType {
    text : string;
    authorDisplayName : string;
    autohorProfileImageUrl : string;
    likeCount : number;
    publishedAt : Date;
}

export interface CommentDataType {
    commentData : FilteredCommentType[];
    dateData : DateDataType[];
}

export interface DateDataType {
    date : string;
    percent : number;
    value : number;
}