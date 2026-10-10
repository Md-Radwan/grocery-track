
"use client";

import { signIn } from "@/lib/auth-client";
import { Eye, EyeSlash, Check } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SignInPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    setIsLoading(true);

    try {
      const { error } = await signIn.email({
        email,
        password,
        rememberMe: true,
        callbackURL: "/",
      });
      
      if (error) {
        toast.error(error.message || "Sign-in failed. Please try again.");
      }
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
      toast.success("সফলভাবে সাইন ইন হয়েছে।")
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    toast.success("সফলভাবে সাইন ইন হয়েছে।")
  };

  const handleGithubSignIn = async () => {
    await signIn.social({
      provider: "github",
      callbackURL: "/",
    });
    toast.success("সফলভাবে সাইন ইন হয়েছে।")
  };

  return (
    <main className="flex min-h-screen items-start justify-center bg-[#F0F5F0] px-4 py-10 sm:py-12">
      <div className="w-full max-w-106.75">
        {/* Heading */}
        <header className="mb-7 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-[#202D24]">
            সাইন ইন
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#758078]">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </header>

        {/* Sign-in card */}
        <section className="rounded-[18px] border border-[#DFE7DF] bg-[#FAFCFA] p-6 sm:p-6">
          <Form
            className="flex w-full flex-col gap-4"
            onSubmit={onSubmit}
          >
            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              className="w-full"
              validate={(value) => {
                if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                ) {
                  return "Please enter a valid email address";
                }

                return null;
              }}
            >
              <Label className="mb-1.5 text-sm font-medium text-[#27352B]">
                ইমেইল
              </Label>

              <Input
                placeholder="you@example.com"
                className="h-[42px] w-full rounded-[10px] border border-[#DFE7DF] bg-transparent px-3 text-sm text-[#253128] outline-none transition focus-within:border-[#07883E]"
              />

              <FieldError className="text-xs text-red-600" />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              name="password"
              type={isVisible ? "text" : "password"}
              className="w-full"
              minLength={8}
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }

                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }

                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }

                return null;
              }}
            >
              <Label className="mb-1.5 text-sm font-medium text-[#27352B]">
                পাসওয়ার্ড
              </Label>

              <InputGroup className="flex h-[42px] w-full items-center overflow-hidden rounded-[10px] border border-[#DFE7DF] bg-transparent transition focus-within:border-[#07883E]">
                <InputGroup.Input
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  type={isVisible ? "text" : "password"}
                  className="h-full min-w-0 flex-1 border-0 bg-transparent px-3 text-sm text-[#253128] outline-none"
                />

                <InputGroup.Suffix className="pr-1">
                  <Button
                    type="button"
                    isIconOnly
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    size="sm"
                    variant="ghost"
                    onPress={() => setIsVisible((previous) => !previous)}
                    className="text-[#758078]"
                  >
                    {isVisible ? (
                      <Eye className="size-4" />
                    ) : (
                      <EyeSlash className="size-4" />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>

              <FieldError className="text-xs text-red-600" />
            </TextField>

            {/* Sign-in button */}
            <Button
              type="submit"
              isDisabled={isLoading}
              className="mt-0.5 h-[42px] w-full rounded-[9px] bg-[#07883E] text-sm font-semibold text-white shadow-[0_3px_4px_rgba(0,0,0,0.22)] transition hover:bg-[#067734]"
            >
              {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </Button>
          </Form>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#E1E7E1]" />

            <span className="text-xs text-[#566159]">অথবা</span>

            <div className="h-px flex-1 bg-[#E1E7E1]" />
          </div>

          {/* Social login */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="tertiary"
              onPress={handleGoogleSignIn}
              className="h-[42px] min-w-0 rounded-[9px] border border-[#DFE7DF] bg-transparent px-2 text-xs font-semibold text-[#27352B] transition hover:bg-[#F0F5F0] sm:text-sm"
            >
              <Icon icon="devicon:google" className="size-4 shrink-0" />
              <span>Google দিয়ে চালিয়ে যান</span>
            </Button>

            <Button
              type="button"
              variant="tertiary"
              onPress={handleGithubSignIn}
              className="h-[42px] min-w-0 rounded-[9px] border border-[#DFE7DF] bg-transparent px-2 text-xs font-semibold text-[#27352B] transition hover:bg-[#F0F5F0] sm:text-sm"
            >
              <Icon icon="mdi:github" className="size-4 shrink-0" />
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </Button>
          </div>

          {/* Sign-up link */}
          <p className="mt-4 text-center text-sm text-[#465149]">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-[#07883E] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </section>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-[#758078] transition hover:text-[#07883E]"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}









// "use client";

// import { signIn } from "@/lib/auth-client";
// import { Check } from "@gravity-ui/icons";
// import { Eye, EyeSlash } from "@gravity-ui/icons";
// import {
//   Button,
//   Description,
//   FieldError,
//   Form,
//   Input,
//   InputGroup,
//   Label,
//   TextField,
// } from "@heroui/react";
// import { Icon } from "@iconify/react";
// import { object } from "better-auth";
// import { useState } from "react";

// const SignInPage = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const data = Object.fromEntries(formData.entries());
//     console.log("form er data", data);

//     const { data: resData, error } = await signIn.email({
//       email: data.email,
//       password: data.password,
//       rememberMe: true,
//       callbackURL: "/",
//     });

//     console.log(resData, error);
//   };

//     const handleGoogleSignIn = async() => {
//     const resData = await signIn.social({
//         provider: "google",
//     });
//   };

//     const handleGithubSignIn = async() => {
//     const resData = await signIn.social({
//       provider: "github"
//     })
//   }

//   return (
//     <div>
//       <div>
//         <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
//           <TextField
//             isRequired
//             name="email"
//             type="email"
//             validate={(value) => {
//               if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
//                 return "Please enter a valid email address";
//               }
//               return null;
//             }}
//           >
//             <Label>Email</Label>
//             <Input placeholder="john@example.com" />
//             <FieldError />
//           </TextField>

//           <TextField
//             minLength={8}
//             isRequired
//             className="w-full"
//             name="password"
//             type="password"
//             validate={(value) => {
//               if (value.length < 8) {
//                 return "Password must be at least 8 characters";
//               }
//               if (!/[A-Z]/.test(value)) {
//                 return "Password must contain at least one uppercase letter";
//               }
//               if (!/[0-9]/.test(value)) {
//                 return "Password must contain at least one number";
//               }
//               return null;
//             }}
//           >
//             <Label>Password</Label>
//             <InputGroup>
//               <InputGroup.Input
//                 placeholder="Enter your password"
//                 className="w-full"
//                 type={isVisible ? "text" : "password"}
//               />
//               <InputGroup.Suffix className="pe-0">
//                 <Button
//                   isIconOnly
//                   aria-label={isVisible ? "Hide password" : "Show password"}
//                   size="sm"
//                   variant="ghost"
//                   onPress={() => setIsVisible(!isVisible)}
//                 >
//                   {isVisible ? (
//                     <Eye className="size-4" />
//                   ) : (
//                     <EyeSlash className="size-4" />
//                   )}
//                 </Button>
//               </InputGroup.Suffix>
//             </InputGroup>
//             <FieldError />
//           </TextField>

//           {/* <TextField
//             isRequired
//             minLength={8}
//             name="password"
//             type="password"
//             validate={(value) => {
//               if (value.length < 8) {
//                 return "Password must be at least 8 characters";
//               }
//               if (!/[A-Z]/.test(value)) {
//                 return "Password must contain at least one uppercase letter";
//               }
//               if (!/[0-9]/.test(value)) {
//                 return "Password must contain at least one number";
//               }
//               return null;
//             }}
//           >
//             <Label>Password</Label>
//             <Input placeholder="Enter your password" /> */}
//           {/* <Description>
//               Must be at least 8 characters with 1 uppercase and 1 number
//             </Description> */}
//           {/* <FieldError />
//           </TextField> */}
//           <div className="flex gap-2">
//             <Button type="submit">
//               <Check />
//               Submit
//             </Button>
//             <Button type="reset" variant="secondary">
//               Reset
//             </Button>
//           </div>
//         </Form>
//         <div className="flex w-full max-w-xs flex-col gap-3">
//           <Button type="button" onClick={handleGoogleSignIn} className="w-full" variant="tertiary">
//             <Icon icon="devicon:google" />
//             Sign in with Google
//           </Button>
//           <Button onClick={handleGithubSignIn} className="w-full" variant="tertiary">
//             <Icon icon="mdi:github" />
//             Sign in with GitHub
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignInPage;
