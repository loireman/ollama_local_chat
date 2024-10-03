import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

import Markdown from "react-markdown";
import CodeBlock from "./CodeBlock";

type Message = {
    role: string;
    content: string;
    model: string;
};

export default function MessageField({
    message,
    photo_path = "",
    username = "",
}: {
    message: Message;
    photo_path: string | undefined;
    username: string | undefined;
}) {
    return (
        <>
            {message.role === "user" ? (
                <>
                    <img
                        className="rounded-full p-1 bg-neutral-500 self-end flex-shrink-0"
                        width={32}
                        height={32}
                        src={photo_path}
                    />
                    <div className="flex flex-col justify-end">
                        <span className="text-end text-sm font-medium text-neutral-300">
                            {username}
                        </span>
                        <div className="bg-neutral-300 dark:bg-neutral-700 ml-12 p-4 rounded-xl whitespace-pre-wrap">
                            {message.content}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Icon
                        className="rounded-full p-1.5 bg-[#FF2D20]/30 text-[#FF2D20] self-end flex-shrink-0"
                        width={32}
                        height={32}
                        icon="mdi:server-outline"
                    />
                    <div className="flex flex-col justify-start">
                        <span className="text-start text-sm font-medium text-neutral-300">
                            {message.model}
                        </span>
                        <div className="bg-neutral-200 dark:bg-neutral-800 mr-12 p-4 rounded-xl whitespace-pre-wrap">
                            <Markdown
                                children={message.content}
                                components={{
                                    code(props) {
                                        const {
                                            children,
                                            className,
                                            node,
                                            ...rest
                                        } = props;
                                        const match = /language-(\w+)/.exec(
                                            className || ""
                                        );
                                        return match ? (
                                            <CodeBlock
                                                language={match[1]}
                                                children={String(children)}
                                            />
                                        ) : (
                                            <code
                                                {...rest}
                                                className={className}
                                            >
                                                {children}
                                            </code>
                                        );
                                    },
                                }}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
