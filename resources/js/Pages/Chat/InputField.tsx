import { Icon } from "@iconify/react/dist/iconify.js";
import React, { MutableRefObject, useRef } from "react";

export default function InputField({
    isLoading = false,
    textareaRef,
    handleSendMessage,
    newMessage = "",
    setNewMessage
}: { isLoading: boolean, textareaRef: MutableRefObject<HTMLTextAreaElement | null> | undefined, newMessage: string, handleSendMessage: Function, setNewMessage: Function }) {
    return (
        <div className="absolute bottom-0 left-0 px-16 p-6 w-full">
            <div
                className={`flex justify-around items-center gap-8 bg-neutral-200 dark:bg-neutral-600 p-2 rounded-xl`}
            >
                <textarea
                    className={`${
                        isLoading ? "cursor-not-allowed" : ""
                    } flex-1 resize-none rounded-md bg-transparent text-black dark:text-gray-100 placeholder-gray-200 border-0 focus:ring-0`}
                    autoFocus
                    id="messageArea"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    rows={1}
                    disabled={isLoading}
                    ref={textareaRef}
                    onKeyDown={(e) => {
                        if (e.key == "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                />
                <button
                    onClick={() => {
                        handleSendMessage();
                    }}
                    disabled={isLoading}
                    className="h-10 w-10 bg-neutral-700 dark:bg-neutral-100 rounded-full grid place-items-center self-end"
                >
                    <Icon
                        icon={isLoading ? "mdi:loading" : "mdi:send"}
                        className={`${isLoading ? "animate-spin" : ""} text-neutral-200 dark:text-neutral-600`}
                        width={24}
                        height={24}
                    />
                </button>
            </div>
        </div>
    );
}
