import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    const appURL = import.meta.env.VITE_APP_URL;
    return (
        <img className="logo" src={`${appURL}/storage/images/logo.png`} />
    );
}
