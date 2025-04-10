import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Guest({ children }: PropsWithChildren) {
    
    return (
        <div className="content-login p-5 d-flex flex-column gap-4 w-100 h-100 align-center justify-center">
            <div>
                <Link href="/">
                    <ApplicationLogo />
                </Link>
            </div>

            <div className="d-flex gap-2">
                {children}
            </div>
        </div>
    );
}
