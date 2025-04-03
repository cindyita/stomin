import { IoEllipsisVertical } from "react-icons/io5";

export default function Dropdown({ children,id,...props }: any) {
    return (
        <>
            <div className="dropdown " {...props}>
                <a id={id} data-bs-toggle="dropdown" aria-expanded="false" className="options-elipsis">
                    <IoEllipsisVertical />
                </a>

                <ul className="dropdown-menu" aria-labelledby={id}>
                    {children}
                </ul>
            </div>
        </>
    );
}