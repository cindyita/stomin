import { FaUserFriends, FaUserLock } from "react-icons/fa";

export default function ShareElement({ typeShare = 'none', ...props }: any) {
    return (
        <div className="shareElement " {...props}>
            { typeShare === 'open' ?
                <a><FaUserFriends /></a>
                : typeShare === 'private' ?
                    <a><FaUserLock /></a>
                    : null
            }
        </div>
    );
}