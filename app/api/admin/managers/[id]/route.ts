import { deleteManagerById } from "@/features/managers/model";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json({ error: "Manager ID is required" }, { status: 400 });
        }

        await deleteManagerById(id);

        return NextResponse.json({ message: "Manager deleted successfully" });
    } catch (error) {
        console.error("Error deleting manager:", error);
        return NextResponse.json({ error: "Failed to delete manager" }, { status: 500 });
    }
};