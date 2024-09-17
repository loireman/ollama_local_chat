import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import CodeBlock from "./Chat/CodeBlock";

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
                                <a
                                    href={
                                        auth.user
                                            ? route("dashboard")
                                            : route("auth.socialite.redirect")
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
                            </nav>
                        </header>

                        <main className="-mt-36">
                            <div className="grid gap-6 lg:gap-8">
                                <h2 className="text-4xl font-semibold text-black dark:text-white">
                                    Як запустити?
                                </h2>
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
                                            Крок 1: Встановлення ollama
                                        </h2>

                                        <p className="mt-4 text-sm/relaxed">
                                            Встановлення OLLAMA надасть
                                            користувачам зручний доступ до
                                            різноманітних моделей штучного
                                            інтелекту
                                        </p>

                                        <div className="mt-4">
                                            <h2 className="text-xl font-semibold text-black dark:text-white">
                                                Для Linux:
                                            </h2>
                                            <CodeBlock
                                                language="bash"
                                                children="curl -fsSL https://ollama.com/install.sh | sh"
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <h2 className="text-xl font-semibold text-black dark:text-white mb-2">
                                                Для Windows:
                                            </h2>
                                            <a
                                                href="https://ollama.com/download/windows"
                                                target="blank"
                                                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-800 text-white rounded-lg flex gap-2 w-fit"
                                            >
                                                Перейти за посиланням
                                                <Icon
                                                    width={24}
                                                    height={24}
                                                    icon="mdi:arrow-right"
                                                />
                                            </a>
                                        </div>

                                        <img
                                            className="rounded-lg mx-auto mt-4"
                                            src="/storage/installation/ollama_windows.png"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]">
                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16">
                                        <Icon
                                            width={32}
                                            height={32}
                                            icon="mdi:document"
                                            color="#FF2D20"
                                        />
                                    </div>

                                    <div className="pt-3 sm:pt-5">
                                        <h2 className="text-xl font-semibold text-black dark:text-white">
                                            Крок 2: Додавання моделей
                                        </h2>

                                        <div className="mt-4">
                                            <h3 className="text-lg font-semibold text-black dark:text-white">
                                                Ollama Models Repository
                                            </h3>
                                            <p className="mt-1 text-sm/relaxed">
                                                Тут ви можете знайти різні
                                                штучні інтелектуальні моделі,
                                                спеціально призначені для різних
                                                завдань та застосувань. Кожна
                                                модель розроблена з певними
                                                цілями, щоб гарантувати її
                                                оптимальну продуктивність і
                                                гнучкість у вирішенні
                                                різноманітних завдань у багатьох
                                                галузях. Чи будете ви шукати
                                                покращити операції вашого
                                                бізнесу, поліпшити взаємодію з
                                                клієнтами або ж розпочати
                                                дослідження, наші моделі
                                                підійдуть для всіх.
                                            </p>
                                        </div>

                                        <h3 className="text-lg mt-4 font-semibold text-black dark:text-white">
                                            Приклади:
                                        </h3>
                                        <div className="mt-2">
                                            <h3 className="text-md font-semibold text-black dark:text-white">
                                                LLaMA (Large Language Model Meta
                                                AI):
                                            </h3>
                                            <p className="mt-1 text-sm/relaxed">
                                                Глибока нейронна мережа,
                                                розроблена компанією Meta AI
                                                (раніше Facebook AI Research).
                                                Вона була створена шляхом
                                                тренування на величезному
                                                корпусі тексту і може
                                                відповідати на питання,
                                                перекладати мови та генерувати
                                                текстове вміст. LLaMA має багато
                                                варіантів, включаючи LLaMA-1,
                                                LLLaMA-2 і LLaMA-3, кожен з яких
                                                стає все більшим та складнішим.
                                            </p>
                                            <a
                                                href="https://ollama.com/library/llama3.1"
                                                target="blank"
                                                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-800 text-white rounded-lg flex gap-2 w-fit"
                                            >
                                                Завантажити LLaMA3.1
                                                <Icon
                                                    width={24}
                                                    height={24}
                                                    icon="mdi:arrow-right"
                                                />
                                            </a>
                                        </div>
                                        <div className="mt-2">
                                            <h3 className="text-md font-semibold text-black dark:text-white">
                                                LLaMA-2 Uncensored:
                                            </h3>
                                            <p className="mt-1 text-sm/relaxed">
                                                Eкспериментальна версія моделі
                                                LLaMA-2, яка була "розблокована"
                                                або "розмитнена", що означає, що
                                                вона може генерувати вміст, який
                                                раніше був заборонений або
                                                прихований з політичних чи інших
                                                міркувань. Ця розблокована
                                                версія LLaMA-2 може висловлювати
                                                думки та відчуття, які можуть
                                                бути неприйнятними для деяких
                                                аудиторій або організацій. Це
                                                викликало суперечки та дискусії
                                                щодо етики та регуляції штучного
                                                інтелекту.
                                            </p>
                                            <a
                                                href="https://ollama.com/library/llama2-uncensored"
                                                target="blank"
                                                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-800 text-white rounded-lg flex gap-2 w-fit"
                                            >
                                                Завантажити LLaMA-2 Uncensored
                                                <Icon
                                                    width={24}
                                                    height={24}
                                                    icon="mdi:arrow-right"
                                                />
                                            </a>
                                        </div>
                                        <div className="mt-2">
                                            <h3 className="text-md font-semibold text-black dark:text-white">
                                                DeepSeek Coder V2:
                                            </h3>
                                            <p className="mt-1 text-sm/relaxed">
                                                Високотехнологічний продукт
                                                компанії DeepSeek, китайської
                                                компанії, спеціалізуються на
                                                штучному інтелекті та машинному
                                                навчанні. Це епохалістичний
                                                розвиток попередньої моделі
                                                DeepSeek Coder, яка була першою
                                                відповідно до наявної публікації
                                                інформації. DeepSeek Coder V2
                                                може виконувати багатозадачне
                                                завдання, включаючи текстову
                                                генерацію, машинний переклад,
                                                аналіз даних та інші. Він був
                                                побудований на основі глибоких
                                                нейронних мереж і використовує
                                                останні досягнення в області
                                                штучного інтелекту, щоб зробити
                                                процес більш ефективним та
                                                точним.
                                            </p>
                                            <a
                                                href="https://ollama.com/library/deepseek-coder-v2"
                                                target="blank"
                                                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-800 text-white rounded-lg flex gap-2 w-fit"
                                            >
                                                Завантажити DeepSeek Coder V2
                                                <Icon
                                                    width={24}
                                                    height={24}
                                                    icon="mdi:arrow-right"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </div>
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
                                            Крок 3: Запуск
                                        </h2>

                                        <p className="my-4 text-sm/relaxed">
                                            Виберіть потрібну вам модель та
                                            розпочніть спілкування за допомогою
                                            сервісу
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
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
