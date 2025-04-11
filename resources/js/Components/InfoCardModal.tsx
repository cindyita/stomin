import { useEffect, useState } from "react";
import ModalBox from "./ModalBox";
import { useModalContext } from "@/Contexts/ModalContext";
import { router } from "@inertiajs/react";
import axios from "axios";
import { Spinner, Table } from "react-bootstrap";
import { formatBytes } from "@/Functions/Functions";

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

    const url = type == 'file' ? '/getInfoFile' : '/getInfoFolder';

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
                        {/* {JSON.stringify(infoCardContent, null, 2)} */}
                        <div>
                            <Table striped bordered hover>
                                <tbody>
                                    <tr>
                                        <th>id</th>
                                        <td>{infoCardContent.id}</td>
                                    </tr>
                                    <tr>
                                        <th>Type</th>
                                        <td>{type}</td>
                                    </tr>
                                    <tr>
                                        <th>Url</th>
                                        <td>{infoCardContent.location}</td>
                                    </tr>
                                    <tr>
                                        <th>Name</th>
                                        <td>{infoCardContent.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Color</th>
                                        <td>{infoCardContent.color}</td>
                                    </tr>
                                    {   type == 'file' &&
                                        <>
                                            <tr>
                                                <th>Extension</th>
                                                <td>{infoCardContent.extension}</td>
                                            </tr>
                                            <tr>
                                                <th>Type/Mime</th>
                                                <td>{infoCardContent.type_mime}</td>
                                            </tr>
                                            <tr>
                                                <th>Size</th>
                                            <td>{formatBytes(infoCardContent.size)}</td>
                                            </tr>
                                        </>
                                    }
                                    <tr>
                                        <th>Favorite</th>
                                        <td>{infoCardContent.favorite ? 'Yes' : 'No'}</td>
                                    </tr>
                                    <tr>
                                        <th>Share</th>
                                        <td>{infoCardContent.type_share}</td>
                                    </tr>
                                    <tr>
                                        <th>Created at</th>
                                        <td>
                                            {new Date(infoCardContent.created_at).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric'
                                            })}{' '}
                                            {new Date(infoCardContent.created_at).toLocaleTimeString('en-GB', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true
                                            })}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Updated at</th>
                                        <td>
                                            {new Date(infoCardContent.updated_at).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric'
                                            })}{' '}
                                            {new Date(infoCardContent.updated_at).toLocaleTimeString('en-GB', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true
                                            })}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </>
                )}
            </ModalBox>
            
        </>
    );
}
