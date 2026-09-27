import Link from "next/link";

const NotFound = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#0b0c0f] px-5 text-white">
            <section className="text-center">

                <p className="font-oswald text-8xl font-bold text-[#ccff00]">
                    404
                </p>

                <h1 className="mt-4 font-oswald text-3xl font-semibold uppercase">
                    Workout Not Found
                </h1>

                <p className="mx-auto mt-3 max-w-md text-base leading-7 text-zinc-400">
                    The workout or page you are looking for
                    does not exist.
                </p>

                <Link
                    href="/"
                    className="mt-7 inline-block rounded-md bg-[#ccff00] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#b8e600]"
                >
                    BACK TO HOME
                </Link>

            </section>
        </main>
    );
};

export default NotFound;