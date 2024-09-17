import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex justify-center items-center px-4 py-2 rounded-lg text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none focus:bg-gray-300 focus:dark:bg-gray-700 ' +
                (active
                    ? 'bg-neutral-200 dark:bg-neutral-600 text-gray-900 dark:text-gray-100 '
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-700 hover:bg-neutral-300 hover:dark:bg-neutral-600 dark:hover:text-gray-300 dark:focus:text-gray-300 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
