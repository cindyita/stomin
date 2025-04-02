import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({
    auth
}: PageProps) {
    // const handleImageError = () => {
    //     document
    //         .getElementById('screenshot-container')
    //         ?.classList.add('!hidden');
    //     document.getElementById('docs-card')?.classList.add('!row-span-1');
    //     document
    //         .getElementById('docs-card-content')
    //         ?.classList.add('!flex-row');
    //     document.getElementById('background')?.classList.add('!hidden');
    // };

    return (
        <>
            <Head title="Welcome" />
            <div className="">

                            <nav className="">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className=""
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
            </div>
        </>
    );
}
