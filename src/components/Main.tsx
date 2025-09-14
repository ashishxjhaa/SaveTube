"use client"

import { useEffect, useState } from "react";
import { GrFormNext } from "react-icons/gr";
import { AnimatePresence, motion } from "framer-motion";
import { IoCopyOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdDone } from "react-icons/md";
import Image from "next/image";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { toast } from "sonner"


export default function Main() {

    type VideoType = {
        title: string;
        url: string;
        thumbnail: string;
        lengthSeconds: number;
        formats: { itag: number; container: string; qualityLabel: string; url: string }[];
    };

    const [index, setIndex] = useState(0);
    const [url, setUrl] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [video, setVideo] = useState<VideoType | null>(null);
    const [qualities, setQualities] = useState<string[]>([]);
    const [quality, setQuality] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;


    const placeholders = [
        "Enter Youtube Video Url",
        "Paste Youtube Url here",
        "Enter Shorts Video Url",
    ];

    const isValidYoutube = (link: string): boolean => {
        const regex =
            /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/)[\w-]{11}|youtu\.be\/[\w-]{11})/;
        return regex.test(link);
    };


    useEffect(() => {
        const id = setInterval(() => {
            setIndex((prev) => (prev + 1) % placeholders.length);
        }, 4000);
        return () => clearInterval(id);
    }, []);

    const handleFetchVideo = async (): Promise<void> => {
        if (!url.trim()) {
            toast.error("Please enter a link");
            return;
        }
        if (!isValidYoutube(url)) {
            toast.error("Enter a valid YouTube link");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(`${BACKEND_URL}/api/download`, { url });
            const data = res.data;
            
            if (data.success && data.formats?.length) {
                setVideo({
                    title: data.title,
                    url: url,
                    thumbnail: data.thumbnail,
                    lengthSeconds: data.lengthSeconds,
                    formats: data.formats,
                });

                const uniqueQualities = Array.from(new Set(data.formats.map((f: { itag: number; container: string; qualityLabel: string; url: string }) => f.qualityLabel as string))).filter(q => q !== "unknown") as string[];
                
                uniqueQualities.sort((a, b) => {
                    const numA = parseInt(a) || 0;
                    const numB = parseInt(b) || 0;
                    return numA - numB;
                });

                setQualities(uniqueQualities);
                setQuality(null);
            } else if (data.error) {
                toast.error("Something Went Wrong");
            } 
        } catch (err) {
            toast.error("Something went wrong while fetching video");
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadVideo = async () => {
        if (!video || !quality) return;

        const selectedFormat = video.formats.find(f => f.qualityLabel === quality);
        if (!selectedFormat) return;
        
        try {
            const downloadUrl = `${BACKEND_URL}/api/download-video?url=${encodeURIComponent(video.url)}&itag=${selectedFormat.itag}`;
            window.open(downloadUrl, "_blank");
            toast.success("Download started!");
        } catch (err) {
            toast.error("Download failed");
        }
    };

    const formatDuration = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return h > 0 ? `${h}:${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}` : `${m}:${s.toString().padStart(2,"0")}`;
    };



  return (
    <div className="w-full max-w-sm sm:max-w-2xl mx-auto pt-20 sm:pt-30">
        <div className="flex justify-center font-medium sm:font-bold pb-10 sm:pb-15 text-2xl sm:text-3xl">
            Save YouTube Video
        </div>
        <div className="w-fit flex mx-auto p-3 border border-gray-600 rounded-2xl">
        <div className="flex justify-center items-center gap-8">
            <div className="relative w-fit h-fit border border-dashed border-teal-500 rounded-xl px-4 py-2">
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="" className="w-40 sm:w-64 h-7 sm:h-8 border-none outline-none focus:ring-0 focus:outline-none" />
                <AnimatePresence mode="wait">
                    {!url && (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        >
                            {placeholders[index]}
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
            <div onClick={handleFetchVideo} className="bg-neutral-700 hover:bg-neutral-600 rounded-sm p-1 cursor-pointer group hover:shadow-xs shadow-slate-50">
                <GrFormNext className="w-8 h-8 text-teal-300 group-hover:text-teal-400" />
            </div>
        </div>
        </div>

        <div className="flex flex-col w-fit max-w-sm sm:max-w-2xl mx-auto pt-20 sm:pt-30">
            {(loading || video) && (
            <div className="flex justify-center p-3 border border-gray-600 rounded-2xl w-fit">
                {loading ? (
                    <div className="flex items-center gap-3 font-medium border border-dashed border-teal-500 bg-transparent h-fit w-fit rounded-xl p-3">
                        <Oval height={28} width={28} color="#14b8a6" secondaryColor="#2dd4bf" strokeWidth={5} strokeWidthSecondary={5} visible={true} />
                        Fetching Video Data ...
                    </div>
                ) : video ? (
                <div className="flex flex-col sm:flex-row">
                    <div className="flex flex-col transition-all duration-300 border border-dashed border-teal-500 bg-transparent min-h-16 sm:min-h-20 w-fit rounded-xl p-3">
                        <div className="relative">
                            <Image src={video.thumbnail} alt={video.title} width={500} height={300} className="h-[28vh] sm:h-[29vh] min-w-[50vh] max-w-[50vh] rounded-lg shadow-md object-cover bg-white" />
                            <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
                                {formatDuration(video.lengthSeconds)}
                            </span>
                        </div>
                        <div className="px-2 pt-2 font-medium sm:font-bold text-sm sm:text-lg min-w-[50vh] max-w-[50vh]">
                            {video.title}
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center px-8 py-5 sm:py-0">
                        <div className="flex gap-2 items-center whitespace-nowrap">
                            <div className="text-teal-300 font-medium sm:font-bold">Video Link: </div>
                            <a href={video.url} target="_blank" className="hover:underline">
                                Watch Now
                            </a>
                            <div onClick={() => { navigator.clipboard.writeText(video.url); setCopied(true); setTimeout(() => setCopied(false), 800); }} className="rounded-lg bg-neutral-700 p-2 cursor-copy transition-all duration-300">
                                {copied ? ( <MdDone /> ) : ( <IoCopyOutline /> )}
                                
                            </div>
                        </div>
                        <div className="py-4 flex flex-col gap-2">
                            <div className="font-medium sm:font-bold text-teal-300 flex items-center gap-2 mx-auto sm:mx-0">
                                Choose Quality <IoIosArrowDown />
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {qualities.map(q => (
                                    <button key={q} className={`px-3 py-1.5 rounded-md border cursor-pointer ${ quality === q ? "bg-white text-black border-white" : "bg-neutral-700 text-white border-gray-500" }`} onClick={() => setQuality(q)}>
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div onClick={quality && video ? handleDownloadVideo : undefined} className={`font-bold border px-5 py-1 rounded-md ${ quality ? "bg-white hover:bg-white/95 text-black cursor-pointer" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}>
                            Download
                        </div>
                    </div>
                </div>
                ) : null}
            </div>
            )}
        </div> 

    </div>
    );
}
