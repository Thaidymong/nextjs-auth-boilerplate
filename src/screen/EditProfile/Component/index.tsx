'use client'

import { editprofile } from "@/actions/edit-profile";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowBigLeftDash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "sonner";
import { useParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateProfileInput, updateProfileSchema } from "./zod/zod";
import { useStore } from "@/store";

export default function EditProfileComponent() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const { id } = useParams<{ id: string }>();
    const [pending, startTrasition] = useTransition();
    const { me } = useStore();
    console.log({ me })

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<UpdateProfileInput>({
        resolver: zodResolver(updateProfileSchema),
    });

    const onSubmit: SubmitHandler<UpdateProfileInput> = async (input) => {
        startTransition(async () => {
            const { data, error } = await editprofile(id, input);
            if (error) {
                toast.error(error, {
                    position: "top-right",
                    style: {
                        fontSize: "11pt",
                    },
                });
            } else if (data) {
                toast.success("Profile updated successfully", {
                    position: "top-right",
                    style: {
                        fontSize: "11pt",
                    },
                });
                reset();
                router.push("/");
            }
        });
    };
    return <>
        <section className="relative lg:pt-36 pt-16  bg-slate-50 h-[100vh]">
            <div className="container relative bg-white dark:bg-slate-900 rounded-md shadow pt-16">
                <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-6">
                    <div className="lg:col-span-7 md:col-span-6">
                        <div className="grid grid-cols-1 text-center">
                            <p className="font-normal text-lg leading-normal mb-4">Helps us 24/7</p>
                            <h3 className="font-bold text-4xl leading-normal mb-4">
                                Welcome Back
                            </h3>
                            <p className="font-normal w-100 text-base leading-normal mb-4">Users can navigate to the "Edite Profile" page from their account settings or profile section.</p>
                            <p className="font-normal w-100 text-base leading-normal mb-4">
                                Users must enter their edit to verify their identity.
                            </p>
                        </div>
                        <Image
                            src="/change-password.png"
                            width={1000}
                            height={1000}
                            sizes="100vw"
                            style={{ width: "90%", height: "auto" }}
                            alt=""
                        />
                    </div>
                    <div className="lg:col-span-5 md:col-span-6">
                        <div className="lg:ms-5">
                            <div className="p-6">
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="pb-5">
                                    <div className="absolute bg-sky-700 py-[1px] px-3 rounded-sm cursor-pointer" >
                                        <ArrowBigLeftDash color="white" />
                                    </div>
                                    <div
                                        className="col-start-1 col-end-2 flex items-center justify-center cursor-pointer"
                                        onClick={() => router.push("/")}
                                    >
                                        <Image
                                            alt=""
                                            src={"/logo.jpg"}
                                            width={100}
                                            height={100}
                                            className="h-14 w-14"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 text-center">
                                        <h3 className="font-semibold text-2xl leading-normal mb-4">
                                            Edit Profile
                                        </h3>
                                    </div>
                                    <div className="grid lg:grid-cols-12 grid-cols-1 gap-3">
                                        <div className="lg:col-span-12">
                                            <label htmlFor="email" className="font-semibold">
                                                Firstname
                                            </label>
                                            <input
                                                {...register("first_name")}
                                                className={`  mt-2 w-full py-2 px-3 h-10 bg-transparent  rounded outline-none border focus:ring-0 ${errors.first_name &&
                                                    "border-1 border-red-500 "
                                                    }`}
                                                placeholder="firstname"
                                            />
                                            {errors.first_name && (
                                                <p className="text-red-500">{`${errors.first_name.message}`}</p>
                                            )}
                                        </div>
                                        <div className="lg:col-span-12">
                                            <label htmlFor="email" className="font-semibold">
                                                Lastname
                                            </label>
                                            <input
                                                {...register("last_name")}
                                                className={`  mt-2 w-full py-2 px-3 h-10 bg-transparent  rounded outline-none border focus:ring-0 ${errors.last_name &&
                                                    "border-1 border-red-500 "
                                                    }`}
                                                placeholder="lastname"
                                            />
                                            {errors.last_name && (
                                                <p className="text-red-500">{`${errors.last_name.message}`}</p>
                                            )}
                                        </div>


                                    </div>
                                    <div className="w-full mt-3 " >
                                        <Checkbox id="terms" />
                                        <label htmlFor="terms" className="ml-2 text-base" >
                                            Remember me
                                        </label>
                                    </div>
                                    <div className="mt-5">
                                        <button
                                            type="submit"
                                            disabled={pending}
                                            className="w-full h-10  px-6 tracking-wide inline-flex items-center justify-center font-medium rounded-md bg-sky-700 text-white"
                                        >
                                            {pending ? (
                                                <>
                                                    <ClipLoader color="white" className="mr-1" size={20} />
                                                    Loading...
                                                </>
                                            ) : (
                                                "Save"
                                            )}
                                        </button>
                                        <div className="mt-5 flex justify-center">
                                            <div>
                                                Don't have an account?
                                            </div>
                                            <div className="cursor-pointer text-blue-400 ml-1" onClick={() => router.push("/sign-up")}>
                                                Sign Up
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    </>
}