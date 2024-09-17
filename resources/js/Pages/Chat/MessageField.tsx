import { Icon } from "@iconify/react/dist/iconify.js";
import { Message } from "ollama";
import { useState } from "react";

import Markdown from "react-markdown";
import CodeBlock from "./CodeBlock";

export default function MessageField({
    message,
    photo_path = "",
}: {
    message: Message;
    photo_path: string | undefined;
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
                    <div className="bg-neutral-300 dark:bg-neutral-700 ml-12 p-4 rounded-xl whitespace-pre-wrap">
                        {message.content}
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
                                        <code {...rest} className={className}>
                                            {children}
                                        </code>
                                    );
                                },
                            }}
                        />
                    </div>
                </>
            )}
        </>
    );
}
