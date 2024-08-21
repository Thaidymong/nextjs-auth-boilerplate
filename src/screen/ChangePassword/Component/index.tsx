'use client'

import { Checkbox } from "@/components/ui/checkbox";
import { ArrowBigLeftDash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "sonner";
import { useParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordInput, changePasswordSchema } from "./zod/zod";
import { useStore } from "@/store";
import { changePassword } from "@/actions/change-password";

export default function ChangePasswordComponent() {
    const router = useRouter();
    const [isChecked, setIsChecked] = useState(false);
    const [isPending, startTransition] = useTransition();
    const { id } = useParams<{ id: string }>();
    const [pending, startTrasition] = useTransition();
    const { me } = useStore();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ChangePasswordInput>({
        resolver: zodResolver(changePasswordSchema),
    });

    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
    };

    const onSubmit: SubmitHandler<ChangePasswordInput> = async (input) => {
        startTrasition(async () => {
            const { data, error } = await changePassword(input);

            if (error) {
                toast.error(error, {
                    position: "top-right",
                    style: {
                        fontSize: "11pt",
                    },
                });
            } else if (data) {
                toast.success("Signin successfully", {
                    position: "top-right",
                    style: {
                        fontSize: "11pt",
                    },
                });
                router.push("/login");
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
                                            Change Password
                                        </h3>
                                    </div>
                                    <div className="grid lg:grid-cols-12 grid-cols-1 gap-3">
                                        <div className="lg:col-span-12">
                                            <label htmlFor="currentPassword" className="font-semibold">
                                                Current Password
                                            </label>
                                            <input
                                                type={isChecked ? "text" : "password"}
                                                {...register("currentPassword")}
                                                className={`mt-2 w-full py-2 px-3 h-10 bg-transparent rounded outline-none border focus:ring-0 ${errors.currentPassword && "border-1 border-red-500"}`}
                                                placeholder="Current password"
                                            />
                                            {errors.currentPassword && (
                                                <p className="text-red-500">{errors.currentPassword.message}</p>
                                            )}
                                        </div>
                                        <div className="lg:col-span-12">
                                            <label htmlFor="password" className="font-semibold">
                                                New Password
                                            </label>
                                            <input
                                                type={isChecked ? "text" : "password"}
                                                {...register("password")}
                                                className={`mt-2 w-full py-2 px-3 h-10 bg-transparent rounded outline-none border focus:ring-0 ${errors.password && "border-1 border-red-500"}`}
                                                placeholder="New password"
                                            />
                                            {errors.password && (
                                                <p className="text-red-500">{errors.password.message}</p>
                                            )}
                                        </div>
                                        <div className="lg:col-span-12">
                                            <label htmlFor="confirmPassword" className="font-semibold">
                                                Confirm New Password
                                            </label>
                                            <input
                                                type={isChecked ? "text" : "password"}
                                                {...register("confirmPassword")}
                                                className={`mt-2 w-full py-2 px-3 h-10 bg-transparent rounded outline-none border focus:ring-0 ${errors.confirmPassword && "border-1 border-red-500"}`}
                                                placeholder="Confirm new password"
                                            />
                                            {errors.confirmPassword && (
                                                <p className="text-red-500">{errors.confirmPassword.message}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-full mt-3">
                                        <Checkbox id="terms" onClick={handleCheckboxClick} />
                                        <label htmlFor="terms" className="ml-2 text-base">
                                            Show Password
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
            </div >
        </section >
    </>
}