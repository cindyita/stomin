import { PropsWithChildren, useContext } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaCheck } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ModalContext } from '@/Contexts/ModalContext';

export default function ModalBox({
    children,
    id,
    title,
    saveBtn = 'Save',
    onSave = () => { },
    width = 'lg',
    onHide = () => { }
}: PropsWithChildren<{
    id: string;
    title: string;
    saveBtn?: string;
    onSave?: CallableFunction;
    width?: 'sm' | 'lg' | 'xl';
    onHide?: () => void;
}>) {

    const modalContext = useContext(ModalContext);
    const showModal = modalContext?.modalId === id;

    if (!modalContext) {
        throw new Error("ModalContext is not provided. Ensure that ModalBox is wrapped in a ModalContext.Provider.");
    }

    const { modalId, setModalId } = modalContext;

    const handleClose = () => {
        setModalId(null);
        onHide();
    };

    async function save(e: any) {
        e.preventDefault();

        const result = await Promise.resolve(onSave(e));

        if (result !== false) {
            handleClose();
        }
    }

    return (
        <>
            
            <Modal
                show={showModal}
                onHide={onHide}
                size={width}
                aria-labelledby={`${id}-label`}
                centered
            >
                <form encType="multipart/form-data" onSubmit={save}>
                    <Modal.Header>
                        <Modal.Title id={`${id}-label`}>{title}</Modal.Title>
                        <a onClick={handleClose} className="btn-close" aria-label="Close"><IoClose /></a>
                    </Modal.Header>

                    <Modal.Body>
                        {children}
                    </Modal.Body>

                    {saveBtn && (
                        <Modal.Footer>
                            <Button variant="primary" type="submit">
                                {saveBtn} <FaCheck />
                            </Button>
                        </Modal.Footer>
                    )}
                </form>
            </Modal>
        </>
    );
}
