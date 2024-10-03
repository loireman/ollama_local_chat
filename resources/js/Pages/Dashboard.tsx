// src/components/Dashboard.js (updated)
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Chat from "./Chat/Chat";
import { useEffect, useState } from "react";

export default function Dashboard({ auth, chatID }: PageProps) {
    const [_chatID, _setChatID] = useState(chatID);
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            chatID={_chatID}
        >
            <Head title="Chat" />

            <Chat user={auth.user} chatID={_chatID} setChatID={_setChatID} />
        </AuthenticatedLayout>
    );
}
