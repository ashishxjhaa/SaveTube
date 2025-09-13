import { IconArrowRight } from "@tabler/icons-react";
import { RiVideoDownloadFill } from "react-icons/ri";



export default function Tagline() {
    return (
        <div className="flex items-center gap-2 rounded-full max-w-md mx-auto w-fit h-fit border border-white/40 px-4 pl-4.5 py-1">
            <RiVideoDownloadFill className="w-4.5 h-4.5" />
            <span className="bg-gradient-to-r from-white via-gray-400 to-white bg-[length:200%_100%] animate-[shimmer_6s_infinite] bg-clip-text text-transparent opacity-85">Download YouTube Video</span>
            <IconArrowRight size={20} strokeWidth={1.5} />
        </div>
    );
}
