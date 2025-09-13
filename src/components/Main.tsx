"use client"

import { useEffect, useState } from "react";
import { GrFormNext } from "react-icons/gr";
import { AnimatePresence, motion } from "framer-motion";


export default function Main() {
    const [index, setIndex] = useState(0);
    const [url, setUrl] = useState<string>("");

    const placeholders = [
        "Enter Youtube Video Url",
        "Paste Youtube Url here",
        "Enter Shorts Video Url",
    ];

    const isValidYoutube = (link: string): boolean => {
        return link.includes("youtube.com") || link.includes("youtu.be");
    };

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((prev) => (prev + 1) % placeholders.length);
        }, 4000);
        return () => clearInterval(id);
    }, []);

    const handleDownload = async (): Promise<void> => {
        if (!url.trim()) {
            alert("Please enter a link");
            return;
        }
        if (!isValidYoutube(url)) {
            alert("Enter a valid YouTube link");
            return;
        }

        const res = await fetch("/api/download", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url }),
        });

        const data = await res.json();
        console.log("API response:", data);
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
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {placeholders[index]}
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
            <div onClick={handleDownload} className="bg-neutral-700 hover:bg-neutral-600 rounded-sm p-1 cursor-pointer group hover:shadow-xs shadow-slate-50">
                <GrFormNext className="w-8 h-8 text-teal-300 group-hover:text-teal-400" />
            </div>
        </div>
        </div>

        <div className="flex flex-col w-full max-w-sm sm:max-w-2xl mx-auto pt-20 sm:pt-30">
            <div className="flex justify-center p-3 border border-gray-600 rounded-2xl">
                <div className="flex">
                <div className="flex flex-col transition-all duration-300 border border-dashed border-teal-500 bg-transparent min-h-16 sm:min-h-20 w-full rounded-xl p-2">
                    <div className="h-[28vh] sm:h-[29vh] min-w-[50vh] max-w-[50vh] rounded-lg shadow-md object-cover bg-white"></div>
                    <div className="p-2 font-medium sm:font-bold text-sm sm:text-lg min-w-[50vh] max-w-[50vh]">FULL BOYCOTT! People are VERY ANGRY 😡| Ashneer POKES Salman, Kapil Sharma, Dhruv Rathee,</div>
                </div>
                <div>Video Link</div>
                <div>choose Quality</div>
                <div>Download</div>
                </div>
            </div>
        </div> 


    </div>
    );
}