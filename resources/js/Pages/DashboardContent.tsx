import Folder from '@/Components/Folder';
import File from '@/Components/File';
import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage,router, Link } from '@inertiajs/react';
import ModalBox from '@/Components/ModalBox';
import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from 'react';
import { FaXmark, FaFile, FaFolderClosed, FaMagnifyingGlass } from 'react-icons/fa6';

import Alert from '@/Components/Alert';

import axios from "axios";
import { Button, Collapse, Spinner } from 'react-bootstrap';

export default function DashboardContent({ alert = '' }: any) {
    
    const routeFolder: any = usePage().props.routeFolder ?? ['home'];

    const [alerts, setAlerts] = useState<JSX.Element[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const allFoldersPath = ["home", ...routeFolder];
    let actualFolderPath = allFoldersPath.length > 1 ? allFoldersPath.join('/') + '/' : 'home/';

    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);

    const user = usePage().props.user ?? { name: '?', email: '' };
    const dataAccount = usePage().props.dataAccount ?? { account_type: { total_storage: 0, max_size_files:0 } };
    const dataTypeAccount: any = dataAccount.account_type;
    const maxSizeFiles: number = dataTypeAccount.max_size_files;
    const typeFiles: string[] = usePage().props.typeFiles ?? [];
    
    const [file, setFile] = useState<File[] | null>(null);
    const [fileNames, setFileNames] = useState([] as string[]);
    const [previews, setPreviews] = useState<string[]>([]);

    const [previewFolderColor, setpreviewFolderColor] = useState<string>("");

    const handleFileChange = (newFiles: any) => {
        if (newFiles.length > 0) {
            setFileNames([]);
            const newFileNames = [...fileNames];
            for (let i = 0; i < newFiles.length; i++) {
                newFileNames.push(newFiles[i].name);
            }
            setFileNames(newFileNames);
        }

        const selectedFiles = Array.from(newFiles);
        const previewUrls = selectedFiles.map((f: any) =>
            URL.createObjectURL(f)
        );

        setFile(prevFiles => [...(prevFiles || []), ...(selectedFiles as File[])]);
        setPreviews(prevPreviews => [...prevPreviews, ...previewUrls]);
    };

    const handleRemoveFile = (index: number) => {
        const updatedFiles = [...(file || [])];
        const updatedPreviews = [...previews];
        const updatedFileNames = [...fileNames];

        updatedFiles.splice(index, 1);
        updatedPreviews.splice(index, 1);
        updatedFileNames.splice(index, 1);

        setFile(updatedFiles);
        setPreviews(updatedPreviews);
        setFileNames(updatedFileNames);
    };

    const handleFolderColor = (color: string) => {
        if (color == "default") {
            setpreviewFolderColor("white");
        }
        setpreviewFolderColor(color);
    };

    const isImageFile = (fileName: string) => {
        const fileExtension = fileName.split('.').pop()?.toLowerCase();
        return ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension || '');
    };

    const levelFiles = dataTypeAccount['max_level_files'];

    const [newFolder, setNewFolder] = useState({
        name: '',
        location: actualFolderPath,
        color: '',
    })

    const [newFile, setNewFile] = useState({
        location: actualFolderPath,
        color: '',
        files:file,
    })

    function createFolder(e:any) {
        e.preventDefault();
        const newErrors: { [key: string]: string } = {};
        
        if (newFolder.name === '') {
            newErrors.name = 'Folder name is required';
            showAlert("Folder name is required");
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return false;
        }
        setErrors({});

        router.post('/storefolder', newFolder);
        
        fetchData();

        setNewFolder({
            name: '',
            location: actualFolderPath,
            color: '',
        });
        
    }

    function createFile(e:any) {
        e.preventDefault();
        const newErrors: { [key: string]: string } = {};
        
        if (!file) {
            newErrors.file = 'File is required';
            showAlert("File is required");
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return false;
        }
        setErrors({});

        const formData = {
            location: newFile.location,
            color: newFile.color,
            files: file
        }

        router.post('/storefile', formData);
        
        fetchData();
        
        setNewFile({
            location: actualFolderPath,
            color: '',
            files: null
        });
        
    }

    function showAlert(message: string, title:string = '',type:string = 'danger') {
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

    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredFolders, setFilteredFolders] = useState<any[]>([]);
    const [filteredFiles, setFilteredFiles] = useState<any[]>([]);
    const [searchCollapse, setSearchCollapse] = useState(false);

    // useEffect(() => {
    //     if (alert?.message && alert.typeAlert) {
    //         showAlert(alert.message, '', alert.typeAlert);
    //     }
    // }, [alert]);

    // const fetchFolders = () => {
    //     setFoldersLoading(true);
    //     axios.get('/getfoldersuser', {
    //         params: { url: actualFolderPath }
    //     })
    //     .then((response) => {
    //         setFolders(response.data);
    //         setFoldersLoading(false);
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //         setFoldersLoading(false);
    //     });
    // };

    // useEffect(() => {
    //     fetchFolders();
    // }, [actualFolderPath]);

    // const fetchFiles = () => {
    //     setFilesLoading(true);
    //     axios.get('/getfilesuser', {
    //         params: { url: actualFolderPath }
    //     })
    //         .then((response) => {
    //         setFiles(response.data);
    //         setFilesLoading(false);
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //         setFilesLoading(false);
    //     });
    // };

    // useEffect(() => {
    //     fetchFiles();
    // }, [actualFolderPath]);

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

    // useEffect(() => {
    //     if(searchTerm === "") {
    //         setFilteredFolders(folders);
    //         return;
    //     }
    //     const filtered = folders.filter((folder: any) =>
    //         folder.name.toLowerCase().includes(searchTerm.toLowerCase()));
    //     setFilteredFolders(filtered);
    // }, [searchTerm]);

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
                    <div className="d-flex gap-2 align-items-start">
                        <div className="mt-1"><Button className="btn-search"
                            onClick={() => setSearchCollapse(!searchCollapse)}
                            aria-controls="example-collapse-text"
                            aria-expanded={searchCollapse}
                        ><FaMagnifyingGlass /></Button></div>
                        <Collapse in={searchCollapse} dimension="width">
                            <div id="example-collapse-text"><div className="content-input-collapse"><input type="text" className="form-control" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div></div>
                        </Collapse>
                    </div>
                </div>

                <div className="content">
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

                    {/* <Folder color="pink">Folder 1</Folder>
                    <Folder color="green" typeShare='open'>Folder 2</Folder>
                    <Folder color="blue" favorite={true}>Folder 3 test test</Folder>
                    <File color="pink">File 1</File>
                    <File color="blue" type="jpg">File 2</File>
                    <File color="green" type="jpg" typeShare='private'>File 3</File>
                    <File color="blue" type="jpg">File 4</File>
                    <File color="blue" type="jpg">File 5</File>
                    <File color="blue" type="jpg">File 6</File> */}
                </div>
            
            </MainLayout>

            { /* Modales */}
            
            <ModalBox id="info-card" title="info Card" saveBtn="">Info file</ModalBox>
                <ModalBox id="create-folder" title="Create folder" saveBtn="Create" onSave={createFolder}>
                <div>
                    <div className='icon-folder'>
                        <FaFolderClosed style={{ color: `var(--${previewFolderColor})` }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Folder name:</label>
                        <input type="text" name="name" className={`form-control ${errors.name ? 'border-danger' : ''}`} value={newFolder.name} onChange={(e) => setNewFolder({ ...newFolder, name: e.target.value })} /></div>
                    <div className="mb-3">
                        <label htmlFor="url" className="form-label">Url:</label>
                        <input type="text" name="location" className={`form-control ${errors.location ? 'border-danger' : ''}`} value={newFolder.location} onChange={(e) => setNewFolder({ ...newFolder, location: e.target.value })} /></div>
                    <div className="mb-3">
                        <label htmlFor="color" className="form-label">Color:</label>
                            <select name="color" className={`form-select`} value={newFolder.color} onChange={(e) => { setNewFolder({ ...newFolder, color: e.target.value }); handleFolderColor(e.target.value) }}>
                                <option value="default">default</option>
                                <option value="primary">Primary</option>
                                <option value="secondary">Secondary</option>
                                <option value="yellow">Yellow</option>
                                <option value="accent">Accent</option>
                            </select>
                    </div>
                </div>
            </ModalBox>

            <ModalBox id="upload-file" title="Upload file" onSave={createFile}>
                <p>Uploading files in: <input type="text" name="location" className={`form-control ${errors.location ? 'border-danger' : ''}`} value={newFile.location} onChange={(e) => setNewFile({ ...newFile, location: e.target.value })} /></p>
                <div className="mb-3">
                    <label htmlFor="color" className="form-label">Color:</label>
                        <select name="color" className={`form-select`} value={newFile.color} onChange={(e) => { setNewFile({ ...newFile, color: e.target.value });}}>
                            <option value="default">default</option>
                            <option value="primary">Primary</option>
                            <option value="secondary">Secondary</option>
                            <option value="yellow">Yellow</option>
                            <option value="accent">Accent</option>
                        </select>
                </div>
                <p className="text-muted">{`You can upload files of maximum level ${levelFiles}`}</p>
                <div>
                    <FileUploader
                        multiple={true}
                        handleChange={handleFileChange}
                        name="files"
                        types={typeFiles}
                        uploadedLabel={file ? `${fileNames.join(", ")}` : "Uploaded Successfully"}
                        maxSize={maxSizeFiles}
                        onSizeError={(file: any) => showAlert(`File size is too big`)}
                        classes="file-uploader"
                    />
                    <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
                        {previews.map((src, index) => (
                            <div key={index} style={{ position: 'relative' }}>
                                {isImageFile(fileNames[index]) ? (
                                    <img
                                        src={src}
                                        alt={`Preview ${index}`}
                                        style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "5px", border: "1px solid var(--primary)" }}
                                    />
                                ) : (<>
                                    <span className="preview-doc"><FaFile style={{ fontSize: "30px", color: "var(--primary)" }} />{fileNames[index]}</span></>
                                )}
                                <button
                                    onClick={() => handleRemoveFile(index)}
                                    className="btn-x"
                                >
                                    <FaXmark />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                </ModalBox>
        </>
    );
}
