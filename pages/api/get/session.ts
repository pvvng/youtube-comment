import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
    req : NextApiRequest, res : NextApiResponse
){
    if(req.method !== "GET") return res.status(405).json({message : "Not Allowed Method"});

    try{
        const session = await getServerSession(req, res, authOptions);
        if(!session) return res.status(200).json({ message : "session not found", session : null });
        const { user } = session;
        return res.status(200).json({session : user});
    }catch(error){
        console.log("Error fetching session : ", error);
        return res.status(500).json({message : "로그인 정보를 불러오는 중 오류가 발생했습니다."})
    }

}