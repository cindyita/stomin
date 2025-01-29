import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { IoDocumentSharp, IoFileTraySharp, IoFolder, IoFolderSharp, IoFunnel, IoHeart, IoSettings, IoStar, IoTrash } from 'react-icons/io5';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="layout flex-column w-100 h-100">
            <div className="layout-flex flex w-100 h-100">
                
                <div className="sidebar">
                    <div className="nav">
                        <nav>
                            <a><IoFileTraySharp /></a>
                            <a><IoStar /></a>
                            <a><IoFolder /></a>
                            <a><IoDocumentSharp /></a>
                            <a><IoTrash /></a>
                            <a><IoSettings /></a>
                        </nav>
                    </div>
                </div>

                <div className="layout-content">
                    
                    <div className="upbar">
                        <div>
                            <div className="logo">
                                <Link href="/dashboard">
                                    <ApplicationLogo />
                                </Link>
                            </div>
                        </div>
                        <div className="align-center gap-15">
                            <span className="btn">150mb/100GB</span>
                            <span className="btn"><IoFunnel /></span>
                            <span className="btn">Hola, {user.name}</span>
                        </div>
                    </div>

                    <main className="main">
                        <div className="box h-100">
                            {children}
                        </div>
                    </main>
                </div>

            </div>
        </div>
    );
}
