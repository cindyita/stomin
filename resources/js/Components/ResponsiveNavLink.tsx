import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active?: boolean }) {
    return (
        <Link
            {...props}
            className={`d-flex py-2 pe-4 ps-3 ${
                active
                    ? 'text-primary'
                    : 'text-link'
            } ${className}`}
        >
            {children}
        </Link>
    );
}
