import axios from "axios";
import { origin } from "./config";



export const adminPostBoardMemberData = async (data:any) =>{
    const newData = JSON.stringify(data)
    try {
        const response = await axios(
            {
                method: "POST",
                url:`${origin}/api/v1/admin/board-member`,
                headers :{
                    // Authorization:`Bearer ${token}`,
                    "Content-Type" : "application/json"
                },
                data: newData
            }
        );
        const responseData = await response.data
        return responseData
    } catch (error:any) {
        return error
    }
}
