import { useState } from "react";
import ModalBox from "./ModalBox";
import { router } from "@inertiajs/react";
import { FileUploader } from "react-drag-drop-files";
import { FaFile, FaXmark } from "react-icons/fa6";
import Alert from '@/Components/Alert';

export default function UploadFilesModal({ actualFolderPath, maxSizeFiles,typeFiles,levelFiles,showAlert, fetchData }: any) {
    
    // UPLOAD FILES (CREATE)
    const [uploadFile, setUploadFile] = useState<File[] | null>(null);
    const [uploadFileNames, setUploadFileNames] = useState([] as string[]);
    const [previews, setPreviews] = useState<string[]>([]);

    // UPLOAD FILES IN ONCHANGE
    const handleFileChange = (newFiles: any) => {
        if (newFiles.length > 0) {
            setUploadFileNames([]);
            const newFileNames = [...uploadFileNames];
            for (let i = 0; i < newFiles.length; i++) {
                newFileNames.push(newFiles[i].name);
            }
            setUploadFileNames(newFileNames);
        }

        const selectedFiles = Array.from(newFiles);
        const previewUrls = selectedFiles.map((f: any) =>
            URL.createObjectURL(f)
        );

        setUploadFile(prevFiles => [...(prevFiles || []), ...(selectedFiles as File[])]);
        setPreviews(prevPreviews => [...prevPreviews, ...previewUrls]);
    };
    // REMOVE FILES IN UPLOAD
    const handleRemoveFile = (index: number) => {
        const updatedFiles = [...(uploadFile || [])];
        const updatedPreviews = [...previews];
        const updatedFileNames = [...uploadFileNames];

        updatedFiles.splice(index, 1);
        updatedPreviews.splice(index, 1);
        updatedFileNames.splice(index, 1);

        setUploadFile(updatedFiles);
        setPreviews(updatedPreviews);
        setUploadFileNames(updatedFileNames);
    };

    // CHECK IMAGE FILE FOR PREVIEW
    const isImageFile = (fileName: string) => {
        const fileExtension = fileName.split('.').pop()?.toLowerCase();
        return ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension || '');
    };

    // ERRORS IN CREATE
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // CREATE FILE
    const [newFile, setNewFile] = useState({
        location: actualFolderPath,
        color: '',
        files:uploadFile,
    })

    function createFile(e:any) {
        e.preventDefault();
        const newErrors: { [key: string]: string } = {};
        
        if (!uploadFile) {
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
            files: uploadFile
        }

        router.post('/storefile', formData, {
            onSuccess: () => {
                fetchData();
            },
            onError: (errors) => {
                showAlert('Error: '+ errors);
            },
        });

        setNewFile({
            location: actualFolderPath,
            color: '',
            files: null
        });
        
    }
    
    return (
        <>
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
                        uploadedLabel={uploadFile ? `${uploadFileNames.join(", ")}` : "Uploaded Successfully"}
                        maxSize={maxSizeFiles}
                        onSizeError={(file: any) => showAlert(`File size is too big`)}
                        classes="file-uploader"
                    />
                    <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
                        {previews.map((src, index) => (
                            <div key={index} style={{ position: 'relative' }}>
                                {isImageFile(uploadFileNames[index]) ? (
                                    <img
                                        src={src}
                                        alt={`Preview ${index}`}
                                        style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "5px", border: "1px solid var(--primary)" }}
                                    />
                                ) : (<>
                                    <span className="preview-doc"><FaFile style={{ fontSize: "30px", color: "var(--primary)" }} />{uploadFileNames[index]}</span></>
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
