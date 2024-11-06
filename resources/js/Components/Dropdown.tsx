import { useState, createContext, useContext, PropsWithChildren, Dispatch, SetStateAction, ButtonHTMLAttributes } from 'react';
import { Link, InertiaLinkProps } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

const DropDownContext = createContext<{
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    toggleOpen: () => void;
}>({
    open: false,
    setOpen: () => {},
    toggleOpen: () => {},
});

const Dropdown = ({ children }: PropsWithChildren) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="relative">{children}</div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }: PropsWithChildren) => {
    const { open, setOpen, toggleOpen } = useContext(DropDownContext);

    return (
        <>
            <div onClick={toggleOpen}>{children}</div>

            {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>}
        </>
    );
};

const Content = ({ align = 'right', verticalAlign = 'bottom', className = 'py-1 bg-neutral-200 dark:bg-neutral-700', children }: PropsWithChildren<{ align?: 'left'|'right', verticalAlign?: 'top'|'bottom', className?: string }>) => {
    const { open, setOpen } = useContext(DropDownContext);

    let alignmentClasses = 'origin-top';
    
    // Handle horizontal alignment
    if (align === 'left') {
        alignmentClasses = 'ltr:origin-top-left rtl:origin-top-right start-0';
    } else if (align === 'right') {
        alignmentClasses = 'ltr:origin-top-right rtl:origin-top-left end-0';
    }

    // Handle vertical alignment
    if (verticalAlign === 'top') {
        alignmentClasses += ' top-full mt-2';
    } else if (verticalAlign === 'bottom') {
        alignmentClasses += ' bottom-full mb-2';
    }

    return (
        <>
            <Transition
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div
                    className={`absolute z-50 rounded-lg shadow-lg ${alignmentClasses} `}
                    onClick={() => setOpen(false)}
                >
                    <div className={`rounded-lg px-2 py-4 grid gap-2 ring-1 min-w-full ring-black ring-opacity-5 ` + className}>{children}</div>
                </div>
            </Transition>
        </>
    );
};

const DropdownLink = ({ className = '', children, ...props }: InertiaLinkProps) => {
    return (
        <Link
            {...props}
            className={
                'block w-full rounded-md px-4 py-2 text-start text-sm leading-5 text-neutral-700 dark:text-neutral-300 bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-800 transition duration-150 ease-in-out ' +
                className
            }
        >
            {children}
        </Link>
    );
};

const DropdownButton = ({ className = '', children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            {...props}
            className={
                'block w-full rounded-md px-4 py-2 text-start text-sm leading-5 text-neutral-700 dark:text-neutral-300 bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-800 transition duration-150 ease-in-out '
            }
        >
            {children}
        </button>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;
Dropdown.Button = DropdownButton;

export default Dropdown;
