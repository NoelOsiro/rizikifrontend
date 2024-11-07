import React from 'react'
import { Header } from '@/components/Header/index';
import { Sidebar } from '@/components/Sidebar/index';

type Props = {}

const DefaultLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
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