"use client";
import { useState } from "react";

interface AddSongModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddSongModal({ isOpen, onClose }: AddSongModalProps) {
    const [submitted, setSubmitted] = useState(false);
    const [url, setUrl] = useState("");
    const [songName, setSongName] = useState("");
    const [artist, setArtist] = useState("");
    const [nickname, setNickname] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim()) return;
        setSubmitted(true);
    };

    const handleClose = () => {
        setSubmitted(false);
        setUrl("");
        setSongName("");
        setArtist("");
        setNickname("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[90] flex items-end md:items-center justify-center">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />

            <div className="relative w-full max-w-md glass-strong rounded-t-3xl md:rounded-3xl p-6 animate-slide-up-modal max-h-[85vh] overflow-y-auto mx-2 md:mx-auto">
                <button onClick={handleClose} className="absolute top-4 right-4 text-white/30 hover:text-white text-lg" aria-label="Close">
                    ✕
                </button>

                {!submitted ? (
                    <>
                        <div className="text-center mb-6">
                            <span className="text-4xl mb-2 block">🎵</span>
                            <h2 className="font-heading text-xl font-bold text-white">APNA GAANA JODO</h2>
                            <p className="text-sm text-white/40 mt-1">
                                Jo gaana bajana chahiye, woh bhejo.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <label className="text-xs font-medium text-white/50 mb-1.5 block">YouTube URL *</label>
                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://youtube.com/watch?v=..."
                                    required
                                    className="w-full px-4 py-3 rounded-xl glass-light text-white text-sm focus:outline-none focus:ring-1 focus:ring-saffron-500/50 placeholder:text-white/20 border-0"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-white/50 mb-1.5 block">Song Name <span className="text-white/20">(optional)</span></label>
                                <input
                                    type="text"
                                    value={songName}
                                    onChange={(e) => setSongName(e.target.value)}
                                    placeholder="Lollypop Lagelu"
                                    className="w-full px-4 py-3 rounded-xl glass-light text-white text-sm focus:outline-none focus:ring-1 focus:ring-saffron-500/50 placeholder:text-white/20 border-0"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-white/50 mb-1.5 block">Artist <span className="text-white/20">(optional)</span></label>
                                <input
                                    type="text"
                                    value={artist}
                                    onChange={(e) => setArtist(e.target.value)}
                                    placeholder="Pawan Singh"
                                    className="w-full px-4 py-3 rounded-xl glass-light text-white text-sm focus:outline-none focus:ring-1 focus:ring-saffron-500/50 placeholder:text-white/20 border-0"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-white/50 mb-1.5 block">Your Nickname <span className="text-white/20">(optional)</span></label>
                                <input
                                    type="text"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    placeholder="AutoWalaBhai"
                                    className="w-full px-4 py-3 rounded-xl glass-light text-white text-sm focus:outline-none focus:ring-1 focus:ring-saffron-500/50 placeholder:text-white/20 border-0"
                                />
                            </div>

                            <button type="submit" className="btn-saffron w-full text-sm py-3 mt-2">
                                SUBMIT SONG
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <span className="text-5xl mb-4 block">❤️</span>
                        <h2 className="font-heading text-xl font-bold text-white mb-2">Gaana mil gaya bhai!</h2>
                        <p className="text-white/40 text-sm mb-6">Approval ke baad bajega.</p>
                        <button onClick={handleClose} className="btn-glass">Theek hai 👍</button>
                    </div>
                )}
            </div>
        </div>
    );
}
