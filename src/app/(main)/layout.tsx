import Navbar from '@/components/Navbar';
import styles from './layout.module.css';

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={styles.container}>
            <main className={styles.content}>{children}</main>
            <Navbar />
        </div>
    );
}
