import { IoArrowBackCircle, IoEllipsisVertical, IoInformationCircle, IoPencil, IoShareSocial, IoTrash } from "react-icons/io5";

export default function ElementDropdown({ ...props }: any) {
    return (
            <div className="dropdown options " {...props}>
                <a id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" className="options-elipsis">
                    <IoEllipsisVertical />
                </a>

                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#info-card"><IoInformationCircle /> Información</a></li>
                    <li><a className="dropdown-item" href="#"><IoShareSocial /> Compartir</a></li>
                    <li><a className="dropdown-item" href="#"><IoArrowBackCircle /> Mover</a></li>
                    <li><a className="dropdown-item" href="#"><IoPencil /> Editar</a></li>
                    <li><a className="dropdown-item red" href="#"><IoTrash /> Borrar</a></li>
                </ul>
            </div>
    );
}