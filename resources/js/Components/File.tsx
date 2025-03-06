import { FaFileImage, FaFileLines, FaFilePdf } from "react-icons/fa6";
import { IoArrowBackCircle, IoEllipsisVertical, IoInformationCircle, IoPencil, IoShareSocial, IoTrash } from "react-icons/io5";
import ElementDropdown from "./ElementDropdown";

export default function Folder({ children, color, type = 'file', ...props }: any) {
    return (
        <div className='file element' {...props}>
            <ElementDropdown />
            <div className={`icon ${color}`}>
                {
                    type === 'file' ?
                        <FaFileLines /> :
                        type === 'jpg' ?
                            <FaFileImage /> :
                                type === 'pdf' ?
                                    <FaFilePdf /> :
                                <FaFileLines />
                    
                }
            </div>
            <span className="title" title={children}>{children}</span>
        </div>
    );
}