import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

import { FaFile, FaFolderClosed } from "react-icons/fa6";

import ModalBox from "./ModalBox";
import { useModalContext } from "@/Contexts/ModalContext";
import axios from "axios";
import { Spinner } from "react-bootstrap";

export default function EditFileModal({ showAlert, fetchData }: any) {

    //CONTEXT
    const { itemData } = useModalContext();
    const id = itemData.itemId;

    // INFO FILE
    const [newFile, setNewFile] = useState({
        id: id,
        name: '',
        extension: '',
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
        const res = await axios.get('/getInfoFile', {
            params: { id:id }
        });
        const newName = res.data.name.replace(/\.[^/.]+$/, "");
        setNewFile({ id: id,name: newName, extension: res.data.extension, location: res.data.location, color: res.data.color,changeLocation: 0 });
        setInitialLocation(res.data.location);
        handleFileColor(res.data.color);
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

    // PREVIEW COLOR
    const [previewFileColor, setpreviewFileColor] = useState<string>("");

    const handleFileColor = (color: string) => {
        if (color == "default") {
            setpreviewFileColor("white");
        }
        setpreviewFileColor(color);
    };

    function editFile(e:any) {
        e.preventDefault();
        const newErrors: { [key: string]: string } = {};
        
        if (newFile.name === '') {
            newErrors.name = 'File name is required';
            showAlert("File name is required");
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return false;
        }
        setErrors({});

        const changeLocation = initialLocation == newFile.location ? 0 : 1;

        setNewFile(prev => ({
            ...prev,
            changeLocation: changeLocation
        }));

        router.post('/editfile', newFile, {
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
            <ModalBox id="edit-file" title="Edit file" saveBtn={saveBtn} onSave={editFile}>
                {loading && <Spinner animation="border" role="status" size="sm">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}
                {!loading && (
                    <>
                        <div>
                            <div className='icon-folder'>
                                <FaFile style={{ color: `var(--${previewFileColor})` }} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">File name:</label>
                                <div className="input-group mb-3">
                                    <input type="text" name="name" className={`form-control ${errors.name ? 'border-danger' : ''}`} value={newFile.name} onChange={(e) => setNewFile({ ...newFile, name: e.target.value })} />
                                    <span className="input-group-text" id="basic-addon2">.{newFile.extension}</span>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="url" className="form-label">Url:</label>
                                <input type="text" name="location" className={`form-control ${errors.location ? 'border-danger' : ''}`} value={newFile.location} onChange={(e) => setNewFile({ ...newFile, location: e.target.value })} /></div>
                            <div className="mb-3">
                                <label htmlFor="color" className="form-label">Color:</label>
                                    <select name="color" className={`form-select`} value={newFile.color} onChange={(e) => { setNewFile({ ...newFile, color: e.target.value }); handleFileColor(e.target.value) }}>
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