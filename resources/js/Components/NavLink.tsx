import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex justify-center items-center px-4 py-2 rounded-lg text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none focus:bg-neutral-300 focus:dark:bg-neutral-700 ' +
                (active
                    ? 'bg-neutral-200 dark:bg-neutral-600 text-neutral-900 dark:text-neutral-100 '
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-700 hover:bg-neutral-300 hover:dark:bg-neutral-600 dark:hover:text-neutral-300 dark:focus:text-neutral-300 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
