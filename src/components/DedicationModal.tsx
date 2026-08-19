"use client";
import { useState } from "react";
import { usePlayer } from "./PlayerContext";
import { Song } from "@/lib/mockData";

interface DedicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    preselectedSong?: Song | null;
}

export default function DedicationModal({ isOpen, onClose, preselectedSong }: DedicationModalProps) {
    const { currentSong, addDedication, ishqSongs } = usePlayer();
    const activeSong = preselectedSong || currentSong || (ishqSongs.length > 0 ? ishqSongs[0] : null);

    const [toName, setToName] = useState("");
    const [message, setMessage] = useState("");
    const [selectedSongId, setSelectedSongId] = useState(activeSong?.id || "");
    const [isGenerated, setIsGenerated] = useState(false);
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const chosenSong = ishqSongs.find((s) => s.id === selectedSongId) || activeSong;

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!chosenSong) return;

        addDedication({
            songTitle: chosenSong.title,
            artist: chosenSong.artist,
            toName: toName.trim() || "Someone Special",
            message: message.trim() || "Kuch gaane sune nahi jaate... mehsoos kiye jaate hain. ❤️",
        });

        setIsGenerated(true);
    };

    const dedicationText = `❤️ *Ishq FM Dedication*\n\n` +
        `🎵 *${chosenSong?.title}* - ${chosenSong?.artist}\n` +
        `💌 *For:* ${toName.trim() || "Someone Special"}\n` +
        `💬 *Message:* "${message.trim() || "Kuch gaane sune nahi jaate... mehsoos kiye jaate hain."}"\n\n` +
        `🎧 Listen now on Ishq FM • Bihari Auto Beats:\nhttps://www.bihariautobeats.live/ishq-fm`;

    const handleWhatsAppShare = () => {
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(dedicationText)}`;
        window.open(url, "_blank");
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(dedicationText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div
                className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fade-in"
                onClick={onClose}
            />

            <div className="relative z-10 w-full max-w-lg bg-[#17152A] border border-pink-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_10px_50px_rgba(255,79,139,0.25)] animate-slide-up-modal">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-all"
                >
                    ✕
                </button>

                {!isGenerated ? (
                    <>
                        <div className="text-center mb-6">
                            <span className="inline-block text-[11px] uppercase tracking-widest font-heading font-bold text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-400/20 mb-2">
                                💌 KISI KE LIYE?
                            </span>
                            <h3
                                className="text-2xl sm:text-3xl font-black text-white"
                                style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
                            >
                                गाना Dedicate करें
                            </h3>
                            <p className="text-white/60 text-xs sm:text-sm mt-1">
                                नाम मत बताओ... बस दिल की बात और गाना बताओ ❤️
                            </p>
                        </div>

                        <form onSubmit={handleGenerate} className="space-y-4">
                            {/* Selected Song Preview / Selector */}
                            <div>
                                <label className="block text-xs font-semibold text-pink-300 uppercase tracking-wider mb-1.5">
                                    चयनित गाना • Song
                                </label>
                                <select
                                    value={selectedSongId}
                                    onChange={(e) => setSelectedSongId(e.target.value)}
                                    className="w-full bg-[#0d0c18] border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-pink-500"
                                >
                                    {ishqSongs.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.title} — {s.artist}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* To Name */}
                            <div>
                                <label className="block text-xs font-semibold text-pink-300 uppercase tracking-wider mb-1.5">
                                    किसके लिए? • For (Optional / Nickname)
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Someone Special / Meri Jaan / Anjaan"
                                    value={toName}
                                    onChange={(e) => setToName(e.target.value)}
                                    maxLength={40}
                                    className="w-full bg-[#0d0c18] border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-pink-500 placeholder:text-white/30"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-xs font-semibold text-pink-300 uppercase tracking-wider mb-1.5">
                                    संदेश • Message
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="Kuch gaane sune nahi jaate... mehsoos kiye jaate hain..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    maxLength={200}
                                    className="w-full bg-[#0d0c18] border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-pink-500 placeholder:text-white/30 resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-2 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-lg shadow-pink-500/30 transition-all flex items-center justify-center gap-2"
                            >
                                <span>CREATE SHARE CARD</span>
                                <span>💌</span>
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="space-y-5 text-center">
                        <span className="inline-block text-xs uppercase tracking-widest font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                            ✨ Card Ready!
                        </span>

                        {/* Visual Share Card */}
                        <div className="relative rounded-2xl overflow-hidden p-6 border border-pink-500/40 bg-gradient-to-b from-[#1f1a3a] to-[#0d0c18] shadow-2xl text-left">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl">❤️</span>
                                    <span className="font-heading font-black text-pink-400 tracking-wider text-sm">
                                        ISHQ FM
                                    </span>
                                </div>
                                <span className="text-[10px] text-white/50 tracking-wider">
                                    Bihari Auto Beats
                                </span>
                            </div>

                            <div className="flex items-center gap-3.5 mb-4">
                                {chosenSong?.thumbnail && (
                                    <img
                                        src={chosenSong.thumbnail}
                                        alt={chosenSong.title}
                                        className="w-14 h-14 rounded-xl object-cover border border-pink-500/30 shadow-md"
                                    />
                                )}
                                <div>
                                    <p className="text-white font-bold text-base leading-tight">
                                        {chosenSong?.title}
                                    </p>
                                    <p className="text-pink-300 text-xs mt-0.5">{chosenSong?.artist}</p>
                                </div>
                            </div>

                            <div className="bg-black/30 rounded-xl p-3.5 border border-white/5 mb-3">
                                <p className="text-[11px] text-pink-300/80 font-semibold mb-1">
                                    For: {toName.trim() || "Someone Special"}
                                </p>
                                <p className="text-white/90 text-xs italic leading-relaxed">
                                    "{message.trim() || "Kuch gaane sune nahi jaate... mehsoos kiye jaate hain."}"
                                </p>
                            </div>

                            <p className="text-[10px] text-center text-white/40">
                                bihariautobeats.live/ishq-fm • Dil Se... Sirf Tumhare Liye
                            </p>
                        </div>

                        {/* Action buttons */}
                        <div className="grid grid-cols-2 gap-3 pt-2">
                            <button
                                onClick={handleWhatsAppShare}
                                className="py-3 px-4 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 text-xs sm:text-sm transition-all"
                            >
                                <span>WhatsApp Share</span>
                                <span>↗</span>
                            </button>
                            <button
                                onClick={handleCopy}
                                className="py-3 px-4 rounded-xl font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center gap-2 text-xs sm:text-sm transition-all"
                            >
                                <span>{copied ? "Copied! ✓" : "Copy Link 📋"}</span>
                            </button>
                        </div>

                        <button
                            onClick={() => setIsGenerated(false)}
                            className="text-xs text-white/50 hover:text-white underline pt-1"
                        >
                            ← Create another dedication
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
