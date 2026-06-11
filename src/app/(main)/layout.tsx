'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import styles from './layout.module.css';

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.replace('/login');
        }
    }, [router]);

    // Don't render protected content until we've verified the token exists.
    // This runs synchronously on the client so the flash is imperceptible.
    if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
        return null;
    }

    return (
        <div className={styles.container}>
            <main className={styles.content}>{children}</main>
            <Navbar />
        </div>
    );
}
