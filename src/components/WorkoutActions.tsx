"use client";

import { Workout } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";

type WorkoutActionsProps = {
    workout: Workout;
};

const WorkoutActions = ({
    workout,
}: WorkoutActionsProps) => {
    const {
        addToPlan,
        saveWorkout,
        isInPlan,
        isSaved,
    } = usePlan();

    const addedToPlan = isInPlan(workout.id);
    const saved = isSaved(workout.id);

    return (
        <div className="mt-8 flex flex-wrap gap-3">
            {/* Add to Plan */}
            <button
                type="button"
                onClick={() => addToPlan(workout)}
                disabled={addedToPlan}
                className={`rounded-md px-6 py-3 text-sm font-bold transition ${addedToPlan
                        ? "cursor-not-allowed bg-zinc-700 text-zinc-400"
                        : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
                    }`}
            >
                {addedToPlan
                    ? "✓ Added to today's plan"
                    : "＋ Add to today's plan"}
            </button>

            {/* Save */}
            <button
                type="button"
                onClick={() => saveWorkout(workout)}
                disabled={saved}
                className={`rounded-md border px-6 py-3 text-sm font-medium transition ${saved
                        ? "cursor-not-allowed border-zinc-700 text-zinc-500"
                        : "border-zinc-700 text-white hover:border-[#ccff00] hover:text-[#ccff00]"
                    }`}
            >
                {saved
                    ? "✓ Saved"
                    : "♧ Save for later"}
            </button>
        </div>
    );
};

export default WorkoutActions;