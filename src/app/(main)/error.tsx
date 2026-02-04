"use client";

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Something went wrong!</h1>
            <p className="text-red-500">{error.message}</p>
            <div className="mt-4">
                <button
                    className="mt-4 px-4 py-2 bg-primary text-white rounded-lg cursor-pointer"
                    onClick={() => reset()}
                >
                    Try again
                </button>
            </div>
        </div>
    );
}