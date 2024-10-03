import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { ListResponse, Ollama } from "ollama/browser";
import { User } from "@/types";
import InputField from "./InputField";
import MessageField from "./MessageField";
import Dropdown from "@/Components/Dropdown";
import { useForm } from "@inertiajs/react";

type Message = {
    role: string;
    content: string;
    model: string;
};

const Chat = ({
    user,
    chatID = "",
    setChatID,
}: PropsWithChildren<{
    user: User;
    chatID: string;
    setChatID: React.Dispatch<React.SetStateAction<string>>;
}>) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const messageContainerRef = useRef<HTMLDivElement | null>(null);

    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [models, setModels] = useState<ListResponse>();
    const [selectedModel, setSelectedModel] = useState<string>("");
    const [_chatID, _setChatID] = useState("");

    const ollama = new Ollama({ host: "http://127.0.0.1:11434" });

    useEffect(() => {
        const ollamaList = async () => {
            if (ollama) {
                const list = await ollama.list();

                setModels(list);
                if (list) {
                    setSelectedModel(list.models[0].name);
                }
            }
        };

        const getMessages = async () => {
            if (chatID) {
                try {
                    const response = await fetch(route("chat.messages"), {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + user.provider_token,
                        },
                        body: JSON.stringify({chat_id: chatID})
                    });
                    const data = await response.json();
                    setMessages(data[0]);

                    setSelectedModel(await data[0][data[0].length - 1].model);
                } catch (error) {
                    console.error("Error:", error);
                }
            }
        };

        ollamaList();
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
        if (!newMessage) return; // Do nothing if message is empty

        setIsLoading(true);
        const userMessage = {
            role: "user",
            content: newMessage,
            model: selectedModel,
        }; // Structure user message
        let aiMessageContent = "";
        let chat_id = chatID;

        // Append user message to the messages state
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // Clear the input box
        setNewMessage("");

        try {
            // Fetch AI response from the Ollama model via streaming
            const response = await ollama.chat({
                model: selectedModel,
                messages: [...messages, userMessage], // Send previous messages plus new one
                stream: true, // Enable streaming
            });

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
                            model: selectedModel,
                        });
                    }

                    return updatedMessages;
                });
            }
        } catch (error) {
            console.error("Error fetching AI response:", error);
        } finally {
            setIsLoading(false); // Reset loading state

            if (!chat_id) {
                const title = await ollama.generate({
                    model: selectedModel,
                    prompt:
                        "Create a title which contains less than 32 characters containing only spaces, letters and numbers, no comments, no special characters, no line breaks, and no extra words based on next context: " +
                        aiMessageContent, // Send previous messages plus new one
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
                        }), // Ensure the key matches what your Laravel controller expects
                    });
                    const data = await response.json();
                    chat_id = await data.chat_id

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

        console.log(userMessage, aiMessageContent);

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
            <div className="absolute top-5 left-5 z-10 ">
                <Dropdown>
                    <Dropdown.Trigger>
                        <div className="px-4 py-2 bg-neutral-800/95 rounded-xl text-neutral-200 hover:cursor-pointer">
                            <span className="text-xl font-semibold">
                                Model:
                            </span>
                            <br />
                            <span>{selectedModel}</span>
                        </div>
                    </Dropdown.Trigger>
                    <Dropdown.Content
                        verticalAlign="top"
                        align="left"
                        width="w-full"
                    >
                        {models?.models.map((item, key) => (
                            <Dropdown.Button
                                key={key}
                                onClick={() => {
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
            </div>
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
                            <MessageField
                                photo_path={user.photo_path}
                                username={user.name}
                                message={message}
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
