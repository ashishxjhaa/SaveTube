import ytdl from "@distube/ytdl-core";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || !ytdl.validateURL(url)) {
      return new Response(JSON.stringify({ error: "Invalid YouTube URL" }), { status: 400 });
    }

    const info = await ytdl.getInfo(url);

    const formats = info.formats.map((f) => ({
      itag: f.itag,
      container: f.container,
      qualityLabel: f.qualityLabel,
      url: f.url,
    }));

    return new Response(
      JSON.stringify({
        success: true,
        title: info.videoDetails.title,
        thumbnail: info.videoDetails.thumbnails?.[info.videoDetails.thumbnails.length - 1]?.url,
        lengthSeconds: info.videoDetails.lengthSeconds,
        formats,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}
