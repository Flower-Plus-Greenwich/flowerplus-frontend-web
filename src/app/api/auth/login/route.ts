import { axiosBackend } from "@/lib/axios"; 
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        console.log("Login request (server)", request.body)
        // const response = await axiosBackend.post('/auth/login', request.body);
        // return NextResponse.json(response.data);
        return NextResponse.json({
            status: 200,
            message: "Login successful",
            data: {
                accessToken: "",
            }
        }); 
    } catch (error: any) {
        console.error('Error logging in:', error.response?.data?.message || error.message);
        return NextResponse.json(
            { message: error.response?.data?.message || error.message },
            { status: error.response?.status || 500 }
        )
    }   
}   