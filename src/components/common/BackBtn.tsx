'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BackBtnProps {
    text?: string;
}   

export default function BackBtn({text = 'Go back'}: BackBtnProps) {
    const router = useRouter();
    return (
        <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors mb-8 group cursor-pointer"
        >
            <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">{text}</span>
        </button>
    );
}