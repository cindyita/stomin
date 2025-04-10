import { useState } from "react";
import { router } from "@inertiajs/react";

import { FaFolderClosed } from "react-icons/fa6";

import ModalBox from "./ModalBox";

export default function UploadFolderModal({ actualFolderPath,showAlert, fetchData }: any) {

    // ERRORS IN CREATE
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // PREVIEW FOLDER COLOR
    const [previewFolderColor, setpreviewFolderColor] = useState<string>("");

    const handleFolderColor = (color: string) => {
        if (color == "default") {
            setpreviewFolderColor("white");
        }
        setpreviewFolderColor(color);
    };

    // CREATE FOLDER
    const [newFolder, setNewFolder] = useState({
        name: '',
        location: actualFolderPath,
        color: '',
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

        router.post('/storefolder', newFolder, {
            onSuccess: () => {
                fetchData();
            },
            onError: (errors) => {
                showAlert('Error: '+ errors);
            },
        });

        setNewFolder({
            name: '',
            location: actualFolderPath,
            color: '',
        });
        
    }

    return (
        <>
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
        </>
    );
}