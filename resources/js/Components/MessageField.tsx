import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import Markdown from "react-markdown";
import { useSpeech } from "react-text-to-speech";
import CodeBlockLite from "./CodeBlockLite";

type Message = {
    role: string;
    content: string;
    model: string;
};

export default function MessageField({
    message,
    photo_path = "",
    username = "",
    responseTime,
}: {
    message: Message;
    photo_path: string | undefined;
    username: string | undefined;
    responseTime: number | undefined;
}) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        });
    };

    return (
        <>
            {message.role === "user" ? (
                <div className="relative">
                    <img
                        className="rounded-full p-1 bg-neutral-500 self-end flex-shrink-0 absolute bottom-1 -right-10"
                        width={32}
                        height={32}
                        src={photo_path}
                    />
                    <div className="flex flex-col justify-end">
                        <div className="bg-neutral-200 dark:bg-neutral-800 p-4 rounded-xl whitespace-pre-wrap md:max-w-[620px] lg:max-w-3xl xl:max-w-[1220px]">
                            {message.content}
                            <div className="flex gap-2 items-center justify-between select-none mt-3">
                                <span className="text-end text-sm font-medium text-neutral-300">
                                    {username}
                                </span>
                                <button
                                    onClick={() => handleCopy(message.content)}
                                    className="p-1 aspect-square rounded-lg"
                                >
                                    {isCopied ? (
                                        <Icon
                                            width={18}
                                            height={18}
                                            icon="mdi:success"
                                        />
                                    ) : (
                                        <Icon
                                            width={18}
                                            height={18}
                                            icon="mdi:content-copy"
                                        />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative">
                    <Icon
                        className="rounded-full p-1.5 bg-[#FF2D20]/30 text-[#FF2D20] self-end flex-shrink-0 absolute bottom-1 -left-10"
                        width={32}
                        height={32}
                        icon="mdi:server-outline"
                    />
                    <div className="flex flex-col justify-start">
                        <div className="md:max-w-[620px] lg:max-w-3xl xl:max-w-[1220px]">
                            <div className=" mr-12 p-4 pb-2 rounded-xl whitespace-pre-wrap">
                                <Markdown
                                    className="max-w-full font-medium"
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
                                                <CodeBlockLite
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
                                <div className="flex gap-2 items-center justify-between mt-3">
                                    <button
                                        onClick={() =>
                                            handleCopy(message.content)
                                        }
                                        className="p-1 aspect-square rounded-lg"
                                    >
                                        {isCopied ? (
                                            <Icon
                                                width={18}
                                                height={18}
                                                icon="mdi:success"
                                            />
                                        ) : (
                                            <Icon
                                                width={18}
                                                height={18}
                                                icon="mdi:content-copy"
                                            />
                                        )}
                                    </button>
                                    <span className="px-2 text-start text-sm font-medium select-none text-neutral-300">
                                        {message.model}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
