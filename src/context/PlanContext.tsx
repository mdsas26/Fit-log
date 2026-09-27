"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { toast } from "react-toastify";
import { Workout } from "@/types/workout";

type PlanContextType = {
    plan: Workout[];
    saved: Workout[];
    completed: number[];

    addToPlan: (workout: Workout) => void;
    removeFromPlan: (id: number) => void;

    saveWorkout: (workout: Workout) => void;
    removeSaved: (id: number) => void;

    markAsDone: (id: number) => void;

    isInPlan: (id: number) => boolean;
    isSaved: (id: number) => boolean;
    isCompleted: (id: number) => boolean;
};

const PlanContext = createContext<PlanContextType | undefined>(
    undefined
);

export const PlanProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [plan, setPlan] = useState<Workout[]>([]);
    const [saved, setSaved] = useState<Workout[]>([]);
    const [completed, setCompleted] = useState<number[]>([]);

    const [hydrated, setHydrated] = useState(false);

    // =========================
    // LOAD DATA FROM LOCAL STORAGE
    // =========================

    useEffect(() => {
        try {
            const storedPlan =
                localStorage.getItem("fitlog-plan");

            const storedSaved =
                localStorage.getItem("fitlog-saved");

            const storedCompleted =
                localStorage.getItem("fitlog-completed");

            if (storedPlan) {
                setPlan(JSON.parse(storedPlan));
            }

            if (storedSaved) {
                setSaved(JSON.parse(storedSaved));
            }

            if (storedCompleted) {
                setCompleted(JSON.parse(storedCompleted));
            }
        } catch (error) {
            console.error(
                "Failed to load FitLog data:",
                error
            );
        } finally {
            setHydrated(true);
        }
    }, []);

    // =========================
    // SAVE PLAN
    // =========================

    useEffect(() => {
        if (!hydrated) return;

        localStorage.setItem(
            "fitlog-plan",
            JSON.stringify(plan)
        );
    }, [plan, hydrated]);

    // =========================
    // SAVE SAVED WORKOUTS
    // =========================

    useEffect(() => {
        if (!hydrated) return;

        localStorage.setItem(
            "fitlog-saved",
            JSON.stringify(saved)
        );
    }, [saved, hydrated]);

    // =========================
    // SAVE COMPLETED WORKOUTS
    // =========================

    useEffect(() => {
        if (!hydrated) return;

        localStorage.setItem(
            "fitlog-completed",
            JSON.stringify(completed)
        );
    }, [completed, hydrated]);

    // =========================
    // ADD TO PLAN
    // =========================

    const addToPlan = (workout: Workout) => {
        if (!hydrated) {
            return;
        }

        const alreadyExists = plan.some(
            (item) => item.id === workout.id
        );

        if (alreadyExists) {
            toast.info(
                "Workout is already in today's plan"
            );
            return;
        }

        if (plan.length >= 5) {
            toast.error(
                "Today's plan is limited to 5 workouts"
            );
            return;
        }

        setPlan((currentPlan) => [
            ...currentPlan,
            workout,
        ]);

        toast.success(
            "Added to today's plan"
        );
    };

    // =========================
    // REMOVE FROM PLAN
    // =========================

    const removeFromPlan = (id: number) => {
        setPlan((currentPlan) =>
            currentPlan.filter(
                (workout) => workout.id !== id
            )
        );

        setCompleted((currentCompleted) =>
            currentCompleted.filter(
                (completedId) =>
                    completedId !== id
            )
        );

        toast.success(
            "Workout removed from today's plan"
        );
    };

    // =========================
    // SAVE WORKOUT
    // =========================

    const saveWorkout = (workout: Workout) => {
        if (!hydrated) {
            return;
        }

        const alreadyExists = saved.some(
            (item) => item.id === workout.id
        );

        if (alreadyExists) {
            toast.info(
                "Workout is already saved"
            );
            return;
        }

        setSaved((currentSaved) => [
            ...currentSaved,
            workout,
        ]);

        toast.success("Workout saved");
    };

    // =========================
    // REMOVE SAVED WORKOUT
    // =========================

    const removeSaved = (id: number) => {
        setSaved((currentSaved) =>
            currentSaved.filter(
                (workout) => workout.id !== id
            )
        );

        toast.success(
            "Workout removed from saved"
        );
    };

    // =========================
    // MARK AS DONE
    // =========================

    const markAsDone = (id: number) => {
        if (completed.includes(id)) {
            return;
        }

        setCompleted((currentCompleted) => [
            ...currentCompleted,
            id,
        ]);

        toast.success(
            "Workout completed!"
        );
    };

    // =========================
    // CHECK IF IN PLAN
    // =========================

    const isInPlan = (id: number) => {
        return plan.some(
            (workout) => workout.id === id
        );
    };

    // =========================
    // CHECK IF SAVED
    // =========================

    const isSaved = (id: number) => {
        return saved.some(
            (workout) => workout.id === id
        );
    };

    // =========================
    // CHECK IF COMPLETED
    // =========================

    const isCompleted = (id: number) => {
        return completed.includes(id);
    };

    return (
        <PlanContext.Provider
            value={{
                plan,
                saved,
                completed,

                addToPlan,
                removeFromPlan,

                saveWorkout,
                removeSaved,

                markAsDone,

                isInPlan,
                isSaved,
                isCompleted,
            }}
        >
            {children}
        </PlanContext.Provider>
    );
};

// =========================
// CUSTOM HOOK
// =========================

export const usePlan = () => {
    const context = useContext(PlanContext);

    if (!context) {
        throw new Error(
            "usePlan must be used inside PlanProvider"
        );
    }

    return context;
};