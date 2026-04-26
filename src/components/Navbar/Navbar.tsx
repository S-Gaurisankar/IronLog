'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HubIcon, LogIcon, CreateIcon, ProfileIcon } from 'src/assets';
import { NAVBAR_CONSTANTS } from 'src/constants';
import styles from './Navbar.module.css';

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
    // { label: NAVBAR_CONSTANTS.HUB, href: NAVBAR_CONSTANTS.HUB_HREF, icon: <HubIcon /> },
    { label: NAVBAR_CONSTANTS.LOG, href: NAVBAR_CONSTANTS.LOG_HREF, icon: <LogIcon /> },
    { label: NAVBAR_CONSTANTS.CREATE, href: NAVBAR_CONSTANTS.CREATE_HREF, icon: <CreateIcon /> },
    { label: NAVBAR_CONSTANTS.PROFILE, href: NAVBAR_CONSTANTS.PROFILE_HREF, icon: <ProfileIcon /> },
];

const renderNavItem = (item: NavItem, isActive: boolean) => (
    <Link
        key={item.href}
        href={item.href}
        className={`${styles.navItem} ${isActive ? styles.active : ''}`}
        aria-current={isActive ? 'page' : undefined}
    >
        <span className={styles.iconWrapper}>{item.icon}</span>
        <span className={styles.label}>{item.label.toUpperCase()}</span>
    </Link>
);

const renderNavItems = (pathname: string) =>
    NAV_ITEMS.map((item) => renderNavItem(item, pathname === item.href));

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className={styles.navbar} aria-label="Main navigation">
            {renderNavItems(pathname)}
        </nav>
    );
}
