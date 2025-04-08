import { IoArrowBackCircle, IoColorPalette, IoEllipsisVertical, IoFolder, IoInformationCircle, IoPencil, IoShareSocial, IoTrash } from "react-icons/io5";
import ElementDropdown from "./ElementDropdown";
import FavoriteElement from "./FavoriteElement";
import ShareElement from "./ShareElement";
import { Link } from "@inertiajs/react";

export default function Folder({ children, color, href, favorite = false,typeShare = 'none', ...props }: any) {
    return (
        <div className='folder element' {...props}>
            <ElementDropdown />
            <FavoriteElement favorite={favorite} />
            <ShareElement typeShare={typeShare} />
            <Link href={href} className="d-flex flex-column align-items-center">
                <div className={`icon ${color}`}>
                    <IoFolder />
                </div>
                <span className="title" title={children}>{children}</span>
            </Link>
        </div>
    );
}