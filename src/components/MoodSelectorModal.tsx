"use client";
import { useRouter } from "next/navigation";
import { usePlayer } from "./PlayerContext";

export default function MoodSelectorModal() {
    const { isMoodModalOpen, selectMood, closeMoodModal } = usePlayer();
    const router = useRouter();

    if (!isMoodModalOpen) return null;

    const handleSelect = (type: "bihari" | "durgesh" | "ishq") => {
        selectMood(type);
        if (type === "ishq") {
            router.push("/ishq-fm");
        } else {
            router.push("/");
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Deep atmospheric backdrop with blur */}
            <div
                className="fixed inset-0 bg-black/85 backdrop-blur-2xl transition-opacity animate-fade-in"
                onClick={closeMoodModal}
            />

            {/* Modal Dialog */}
            <div className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-center my-auto animate-slide-up-modal py-6">
                {/* Close Button */}
                <button
                    onClick={closeMoodModal}
                    className="absolute -top-2 right-2 sm:top-2 sm:right-2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-all z-20"
                    aria-label="Close"
                >
                    ✕
                </button>

                {/* Header / Question */}
                <div className="text-center mb-8 sm:mb-10">
                    <span className="inline-block text-xs uppercase tracking-widest font-heading font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 mb-3 shadow-[0_0_12px_rgba(251,191,36,0.2)]">
                        मूड चुनिए • SELECT YOUR VIBE
                    </span>
                    <h2
                        className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-2xl"
                        style={{
                            fontFamily: "'Tiro Devanagari Hindi', serif",
                            textShadow: "0 4px 30px rgba(245, 158, 11, 0.4), 0 2px 10px rgba(0,0,0,0.8)",
                        }}
                    >
                        आज आपका मूड कैसा है?
                    </h2>
                    <p className="text-white/60 mt-3 text-sm sm:text-base font-medium max-w-md mx-auto">
                        Choose your music experience to get the beats rolling
                    </p>
                </div>

                {/* The 3 Mood Experience Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 w-full">
                    {/* Card 1: Bihari Auto Playlist */}
                    <div
                        onClick={() => handleSelect("bihari")}
                        className="group relative rounded-3xl overflow-hidden cursor-pointer p-6 sm:p-7 flex flex-col justify-between min-h-[320px] border border-amber-500/20 hover:border-amber-400/80 transition-all duration-300 hover:scale-[1.02] shadow-2xl hover:shadow-[0_10px_40px_rgba(245,158,11,0.25)]"
                    >
                        {/* Background Image Preview */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: "url('/bg.png')" }}
                        />
                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/50 transition-colors duration-300 group-hover:from-black/90 group-hover:via-black/65" />

                        {/* Top Content */}
                        <div className="relative z-10">
                            <div className="w-13 h-13 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                🛺
                            </div>
                            <h3
                                className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors"
                                style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
                            >
                                बिहारी ऑटो बीट्स
                            </h3>
                            <p className="text-xs uppercase tracking-widest text-amber-300/80 font-heading font-semibold mt-1">
                                Bihari Swag on Wheels
                            </p>
                            <p className="text-xs sm:text-sm text-white/70 mt-3 leading-relaxed">
                                देसी भोजपुरी गाने • ढोलक, तड़का और फुल भौकाल!
                            </p>
                        </div>

                        {/* Bottom Badges & Action */}
                        <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                                <span className="text-[10px] bg-white/10 border border-white/10 px-2 py-0.5 rounded-full text-white/80 font-medium">
                                    🔥 Desi
                                </span>
                                <span className="text-[10px] bg-white/10 border border-white/10 px-2 py-0.5 rounded-full text-white/80 font-medium">
                                    🛺 Highway
                                </span>
                            </div>
                            <span className="text-xs font-bold text-black bg-gradient-to-r from-amber-400 to-saffron-500 group-hover:from-amber-300 group-hover:to-saffron-400 px-3.5 py-1.5 rounded-full shadow-lg shadow-amber-500/30 flex items-center gap-1.5 transition-all">
                                <span>बजाओ</span>
                                <span>▶</span>
                            </span>
                        </div>
                    </div>

                    {/* Card 2: Durgesh Nai Playlist */}
                    <div
                        onClick={() => handleSelect("durgesh")}
                        className="group relative rounded-3xl overflow-hidden cursor-pointer p-6 sm:p-7 flex flex-col justify-between min-h-[320px] border border-amber-500/20 hover:border-amber-400/80 transition-all duration-300 hover:scale-[1.02] shadow-2xl hover:shadow-[0_10px_40px_rgba(245,158,11,0.25)]"
                    >
                        {/* Background Image Preview */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: "url('/durgesh_nai.png')" }}
                        />
                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/50 transition-colors duration-300 group-hover:from-black/90 group-hover:via-black/65" />

                        {/* Top Content */}
                        <div className="relative z-10">
                            <div className="w-13 h-13 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                💈
                            </div>
                            <h3
                                className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors"
                                style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
                            >
                                दुर्गेश नाई स्पेशल
                            </h3>
                            <p className="text-xs uppercase tracking-widest text-amber-300/80 font-heading font-semibold mt-1">
                                90s Salon Nostalgia
                            </p>
                            <p className="text-xs sm:text-sm text-white/70 mt-3 leading-relaxed">
                                सदाबहार 90s के नगमे • बाल भी कटेगा, गाना भी बजेगा!
                            </p>
                        </div>

                        {/* Bottom Badges & Action */}
                        <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                                <span className="text-[10px] bg-white/10 border border-white/10 px-2 py-0.5 rounded-full text-white/80 font-medium">
                                    ✂️ 90s
                                </span>
                                <span className="text-[10px] bg-white/10 border border-white/10 px-2 py-0.5 rounded-full text-white/80 font-medium">
                                    📻 Salon
                                </span>
                            </div>
                            <span className="text-xs font-bold text-black bg-gradient-to-r from-amber-400 to-saffron-500 group-hover:from-amber-300 group-hover:to-saffron-400 px-3.5 py-1.5 rounded-full shadow-lg shadow-amber-500/30 flex items-center gap-1.5 transition-all">
                                <span>बजाओ</span>
                                <span>▶</span>
                            </span>
                        </div>
                    </div>

                    {/* Card 3: ISHQ FM */}
                    <div
                        onClick={() => handleSelect("ishq")}
                        className="group relative rounded-3xl overflow-hidden cursor-pointer p-6 sm:p-7 flex flex-col justify-between min-h-[320px] border border-pink-500/30 hover:border-pink-400/90 transition-all duration-300 hover:scale-[1.02] shadow-2xl hover:shadow-[0_10px_45px_rgba(255,79,139,0.35)]"
                    >
                        {/* Background Image: public/ishq-fm.png */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: "url('/ishq-fm.png')" }}
                        />
                        {/* Romantic Violet/Pink Glow Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080714] via-[#17152A]/85 to-black/50 transition-colors duration-300 group-hover:from-[#080714]/95 group-hover:via-[#17152A]/75" />

                        {/* Top Content */}
                        <div className="relative z-10">
                            <div className="w-13 h-13 rounded-2xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,79,139,0.3)]">
                                ❤️
                            </div>
                            <h3
                                className="text-2xl font-black text-white group-hover:text-pink-400 transition-colors flex items-center gap-2"
                                style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
                            >
                                <span>इश्क़ FM</span>
                                <span className="text-xs bg-pink-500/30 border border-pink-400/50 text-pink-300 font-sans px-2 py-0.5 rounded-full">
                                    LIVE
                                </span>
                            </h3>
                            <p className="text-xs uppercase tracking-widest text-pink-300/90 font-heading font-semibold mt-1">
                                Dil Se... Sirf Tumhare Liye
                            </p>
                            <p className="text-xs sm:text-sm text-white/75 mt-3 leading-relaxed">
                                कुछ गाने सुने नहीं जाते... महसूस किए जाते हैं। 🌙
                            </p>
                        </div>

                        {/* Bottom Badges & Action */}
                        <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                                <span className="text-[10px] bg-pink-500/20 border border-pink-400/30 px-2 py-0.5 rounded-full text-pink-200 font-medium">
                                    💕 Romance
                                </span>
                                <span className="text-[10px] bg-purple-500/20 border border-purple-400/30 px-2 py-0.5 rounded-full text-purple-200 font-medium">
                                    🌙 Late Night
                                </span>
                            </div>
                            <span className="text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 group-hover:from-pink-400 group-hover:to-purple-500 px-3.5 py-1.5 rounded-full shadow-lg shadow-pink-500/40 flex items-center gap-1.5 transition-all">
                                <span>ENTER</span>
                                <span>▶</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
