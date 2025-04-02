import { IoStar } from "react-icons/io5";

export default function FavoriteElement({ favorite = false, ...props }: any) {
    return (
        <div className={`favoriteElement ${favorite ? 'active' : ''}`} {...props}>
            <a><IoStar /></a>
        </div>
    );
}