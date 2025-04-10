import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

export default function Welcome({
    auth
}: PageProps) {

    return (
        <>
            <Head title="Welcome" />
            <div className="">

                            {/* <nav className="">
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
                            </nav> */}
            </div>
        </>
    );
}
