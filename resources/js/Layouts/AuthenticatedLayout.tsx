import { useState, PropsWithChildren, ReactNode, useEffect } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";

type chatLink = {
    uuid: string;
    name: string;
    updated_at: string;
};

export default function Authenticated({
    user,
    header,
    chatID,
    children,
}: PropsWithChildren<{ user: User; chatID?: string; header?: ReactNode }>) {
    const [chatLinks, setChatLinks] = useState<Array<chatLink>>([]);

    useEffect(() => {
        const ollamaList = async () => {
            try {
                const response = await fetch(route("chatroom.index"), {
                    method: "GET",
                    mode: 'cors',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + user.provider_token,
                    },
                });
                const data = await response.json();
                setChatLinks(data[0]);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        ollamaList();
        console.log(chatID);
    }, [chatID]);

    return (
        <div className="min-h-screen bg-gray-50 text-black/50 dark:bg-neutral-950 dark:text-white/50 flex">
            <nav className="bg-gray-50 dark:bg-neutral-950 border-r border-gray-100 dark:border-gray-700">
                <div className="max-w-xs px-4">
                    <div className="flex flex-col justify-between min-h-screen">
                        <div className="flex justify-end items-center h-16">
                            <Link href={route("dashboard")}>
                                <div className={`${chatID ? "bg-neutral-800" : "bg-neutral-600"} p-2 rounded-lg`}>
                                    <Icon
                                        icon="mdi:plus"
                                        height={24}
                                        width={24}
                                    />
                                </div>
                            </Link>
                        </div>
                        <div className="flex flex-1 flex-col justify-start gap-2 overflow-scroll">
                            {chatLinks.toReversed().map((item, key) => (
                                <NavLink
                                    key={key}
                                    href={route("dashboard", { id: item.uuid })}
                                    active={route().current("dashboard", {
                                        id: item.uuid,
                                    })}
                                >
                                    <span
                                        title={item.name}
                                        className="inline-flex w-full justify-start overflow-hidden text-nowrap text-ellipsis"
                                    >
                                        {item.name}
                                    </span>
                                </NavLink>
                            ))}
                        </div>

                        <div className="h-fit my-4">
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className="w-full inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-neutral-600 dark:text-gray-300 bg-neutral-200 dark:bg-neutral-800 hover:text-neutral-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {user.name}
                                            <img
                                                className="rounded-full p-0.5 ml-2 bg-neutral-600 dark:bg-neutral-300"
                                                width={36}
                                                height={36}
                                                src={user.photo_path}
                                            />
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content width="min-w-48 w-fit" align="left">
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="w-full">
                {header && (
                    <header className="bg-white dark:bg-gray-800 shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <main>{children}</main>
            </div>
        </div>
    );
}
