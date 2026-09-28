import Image from "next/image";

const Footer = () => {
    return (
        <footer className="flex flex-col items-center gap-4 border-t border-zinc-800 bg-[#090a0c] px-5 py-7 text-base md:flex-row md:items-center md:justify-between md:px-10">

            {/* Logo */}
            <div className="flex items-center gap-2">
                <Image
                    src="/logo.png"
                    alt="FitLog"
                    width={40}
                    height={40}
                    className="h-8 w-auto rotate-[-45deg]"
                />

                <span className="text-lg font-bold text-white">
                    FITLOG
                </span>
            </div>

            {/* Copyright */}
            <p className="text-center text-base text-zinc-400">
                © 2026 FitLog — Workout Library. Train hard, log honest.
            </p>

        </footer>
    );
};

export default Footer;