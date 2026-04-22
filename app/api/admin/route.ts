import { createAdmin } from "@/features/managers/model";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const data = await req.json();

    const admin = await createAdmin(data);

    return NextResponse.json(admin);
}