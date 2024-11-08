import GuestLayout from "@/Layouts/GuestLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link } from "@inertiajs/react";
import { Icon } from "@iconify/react";

export default function Login() {
    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="p-4 text-xl dark:text-gray-200 text-center">
                Увійти до системи контролю фінансів
            </div>

            <a
                href={route("auth.socialite.redirect")}
                className="flex gap-2 w-full justify-center items-center bg-neutral-600 hover:bg-neutral-700 py-4 px-4 rounded-lg font-semibold text-gray-300"
            >
                Log in with{" "}
                <Icon icon="logos:google-icon" width={24} height={24} />
            </a>
        </GuestLayout>
    );
}
