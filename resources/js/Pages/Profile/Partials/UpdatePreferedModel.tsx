import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FormEventHandler, useEffect, useState } from "react";
import { PageProps } from "@/types";
import Select from "react-select";
import { Ollama } from "ollama/browser";

export default function UpdatePreferredModel({
    className = "",
}: {
    className?: string;
}) {
    const user = usePage<PageProps>().props.auth.user;
    const [_models, _setModels] = useState<
        {
            label: string;
            value: string;
        }[]
    >([]);

    const _ollama = new Ollama({ host: "http://127.0.0.1:11434" });

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            preferred_model: user.preferred_model,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("profile.updateModel"));
    };

    const _ollamaModels = async () => {
        if (_ollama) {
            const list = await _ollama.list();

            const options = list.models.map((value) => ({
                label: value.name,
                value: value.name,
            }));

            _setModels(options);
        }
    };

    useEffect(() => {
        _ollamaModels();
    }, []);

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                    Preferred model
                </h2>

                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    Update your preferred AI model to use it when all models are
                    loaded.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="model" value="Model" />

                    {_models && (
                        <Select
                            className="text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800"
                            options={_models}
                            onChange={(opt) =>
                                setData("preferred_model", opt?.value)
                            }
                            defaultValue={{
                                label: user.preferred_model,
                                value: user.preferred_model,
                            }}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    neutral0: "#404040",
                                    primary: "#262626",
                                    primary25: "#262626",
                                    neutral80: "#F5F5F5",
                                    primary75: "#F5F5F5",
                                },
                            })}
                            name="model"
                            required
                        />
                    )}

                    <InputError
                        className="mt-2"
                        message={errors.preferred_model}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
