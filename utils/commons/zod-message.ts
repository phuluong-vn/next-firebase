import { ZodError } from "zod";

export const formatZobMessage = (error: ZodError) => {
    const messages = error.issues;
    return messages.map((i) => i.message).join(', ');
}