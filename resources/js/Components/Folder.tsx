import { IoEllipsisVertical, IoFolder } from "react-icons/io5";

export default function Folder({ children, type, ...props }: any) {
    return (
        <div className='folder' {...props}>
            <div className="options"><IoEllipsisVertical /></div>
            <div className={`icon ${type}`}>
                <IoFolder />
            </div>
            <h4>{children}</h4>
        </div>
    );
}