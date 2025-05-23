import { useState } from "react";
import { Link,router } from "@inertiajs/react";

import { IoFolder } from "react-icons/io5";
import ElementDropdown from "./ElementDropdown";
import FavoriteElement from "./FavoriteElement";
import ShareElement from "./ShareElement";

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
            <ElementDropdown idItem={id} type='folder' view={false} />
            <FavoriteElement id={id} type='folder' favorite={favorite} />
            <ShareElement typeShare={typeShare} />
            <span className="folder-content">
                <Link href={href} onClick={(e) => {
                        e.preventDefault();
                        handleClick(e);
                        }} onDoubleClick={handleDoubleClick}
                        className="folder-content-link">
                    <div className={`icon ${color}`}>
                        <IoFolder />
                    </div>
                    <span className="title" title={children}>{children}</span>
                </Link>
                <div className="element-more-info text-muted">
                    <></>
                </div>
            </span>
        </div>
    );
}