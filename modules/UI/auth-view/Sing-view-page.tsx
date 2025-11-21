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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import * as z from "zod";


export const SingInView = () => {

  
  const [loading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const SignupScheam = z
    .object({
      username: z.string().min(1, { message: "Name is required" }),
      email: z.string().email(),
      password: z.string().min(1, { message: "Password is required" }),
      confirmPassword: z.string().min(1, { message: "Password is required" }),
    })
    .refine((pass) => pass.password === pass.confirmPassword, {
      message: "Password don't match",
      path: ["confirmPassword"],
    });

  // form  first-state
  const form = useForm<z.infer<typeof SignupScheam>>({
    resolver: zodResolver(SignupScheam),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  // signup-logic
  const handleSignup = async (values: z.infer<typeof SignupScheam>) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/signup", {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      if (res.status == 200 || res.status == 201) {
        toast.success(res.data.message || "User created successfully");
        router.push("/login");
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
    <div className="flex  flex-col  justify-center gap-6 dark:bg-neutral-950 bg-neutral-50 ">
      <Link href="/" className="group flex items-center gap-1 px-2  cursor-pointer">
        <ArrowLeft size={14} className="transition-colors group-hover:text-gray-500 " />
        <span className="transition-colors text-sm group-hover:text-gray-500 ">Back</span>
      </Link>
      <div className="flex w-full justify-center">
        <Card className="w-full max-w-sm">
          <CardContent className="flex flex-col gap-4  justify-center ">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSignup)} className="p-2 md:p-4">
                <div className="flex flex-col gap-2   ">
                  <div className="flex flex-col   items-center text-center">
                    <h1 className="text-2xl font-bold font-sans">Let&apos;s get Started</h1>
                    <p className="text-muted-foreground text-balance">Create your account</p>
                  </div>
                  <div className="flex  flex-row mt-4 w-full">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem className="w-full px-2  py-0.5 items-start">
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="ujjwal" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                    Create Account
                  </Button>
                </div>
              </form>
              <div className="text-center text-sm">
                Already have an account ?{" "}
                <Link
                  href={"/login"}
                  className=" font-semibold tex-[14px]   underline underline-offset-4">
                  Login
                </Link>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};