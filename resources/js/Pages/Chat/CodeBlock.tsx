import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";

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
            <div className="bg-neutral-900 border-neutral-600 border p-2 w-full flex justify-between rounded-t-lg">
                <span className="p-1 text-neutral-200 dark:text-neutral-300">
                    {language}
                </span>
                <button
                    onClick={() => handleCopy(children)}
                    className="flex gap-1 items-center bg-neutral-200 dark:bg-neutral-800 px-2 py-1 rounded-lg"
                >
                    <Icon width={18} height={18} icon="mdi:content-copy" />
                    {isCopied ? "copied!" : "copy code"}
                </button>
            </div>
            <div className="border border-neutral-600 border-t-0">
                <SyntaxHighlighter
                    language={language}
                    style={monokaiSublime}
                >
                    {children.replace(/\n$/, "")}
                    </SyntaxHighlighter>
            </div>
        </>
    );
}
