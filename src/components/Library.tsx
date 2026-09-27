"use client";

import { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard";
import { Workout } from "@/types/workout";

const Library = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch(
                    "https://api.api-store.workers.dev/api/fitlog"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch workouts");
                }

                const data: Workout[] = await response.json();

                setWorkouts(data);
            } catch (error) {
                console.error(error);
                setError("Failed to load workouts.");
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, []);

    return (
        <section
            id="library"
            className="bg-[#0b0c0f] px-5 py-14 md:px-8 lg:px-10"
        >
            {/* Library Heading */}
            <div className="mb-8">
                <h2 className="text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
                    THE LIBRARY
                </h2>

                <p className="mt-2 text-base text-zinc-400 md:text-lg">
                    Twelve lifts covering every major muscle group.
                </p>
            </div>

            {/* Loading */}
            {loading && (
                <div className="py-20 text-center text-zinc-500">
                    Loading workouts...
                </div>
            )}

            {/* Error */}
            {!loading && error && (
                <div className="py-20 text-center text-red-400">
                    {error}
                </div>
            )}

            {/* Workout Cards */}
            {!loading && !error && (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {workouts.map((workout) => (
                        <WorkoutCard
                            key={workout.id}
                            workout={workout}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default Library;