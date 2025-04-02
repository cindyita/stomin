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
        >
            <Head title="Dashboard" />
                
            <div className="breadcrumb w-100">home/</div>

            <div className="content">        
                <Folder color="pink">Carpeta 1</Folder>
                <Folder color="green" typeShare='open'>Carpeta 2</Folder>
                <Folder color="blue" favorite={true}>Carpeta 3 de prueba</Folder>
                <File color="pink">Archivo 1</File>
                <File color="blue" type="jpg">Archivo 2</File>
                <File color="green" type="jpg" typeShare='private'>Archivo 3</File>
                <File color="blue" type="jpg">Archivo 4</File>
                <File color="blue" type="jpg">Archivo 5</File>
                <File color="blue" type="jpg">Archivo 6</File>
            </div>
        
        </MainLayout>

            { /* Modales */}
            <Modal id="info-card" title="info Card">info</Modal>
        </>
    );
}
