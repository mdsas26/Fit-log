import Image from "next/image";

const Hero = () => {
    return (
        <section className="px-5 py-8 md:px-10 md:py-10">
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-10 rounded-2xl border border-zinc-800 bg-[#15171c] px-6 py-10 text-center md:flex-row md:justify-between md:gap-0 md:px-12 md:py-12 md:text-left">

                {/* Left Content */}
                <div className="max-w-2xl">
                    <p className="mb-6 text-sm font-bold tracking-widest text-[#ccff00]">
                        WORKOUT LIBRARY
                    </p>

                    <h1 className="text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl md:text-7xl">
                        TRAIN WITH INTENT.
                        <br />
                        LOG EVERY SET.
                    </h1>

                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-400 md:mx-0">
                        FitLog is a dark, no-nonsense gym companion: pick a lift,
                        lock it into today's plan, and watch the week's work add up.
                    </p>

                    <a
                        href="#library"
                        className="mt-7 inline-block rounded-md bg-[#ccff00] px-6 py-3 text-base font-bold text-black transition hover:bg-[#b8e600]"
                    >
                        BROWSE WORKOUTS
                    </a>
                </div>

                {/* Right Image */}
                <div className="flex justify-center">
                    <Image
                        src="/banner.png"
                        alt="Workout illustration"
                        width={450}
                        height={350}
                        className="h-auto w-[220px] sm:w-[280px] md:w-[350px]"
                    />
                </div>

            </div>
        </section>
    );
};

export default Hero;