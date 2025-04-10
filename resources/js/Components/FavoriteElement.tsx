import { useState } from "react";
import axios from "axios";
import { IoStar } from "react-icons/io5";

export default function FavoriteElement({ id, type, favorite = false, ...props }: any) {

    const [starActive, setStarActive] = useState(favorite);

    const url = type === 'file' ? '/togglefavoritefile' : '/togglefavoritefolder';
    const favoriteStatus = starActive ? 0 : 1;
    const toggleFavorite = () => {
        //setStarActive(2);
        setStarActive(favoriteStatus);
        axios.get(url, {
            params: { id: id, favorite: favoriteStatus }
        }).catch((error) => {
            console.error(error);
        });
    };
    
    return (
        <div onClick={toggleFavorite} className={`favoriteElement ${starActive == 1 ? 'active' : (starActive == 2 ? 'load' : '')}`} {...props}>
            <a><IoStar /></a>
        </div>
    );
}