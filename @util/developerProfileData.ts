export interface DeveloperDataType {
    profile : string,
    name : string,
    email : string,
    comment : string,
    role : string[],
    github : string,
}

export const kimsData : DeveloperDataType = {
    profile : "/developer-image/kims-profile.png",
    name : "김동우",
    email : "gdongu093@gmail.com",
    comment : "재밌게 만들었습니다. 재밌게 써주세요!",
    role : ["frontend", "backend"],
    github : "https://github.com/pvvng",
}

export const josData : DeveloperDataType = {
    profile : "/developer-image/kims-profile.png",
    name : "조정민",
    email : "gdongu093@gmail.com",
    comment : "text",
    role : ["frontend"],
    github : "https://github.com/JOJoungMin",
}