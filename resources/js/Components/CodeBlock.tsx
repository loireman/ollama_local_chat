import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function CodeBlock({
    language,
    children,
}: {
    language: string;
    children: string;
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
            <div className="bg-[#272822] border-neutral-600 border rounded-xl overflow-hidden pb-2 relative">
                <div className="bg-[#242329] px-2 py-4 w-full flex justify-between items-center">
                    <span className="px-2 select-none text-neutral-200 dark:text-neutral-300 text-sm">
                        {language}
                    </span>
                </div>
                <div className="sticky top-8">
                    <button
                        onClick={() => handleCopy(children)}
                        className="bg-neutral-200 dark:bg-neutral-700 px-2 py-1 aspect-square rounded-lg absolute bottom-2 right-2 flex items-center"
                    >
                        {isCopied ? (
                            <Icon width={18} height={18} icon="mdi:success" />
                        ) : (
                            <Icon
                                width={18}
                                height={18}
                                icon="mdi:content-copy"
                            />
                        )}
                    </button>
                </div>
                <div className="px-2">
                    <SyntaxHighlighter language={language} style={monokai}>
                        {children.replace(/\n$/, "")}
                    </SyntaxHighlighter>
                </div>
            </div>
        </>
    );
}
