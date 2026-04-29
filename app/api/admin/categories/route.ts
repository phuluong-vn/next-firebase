import { addCategory } from "@/features/categories/model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await addCategory(body);

    return NextResponse.json(result);
  } catch (error: unknown) {
    let message = "Internal Server Error";
    const status = 500;

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json(
      { message },
      { status }
    );
  }
}