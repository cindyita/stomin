import { IoEllipsisVertical, IoEye, IoInformationCircle, IoPencil, IoQrCode, IoShareSocial, IoTrash } from "react-icons/io5";
import OpenModal from "./OpenModal";

export default function ElementDropdown({ idItem = 0, type = '', view = true, ...props }: any) {

    const editType = type == 'file' ? 'edit-file' : 'edit-folder';

    return (
            <div className="dropdown options " {...props}>
                <a id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" className="options-elipsis">
                    <IoEllipsisVertical />
                </a>

                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    { view &&
                        (<li><OpenModal id="view-card" itemId={idItem} itemType={type}><a className="dropdown-item"><IoEye /> View</a></OpenModal></li>)
                    }    
                    <li><OpenModal id="info-card" itemId={idItem} itemType={type}><a className="dropdown-item"><IoInformationCircle /> Information</a></OpenModal></li>
                    <li><a className="dropdown-item" href="#"><IoShareSocial /> Share</a></li>
                    <li><a className="dropdown-item" href="#"><IoQrCode /> QR code</a></li>
                    <li><OpenModal id={editType} itemId={idItem} itemType={type}><a className="dropdown-item" href="#"><IoPencil /> Edit</a></OpenModal></li>
                    <li><OpenModal id="delete-element-card" itemId={idItem} itemType={type}><a className="dropdown-item red" href="#"><IoTrash /> Delete</a></OpenModal></li>
                </ul>
            </div>
    );
}