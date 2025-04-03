import { PropsWithChildren } from 'react';

export default function OpenModal({
    id,
    className = '',
    children,
    ...props
}: PropsWithChildren & { id:string,className?:string }) {
    return (
        <>
            <span className={`cursor-pointer ${className}`} data-bs-toggle="modal" data-bs-target={`#${id}`}>{children}</span>
        </>
    );
}
