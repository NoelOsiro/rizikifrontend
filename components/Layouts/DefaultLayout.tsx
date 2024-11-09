import React from 'react'
import { Header } from '@/components/Header/index';
import { Sidebar } from '@/components/Sidebar/index';
import { auth } from "@/auth"
import { redirect } from 'next/navigation';

type Props = {}

const DefaultLayout = async ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const session = await auth();
    if (!session) {
        redirect("/login");
    }
    return (
        <div className="flex h-screen bg-background">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                {children}
            </div>
        </div>
    )
}

export default DefaultLayout