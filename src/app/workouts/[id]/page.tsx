import Image from "next/image";
import { Workout } from "@/types/workout";
import WorkoutActions from "@/components/WorkoutActions";

type WorkoutDetailsPageProps = {
    params: Promise<{
        id: string;
    }>;
};

const WorkoutDetailsPage = async ({
    params,
}: WorkoutDetailsPageProps) => {
    const { id } = await params;

    // Fetch single workout
    const response = await fetch(
        `https://api.api-store.workers.dev/api/fitlog/${id}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch workout");
    }

    const workout: Workout = await response.json();

    return (
        <main className="min-h-screen bg-[#0b0c0f] px-3 py-4 text-white md:px-6 md:py-6">
            <div className="min-h-screen border border-zinc-900 bg-[#0f1014]">

                {/* Main Content */}
                <section className="px-5 py-12 md:px-8 lg:px-10 xl:px-14">
                    <div className="grid items-start gap-10 lg:grid-cols-2 xl:gap-16">

                        {/* =========================
                            LEFT - WORKOUT IMAGE
                        ========================== */}
                        <div className="flex justify-center">
                            <div className="relative h-[500px] w-full max-w-[520px] overflow-hidden rounded-xl bg-[#15171c] md:h-[600px] lg:h-[650px]">
                                <Image
                                    src={workout.image}
                                    alt={workout.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* =========================
                            RIGHT - WORKOUT DETAILS
                        ========================== */}
                        <div className="w-full max-w-[600px]">

                            {/* Title */}
                            <h1 className="font-oswald text-4xl font-semibold uppercase leading-none text-white md:text-5xl xl:text-6xl">
                                {workout.name}
                            </h1>

                            {/* Description */}
                            <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-400">
                                {workout.description}
                            </p>

                            {/* Muscle Groups */}
                            <div className="mt-5 flex flex-wrap gap-2">
                                {workout.muscleGroups.map((group) => (
                                    <span
                                        key={group}
                                        className="rounded-full bg-[#ccff00] px-4 py-1.5 text-xs font-bold uppercase text-black"
                                    >
                                        {group}
                                    </span>
                                ))}
                            </div>

                            {/* =========================
                                WORKOUT SPECS
                            ========================== */}
                            <div className="mt-8 overflow-hidden rounded-xl border border-zinc-800 bg-[#15171c]">

                                {/* Equipment */}
                                <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                                    <span className="text-base text-zinc-500">
                                        EQUIPMENT
                                    </span>

                                    <span className="text-lg text-white">
                                        {workout.equipment}
                                    </span>
                                </div>

                                {/* Difficulty */}
                                <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                                    <span className="text-base text-zinc-500">
                                        DIFFICULTY
                                    </span>

                                    <span className="text-lg text-white">
                                        {workout.difficulty}
                                    </span>
                                </div>

                                {/* Sets */}
                                <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                                    <span className="text-base text-zinc-500">
                                        SETS
                                    </span>

                                    <span className="text-lg text-white">
                                        {workout.sets}
                                    </span>
                                </div>

                                {/* Reps */}
                                <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                                    <span className="text-base text-zinc-500">
                                        REPS
                                    </span>

                                    <span className="text-lg text-white">
                                        {workout.reps}
                                    </span>
                                </div>

                                {/* Duration */}
                                <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                                    <span className="text-base text-zinc-500">
                                        DURATION
                                    </span>

                                    <span className="text-lg text-white">
                                        {workout.duration} min
                                    </span>
                                </div>

                                {/* Calories */}
                                <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                                    <span className="text-base text-zinc-500">
                                        CALORIES
                                    </span>

                                    <span className="text-lg text-white">
                                        {workout.caloriesBurned} kcal
                                    </span>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center justify-between px-5 py-4">
                                    <span className="text-base text-zinc-500">
                                        RATING
                                    </span>

                                    <span className="text-lg text-white">
                                        {workout.rating}
                                    </span>
                                </div>
                            </div>

                            {/* =========================
                                INSTRUCTIONS
                            ========================== */}
                            <div className="mt-8">

                                <h2 className="font-oswald text-xl font-semibold uppercase text-white md:text-2xl">
                                    INSTRUCTIONS
                                </h2>

                                <ol className="mt-5 space-y-4">
                                    {workout.instructions.map(
                                        (instruction, index) => (
                                            <li
                                                key={instruction}
                                                className="flex gap-4 text-lg leading-8 text-zinc-400"
                                            >
                                                <span className="font-medium text-zinc-500">
                                                    {index + 1}.
                                                </span>

                                                <span>
                                                    {instruction}
                                                </span>
                                            </li>
                                        )
                                    )}
                                </ol>
                            </div>

                            {/* =========================
                                ADD / SAVE BUTTONS
                            ========================== */}
                            <WorkoutActions workout={workout} />

                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default WorkoutDetailsPage;