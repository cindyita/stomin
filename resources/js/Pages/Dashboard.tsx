import Folder from '@/Components/Folder';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <MainLayout
            header={
                <h2 className="title">
                    Dashboard3
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="content">
                <Folder type="pink">Carpeta 1</Folder>
                <Folder type="green">Carpeta 2</Folder>
                <Folder type="blue">Carpeta 3</Folder>
            </div>
        </MainLayout>
    );
}
