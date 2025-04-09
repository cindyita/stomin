import { IoArrowBackCircle, IoColorPalette, IoEllipsisVertical, IoFolder, IoInformationCircle, IoPencil, IoShareSocial, IoTrash } from "react-icons/io5";
import ElementDropdown from "./ElementDropdown";
import FavoriteElement from "./FavoriteElement";
import ShareElement from "./ShareElement";
import { Link,router } from "@inertiajs/react";
import { useState } from "react";

export default function Folder({ children,id, color, href, favorite = false, typeShare = 'none', ...props }: any) {
     const [clickedOnce, setClickedOnce] = useState(false);

    // Función para manejar el doble clic
    const handleDoubleClick = () => {
        // Realiza la redirección al hacer doble clic
        router.visit(href);
    };

    // Prevenir que el enlace se active con un solo clic
    const handleClick = (e: React.MouseEvent) => {
        if (clickedOnce) {
            return;
        }
        setClickedOnce(true);

        setTimeout(() => {
            setClickedOnce(false);
        }, 300); // El tiempo límite para considerar un "doble clic" (300 ms)
    };

    return (
        <div className='folder element' {...props}>
            <ElementDropdown />
            <FavoriteElement id={id} type='folder' favorite={favorite} />
            <ShareElement typeShare={typeShare} />
            <Link href={href} onClick={(e) => {
                    e.preventDefault();
                    handleClick(e);
                }} onDoubleClick={handleDoubleClick} className="d-flex flex-row flex-md-column align-items-center gap-2 gap-md-0">
                <div className={`icon ${color}`}>
                    <IoFolder />
                </div>
                <span className="title" title={children}>{children}</span>
            </Link>
        </div>
    );
}