"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/actions/auth";
import OAthLoginBtn from "./OAthLoginBtn";
import { FormType } from "@/types";
function authFormSchema(type: FormType) {
  return z.object({
    name:
      type === "sign-up"
        ? z.string().min(4, {
            message: "Username must be at least 4 characters.",
          })
        : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
  });
}
function AuthForm({ type }: { type: FormType }) {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        const result = await signUp(values);

        if (result.status === "success") {
          toast.success("ثبت نام با موفقیت انجام شد لطفا وارد شوید");
          router.push("/sign-in");
        } else {
          toast.error(result.status);
        }
      } else {
        const result = await signIn(values);

        if (result.status === "success") {
          toast.success("با موفقیت وارد شدید");
          router.push("/");
        } else {
          toast.error(result.status);
        }
      }
    } catch (error) {
      toast.error(`خطایی رخ داد${error}`);
    }
  }
  const isSigneIn = type === "sign-in";
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10 ">
        <div className="flex flex-row gap-2 justify-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="logo" width={38} height={32} />
            <h2 className="text-primary-100">پرساوو</h2>
          </Link>
        </div>
        <h3 className="text-primary-100">مطاحبه هاتو با هوش مصنوعی تمرین کن</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" w-full form mt-4 space-y-6"
          >
            {!isSigneIn && (
              <FormField control={form.control} label="نام" name="name" />
            )}
            <FormField
              control={form.control}
              label="ایمیل"
              name="email"
              type="email"
            />
            <FormField
              control={form.control}
              label="رمز عبور"
              name="password"
              type="password"
              description={!isSigneIn}
            />
            <Button className="btn" type="submit">
              {isSigneIn ? "ورود" : "ثبت نام"}
            </Button>
            <OAthLoginBtn provider="github" />
            <p className="text-center">
              {isSigneIn ? "هنوز اکانت ندارم" : "از قبل اکانت دارم"}؟
              <Link
                href={isSigneIn ? "/sign-up" : "/sign-in"}
                className="font-bold text-user-primary ms-2"
              >
                {isSigneIn ? "ثبت نام" : "ورود"}
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
export default AuthForm;
