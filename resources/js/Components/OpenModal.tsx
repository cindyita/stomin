import { PropsWithChildren, useContext } from 'react';
import { ModalContext } from '@/Contexts/ModalContext';

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
