// REACT AND INERTIA
import { useEffect, useState } from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import { Button, Collapse, Spinner } from 'react-bootstrap';
// AXIOS
import axios from "axios";
// ICONS
import { FaMagnifyingGlass, FaRectangleList } from 'react-icons/fa6';
// LAYOUTS
import MainLayout from '@/Layouts/MainLayout';
// COMPONENTS
import Alert from '@/Components/Alert';
import ModalBox from '@/Components/ModalBox';
import Folder from '@/Components/Folder';
import File from '@/Components/File';
import UploadFilesModal from '@/Components/UploadFilesModal';
import UploadFolderModal from '@/Components/UploadFolderModal';
import InfoCardModal from '@/Components/InfoCardModal';
import { RiGalleryView2, RiTableView } from 'react-icons/ri';
import ViewCardModal from '@/Components/ViewCardModal';
import DeleteElementModal from '@/Components/DeleteElementModal';
import EditFolderModal from '@/Components/EditFolderModal';
import EditFileModal from '@/Components/EditFileModal';

export default function DashboardContent({ alert = '' }: any) {
    
    // ACTUAL URL FOLDER
    const routeFolder: any = usePage().props.routeFolder ?? ['home'];
    const allFoldersPath = ["home", ...routeFolder];
    let actualFolderPath = allFoldersPath.length > 1 ? allFoldersPath.join('/') + '/' : 'home/';

    // DATA USER AND ACCOUNT
    const user = usePage().props.user ?? { name: '?', email: '' };
    const dataAccount = usePage().props.dataAccount ?? { account_type: { total_storage: 0, max_size_files:0 } };
    const dataTypeAccount: any = dataAccount.account_type;
    const maxSizeFiles: number = dataTypeAccount.max_size_files;
    const typeFiles: string[] = usePage().props.typeFiles ?? [];
    const levelFiles = dataTypeAccount['max_level_files'];

    // MODE VIEW
    const actualModeView = localStorage.getItem('mode-view') || 'mode-view-box';
    const [modeView, setModeView] = useState<string>(actualModeView);
    let iconModeView = actualModeView == 'mode-view-box' ? <RiTableView /> : <RiGalleryView2 /> ;

    const changeModeView = () => {
        if (modeView == 'mode-view-box') {
            setModeView('mode-view-list');
            localStorage.setItem('mode-view', 'mode-view-list');
            iconModeView = <RiGalleryView2 />;
        } else if (modeView == 'mode-view-list') {
            setModeView('mode-view-box');
            localStorage.setItem('mode-view', 'mode-view-box');
            iconModeView = <RiTableView />;
        }
    }

    // ALERTS
    const [alerts, setAlerts] = useState<JSX.Element[]>([]);

    const showAlert = (message: string, title:string = '',type:string = 'danger') => {
        const id = Date.now();
        const alertElement = (
            <Alert key={id} title={title} type={type} duration={3000}>
                {message}
            </Alert>
        );

        setAlerts(prev => [...prev, alertElement]);

        setTimeout(() => {
            setAlerts(prev => prev.filter(a => a.key !== id.toString()));
        }, 5000);
    }

    // GET FOLDERS AND FILES IN THE URL
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);

    // GET AND SHOW DATA (FOLDERS AND FILES)
    const [loading, setLoading] = useState(false);

    const fetchData = () => {
        console.log('Cargando información');
        
        setLoading(true);

        const folderRequest = axios.get('/getfoldersuser', {
            params: { url: actualFolderPath }
        });

        const fileRequest = axios.get('/getfilesuser', {
            params: { url: actualFolderPath }
        });

        Promise.all([folderRequest, fileRequest])
            .then(([foldersResponse, filesResponse]) => {
                setFolders(foldersResponse.data);
                setFiles(filesResponse.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [actualFolderPath]);

    // SEARCH DATA (FOLDERS AND FILE, FILTER)
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredFolders, setFilteredFolders] = useState<any[]>([]);
    const [filteredFiles, setFilteredFiles] = useState<any[]>([]);
    const [searchCollapse, setSearchCollapse] = useState(false);

    useEffect(() => {
        if (searchTerm === "") {
            setFilteredFolders(folders);
            setFilteredFiles(files);
            return;
        }

        const filteredF = folders.filter((folder: any) =>
            folder.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const filteredFileList = files.filter((file: any) =>
            file.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredFolders(filteredF);
        setFilteredFiles(filteredFileList);
    }, [searchTerm, folders, files]);


    return (
        <>
            <MainLayout
                header={
                    <h2 className="title">
                        Dashboard
                    </h2>
                }
                    sidebar={true}
                    createBtns={true}
                >
                    
                <div className="alert-zone">
                    {alerts}
                </div>    
                    
                <Head title="Dashboard" />
                <div className="d-flex justify-content-between flex-column flex-md-row gap-1 mb-3">
                    <div className="breadcrumb w-100">
                        {allFoldersPath.map((folder:string, index:number) => {
                            const path = allFoldersPath.slice(0, index + 1).join('/');
                            return (
                                <Link key={path} href={`/`+path} className="pathUrl">
                                    {folder}/
                                </Link>
                            );
                        })}
                    </div>
                    <div className="d-flex gap-2 align-items-end">
                        <span className="d-flex gap-2 align-items-start">
                            <div className="mt-1"><Button className="btn-search"
                                onClick={() => setSearchCollapse(!searchCollapse)}
                                aria-controls="example-collapse-text"
                                aria-expanded={searchCollapse}
                            ><FaMagnifyingGlass /></Button></div>
                            <Collapse in={searchCollapse} dimension="width">
                                <div id="example-collapse-text"><div className="content-input-collapse"><input type="text" className="form-control" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div></div>
                            </Collapse>
                        </span>
                        <span>
                            <button className="mt-1 btn btn-search" onClick={changeModeView}>
                                {iconModeView}
                            </button>
                        </span>
                    </div>
                </div>

                {/** CONTENT FOLDERS AND FILES */}
                <div className={`content ${modeView}`}>
                    {loading && <Spinner animation="border" role="status" size="sm">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}

                    {!loading && (
                        <>
                            
                            {/* FOLDERS */}
                            {(searchTerm === "" ? folders : filteredFolders).length > 0 ? (
                                (searchTerm === "" ? folders : filteredFolders).map((folder:any, i:number) => (
                                    <Folder key={i} id={folder.id || 0} color={folder.color || ''} favorite={folder.favorite || 0} typeShare={folder.type_share || ''} href={`/` + folder.location + folder.name}>
                                        {folder.name || ''}
                                    </Folder>
                                ))
                            ) : (
                                null
                            )}

                            {/* FILES */}
                            {(searchTerm === "" ? files : filteredFiles).length > 0 ? (
                                (searchTerm === "" ? files : filteredFiles).map((f, i) => (
                                    <File key={i} id={f.id || 0}  color={f.color || ''} favorite={f.favorite || 0} typeShare={f.type_share || ''} href={`/` + f.location + f.name} typeMime={f.type_mime || ''}>
                                        {f.name || ''}
                                    </File>
                                ))
                            ) : (
                                null
                            )}
                        </>
                    )}

                </div>
            
            </MainLayout>

            { /* Modales */}
            <ViewCardModal showAlert={showAlert} />
            <InfoCardModal showAlert={showAlert} />
            <DeleteElementModal showAlert={showAlert} fetchData={fetchData} />
            <EditFolderModal showAlert={showAlert} fetchData={fetchData} />
            <EditFileModal showAlert={showAlert} fetchData={fetchData} />

            <UploadFolderModal actualFolderPath={actualFolderPath} showAlert={showAlert} fetchData={fetchData} />

            <UploadFilesModal actualFolderPath={actualFolderPath} maxSizeFiles={maxSizeFiles} typeFiles={typeFiles} levelFiles={levelFiles} showAlert={showAlert} fetchData={fetchData} />

        </>
    );
}
