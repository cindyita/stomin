import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

import { FaFolderClosed } from "react-icons/fa6";

import ModalBox from "./ModalBox";
import { useModalContext } from "@/Contexts/ModalContext";
import axios from "axios";
import { Spinner } from "react-bootstrap";

export default function EditFolderModal({ showAlert, fetchData }: any) {

    //CONTEXT
    const { itemData } = useModalContext();
    const id = itemData.itemId;

    // INFO FOLDER
    const [newFolder, setNewFolder] = useState({
        id: id,
        name: '',
        location: '',
        color: '',
        changeLocation: 0
    })

    //LOADING
    const [loading, setLoading] = useState(false);
    const [saveBtn, setSaveBtn] = useState('');

    const [initialLocation, setInitialLocation] = useState('');

    //GET ACTUAL INFO
    const getActualInfo = async () => {
        const res = await axios.get('/getInfoFolder', {
            params: { id:id }
        });
        setNewFolder({ id: id, name: res.data.name, location: res.data.location, color: res.data.color,changeLocation: 0 })
        setInitialLocation(res.data.location);
        handleFolderColor(res.data.color);
        setLoading(false);
        setSaveBtn('Edit');
    };
    useEffect(() => {
        if (id) {
            setLoading(true);
            setSaveBtn('');
            getActualInfo();
        }
    }, [itemData.itemId]);

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

    function editFolder(e: any) {
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
        
        const changeLocation = initialLocation == newFolder.location ? 0 : 1;

        setNewFolder(prev => ({
            ...prev,
            changeLocation: changeLocation
        }));


        router.post('/editfolder', newFolder, {
            onSuccess: (res) => {
                console.log(res);
                fetchData();
            },
            onError: (errors) => {
                showAlert('Error: '+ errors);
            },
        });

    }

    return (
        <>
            <ModalBox id="edit-folder" title="Edit folder" saveBtn={saveBtn} onSave={editFolder}>
                {loading && <Spinner animation="border" role="status" size="sm">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}
                {!loading && (
                    <>
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
                    </>
                )}
            </ModalBox>
        </>
    );
}