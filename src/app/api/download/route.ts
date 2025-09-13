import { NextResponse } from "next/server";
import ytdl from "ytdl-core";

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

        const info = await ytdl.getInfo(url);

        const title = info.videoDetails.title;
        
        const thumbnails = info.videoDetails.thumbnails;
        const thumbnailUrl = thumbnails[thumbnails.length - 1].url;

        const lengthSeconds = parseInt(info.videoDetails.lengthSeconds, 10);

        const videoUrl = info.videoDetails.video_url;

        const formats = info.formats.map((f) => ({
            itag: f.itag,
            container: f.container,
            qualityLabel: f.qualityLabel,
            audioBitrate: f.audioBitrate,
            hasVideo: !!f.hasVideo,
            hasAudio: !!f.hasAudio,
        }));

        return NextResponse.json({ 
            success: true, 
            message: "Valid YouTube URL", 
            title,
            thumbnail: thumbnailUrl,
            lengthSeconds,
            videoUrl,
            formats,
        });
    } catch (err) {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
