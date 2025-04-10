import { PropsWithChildren, ReactNode, useState } from 'react';
import { Link } from '@inertiajs/react';

import ApplicationLogo from '@/Components/ApplicationLogo';

export default function ViewLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {

    return (
        <>
            <div className="layout flex-column w-100">
                <div className="layout-flex flex w-100 h-100">

                    <div className="layout-content">
                        
                        <div className="upbar">
                            <div>
                                <div className="logo">
                                    <Link href="/">
                                        <ApplicationLogo />
                                    </Link>
                                </div>
                            </div>
                            <div className="align-center gap-12">
                                <h5>{header}</h5>
                            </div>
                        </div>

                        <main className="main2">
                            <div className="box min-100">
                                {children}
                            </div>
                        </main>
                    </div>

                </div>
                
            </div>
        </>
    );
}
