import { IoArrowBackCircle, IoColorPalette, IoEllipsisVertical, IoFolder, IoInformationCircle, IoPencil, IoShareSocial, IoTrash } from "react-icons/io5";
import ElementDropdown from "./ElementDropdown";
import FavoriteElement from "./FavoriteElement";
import ShareElement from "./ShareElement";

export default function Folder({ children, color, type, favorite = false,typeShare = 'none', ...props }: any) {
    return (
        <div className='folder element' {...props}>
            <ElementDropdown />
            <FavoriteElement favorite={favorite} />
            <ShareElement typeShare={typeShare} />
            <div className={`icon ${color}`}>
                <IoFolder />
            </div>
            <span className="title" title={children}>{children}</span>
        </div>
    );
}