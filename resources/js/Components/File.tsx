import { useState } from "react";
import { usePage } from "@inertiajs/react";

import { FaFileImage, FaFileLines, FaFilePdf } from "react-icons/fa6";

import ElementDropdown from "./ElementDropdown";
import FavoriteElement from "./FavoriteElement";
import ShareElement from "./ShareElement";
import OpenModal from "./OpenModal";

export default function File({ children,id, color, type = 'file', favorite = false, typeShare = 'none', href = '', typeMime = '', ...props }: any) {

    const dataAccount = usePage().props.dataAccount ?? { id:0 };
    
    const appURL = import.meta.env.VITE_APP_URL;
    
    const isImage = (mimeType: string) => {
        return mimeType && mimeType.startsWith("image/");
    };

    const [imageError, setImageError] = useState(false);

    if (isImage(typeMime)) {
        type = 'image';
    }

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <>
            <div className='file element' {...props}>
                <ElementDropdown idItem={id} type='file' />
                <FavoriteElement id={id} type='file' favorite={favorite} />
                <ShareElement typeShare={typeShare} />
                {/* <OpenModal id="view-file"> */}
                <div className="file-content">
                    <div className="file-content-link">
                        <div className={`icon ${color}`}>
                            {type === 'image' ? (
                                imageError ? (
                                    <FaFileImage /> // Ícono si la imagen no se carga.
                                ) : (
                                    <img
                                        src={`${appURL}/storage/archives/${dataAccount.id}${href}`}
                                        alt={children}
                                        className="image-preview"
                                        onError={handleImageError}
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                    />
                                )
                            ) : type === 'file' ? (
                                <FaFileLines />
                            ) : type === 'pdf' ? (
                                <FaFilePdf />
                            ) : (
                                <FaFileLines />
                            )}
                            </div>
                        <span className="title" title={children}>{children}</span>
                    </div>
                    <div className="element-more-info pt-2 text-muted w-min">
                        <span>{typeMime}</span>
                    </div>
                </div>
                {/* </OpenModal> */}
            </div>
        </>
    );
}