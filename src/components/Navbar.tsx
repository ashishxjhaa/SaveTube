"use client";

import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";

export default function Navbar() {

    return (
        <div className="sticky max-w-3xl w-[90%] md:w-full mx-auto top-4 z-50 flex items-center justify-between place-self-center flex-wrap gap-2 p-2 px-4 mt-4 rounded-xl h-full bg-teal-50/10 shadow-lg shadow-neutral-600/5 backdrop-blur-md">
            <div className="flex w-full justify-between items-center">
                <Link href={"/"} className="flex items-center gap-2 cursor-pointer">
                    <span className="inline-flex items-center gap-2 text-green-200/80 font-bold rounded-lg uppercase tracking-widest shadow-2xl text-xs sm:text-sm p-2">
                        <Image src="/icon.svg" alt="SaveVideo" width={16} height={16} />
                        <svg className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-teal-300" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" /></svg>
                        SaveVideo
                    </span>
                </Link>

                <div className="text-white flex items-center gap-2 cursor-pointer px-2.5 py-1 border-1 rounded-md border-gray-600 hover:border-teal-300">
                    <FaGithub />
                   Star me on GitHub
                </div>
            </div>
        </div>

    );
}