const Loading = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#0b0c0f]">
            <div className="text-center">
                <span className="loading loading-spinner text-warning"></span>

                <p className="mt-4 text-base text-zinc-400">
                    Loading FitLog...
                </p>
            </div>
        </main>
    );
};

export default Loading;