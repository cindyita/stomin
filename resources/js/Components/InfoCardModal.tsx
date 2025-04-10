import { useEffect, useState } from "react";
import ModalBox from "./ModalBox";
import { useModalContext } from "@/Contexts/ModalContext";
import { router } from "@inertiajs/react";
import axios from "axios";
import { Spinner } from "react-bootstrap";

export default function InfoCardModal({ showAlert }: any) {

    //LOADING
    const [loading, setLoading] = useState(false);

    //CONTEXT
    const { itemData } = useModalContext();

    const id = itemData.itemId;
    const type = itemData.itemType;

    // INFO CARD
    const [infoCardTitle, setInfoCardTitle] = useState('Info card');
    const [infoCardContent, setInfoCardContent] = useState<any>('');

    const url = type == 'file' ? '/getInfoFile' : 'getInfoFolder';

    //VIEW INFO CARD (GET)
    const viewInfo = async () => {
        const res = await axios.get(url, {
            params: { id:id }
        });
        setInfoCardTitle(res.data.name);
        setInfoCardContent(res.data);
        setLoading(false);
    };

    useEffect(() => {
        if (id) {
            setLoading(true);
            setInfoCardTitle("Loading information...");
            viewInfo();
        }
    }, [itemData.itemId]); 

    return (
        <>
            <ModalBox id="info-card" title={infoCardTitle} saveBtn="">
                {loading && <Spinner animation="border" role="status" size="sm">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}
                {!loading && (
                    <>
                        <p className="text-muted">Information for {type}</p>
                        {JSON.stringify(infoCardContent, null, 2)}
                    </>
                )}
            </ModalBox>
            
        </>
    );
}
