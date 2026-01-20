import { NextResponse } from 'next/server';
// import { axiosBackend } from '@/lib/axios';

export async function POST(request: Request) {
    try {
        // const body = await request.json();
        // console.log("Register request (server)", body);

        // const response = await axiosBackend.post('/auth/register', body);
        // return NextResponse.json(response.data);

        return NextResponse.json({
            status: 200,
            message: "Register successful",
            data: {
                accessToken: "",
            }
        }); 
    } catch (error: any) {
        console.error('Error registering:', error.response?.data?.message || error.message);
        return NextResponse.json(
            { message: error.response?.data?.message || error.message },
            { status: error.response?.status || 500 }
        );
    }
}
