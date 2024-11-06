// src/components/Dashboard.js (updated)
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Chat from "@/Layouts/Chat";
import { useEffect, useState } from "react";
import { ListResponse, Ollama } from "ollama/browser";

export default function Dashboard({ auth, chatID }: PageProps) {
    const [_models, _setModels] = useState<ListResponse>();
    const [_chatID, _setChatID] = useState(chatID);
    const [_selectedModel, _setSelectedModel] = useState("");

    const _ollama = new Ollama({ host: "http://127.0.0.1:11434" });

    const _ollamaModels = async () => {
        if (_ollama) {
            const list = await _ollama.list();

            _setModels(list);
            if (list) {
                if (auth.user.preferred_model){
                    _setSelectedModel(auth.user.preferred_model)
                } else {
                    _setSelectedModel(list.models[0].name);
                }
            }
        }
    };

    useEffect(() => {
        _ollamaModels();
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            chatID={_chatID}
            models={_models}
            selectedModel={_selectedModel}
            setSelectedModel={_setSelectedModel}
        >
            <Head title="Chat" />

            <Chat
                user={auth.user}
                ollama={_ollama}
                chatID={_chatID}
                setChatID={_setChatID}
                selectedModel={_selectedModel}
                setSelectedModel={_setSelectedModel}
            />
        </AuthenticatedLayout>
    );
}
