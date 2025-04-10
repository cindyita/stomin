import { IoEllipsisVertical, IoEye, IoInformationCircle, IoPencil, IoShareSocial, IoTrash } from "react-icons/io5";
import OpenModal from "./OpenModal";

export default function ElementDropdown({ idItem = 0, type = '', ...props }: any) {

    return (
            <div className="dropdown options " {...props}>
                <a id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" className="options-elipsis">
                    <IoEllipsisVertical />
                </a>

                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><OpenModal id="view-item"><a className="dropdown-item"><IoEye /> View</a></OpenModal></li>
                    <li><OpenModal id="info-card" itemId={idItem} itemType={type}><a className="dropdown-item"><IoInformationCircle /> Information</a></OpenModal></li>
                    <li><a className="dropdown-item" href="#"><IoShareSocial /> Share</a></li>
                    <li><a className="dropdown-item" href="#"><IoPencil /> Edit</a></li>
                    <li><a className="dropdown-item red" href="#"><IoTrash /> Delete</a></li>
                </ul>
            </div>
    );
}