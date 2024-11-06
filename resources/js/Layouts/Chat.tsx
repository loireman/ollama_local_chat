import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Ollama } from "ollama/browser";
import { User } from "@/types";
import InputField from "@/Components/InputField";
import MessageField from "@/Components/MessageField";

type Message = {
    role: string;
    content: string;
    model: string;
};

const Chat = ({
    user,
    ollama,
    chatID = "",
    setChatID,
    selectedModel = "",
    setSelectedModel,
}: PropsWithChildren<{
    user: User;
    ollama: Ollama;
    chatID: string;
    setChatID: React.Dispatch<React.SetStateAction<string>>;
    selectedModel: string;
    setSelectedModel: React.Dispatch<React.SetStateAction<string>>;
}>) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const messageContainerRef = useRef<HTMLDivElement | null>(null);

    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [_chatID, _setChatID] = useState("");
    const [_responseTime, _setResponseTime] = useState<number>();

    useEffect(() => {
        const getMessages = async () => {
            if (chatID) {
                try {
                    const response = await fetch(route("chat.messages"), {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + user.provider_token,
                        },
                        body: JSON.stringify({ chat_id: chatID }),
                    });
                    const data = await response.json();
                    setMessages(data[0]);

                    setSelectedModel(await data[0][data[0].length - 1].model);
                } catch (error) {
                    console.error("Error:", error);
                }
            }
        };

        getMessages();
    }, []);

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

    const saveMessage = async (message: Message, chatID: string) => {
        try {
            const response = await fetch(route("chat.store"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat_id: chatID,
                    role: message.role,
                    content: message.content,
                    model: message.model,
                }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Function to handle sending a message
    const handleSendMessage = async () => {
        if (!newMessage) return;

        setIsLoading(true);
        const userMessage = {
            role: "user",
            content: newMessage,
            model: selectedModel,
        };
        let aiMessageContent = "";
        let chat_id = chatID;

        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setNewMessage("");

        try {
            const response = await ollama.chat({
                model: selectedModel,
                messages: [...messages, userMessage],
                stream: true,
            });

            for await (const part of response) {
                const contentPart = part.message.content;

                aiMessageContent += contentPart;

                if (part.done) {
                    _setResponseTime(
                        ((part.eval_count / part.eval_duration) * 10) ^ 9
                    );
                }

                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages];
                    const lastMessage =
                        updatedMessages[updatedMessages.length - 1];

                    if (lastMessage?.role === "assistant") {
                        updatedMessages[updatedMessages.length - 1].content =
                            aiMessageContent;
                    } else {
                        updatedMessages.push({
                            role: "assistant",
                            content: aiMessageContent,
                            model: selectedModel,
                        });
                    }
                    return updatedMessages;
                });
            }
        } catch (error) {
            console.error("Error fetching AI response:", error);
        } finally {
            setIsLoading(false);

            if (!chat_id) {
                const title = await ollama.generate({
                    model: selectedModel,
                    prompt:
                        `Given the following chat message(s), create a short, plain-text title that summarizes the main topic or purpose of the conversation in a single sentence. The title should be direct and concise, describing the essence of the conversation without additional details.
                Example:

                    Chat: 'Can you help me write code to calculate the Fibonacci sequence?'
                    Title: 'Request for Fibonacci Sequence Code Assistance'

                Messages: ` +
                        aiMessageContent +
                        ` Title:`,
                });

                try {
                    const response = await fetch(route("chatroom.store"), {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: title.response,
                            user_id: user.id,
                        }),
                    });
                    const data = await response.json();
                    chat_id = await data.chat_id;

                    setChatID(chat_id);

                    const url = new URL(window.location.href);
                    const paramName = "id";

                    if (url.searchParams.has(paramName)) {
                        url.searchParams.set(paramName, chat_id);
                    } else {
                        url.searchParams.append(paramName, chat_id);
                    }

                    window.history.pushState({}, "", url);

                    const urlChangeEvent = new Event("urlchange");
                    window.dispatchEvent(urlChangeEvent);
                } catch (error) {
                    console.error("Error:", error);
                }
            }
        }
        await saveMessage(userMessage, chat_id);
        await saveMessage(
            {
                role: "assistant",
                content: aiMessageContent,
                model: selectedModel,
            },
            chat_id
        );
    };

    return (
        <div className="w-full h-screen mx-auto relative">
            <div
                ref={messageContainerRef}
                className="w-full h-screen md:max-w-2xl lg:max-w-3xl xl:max-w-7xl mx-auto relative"
            >
                <ul className="flex flex-col-reverse gap-6 text-black dark:text-white h-full max-w-full overflow-y-scroll px-12 py-6 scroll-smooth scroll-me-6">
                    {messages.toReversed().map((message, index) => (
                        <li
                            key={index}
                            className={`${
                                message.role === "user"
                                    ? "flex-row-reverse"
                                    : "flex-row"
                            } flex gap-2`}
                        >
                            <MessageField
                                photo_path={user.photo_path}
                                username={user.name}
                                message={message}
                                responseTime={
                                    index == 0 ? _responseTime : undefined
                                }
                            />
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
        </div>
    );
};

export default Chat;
