import { useEffect, useState } from "react";
import ModalBox from "./ModalBox";
import { useModalContext } from "@/Contexts/ModalContext";
import axios from "axios";
import { Spinner, Table } from "react-bootstrap";
import { usePage } from "@inertiajs/react";

export default function DeleteElementModal({ showAlert,fetchData }: any) {

    //LOADING
    const [loading, setLoading] = useState(false);

    const dataAccount = usePage().props.dataAccount ?? { id:0 };

    //CONTEXT
    const { itemData } = useModalContext();

    const id = itemData.itemId;
    const type = itemData.itemType;

    const [saveBtn, setSaveBtn] = useState('');

    // INFO CARD
    const [cardTitle, setCardTitle] = useState('Info card');

    const url = type == 'file' ? '/getInfoFile' : 'getInfoFolder';

    const urlDelete = type == 'file' ? '/deleteFile' : 'deleteFolder';

    //VIEW CONTENT (GET)
    const viewContent = async () => {
        const res = await axios.get(url, {
            params: { id:id }
        });
        setCardTitle(res.data.name);
        setLoading(false);
        setSaveBtn('Delete');
    };

    useEffect(() => {
        if (id) {
            setLoading(true);
            setSaveBtn('');
            setCardTitle("Loading...");
            viewContent();
        }
    }, [itemData.itemId]);

    const deleteItem = () => {
        if (loading) {
            showAlert('Wait loading');
            return;
        }

        axios({
            method: 'delete',
            url: urlDelete,
            data: {
                id: id,
                accountId: dataAccount.id
            }
        })
            .then(function (response) {
                if (response.data.message == 'success') {
                    showAlert('Element deleted', 'Success', 'success');
                } else {
                    showAlert(response.data.message, 'Something went wrong', 'warning');
                }
                fetchData();
        }).catch(function (error) {
            showAlert(error.message || 'Error', 'Error', 'danger');
            console.log(error);
        });
    }

    return (
        <>
            <ModalBox id="delete-element-card" title={`Delete ${cardTitle}`} onSave={deleteItem} saveBtn={saveBtn}>
                {loading && <Spinner animation="border" role="status" size="sm">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}
                {!loading && (
                    <>
                        Are you sure do you want to delete the {type} {cardTitle}?
                    </>
                )}
            </ModalBox>
            
        </>
    );
}
