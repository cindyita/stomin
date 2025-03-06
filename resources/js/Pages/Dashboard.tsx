import Folder from '@/Components/Folder';
import File from '@/Components/File';
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
                <Folder color="pink">Carpeta 1</Folder>
                <Folder color="green">Carpeta 2</Folder>
                <Folder color="blue">Carpeta 3 asd asdfdg dfg ert ertert</Folder>
                <File color="pink">Archivo 1</File>
                <File color="blue" type="jpg">Archivo 1</File>
            </div>
        </MainLayout>
    );
}
