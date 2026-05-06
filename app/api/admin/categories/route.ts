import { addCategory, getCategories } from "@/features/categories/model";
import { NextRequest, NextResponse } from "next/server";

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

export const GET = async (req: NextRequest) => {
  console.log("GET categories with query:", req.nextUrl.searchParams.toString());
  const keyword = (await req.nextUrl.searchParams.get("keyword")) || "";
  const categories = await getCategories({
    keyword,
    page: 0,
    orderField: "name",
    orderType: "asc",
    size: 20,
  });
  return NextResponse.json(categories);
};