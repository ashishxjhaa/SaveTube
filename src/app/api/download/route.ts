import { NextResponse } from "next/server";
import ytdl from "@distube/ytdl-core";

export async function POST(req: Request) {
    try {
        const { url } : { url: string } = await req.json();

        if (!url || !url.trim()) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        const isValidYoutube =
            url.includes("youtube.com") || url.includes("youtu.be");

        if (!isValidYoutube) {
            return NextResponse.json({ error: "Invalid YouTube link" }, { status: 400 });
        }

        let videoUrl = url;
        if (url.includes("youtu.be")) {
            const videoId = url.split("/").pop();
            videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        }

        let info;
        try {
            info = await ytdl.getInfo(videoUrl, {
                requestOptions: {
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
                    }
                }
            });
        } catch (err) {
            console.error("YTDL ERROR:", err);
            return NextResponse.json(
                { error: "Failed to fetch video info. This likely doesn't work on Vercel. Please self-host your project." },
                { status: 500 }
            );
        }

        const title = info.videoDetails.title;
        const thumbnails = info.videoDetails.thumbnails;
        const thumbnailUrl = thumbnails[thumbnails.length - 1].url;
        const lengthSeconds = parseInt(info.videoDetails.lengthSeconds, 10);

        const videoFormats = info.formats
        .filter(f => f.hasVideo && f.url)
            .map(f => ({
                itag: f.itag,
                container: f.container,
                qualityLabel: f.qualityLabel || "unknown",
                url: f.url,
            })
        );

        if (!videoFormats.length) {
            return NextResponse.json(
                { error: "No downloadable video formats found" }, 
                { status: 400 }
            );
        }

        return NextResponse.json({ 
            success: true,
            title,
            thumbnail: thumbnailUrl,
            lengthSeconds,
            formats : videoFormats,
        }, { status: 200 } );
    } catch (err) {
        console.error("API ERROR:", err);
        return NextResponse.json(
            { error: "Something went wrong (likely due to host restrictions). Please self-host this project for YouTube downloads." },
            { status: 500 }
        );
    }
}