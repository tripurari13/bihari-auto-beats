export default function ListenerCount({ count }: { count: number }) {
    return (
        <div className="flex items-center justify-center gap-2 py-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse-live" />
            <span className="text-sm md:text-base font-medium text-muted">
                <span className="text-foreground font-bold">{count}</span> log abhi sun rahe hain
            </span>
        </div>
    );
}
