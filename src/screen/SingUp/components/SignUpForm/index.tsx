"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowBigLeftDash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "sonner";
import { registerSchema } from "../zod/zod";
import { z } from "zod";
import { signup } from "@/actions/sign-up";
// Define the form data type
type FormData = z.infer<typeof registerSchema>;

export const SignUpForm = () => {
  const [pending, startTrasition] = useTransition();
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  const onSubmit: SubmitHandler<FormData> = async (input) => {
    startTrasition(async () => {
      const { data, error } = await signup(input);

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
        router.push("/sign-in");
      }
    });
  };

  return (
    <div className="h-[100vh]">
      <div className="grid md:grid-cols-12 items-center bg-slate-100">
        <div className="lg:col-span-6 mx-20">
          <div className="lg:col-span-5 md:col-span-6 py-10">
            <div className="lg:ms-5">
              <div className="bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-700 p-6">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="pb-10 pt-5 pr-5 pl-5"
                >
                  <div
                    className="absolute bg-sky-700 py-[1px] px-3 rounded-sm cursor-pointer"
                    onClick={() => router.back()}
                  >
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
                      Create new account
                    </h3>
                  </div>
                  <div className="grid lg:grid-cols-12 grid-cols-1 gap-3">
                    <div className="lg:col-span-6">
                      <label htmlFor="lastName" className="font-semibold">
                        Firstname
                      </label>
                      <input
                        {...register("first_name")}
                        className={` mt-2 w-full py-2 px-3 h-10 bg-transparent rounded outline-none border focus:ring-0 ${
                          errors.first_name && "border-1 border-red-500 "
                        }`}
                        placeholder="firstname"
                      />
                      {errors.first_name && (
                        <p className="text-red-500">{`${errors.first_name.message}`}</p>
                      )}
                    </div>
                    <div className="lg:col-span-6">
                      <label htmlFor="lastName" className="font-semibold">
                        Lastname
                      </label>
                      <input
                        {...register("last_name")}
                        className={` mt-2 w-full py-2 px-3 h-10 bg-transparent rounded outline-none border focus:ring-0 ${
                          errors.last_name && "border-1 border-red-500 "
                        }`}
                        placeholder="lastname"
                      />
                      {errors.last_name && (
                        <p className="text-red-500">{`${errors.last_name.message}`}</p>
                      )}
                    </div>
                    <div className="lg:col-span-12">
                      <label htmlFor="email" className="font-semibold">
                        Email
                      </label>
                      <input
                        {...register("email")}
                        className={`  mt-2 w-full py-2 px-3 h-10 bg-transparent  rounded outline-none border focus:ring-0 ${
                          errors.email && "border-1 border-red-500 "
                        }`}
                        placeholder="dymongthai@gmail.com"
                      />
                      {errors.email && (
                        <p className="text-red-500">{`${errors.email.message}`}</p>
                      )}
                    </div>

                    <div className="lg:col-span-12">
                      <label htmlFor="password" className="font-semibold">
                        Password
                      </label>
                      <input
                        type={isChecked ? "" : "password"}
                        {...register("password")}
                        className={`  mt-2 w-full py-2 px-3 h-10 bg-transparent  rounded outline-none border focus:ring-0 ${
                          errors.password && "border-1 border-red-500 "
                        }`}
                        placeholder="password"
                      />
                      {errors.password && (
                        <p className="text-red-500 ">{`${errors.password.message}`}</p>
                      )}
                    </div>
                    <div className="lg:col-span-12">
                      <label
                        htmlFor="ComfirmPassword"
                        className="font-semibold"
                      >
                        Comfirm Password
                      </label>
                      <input
                        type={isChecked ? "" : "password"}
                        {...register("confirmPassword")}
                        className={`  mt-2 w-full py-2 px-3 h-10 bg-transparent rounded outline-none border focus:ring-0 ${
                          errors.confirmPassword && "border-1 border-red-500 "
                        }`}
                        placeholder="comfirm password"
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 ">{`${errors.confirmPassword.message}`}</p>
                      )}
                    </div>
                  </div>
                  <div className="w-full mt-3 ">
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
                          <ClipLoader
                            color="white"
                            className="mr-1"
                            size={20}
                          />
                          Loading...
                        </>
                      ) : (
                        "Sign Up"
                      )}
                    </button>
                    <div className="mt-5 flex justify-center">
                      <div>Already Sign Up?</div>
                      <div
                        className="cursor-pointer text-blue-400 ml-1"
                        onClick={() => router.push("/login")}
                      >
                        Sign In
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="hidden lg:block lg:col-span-7 md:col-span-6">
            <div style={{ height: "100vh", position: "relative" }}>
              <Image
                src="/login.jpg"
                layout="fill"
                objectFit="cover"
                alt="Login Visual"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
