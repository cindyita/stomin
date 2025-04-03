import Folder from '@/Components/Folder';
import File from '@/Components/File';
//import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import Modal from '@/Components/Modal';

export default function Dashboard() {
    return (
        <>
        <MainLayout
            header={
                <h2 className="title">
                    Dashboard3
                </h2>
            }
                sidebar={true}
                createBtns={true}
        >
            <Head title="Dashboard" />
                
            <div className="breadcrumb w-100">home/</div>

            <div className="content">        
                <Folder color="pink">Folder 1</Folder>
                <Folder color="green" typeShare='open'>Folder 2</Folder>
                <Folder color="blue" favorite={true}>Folder 3 test test</Folder>
                <File color="pink">File 1</File>
                <File color="blue" type="jpg">File 2</File>
                <File color="green" type="jpg" typeShare='private'>File 3</File>
                <File color="blue" type="jpg">File 4</File>
                <File color="blue" type="jpg">File 5</File>
                <File color="blue" type="jpg">File 6</File>
            </div>
        
        </MainLayout>

            { /* Modales */}
            <Modal id="info-card" title="info Card" saveBtn="">info</Modal>
        </>
    );
}
