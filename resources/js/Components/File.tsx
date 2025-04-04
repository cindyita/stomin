import { FaFileImage, FaFileLines, FaFilePdf } from "react-icons/fa6";
import ElementDropdown from "./ElementDropdown";
import FavoriteElement from "./FavoriteElement";
import ShareElement from "./ShareElement";
import OpenModal from "./OpenModal";

export default function Folder({ children, color, type = 'file', favorite = false,typeShare = 'none', ...props }: any) {
    return (
        <>
            <div className='file element' {...props}>
                <ElementDropdown />
                <FavoriteElement favorite={favorite} />
                    <ShareElement typeShare={typeShare} />
                <OpenModal id="view-file">    
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
                </OpenModal>
                <span className="title" title={children}>{children}</span>
            </div>
        </>
    );
}