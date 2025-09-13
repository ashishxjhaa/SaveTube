import { Plus } from "lucide-react";



export default function Main() {
  return (
        <div className="flex flex-col w-full max-w-sm sm:max-w-2xl mx-auto pt-20 sm:pt-30">
            <div className="flex justify-center p-3 border border-gray-600 rounded-2xl">
                <div className="transition-all duration-300 border border-dashed border-teal-500 bg-transparent hover:bg-teal-950 flex min-h-16 sm:min-h-20 w-full items-center justify-center rounded-xl cursor-pointer text-sm sm:text-base">
                    <Plus className="h-4 w-4 mr-2" />
                    <input type="text" placeholder="Add Website" />
                </div>
            </div>
        </div>
    );
}