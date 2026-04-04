import Link from 'next/link'
import React from 'react'
import { MdCheckCircle, MdLocationOn } from 'react-icons/md'

const RegistrationClosed = () => {
    return (
        <div className="container mx-auto px-6 grid lg:grid-cols-2 pt-24 gap-12 items-center relative z-10">
            <div>
                {/* Registration Closed Badge */}
                <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/50 text-amber-500 px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest mb-6">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    Current Batch Full - Registration Closed
                </div>

                <h1 className="text-5xl lg:text-8xl font-black leading-none mb-6 text-white tracking-tighter uppercase">
                    YOUTUBE <br />
                    <span className="text-red-600 italic">AUTOMATION</span> <br />
                </h1>

                <div className="inline-block bg-slate-700 text-slate-300 px-4 py-1 rounded-md font-black text-xl mb-8 line-through opacity-50">
                    FUNDAMENTALS COURSE
                </div>

                <p className="text-xl text-slate-300 mb-8 max-w-lg leading-relaxed">
                    Missed the current batch? Don't worry! Join our <span className="text-white font-bold">Official Community</span> to get notified first for the next batch, YouTube automation tips, and upcoming events by the <span className="text-red-500">OMJ Social Welfare Committee.</span>
                </p>

                <div className="flex flex-col gap-4 mb-10">
                    {/* WhatsApp Community Button */}
                    <Link
                        href={"https://chat.whatsapp.com/CNQBYrCw3CC8lZ3aJ95pxq"} // Replace with your actual WhatsApp link
                        className="bg-green-600 text-white px-8 py-5 rounded-2xl font-black text-lg hover:bg-white hover:text-green-600 transition-all shadow-2xl shadow-green-900/20 text-center uppercase tracking-widest flex items-center justify-center gap-3"
                    >
                        <span>Join Youtube Automation WhatsApp Community</span>
                    </Link>
                    <Link href={"https://whatsapp.com/channel/0029VbBqamO8F2pBOxwyva3I"} className="text-green-500 text-sm text-center underline underline-offset-4 hover:text-green-700 font-bold uppercase tracking-widest text-center lg:text-left">
                        Stay updated  other events JOIN OMJ Social Welfare Committee Channel
                    </Link>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
                        <MdCheckCircle className="text-slate-500" />
                        <span className="text-slate-500 text-xs font-black uppercase tracking-widest line-through">
                            Onsite Classes
                        </span>
                    </div>
                    <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
                        <MdLocationOn className="text-slate-500" />
                        <span className="text-slate-500 text-xs font-black uppercase tracking-widest">
                            Hussainabad
                        </span>
                    </div>
                </div>
            </div>

            {/* Right Side: Poster with "Batch Full" Overlay */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-red-600 to-red-900 rounded-[3rem] blur opacity-25"></div>
                <div className="relative bg-slate-800 rounded-[3rem] overflow-hidden border border-slate-700 shadow-2xl">
                    <img
                        src="/main-poster.jpeg"
                        alt="Course Flyer"
                        className="w-full h-full object-contain grayscale opacity-50"
                    />
                    {/* Batch Full Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center rotate-[-15deg]">
                        <div className="bg-red-600 text-white font-black text-4xl md:text-6xl px-10 py-4 border-4 border-white shadow-2xl">
                            BATCH FULL
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrationClosed