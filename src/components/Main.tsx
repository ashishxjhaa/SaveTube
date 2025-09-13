"use client"

import { GrFormNext } from "react-icons/gr";


export default function Main() {
  return (
    <div className="w-full max-w-sm sm:max-w-2xl mx-auto pt-20 sm:pt-30">
        <div className="flex justify-center font-medium sm:font-bold pb-10 sm:pb-15 text-2xl sm:text-3xl">
            Save YouTube Video
        </div>
        <div className="w-fit flex mx-auto p-3 border border-gray-600 rounded-2xl">
        <div className="flex justify-center items-center gap-8">
            <div className="w-fit h-fit border border-dashed border-teal-500 rounded-xl px-4 py-2">
                <input type="text" placeholder="Enter Youtube" className="w-40 sm:w-64 h-7 sm:h-8 border-none outline-none focus:ring-0 focus:outline-none" />
            </div>
            <div className="bg-neutral-700 hover:bg-neutral-600 rounded-sm p-1 cursor-pointer group hover:shadow-xs shadow-slate-50">
                <GrFormNext className="w-8 h-8 text-teal-300 group-hover:text-teal-400" />
            </div>
        </div>
        </div>
    </div>
    );
}


{/* <div className="flex flex-col w-full max-w-sm sm:max-w-2xl mx-auto pt-20 sm:pt-30">
    <div className="flex justify-center p-3 border border-gray-600 rounded-2xl">
        <div className="transition-all duration-300 border border-dashed border-teal-500 bg-transparent hover:bg-teal-950 flex min-h-16 sm:min-h-20 w-full items-center justify-center rounded-xl cursor-pointer text-sm sm:text-base">
            <Plus className="h-4 w-4 mr-2" />
            Add Website
        </div>
    </div>
</div> */}