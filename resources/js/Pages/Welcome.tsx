import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import CodeBlockLite from "@/Components/CodeBlockLite";

const TextLoop = ({ texts }: { texts: Array<string> }) => {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (currentIndex < texts.length) {
            let textToDisplay = texts[currentIndex];

            if (isDeleting) {
                // Delete letter by letter
                if (displayText.length > 0) {
                    setTimeout(() => {
                        setDisplayText((prev) =>
                            prev.slice(0, displayText.length - 1)
                        );
                    }, 100);
                } else {
                    setTimeout(() => {
                        setIsDeleting(false);
                        setCurrentIndex((prev) => (prev + 1) % texts.length); // Move to the next text or wrap around
                    }, 500); // Delay before moving to the next word
                }
            } else {
                // Write letter by letter
                if (displayText.length < textToDisplay.length) {
                    setTimeout(() => {
                        setDisplayText(
                            (prev) => prev + textToDisplay[prev.length]
                        );
                    }, 200); // Adjust the speed of writing by changing this delay
                } else {
                    setTimeout(() => {
                        setIsDeleting(true);
                    }, 2000); // Pause before starting to delete
                }
            }
        }
    }, [displayText, currentIndex, isDeleting]);

    return (
        <div
            className="text-3xl lg:text-5xl font-semibold whitespace-pre-wrap"
            style={{ fontFamily: "Source Code Pro, monospace" }}
        >
            <span className="text-cyan-800 font-bold">Допоможи </span>
            {displayText}
            <span className="pl-0.5 border-r border-white"></span>
        </div>
    );
};

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const texts = [
        "переробити цей код для більшої ефективності",
        "створити діаграму потоків для процесу",
        "оптимізувати продуктивність веб-сайту",
        "проаналізувати відгуки користувачів",
        "перекласти цей документ українською мовою",
        "знайти помилки у програмі",
        "підготувати резюме з тексту",
        "створити макет інтерфейсу користувача",
        "написати лист клієнтам",
        "під'єбать Єгора і Вову",
        "оновити документацію програмного забезпечення",
        "реалізувати шифрування даних",
        "провести тестування нових функцій",
        "проаналізувати ринкові тренди",
        "скласти план бюджету",
        "розробити маркетингову стратегію",
        "згенерувати корисні відомості з даних",
        "написати поему про природу",
        "оптимізувати запити до бази даних",
        "написати сценарій для презентації",
        "створити логотип для стартапу",
        "провести онлайн-анкетування",
        "оновити контент у соціальних мережах",
        "скласти план резервного копіювання",
        "розробити прототип мобільного додатку",
        "проаналізувати конкурентну боротьбу в галузі",
        "написати прес-реліз",
        "спланувати маршрут події",
        "згенерувати список потенційних клієнтів",
        "покращити стратегії SEO",
    ];

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-neutral-950 dark:text-white/50 min-h-screen w-full m-0">
                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="h-screen flex flex-col-reverse items-center justify-end gap-20 lg:grid lg:grid-cols-2 lg:justify-between lg:gap-10 py-10">
                            <TextLoop texts={texts} />
                            <nav className="grid gap-4 text-neutral-900 dark:text-neutral-200 font-semibold">
                                <span className="text-3xl lg:text-5xl lg:text-end">
                                    <span className="text-purple-700">ШІ</span>{" "}
                                    для домашнього використання за допомогою{" "}
                                    <span className="text-purple-700">
                                        ollama
                                    </span>{" "}
                                    та локальних моделей
                                </span>
                                <div className="flex gap-2">
                                    <a
                                        href={
                                            auth.user
                                                ? route("dashboard")
                                                : route(
                                                      "auth.socialite.redirect"
                                                  )
                                        }
                                        className="flex gap-2 w-full justify-center items-center bg-neutral-600 hover:bg-neutral-700 py-4 px-4 rounded-lg font-semibold text-gray-300"
                                    >
                                        {auth.user ? (
                                            <>
                                                Перейти до чату{" "}
                                                <Icon
                                                    width={24}
                                                    height={24}
                                                    icon="mdi:arrow-right"
                                                />
                                            </>
                                        ) : (
                                            <>
                                                Увійти за допомогою{" "}
                                                <Icon
                                                    icon="logos:google-icon"
                                                    width={24}
                                                    height={24}
                                                />
                                            </>
                                        )}
                                    </a>
                                    <a
                                        href="https://github.com/loireman/ollama_local_chat"
                                        target="blank"
                                        className="flex gap-2 w-fit justify-center items-center bg-neutral-600 hover:bg-neutral-700 py-4 px-4 rounded-lg font-semibold text-gray-300"
                                    >
                                        <Icon
                                            width={24}
                                        height={24}
                                        icon="mdi:github"
                                        />
                                    </a>
                                </div>
                            </nav>
                        </header>

                        <main className="-mt-36">
                            <div className="grid gap-6 lg:gap-8">
                                <h2 className="text-4xl font-semibold text-black dark:text-white">
                                    Як запустити?
                                </h2>

                                {/* Step 1: Ollama Installation */}
                                <div className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]">
                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16">
                                        <Icon
                                            width={32}
                                            height={32}
                                            icon="mdi:download"
                                            color="#FF2D20"
                                        />
                                    </div>

                                    <div className="pt-3 sm:pt-5">
                                        <h2 className="text-xl font-semibold text-black dark:text-white">
                                            Крок 1: Встановлення Ollama
                                        </h2>

                                        <div className="mt-4">
                                            <h2 className="text-xl font-semibold text-black dark:text-white">
                                                Для Linux:
                                            </h2>
                                            <CodeBlockLite
                                                language="bash"
                                                children="curl -fsSL https://ollama.com/install.sh | sh"
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <h2 className="text-xl font-semibold text-black dark:text-white">
                                                Для macOS:
                                            </h2>
                                            <p className="mt-2 text-sm/relaxed">
                                                Завантажте останню версію з{" "}
                                                <a
                                                    href="https://ollama.com/download/macos"
                                                    target="blank"
                                                    className="px-4 py-2 bg-neutral-700 hover:bg-neutral-800 text-white rounded-lg flex gap-2 w-fit"
                                                >
                                                    Завантажити Ollama для MacOS
                                                    <Icon
                                                        width={24}
                                                        height={24}
                                                        icon="mdi:download"
                                                    />
                                                </a>{" "}
                                                та перемістіть додаток у папку
                                                Applications
                                            </p>
                                        </div>

                                        <div className="mt-4">
                                            <h2 className="text-xl font-semibold text-black dark:text-white mb-2">
                                                Для Windows:
                                            </h2>
                                            <a
                                                href="https://ollama.com/download/windows"
                                                target="blank"
                                                className="px-4 py-2 text-sm/relaxed bg-neutral-700 hover:bg-neutral-800 text-white rounded-lg flex gap-2 w-fit"
                                            >
                                                Завантажити Ollama для Windows
                                                <Icon
                                                    width={24}
                                                    height={24}
                                                    icon="mdi:download"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 2: Model Installation */}
                                <div className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]">
                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16">
                                        <Icon
                                            width={32}
                                            height={32}
                                            icon="mdi:cog"
                                            color="#FF2D20"
                                        />
                                    </div>

                                    <div className="pt-3 sm:pt-5">
                                        <h2 className="text-xl font-semibold text-black dark:text-white">
                                            Крок 2: Запуск сервісу та
                                            встановлення моделей
                                        </h2>

                                        <div className="mt-4">
                                            <h3 className="text-lg font-semibold text-black dark:text-white">
                                                Спочатку запустіть сервіс:
                                            </h3>
                                            <CodeBlockLite
                                                language="bash"
                                                children="ollama serve"
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <h3 className="text-lg font-semibold text-black dark:text-white">
                                                Встановіть рекомендовані моделі:
                                            </h3>
                                            <CodeBlockLite
                                                language="bash"
                                                children={`# Основна модель для програмування
ollama pull deepseek-coder-v2:latest

# Додаткові моделі
ollama pull codellama:7b
ollama pull mistral:7b`}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Step 3: Project Setup */}
                                <div className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]">
                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16">
                                        <Icon
                                            width={32}
                                            height={32}
                                            icon="mdi:git"
                                            color="#FF2D20"
                                        />
                                    </div>

                                    <div className="pt-3 sm:pt-5">
                                        <h2 className="text-xl font-semibold text-black dark:text-white">
                                            Крок 3: Встановлення проекту
                                        </h2>

                                        <div className="mt-4">
                                            <h3 className="text-lg font-semibold text-black dark:text-white">
                                                Клонування репозиторію:
                                            </h3>
                                            <CodeBlockLite
                                                language="bash"
                                                children={`git clone https://github.com/loireman/ollama_local_chat
cd ollama_local_chat`}
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <h3 className="text-lg font-semibold text-black dark:text-white">
                                                Встановлення залежностей:
                                            </h3>
                                            <CodeBlockLite
                                                language="bash"
                                                children={`composer install
npm install`}
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <h3 className="text-lg font-semibold text-black dark:text-white">
                                                Налаштування середовища:
                                            </h3>
                                            <CodeBlockLite
                                                language="bash"
                                                children={`cp .env.example .env
php artisan key:generate`}
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <h3 className="text-lg font-semibold text-black dark:text-white">
                                                Налаштування бази даних:
                                            </h3>
                                            <CodeBlockLite
                                                language="env"
                                                children={`DB_CONNECTION=sqlite`}
                                            />
                                            <p className="mt-2 text-sm/relaxed">
                                                Додайте ці рядки до файлу .env
                                            </p>
                                        </div>

                                        <div className="mt-4">
                                            <h3 className="text-lg font-semibold text-black dark:text-white">
                                                Налаштування Google OAuth:
                                            </h3>
                                            <CodeBlockLite
                                                language="env"
                                                children={`GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=your_redirect_uri`}
                                            />
                                            <p className="mt-2 text-sm/relaxed">
                                                Замініть значення на ваші
                                                облікові дані Google OAuth
                                            </p>
                                        </div>

                                        <div className="mt-4">
                                            <h3 className="text-lg font-semibold text-black dark:text-white">
                                                Міграція бази даних:
                                            </h3>
                                            <CodeBlockLite
                                                language="bash"
                                                children="php artisan migrate"
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <h3 className="text-lg font-semibold text-black dark:text-white">
                                                Збірка фронтенду:
                                            </h3>
                                            <CodeBlockLite
                                                language="bash"
                                                children="npm run build"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Step 4: Application Setup */}
                                <div className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]">
                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16">
                                        <Icon
                                            width={32}
                                            height={32}
                                            icon="mdi:rocket"
                                            color="#FF2D20"
                                        />
                                    </div>

                                    <div className="pt-3 sm:pt-5">
                                        <h2 className="text-xl font-semibold text-black dark:text-white">
                                            Крок 4: Початок роботи
                                        </h2>

                                        <p className="my-4 text-sm/relaxed">
                                            Тепер ви можете увійти та розпочати
                                            спілкування з ШІ
                                        </p>

                                        <a
                                            href={
                                                auth.user
                                                    ? route("dashboard")
                                                    : route(
                                                          "auth.socialite.redirect"
                                                      )
                                            }
                                            className="flex gap-2 w-full justify-center items-center bg-neutral-600 hover:bg-neutral-700 py-4 px-4 rounded-lg font-semibold text-gray-300"
                                        >
                                            {auth.user ? (
                                                <>
                                                    Перейти до чату{" "}
                                                    <Icon
                                                        width={24}
                                                        height={24}
                                                        icon="mdi:arrow-right"
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    Увійти за допомогою{" "}
                                                    <Icon
                                                        icon="logos:google-icon"
                                                        width={24}
                                                        height={24}
                                                    />
                                                </>
                                            )}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            <div className="flex flex-col items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <span>© 2024 Andy Loiri</span>
                                    <a
                                        href="https://github.com/loireman/ollama_local_chat"
                                        target="blank"
                                        className="flex gap-2 items-center hover:text-neutral-600 dark:hover:text-white/90"
                                    >
                                        <Icon
                                            width={20}
                                            height={20}
                                            icon="mdi:github"
                                        />
                                        GitHub Repository
                                    </a>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
