import { PropsWithChildren, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

export default function Modal({
    children,
    id,
    title,
    saveBtn = 'Aceptar',
    onSave = () => { },
    width = 'lg'
}: PropsWithChildren<{
    id: string;
    title: string;
    saveBtn?: string;
    onSave?: CallableFunction;
    width?: 'sm' | 'lg' | 'xl';
}>) {
    const save = () => {
        onSave();
    };


    return (
        <>
            <div className="modal fade" id={id} tabIndex={-1} aria-labelledby={`${id}-label`} aria-hidden="true">
            <div className={`modal-dialog modal-dialog-centered modal-dialog-scrollable modal-${width}`}>
                <div className="modal-content">
                <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                    <a type="button" className="btn-close" data-bs-dismiss="modal"><IoClose /></a>
                </div>
                <div className="modal-body">
                    {children}
                        </div>
                        {
                            saveBtn &&
                            <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={save}>
                                        {saveBtn}
                                    </button>
                            </div>
                        }
                </div>
            </div>
            </div>
        </>
    );
}
