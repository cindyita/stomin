import Folder from '@/Components/Folder';
import File from '@/Components/File';
import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import ModalBox from '@/Components/ModalBox';
import { FileUploader } from "react-drag-drop-files";
import { useState } from 'react';
import { FaXmark, FaFile, FaFolderClosed } from 'react-icons/fa6';

import FileUrlContext from '@/Contexts/FileUrlContext';
import Alert from '@/Components/Alert';

export default function DashboardContent() {

    const [alerts, setAlerts] = useState<JSX.Element[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [fileUrl, setFileUrl] = useState('home');

    const folders = fileUrl.split('/');
    let actualFolderPath = folders.length > 1 ? folders.slice(0, -1).join('/') : 'home/';

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
        
        console.log(newFolder);
        //router.post('/users', newFolder);
    }

    function showAlert(message: string, title:string = 'Error:') {
        const id = Date.now();
        const alertElement = (
            <Alert key={id} title={title} type="danger" duration={3000}>
                {message}
            </Alert>
        );

        setAlerts(prev => [...prev, alertElement]);

        setTimeout(() => {
            setAlerts(prev => prev.filter(a => a.key !== id.toString()));
        }, 5000);
    }

    return (
        <>
            <FileUrlContext.Provider value={{ fileUrl, setFileUrl }}>
             
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
                    {folders.map((folder, index) => {
                        const path = folders.slice(0, index + 1).join('/');
                        return (
                            <a key={path} onClick={() => setFileUrl(path)}>
                                {folder}/
                            </a>
                        );
                    })}
                </div>

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
            </FileUrlContext.Provider>
        </>
    );
}
