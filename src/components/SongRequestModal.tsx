"use client";
import { useState } from "react";

interface SongRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SongRequestModal({ isOpen, onClose }: SongRequestModalProps) {
    const [songName, setSongName] = useState("");
    const [artistName, setArtistName] = useState("");
    const [dedication, setDedication] = useState("");
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!songName.trim()) return;

        // In client-side / local storage simulation
        try {
            const currentRequests = JSON.parse(localStorage.getItem("ishq_song_requests") || "[]");
            currentRequests.push({
                songName: songName.trim(),
                artistName: artistName.trim(),
                dedication: dedication.trim(),
                date: new Date().toISOString(),
            });
            localStorage.setItem("ishq_song_requests", JSON.stringify(currentRequests));
        } catch {
            // Ignore storage errors
        }

        setSubmitted(true);
    };

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div
                className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fade-in"
                onClick={onClose}
            />

            <div className="relative z-10 w-full max-w-md bg-[#17152A] border border-pink-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_10px_50px_rgba(255,79,139,0.25)] animate-slide-up-modal">
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-all"
                >
                    ✕
                </button>

                {!submitted ? (
                    <>
                        <div className="text-center mb-6">
                            <span className="inline-block text-[11px] uppercase tracking-widest font-heading font-bold text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-400/20 mb-2">
                                🎤 TUMHARA GAANA MISSING HAI?
                            </span>
                            <h3
                                className="text-2xl sm:text-3xl font-black text-white"
                                style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
                            >
                                गाना Request करें
                            </h3>
                            <p className="text-white/60 text-xs sm:text-sm mt-1">
                                अपना पसंदीदा रोमांटिक गाना इश्क़ FM पर जुड़वाएँ
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-pink-300 uppercase tracking-wider mb-1.5">
                                    गाने का नाम • Song Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Tum Hi Ho / Raataan Lambiyan"
                                    value={songName}
                                    onChange={(e) => setSongName(e.target.value)}
                                    className="w-full bg-[#0d0c18] border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-pink-500 placeholder:text-white/30"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-pink-300 uppercase tracking-wider mb-1.5">
                                    गायक / कलाकार • Artist (Optional)
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Arijit Singh, Atif Aslam"
                                    value={artistName}
                                    onChange={(e) => setArtistName(e.target.value)}
                                    className="w-full bg-[#0d0c18] border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-pink-500 placeholder:text-white/30"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-pink-300 uppercase tracking-wider mb-1.5">
                                    किसके नाम? • Dedication Note (Optional)
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. For someone who loves rain..."
                                    value={dedication}
                                    onChange={(e) => setDedication(e.target.value)}
                                    className="w-full bg-[#0d0c18] border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-pink-500 placeholder:text-white/30"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-2 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-lg shadow-pink-500/30 transition-all flex items-center justify-center gap-2"
                            >
                                <span>REQUEST SONG</span>
                                <span>❤️</span>
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-6 space-y-4">
                        <div className="w-16 h-16 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-400 text-3xl flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(255,79,139,0.35)] animate-scale-in">
                            ❤️
                        </div>
                        <h4
                            className="text-2xl font-bold text-white"
                            style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
                        >
                            Request भेज दी गई है!
                        </h4>
                        <p className="text-white/70 text-sm max-w-xs mx-auto">
                            हम जल्द ही <strong className="text-pink-300">"{songName}"</strong> को Ishq FM की लिस्ट में जोड़ देंगे।
                        </p>
                        <button
                            onClick={() => {
                                setSubmitted(false);
                                setSongName("");
                                setArtistName("");
                                setDedication("");
                                onClose();
                            }}
                            className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl transition-all"
                        >
                            बंद करें • Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
