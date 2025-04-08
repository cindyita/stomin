import Folder from '@/Components/Folder';
import File from '@/Components/File';
import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage,router } from '@inertiajs/react';
import ModalBox from '@/Components/ModalBox';
import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from 'react';
import { FaXmark, FaFile, FaFolderClosed } from 'react-icons/fa6';

import FolderUrlContext from '@/Contexts/FolderUrlContext';
import Alert from '@/Components/Alert';

import axios from "axios";
import { Spinner } from 'react-bootstrap';

export default function DashboardContent({alert = ''}: any) {

    const [alerts, setAlerts] = useState<JSX.Element[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [folderUrl, setFolderUrl] = useState('home');

    const allFoldersPath = folderUrl.split('/');
    let actualFolderPath = allFoldersPath.length > 1 ? allFoldersPath.join('/') + '/' : 'home/';

    const [folders, setFolders] = useState([]);
    const [foldersLoading, setFoldersLoading] = useState(true);

    const user = usePage().props.user ?? { name: '?', email: '' };
    const dataAccount = usePage().props.dataAccount ?? { account_type: { total_storage: 0, max_size_files:0 } };
    const dataTypeAccount: any = dataAccount.account_type;
    const maxSizeFiles: number = dataTypeAccount.max_size_files;
    const typeFiles: string[] = usePage().props.typeFiles ?? [];
    
    const [file, setFile] = useState<File[] | null>(null);
    const [fileNames, setFileNames] = useState([] as string[]);
    const [previews, setPreviews] = useState<string[]>([]);

    const [previewFolderColor, setpreviewFolderColor] = useState<string>("");

    const handleChange = (newFiles: any) => {
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
    let createFolderDimissable = false;
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

        setNewFolder({
            name: '',
            location: actualFolderPath,
            color: '',
        });

        router.post('/storefolder', newFolder);
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

    useEffect(() => {
        if (alert?.message && alert.typeAlert) {
            showAlert(alert.message, '', alert.typeAlert);
        }
    }, [alert]);

    useEffect(() => {
        setFoldersLoading(true);
        axios.get('/getfoldersuser', {
            params: { url: actualFolderPath }
        })
        .then((response) => {
            setFolders(response.data);
            setFoldersLoading(false);
        })
        .catch((error) => {
            console.error(error);
            setFoldersLoading(false);
        });
    }, [actualFolderPath]);
    console.log(folders);
    console.log(actualFolderPath);
    

    return (
        <>
            <FolderUrlContext.Provider value={{ folderUrl, setFolderUrl }}>
             
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
                    
                <div className="breadcrumb w-100">
                    {allFoldersPath.map((folder, index) => {
                        const path = allFoldersPath.slice(0, index + 1).join('/');
                        return (
                            <a key={path} onClick={() => setFolderUrl(path)} className="pathUrl">
                                {folder}/
                            </a>
                        );
                    })}
                </div>

                    <div className="content">
                        {
                            foldersLoading && <Spinner animation="border" role="status" size="sm">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        }
                        {folders && !foldersLoading && folders.map((folder: any, index: number) => (
                        <Folder
                            key={index}
                            color={folder.color}
                            typeShare={folder.type_share}
                            onClick={() => setFolderUrl(folder.location + folder.name)}
                        >{folder.name}</Folder>
                    ))}
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

            <ModalBox id="upload-file" title="Upload file">
                <p>Uploading files in: <input type="text" defaultValue={actualFolderPath} className="form-control" /></p>
                <p className="text-muted">{`You can upload files of maximum level ${levelFiles}`}</p>
                <div>
                    <FileUploader
                        multiple={true}
                        handleChange={handleChange}
                        name="file"
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
            </FolderUrlContext.Provider>
        </>
    );
}
