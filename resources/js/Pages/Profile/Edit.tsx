import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import MainLayout from '@/Layouts/MainLayout';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <MainLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Profile
                </h2>
            }
            sidebar={false}
            createBtns={false}
            homeBtn={true}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="">
                    <div className="pb-5">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="pb-5">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="pb-5">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
