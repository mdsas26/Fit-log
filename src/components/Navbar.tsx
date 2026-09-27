"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const Navbar = () => {
    const { plan, saved } = usePlan();
    const pathname = usePathname();

    const isHome = pathname === "/";
    const isMyPlan = pathname === "/my-plan";

    return (
        <nav className="flex h-20 items-center justify-between border-b border-zinc-800 bg-[#0b0c0f] px-6 md:px-10">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
                <Image
                    src="/logo.png"
                    alt="FitLog"
                    width={40}
                    height={40}
                    className="h-7 w-auto"
                />
                <span className="text-lg font-bold text-white">
                    FITLOG
                </span>
            </Link>

            {/* Navigation */}
            <div className="flex items-center gap-2">

                <Link
                    href="/"
                    className={`rounded-full px-5 py-2 text-base font-medium transition ${isHome
                            ? "bg-[#182600] text-[#ccff00]"
                            : "text-zinc-400 hover:text-white"
                        }`}
                >
                    Workouts
                </Link>

                <Link
                    href="/my-plan"
                    className={`rounded-full px-5 py-2 text-base font-medium transition ${isMyPlan
                            ? "bg-[#182600] text-[#ccff00]"
                            : "text-zinc-400 hover:text-white"
                        }`}
                >
                    My Plan
                </Link>

            </div>

            {/* Counters */}
            <div className="flex items-center gap-5 text-base">

                <Link
                    href="/my-plan"
                    className="flex items-center gap-2 text-zinc-300"
                >
                    <span>Plan</span>

                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1 text-xs font-bold text-black">
                        {plan.length}
                    </span>
                </Link>

                <Link
                    href="/my-plan"
                    className="flex items-center gap-2 text-zinc-400"
                >
                    <span>Saved</span>

                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-zinc-700 px-1 text-xs text-zinc-400">
                        {saved.length}
                    </span>
                </Link>

            </div>
        </nav>
    );
};

export default Navbar;