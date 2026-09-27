const Loading = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#0b0c0f]">
            <div className="flex flex-col items-center gap-4">
                <span className="loading loading-spinner loading-lg text-warning"></span>

                <p className="text-base text-zinc-400">
                    Loading workout...
                </p>
            </div>
        </main>
    );
};

export default Loading;  