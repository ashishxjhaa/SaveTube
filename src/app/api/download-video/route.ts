import ytdl from "@distube/ytdl-core";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const itag = parseInt(searchParams.get("itag") || "");

  if (!url || !itag) {
    return new Response(JSON.stringify({ error: "Missing parameters" }), { status: 400 });
  }

  try {
    const info = await ytdl.getInfo(url);
    if (!info?.formats) throw new Error("No formats found");
    const format = info.formats.find(f => f.itag === itag);
    if (!format) {
      return new Response(JSON.stringify({ error: "Format not found" }), { status: 400 });
    }

    const title = info.videoDetails?.title?.replace(/[^\w\s.-]/gi, "_") || "video";
    const ext = format.container || "mp4";

    const stream = ytdl.downloadFromInfo(info, { format });
    if (!stream) throw new Error("Failed to create stream");

    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          controller.enqueue(chunk);
        }
        controller.close();
      }
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": `attachment; filename="${title}.${ext}"`
      }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}
