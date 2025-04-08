import { IoEllipsisVertical, IoEye, IoInformationCircle, IoPencil, IoShareSocial, IoTrash } from "react-icons/io5";
import OpenModal from "./OpenModal";

export default function ElementDropdown({ ...props }: any) {

    return (
            <div className="dropdown options " {...props}>
                <a id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" className="options-elipsis">
                    <IoEllipsisVertical />
                </a>

                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><OpenModal id="info-card"><a className="dropdown-item"><IoEye /> View</a></OpenModal></li>
                    <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#info-card"><IoInformationCircle /> Information</a></li>
                    <li><a className="dropdown-item" href="#"><IoShareSocial /> Share</a></li>
                    <li><a className="dropdown-item" href="#"><IoPencil /> Edit</a></li>
                    <li><a className="dropdown-item red" href="#"><IoTrash /> Delete</a></li>
                </ul>
            </div>
    );
}