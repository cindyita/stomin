import { useEffect, useState } from "react";
import ModalBox from "./ModalBox";
import { useModalContext } from "@/Contexts/ModalContext";
import axios from "axios";
import { Spinner, Table } from "react-bootstrap";
import { isImageTypeMime } from "@/Functions/Functions";
import { FaFileImage } from "react-icons/fa6";
import { usePage } from "@inertiajs/react";

export default function ViewCardModal({ showAlert }: any) {

    const dataAccount = usePage().props.dataAccount ?? { id:0 };

    const appURL = import.meta.env.VITE_APP_URL;

    //LOADING
    const [loading, setLoading] = useState(false);

    //CONTEXT
    const { itemData } = useModalContext();

    const id = itemData.itemId;

    // INFO CARD
    const [viewCardTitle, setViewCardTitle] = useState('Info card');
    const [contentUrl, setContentUrl] = useState<any>('');
    const [typeFile, setTypeFile] = useState('');

    // IMAGE ERROR
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    //VIEW CONTENT (GET)
    const viewContent = async () => {
        const res = await axios.get('/getInfoFile', {
            params: { id:id }
        });
        setViewCardTitle(res.data.name);
        setContentUrl(res.data.location + res.data.name);
        setTypeFile(isImageTypeMime(res.data.type_mime) ? 'image' : 'file');
        setLoading(false);
    };

    useEffect(() => {
        if (id) {
            setLoading(true);
            setViewCardTitle("Loading view...");
            viewContent();
        }
    }, [itemData.itemId]); 

    return (
        <>
            <ModalBox id="view-card" title={viewCardTitle} saveBtn="">
                {loading && <Spinner animation="border" role="status" size="sm">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}
                {!loading && (
                        typeFile == 'image' ?
                        (
                            imageError ? (<FaFileImage />) :
                            <>
                                <img
                                    src={`${appURL}/storage/archives/${dataAccount.id}/${contentUrl}`}
                                    alt={viewCardTitle}
                                    className="image-preview"
                                    onError={handleImageError}
                                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                />
                            </>)
                        : (<>
                            {contentUrl}
                            </>)
                    )
                }
            </ModalBox>
            
        </>
    );
}
