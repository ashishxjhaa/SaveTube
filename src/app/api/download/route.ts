import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { url }: { url: string } = await req.json();

        if (!url || !url.trim()) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        const isValidYoutube =
        url.includes("youtube.com") || url.includes("youtu.be");

        if (!isValidYoutube) {
        return NextResponse.json({ error: "Invalid YouTube link" }, { status: 400 });
        }

        return NextResponse.json({ success: true, message: "Valid YouTube URL", url });
    } catch (err) {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
