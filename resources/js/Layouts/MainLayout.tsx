import ApplicationLogo from '@/Components/ApplicationLogo';
import OpenModal from '@/Components/OpenModal';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { FaFileArrowUp } from 'react-icons/fa6';
import { GrStorage } from 'react-icons/gr';
import { IoDocumentSharp, IoFileTraySharp, IoFolder, IoFunnel, IoLogOut, IoSettings, IoStar, IoTrash } from 'react-icons/io5';
import { MdCreateNewFolder } from 'react-icons/md';
import { RiDashboard3Fill } from 'react-icons/ri';

export default function Authenticated({
    header,
    sidebar = true,
    createBtns = true,
    homeBtn = false,
    children,
}: PropsWithChildren<{ header?: ReactNode,sidebar?:boolean,createBtns?:boolean,homeBtn?:boolean }>) {

    const user = usePage().props.user ?? {name:'?', email: ''};
    const dataAccount = usePage().props.dataAccount ?? { account_type: { total_storage: 0 } };
    
    const dataTypeAccount = dataAccount.account_type;
    const total_storage = (dataTypeAccount.total_storage / 1000); // Convert to GB
    const storage_usage = 2000;
    const percentage_usage = (storage_usage / dataTypeAccount.total_storage) * 100;
    
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <>
            <div className="layout flex-column w-100">
                <div className="layout-flex flex w-100 h-100">
                    {sidebar && (
                        <div className="sidebar">
                            <div className="nav">
                                <nav>
                                    <a className="active"><IoFileTraySharp /></a>
                                    <a><IoStar /></a>
                                    <a><IoFolder /></a>
                                    <a><IoDocumentSharp /></a>
                                    <a><IoTrash /></a>
                                    <a><IoSettings /></a>
                                </nav>
                            </div>
                        </div>
                    )}

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
                                {createBtns && (<>
                                    <OpenModal id="create-folder" className="button2"><MdCreateNewFolder /><span className="d-none d-md-flex ps-1">Create folder</span></OpenModal>

                                    <OpenModal id="upload-file" className="button2"><FaFileArrowUp /><span className="d-none d-md-flex ps-1">Upload file</span></OpenModal>
                                </>)}

                                {homeBtn && (<>
                                    <a className="button2" href="/"><RiDashboard3Fill /><span className="d-none d-md-flex ps-1">Dashboard</span></a>
                                </>)}

                                <span className="button" style={{
                                    background: `linear-gradient(to top, var(--secondary) ${percentage_usage}%, var(--fontBox) ${percentage_usage}% 100%)`
                                }}>
                                    <span className="d-flex d-md-none" title={`${storage_usage} MB of ${total_storage} GB used`}><GrStorage /></span><span className="d-none d-md-flex">{storage_usage} MB of {total_storage} GB used</span></span>

                                <span className="button d-none"><IoFunnel /></span>

                                <div className="dropdown">
                                        <span id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" className="options-elipsis">
                                            <span className="button"><FaUser /><span className="ps-1 d-none d-md-flex">Hi, {user.name}</span></span>
                                        </span>
                        
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                            <li><a className="dropdown-item" href="profile"><FaUser /> Profile</a></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><a className="dropdown-item"><Link className="normal-link" method="post"
                                            href={route('logout')}><IoLogOut /> Log out</Link></a></li>
                                        </ul>
                                    </div>
                            </div>
                        </div>

                        <main className="main">
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
