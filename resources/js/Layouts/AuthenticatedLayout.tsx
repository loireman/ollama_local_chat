import { useState, PropsWithChildren, ReactNode, useEffect } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ListResponse } from "ollama/browser";

type chatLink = {
    uuid: string;
    name: string;
    updated_at: string;
};

export default function Authenticated({
    user,
    header,
    chatID,
    models,
    selectedModel,
    setSelectedModel,
    children,
}: PropsWithChildren<{
    user: User;
    chatID?: string;
    header?: ReactNode;
    models?: ListResponse | undefined;
    selectedModel?: string;
    setSelectedModel?: React.Dispatch<React.SetStateAction<string>>;
}>) {
    const [_chatLinks, _setChatLinks] = useState<Array<chatLink>>([]);

    const ollamaList = async () => {
        try {
            const response = await fetch(route("chatroom.index"), {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + user.provider_token,
                },
            });
            const data = await response.json();
            _setChatLinks(data[0]);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    async function deleteChat(e: any, uuid: string) {
        e.preventDefault();

        if (!confirm("Are you sure you want to delete chat '" + uuid + "'?"))
            return;

        try {
            const response = await fetch(route("chatroom.destroy", uuid), {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uuid: uuid,
                }),
            });
            const data = await response.json();

            const url = new URL(window.location.href);
            const paramName = "id";

            if (url.searchParams.has(paramName, uuid)) {
                url.searchParams.set(paramName, "");
                window.history.pushState({}, "", url);
                window.location.reload();
            }

            ollamaList();
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    useEffect(() => {
        ollamaList();
    }, [chatID]);

    return (
        <div className="min-h-screen bg-gray-50 text-black/50 dark:bg-neutral-950 dark:text-white/50 flex">
            <nav className="bg-gray-50 dark:bg-neutral-950 border-r-2 border-neutral-100 dark:border-neutral-700">
                <div className="w-56 lg:w-80 px-4">
                    <div className="flex flex-col justify-between min-h-screen">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <div className="-mx-4 px-8 py-4 hover:cursor-pointer bg-neutral-800 text-neutral-200">
                                    <span className="text-lg font-semibold">
                                        Selected AI Model:{" "}
                                    </span>
                                    <br />
                                    <span>{selectedModel}</span>
                                </div>
                            </Dropdown.Trigger>
                            <Dropdown.Content
                                verticalAlign="top"
                                align="left"
                                className="w-full lg:w-72 shadow-md bg-neutral-700"
                            >
                                {models?.models.map((item, key) => (
                                    <Dropdown.Button
                                        key={key}
                                        onClick={() => {
                                            if(setSelectedModel)
                                            setSelectedModel(item.name);
                                        }}
                                    >
                                        <span className="whitespace-nowrap">
                                            {item.name}
                                        </span>
                                    </Dropdown.Button>
                                ))}
                            </Dropdown.Content>
                        </Dropdown>
                        <div className="flex justify-start w-full my-6 overflow-scroll">
                            <Link
                                href={route("dashboard")}
                                className={`${
                                    chatID
                                        ? "bg-neutral-800"
                                        : "bg-neutral-600 text-neutral-200"
                                } px-4 py-2 rounded-lg flex w-full justify-center items-center font-medium`}
                            >
                                New chat{" "}
                                <Icon icon="mdi:plus" height={18} width={18} />
                            </Link>
                        </div>
                        <div className="flex flex-1 flex-col justify-start gap-2 overflow-scroll">
                            {_chatLinks.toReversed().map((item, key) => (
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
                                    <button
                                        className="ml-1 z-10 p-2 rounded-lg hover:bg-neutral-500"
                                        onClick={(e) =>
                                            deleteChat(e, item.uuid)
                                        }
                                    >
                                        <Icon
                                            icon="mdi:delete"
                                            height={18}
                                            width={18}
                                        />
                                    </button>
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

                                    <Dropdown.Content
                                        className="min-w-64 bg-neutral-700"
                                        align="left"
                                    >
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
                    <header className="bg-white dark:bg-neutral-800 shadow">
                        <div className="max-w-7xl mx-auto py-4 h-[60px] px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <main>{children}</main>
            </div>
        </div>
    );
}
