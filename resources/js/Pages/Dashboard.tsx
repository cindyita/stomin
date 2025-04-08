import Folder from '@/Components/Folder';
import File from '@/Components/File';
import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { FileUploader } from "react-drag-drop-files";
import { useState } from 'react';
import { FaXmark, FaFile, FaFolderClosed } from 'react-icons/fa6';

export default function Dashboard() {

    let actualFolderPath = "home/";
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

        // Elimina el archivo, nombre y vista previa en el índice
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
                
                <div className="breadcrumb w-100">{actualFolderPath}</div>

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
            <Modal id="view-file" title="View file" saveBtn="">file</Modal>
            <Modal id="info-card" title="info Card" saveBtn="">Info file</Modal>
            <Modal id="create-folder" title="Create folder">
                <div>
                    <div className='icon-folder'>
                        <FaFolderClosed style={{ color: `var(--${previewFolderColor})` }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Folder name:</label>
                        <input type="text" name="name" className="form-control" /></div>
                    <div className="mb-3">
                        <label htmlFor="url" className="form-label">Url:</label>
                        <input type="text" name="url" defaultValue={actualFolderPath} className="form-control" /></div>
                    <div className="mb-3">
                        <label htmlFor="color" className="form-label">Color:</label>
                        <select name="color" className="form-select" onChange={(e) => handleFolderColor(e.target.value)}>
                            <option value="default">default</option>
                            <option value="primary">Primary</option>
                            <option value="secondary">Secondary</option>
                            <option value="yellow">Yellow</option>
                            <option value="accent">Accent</option>
                        </select>
                    </div>
                </div>
            </Modal>

            <Modal id="upload-file" title="Upload file">
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
                        onSizeError={(file: any) => alert(`File size is too big`)}
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
            </Modal>
        </>
    );
}
