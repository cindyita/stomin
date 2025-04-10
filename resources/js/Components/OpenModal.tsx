import { PropsWithChildren, useContext } from 'react';
import { ModalContext } from '@/Contexts/ModalContext';

export default function OpenModal({
    id,
    className = '',
    itemId = 0,
    itemType = '',
    children,
    ...props
}: PropsWithChildren & { id: string, itemId?:number, itemType?:string, className?: string }) {
    
    const modalContext = useContext(ModalContext);

    if (!modalContext) {
        throw new Error('ModalContext is not provided');
    }

    const { setModalId, setItemData } = modalContext;

    const openModal = () => {
        setModalId(id);
        if (itemId && itemType) {
            setItemData({ itemId: itemId, itemType: itemType });
        }
    };
    
    return (
        <>
            <span className={`cursor-pointer ${className}`} onClick={openModal} {...props}>{children}</span>
        </>
    );
}
