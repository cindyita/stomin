import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'normal-link ' +
                (active
                    ? 'text-primary'
                    : '') +
                className
            }
        >
            {children}
        </Link>
    );
}
