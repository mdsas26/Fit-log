import Image from "next/image";

const Hero = () => {
    return (
        <section className="px-6 py-10 md:px-10">
            <div className="flex .min-h-[400px] items-center justify-between rounded-2xl border border-zinc-800 bg-[#15171c] px-8 py-12 md:px-12">

                {/* Left Content */}
                <div className="max-w-2xl">
                    <p className="mb-6 text-sm font-bold tracking-widest text-[#ccff00]">
                        WORKOUT LIBRARY
                    </p>

                    <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
                        TRAIN WITH INTENT.
                        <br />
                        LOG EVERY SET.
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
                        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
                        into today's plan, and watch the week's work add up.
                    </p>

                    <a
                        href="#library"
                        className="mt-7 inline-block rounded-md bg-[#ccff00] px-6 py-3 text-base font-bold text-black transition hover:bg-[#b8e600]"
                    >
                        BROWSE WORKOUTS
                    </a>
                </div>

                {/* Right Image */}
                <div className="hidden md:block">
                    <Image
                        src="/banner.png"
                        alt="Workout illustration"
                        width={450}
                        height={350}
                        className="h-auto w-[350px]"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;