'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);
    const prevPathRef = useRef(pathname);

    useEffect(() => {
        if (prevPathRef.current !== pathname) {
            // Use setTimeout to avoid synchronous setState in effect
            setTimeout(() => {
                setIsVisible(false);
            }, 0);
            const timeout = setTimeout(() => {
                setIsVisible(true);
                prevPathRef.current = pathname;
            }, 150);
            return () => clearTimeout(timeout);
        }
    }, [pathname]);

    return (
        <div
            className={`transition-all duration-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
        >
            {children}
        </div>
    );
}
