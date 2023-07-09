import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { EditorValidator } from "@/lib/validators/editor";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();
    const { id, title, content } = EditorValidator.parse(body);

    return new Response("Editor api doesn't exists yet.", { status: 404 });
  } catch (error) {
    if (error instanceof z.ZodError)
      return new Response("Invalid request data passed", { status: 422 });

    return new Response("Could not submit data, please try again later", {
      status: 500,
    });
  }
}
