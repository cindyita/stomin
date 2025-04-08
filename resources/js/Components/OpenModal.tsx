import { ModalContext } from '@/Contexts/ModalContext';
import { PropsWithChildren, useContext } from 'react';


export default function OpenModal({
    id,
    className = '',
    children,
    ...props
}: PropsWithChildren & { id: string, className?: string }) {
    const modalContext = useContext(ModalContext);

    if (!modalContext) {
        throw new Error('ModalContext is not provided');
    }

    const { setModalId } = modalContext;

    const openModal = () => {
        setModalId(id); 
    };
    
    return (
        <>
            <span className={`cursor-pointer ${className}`} onClick={openModal} {...props}>{children}</span>
        </>
    );
}
