import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Ollama } from "ollama/browser";
import { User } from "@/types";
import InputField from "./InputField";
import MessageField from "./MessageField";

type Message = {
    role: string;
    content: string;
};

const Chat = ({ user }: PropsWithChildren<{ user: User }>) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const messageContainerRef = useRef<HTMLDivElement | null>(null);

    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const ollama = new Ollama({ host: 'http://myfakedomain.notarealtld:11434' })

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";

            const scrollHeight = textareaRef.current.scrollHeight;

            const minHeight = 2.5 * 16; // 2.5rem in pixels
            const maxHeight = 16 * 16; // 8rem in pixels
            let height = 80;

            if (scrollHeight < minHeight) {
                height += minHeight;
                textareaRef.current.style.height = `${minHeight}px`;
            } else if (scrollHeight > maxHeight) {
                height += maxHeight;
                textareaRef.current.style.height = `${maxHeight}px`;
            } else {
                height += scrollHeight;
                textareaRef.current.style.height = `${scrollHeight}px`;
            }

            if (messageContainerRef.current)
                messageContainerRef.current.style.paddingBottom = `${height}px`;

            textareaRef.current.focus();
        }
    }, [newMessage]);

    // Function to handle sending a message
    const handleSendMessage = async () => {
        if (!newMessage) return; // Do nothing if message is empty

        setIsLoading(true);
        const userMessage = { role: "user", content: newMessage }; // Structure user message

        // Append user message to the messages state
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // Clear the input box
        setNewMessage(""); 

        try {
            // Fetch AI response from the Ollama model via streaming
            const response = await ollama.chat({
                model: "deepseek-coder-v2",
                messages: [...messages, userMessage], // Send previous messages plus new one
                stream: true, // Enable streaming
            });

            let aiMessageContent = "";

            for await (const part of response) {
                const contentPart = part.message.content;

                aiMessageContent += contentPart;

                // Update messages in the state
                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages];
                    const lastMessage =
                        updatedMessages[updatedMessages.length - 1];

                    if (lastMessage?.role === "assistant") {
                        // Update the assistant's message content as it streams
                        updatedMessages[updatedMessages.length - 1].content =
                            aiMessageContent;
                    } else {
                        // Add a new assistant message if the last one is not from the assistant
                        updatedMessages.push({
                            role: "assistant",
                            content: aiMessageContent,
                        });
                    }

                    return updatedMessages;
                });
            }
        } catch (error) {
            console.error("Error fetching AI response:", error);
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        <div
            ref={messageContainerRef}
            className="w-full h-screen max-w-7xl mx-auto relative"
        >
            <ul className="flex flex-col-reverse gap-6 text-black dark:text-white h-full w-full overflow-y-scroll p-6 scroll-smooth scroll-me-6">
                {messages.toReversed().map((message, index) => (
                    <li
                        key={index}
                        className={`${
                            message.role === "user"
                                ? "flex-row-reverse"
                                : "flex-row"
                        } flex gap-2`}
                    >
                        <MessageField photo_path={user.photo_path} message={message} />
                    </li>
                ))}
            </ul>
            <InputField
                isLoading={isLoading}
                textareaRef={textareaRef}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleSendMessage={handleSendMessage}
            />
        </div>
    );
};

export default Chat;
