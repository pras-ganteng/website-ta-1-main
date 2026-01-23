'use client';

import Header from '@/components/Header';
import PageTransition from '@/components/PageTransition';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="min-h-screen"
            style={{
                background: 'linear-gradient(131.02deg,#8CCAFF -60.88%,#ACD9FF -22.65%,#FFFFFF 75.95%)',
            }}
        >
            <Header />
            <PageTransition>
                {children}
            </PageTransition>
        </div>
    );
}
