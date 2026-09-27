"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { usePlan } from "@/context/PlanContext";

type SortOption = "duration" | "calories" | "rating";
type ActiveTab = "plan" | "saved";

const MyPlanPage = () => {
    const {
        plan,
        saved,
        removeFromPlan,
        removeSaved,
        markAsDone,
        isCompleted,
    } = usePlan();

    const [activeTab, setActiveTab] =
        useState<ActiveTab>("plan");

    const [sortBy, setSortBy] =
        useState<SortOption>("duration");

    // =========================
    // CURRENT LIST
    // =========================

    const currentList =
        activeTab === "plan" ? plan : saved;

    // =========================
    // SORT
    // =========================

    const sortedList = useMemo(() => {
        const workouts = [...currentList];

        if (sortBy === "duration") {
            return workouts.sort(
                (a, b) => b.duration - a.duration
            );
        }

        if (sortBy === "calories") {
            return workouts.sort(
                (a, b) =>
                    b.caloriesBurned -
                    a.caloriesBurned
            );
        }

        if (sortBy === "rating") {
            return workouts.sort(
                (a, b) => b.rating - a.rating
            );
        }

        return workouts;
    }, [currentList, sortBy]);

    // =========================
    // METRICS
    // =========================

    const totalMinutes = currentList.reduce(
        (total, workout) =>
            total + workout.duration,
        0
    );

    const totalCalories = currentList.reduce(
        (total, workout) =>
            total + workout.caloriesBurned,
        0
    );

    return (
        <main className="min-h-screen bg-[#0b0c0f] px-5 py-10 text-white md:px-10 lg:px-12">

            {/* =========================
                HEADER
            ========================== */}

            <section>
                <h1 className="font-oswald text-5xl font-semibold uppercase leading-none md:text-6xl">
                    MY PLAN
                </h1>

                <p className="mt-3 text-base text-zinc-500">
                    Cap of five lifts for today. Finish them,
                    then load more.
                </p>
            </section>


            {/* =========================
                METRICS
            ========================== */}

            <section className="mt-10 grid grid-cols-1 overflow-hidden rounded-xl border border-zinc-800 bg-[#15171c] sm:grid-cols-3">

                {/* Exercises */}

                <div className="border-b border-zinc-800 p-6 sm:border-b-0 sm:border-r">
                    <p className="text-base text-zinc-400">
                        Exercises
                    </p>

                    <p className="mt-2 font-oswald text-3xl font-semibold text-[#ccff00]">
                        {currentList.length}
                    </p>
                </div>


                {/* Minutes */}

                <div className="border-b border-zinc-800 p-6 sm:border-b-0 sm:border-r">
                    <p className="text-base text-zinc-400">
                        Minutes
                    </p>

                    <p className="mt-2 font-oswald text-3xl font-semibold text-white">
                        {totalMinutes}
                    </p>
                </div>


                {/* Calories */}

                <div className="p-6">
                    <p className="text-base text-zinc-400">
                        Calories
                    </p>

                    <p className="mt-2 font-oswald text-3xl font-semibold text-white">
                        {totalCalories}
                    </p>
                </div>

            </section>


            {/* =========================
                TABS + SORT
            ========================== */}

            <section className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                {/* Tabs */}

                <div className="flex w-fit rounded-lg border border-zinc-800 bg-[#15171c] p-1">

                    <button
                        type="button"
                        onClick={() =>
                            setActiveTab("plan")
                        }
                        className={`rounded-md px-5 py-2 text-xs font-medium transition ${activeTab === "plan"
                            ? "bg-[#242730] text-white"
                            : "text-zinc-500 hover:text-white"
                            }`}
                    >
                        Today's Plan
                    </button>


                    <button
                        type="button"
                        onClick={() =>
                            setActiveTab("saved")
                        }
                        className={`rounded-md px-5 py-2 text-xs font-medium transition ${activeTab === "saved"
                            ? "bg-[#242730] text-white"
                            : "text-zinc-500 hover:text-white"
                            }`}
                    >
                        Saved
                    </button>

                </div>


                {/* Sort */}

                <div className="flex items-center gap-2">

                    <span className="text-base text-zinc-500">
                        Sort By
                    </span>

                    <select
                        value={sortBy}
                        onChange={(event) =>
                            setSortBy(
                                event.target.value as SortOption
                            )
                        }
                        className="rounded-lg border border-zinc-800 bg-[#15171c] px-4 py-2 text-xs text-white outline-none transition hover:border-zinc-600 focus:border-[#ccff00]"
                    >
                        <option value="duration">
                            Duration
                        </option>

                        <option value="calories">
                            Calories
                        </option>

                        <option value="rating">
                            Rating
                        </option>
                    </select>

                </div>

            </section>


            {/* =========================
                EMPTY STATE
            ========================== */}

            {sortedList.length === 0 && (
                <section className="mt-6 flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 text-center">

                    <h2 className="font-oswald text-2xl font-semibold uppercase">
                        NOTHING HERE YET
                    </h2>

                    <p className="mt-2 max-w-md text-base text-zinc-500">
                        Browse the library and add a lift to get
                        today moving.
                    </p>

                    <Link
                        href="/#library"
                        className="mt-6 rounded-full bg-[#ccff00] px-6 py-3 text-xs font-bold text-black transition hover:bg-[#b8e600]"
                    >
                        Go to workouts
                    </Link>

                </section>
            )}


            {/* =========================
                WORKOUT LIST
            ========================== */}

            {sortedList.length > 0 && (
                <section className="mt-6 space-y-4">

                    {sortedList.map((workout) => (

                        <article
                            key={workout.id}
                            className="rounded-xl border border-zinc-800 bg-[#15171c] p-3 transition hover:border-zinc-700 sm:p-4"
                        >

                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">


                                {/* =========================
                                    LEFT SIDE
                                ========================== */}

                                <div className="flex min-w-0 items-center gap-4">

                                    {/* Image */}

                                    <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-[#1b1d22] sm:h-20 sm:w-32">

                                        <Image
                                            src={workout.image}
                                            alt={workout.name}
                                            fill
                                            className="object-cover"
                                        />

                                    </div>


                                    {/* Workout Information */}

                                    <div className="min-w-0">

                                        <h3 className="font-oswald text-lg font-semibold uppercase leading-tight text-white sm:text-xl">
                                            {workout.name}
                                        </h3>

                                        <p className="mt-1 text-base text-zinc-400 sm:text-base">
                                            {workout.equipment}
                                        </p>


                                        {/* Stats */}

                                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-zinc-400">

                                            <span>
                                                ◷ {workout.duration} min
                                            </span>

                                            <span>
                                                ♨ {workout.caloriesBurned} kcal
                                            </span>

                                            <span>
                                                ☆ {workout.rating}
                                            </span>

                                        </div>

                                    </div>

                                </div>


                                {/* =========================
                                    RIGHT SIDE
                                ========================== */}

                                <div className="flex shrink-0 items-center justify-end gap-2">

                                    {/* View Details */}

                                    <Link
                                        href={`/workouts/${workout.id}`}
                                        className="rounded-md border border-zinc-700 px-4 py-2 text-xs font-medium text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
                                    >
                                        View Details
                                    </Link>


                                    {/* Today's Plan Actions */}

                                    {activeTab === "plan" && (
                                        <>

                                            {/* Mark as Done */}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    markAsDone(
                                                        workout.id
                                                    )
                                                }
                                                disabled={isCompleted(
                                                    workout.id
                                                )}
                                                className={`rounded-md px-4 py-2 text-xs font-bold transition ${isCompleted(
                                                    workout.id
                                                )
                                                    ? "cursor-not-allowed bg-zinc-700 text-zinc-400"
                                                    : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
                                                    }`}
                                            >
                                                {isCompleted(
                                                    workout.id
                                                )
                                                    ? "✓ Done"
                                                    : "✓ Mark as Done"}
                                            </button>


                                            {/* Remove */}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeFromPlan(
                                                        workout.id
                                                    )
                                                }
                                                className="px-2 py-2 text-lg text-zinc-500 transition hover:text-red-400"
                                                aria-label={`Remove ${workout.name} from plan`}
                                            >
                                                ×
                                            </button>

                                        </>
                                    )}


                                    {/* Saved Actions */}

                                    {activeTab === "saved" && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeSaved(
                                                    workout.id
                                                )
                                            }
                                            className="px-2 py-2 text-lg text-zinc-500 transition hover:text-red-400"
                                            aria-label={`Remove ${workout.name} from saved`}
                                        >
                                            ×
                                        </button>
                                    )}

                                </div>

                            </div>

                        </article>

                    ))}

                </section>
            )}

        </main>
    );
};

export default MyPlanPage;