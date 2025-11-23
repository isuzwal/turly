"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import {signIn} from "next-auth/react"
import { FcGoogle } from "react-icons/fc" 

export const LoginPageView = () => {
  const [loading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const LoginScheam = z
    .object({
      email: z.string().email(),
      password: z.string().min(1, { message: "Password is required" }),
      confirmPassword: z.string().min(1, { message: "Paaword is required" }),
    })
    .refine((pass) => pass.password === pass.confirmPassword, {
      message: "Password don't match",
      path: ["confirmPassword"],
    });

  // form  first-state
  const form = useForm<z.infer<typeof LoginScheam>>({
    resolver: zodResolver(LoginScheam),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  // login api
  const handleLogin = async (value: z.infer<typeof LoginScheam>) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/login", {
        email: value.email,
        password: value.password,
      });
      if (res.status == 200 || res.status == 201) {
        toast.success(res.data.message || "User Login successfully");
        router.push("/");
      }
    } catch (err: any) {
      if (err.response) {
        toast.error(err.response.data.error || "Something went  wrong ");
      } else {
        toast.error("Networking error");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex  flex-col items-start  justify-center gap-6 ">
      <Link href="/" className="group flex items-center gap-1 px-2  cursor-pointer">
        <ArrowLeft size={14} className="transition-colors group-hover:text-gray-500 " />
        <span className="transition-colors text-sm group-hover:text-gray-500 ">Back</span>
      </Link>

      <div className=" flex  justify-center  w-full">
        <Card className="w-full max-w-sm ">
          <CardContent className="flex flex-col gap-4  justify-center ">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleLogin)} className="p-2 md:p-4">
                <div className="flex flex-col gap-2   ">
                  <div className="flex flex-col   items-center text-center">
                    <h1 className="text-2xl font-bold font-sans">Welcome Back</h1>
                  </div>
                  <div className="flex  flex-row mt-4 w-full">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="w-full px-2  py-0.5 items-start">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="ujjwal@gmail.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex  flex-row  mt-4 w-full">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="w-full px-2  py-0.5 items-start">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="******" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-row mt-4  w-full ">
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem className=" w-full px-2 py-0.5 items-start ">
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="********" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" disabled={loading} className=" w-full cursor-pointer">
                    Login
                  </Button>
                </div>
              </form>  
              <div className="text-center text-sm">
                Did't have an account ?{" "}
                <Link
                  href={"/signup"}
                  className=" font-semibold tex-[14px]   underline underline-offset-4">
                  Sign-up
                </Link>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};