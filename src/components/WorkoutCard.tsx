import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";

type WorkoutCardProps = {
    workout: Workout;
};

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
    return (
        <Link
            href={`/workouts/${workout.id}`}
            className="group block overflow-hidden rounded-2xl border border-zinc-800 bg-[#181a1f] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]"
        >
            {/* Workout Image */}
            <div className="relative h-72 overflow-hidden bg-[#1b1d22]">
                <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                />
            </div>

            {/* Card Content */}
            <div className="p-7">

                {/* Muscle Groups */}
                <div className="mb-6 flex flex-wrap gap-2">
                    {workout.muscleGroups.map((group) => (
                        <span
                            key={group}
                            className="rounded-full bg-[#ccff00] px-4 py-2 text-sm font-medium text-black"
                        >
                            {group}
                        </span>
                    ))}
                </div>

                {/* Workout Name */}
                <h3 className="font-oswald text-3xl font-semibold uppercase leading-none tracking-wide text-white">
                    {workout.name}
                </h3>

                {/* Equipment */}
                <p className="mt-5 text-lg text-zinc-400">
                    {workout.equipment}
                </p>

                {/* Divider */}
                <div className="my-6 border-t border-zinc-800" />

                {/* Workout Stats */}
                <div className="flex items-center justify-between text-base text-zinc-300">

                    {/* Duration */}
                    <span className="flex items-center gap-2 whitespace-nowrap">
                        <span className="text-lg text-[#ccff00]">
                            ◷
                        </span>
                        <span>
                            {workout.duration} min
                        </span>
                    </span>

                    {/* Calories */}
                    <span className="flex items-center gap-2 whitespace-nowrap">
                        <span className="text-lg text-[#ccff00]">
                            ♨
                        </span>
                        <span>
                            {workout.caloriesBurned} kcal
                        </span>
                    </span>

                    {/* Rating */}
                    <span className="flex items-center gap-2 whitespace-nowrap">
                        <span className="text-lg text-[#ccff00]">
                            ☆
                        </span>
                        <span>
                            {workout.rating}
                        </span>
                    </span>

                </div>
            </div>
        </Link>
    );
};

export default WorkoutCard;