import { IoArrowBackCircle, IoColorPalette, IoEllipsisVertical, IoFolder, IoInformationCircle, IoPencil, IoShareSocial, IoTrash } from "react-icons/io5";
import ElementDropdown from "./ElementDropdown";

export default function Folder({ children, color, type, ...props }: any) {
    return (
        <div className='folder element' {...props}>
            <ElementDropdown />
            <div className={`icon ${color}`}>
                <IoFolder />
            </div>
            <span className="title" title={children}>{children}</span>
        </div>
    );
}