'use client'
import Link from "next/link";
import { Heart, Github, Mail, Globe } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full mt-20 mb-8">
        <div className="w-full border-t border-gray-600 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
            <div className="max-w-4xl mx-auto px-6">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <div className="flex items-center gap-2">
                            <Image src="/icon.svg" alt="Save Tube" width={16} height={16} />
                            <span className="text-xl font-bold tracking-tight">
                                Save Tube
                            </span>
                            <span className="text-xs text-teal-400 font-medium bg-teal-400/10 px-2 py-1 rounded-full">
                                v0.1
                            </span>
                        </div>
                        <p className="text-sm opacity-80 text-center md:text-left">
                            Paste. Download. Save.
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link href="https://github.com/ashishxjhaa" className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100" target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                            <span className="hidden sm:inline">GitHub</span>
                        </Link>
                        <Link href="mailto:ashishxyzjha@gmail.com" className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100">
                            <Mail className="w-4 h-4" />
                            <span className="hidden sm:inline">Contact</span>
                        </Link>
                        <Link href="/docs" className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100">
                            <Globe className="w-4 h-4" />
                            <span className="hidden sm:inline">Docs</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2 text-sm opacity-80">
                        <span>© {currentYear} SaveTube</span>
                        <span className="text-teal-400">•</span>
                        <span>Made with</span>
                        <Heart className="w-4 h-4 text-teal-400 fill-current" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;