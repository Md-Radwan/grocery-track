
"use client";

import { signIn, signUp } from "@/lib/auth-client";
import { Eye, EyeSlash } from "@gravity-ui/icons";
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

const SignUpPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setIsLoading(true);

    try {
      const { data: resData, error } = await signUp.email({
        name: String(data.name),
        email: String(data.email),
        password: String(data.password),
      });

      if (error) {
        setErrorMessage(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
        return;
      }

      console.log("Signup successful:", resData);
    } catch {
      setErrorMessage("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      setErrorMessage(error.message || "Google দিয়ে সাইন আপ করা যায়নি");
    }
  };

  const handleGithubSignIn = async () => {
    const { error } = await signIn.social({
      provider: "github",
      callbackURL: "/",
    });

    if (error) {
      setErrorMessage(error.message || "GitHub দিয়ে সাইন আপ করা যায়নি");
    }
  };

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-8 text-[#202b23] sm:py-10">
      <div className="mx-auto w-full max-w-101">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-[26px]">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-1 text-sm text-[#778078]">
            বিনা ঝামেলায় সাইন আপ করে সব বিস্তারিত দাম দেখুন
          </p>
        </div>

        {/* Signup Card */}
        <div className="rounded-xl border border-[#e0e8e0] bg-[#fbfdfb] p-5 shadow-sm sm:p-6">
          <Form
            className="flex w-full flex-col gap-4"
            onSubmit={onSubmit}
          >
            {/* Name */}
            <TextField
              isRequired
              name="name"
              className="w-full"
              validate={(value) => {
                if (value.trim().length < 3) {
                  return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
                }
                return null;
              }}
            >
              <Label className="mb-1.5 text-sm font-medium">
                নাম
              </Label>

              <Input
                placeholder="যেমন: রহিম উদ্দিন"
                className="h-10 w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 text-sm outline-none transition focus-within:border-[#07883e] focus-within:ring-2 focus-within:ring-[#07883e]/10"
              />

              <FieldError />
            </TextField>

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
                  return "সঠিক ইমেইল ঠিকানা লিখুন";
                }
                return null;
              }}
            >
              <Label className="mb-1.5 text-sm font-medium">
                ইমেইল
              </Label>

              <Input
                placeholder="you@example.com"
                className="h-10 w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 text-sm outline-none transition focus-within:border-[#07883e] focus-within:ring-2 focus-within:ring-[#07883e]/10"
              />

              <FieldError />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              name="password"
              className="w-full"
              validate={(value) => {
                if (value.length < 8) {
                  return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                }
                if (!/[A-Z]/.test(value)) {
                  return "অন্তত একটি ইংরেজি বড় হাতের অক্ষর দিন";
                }
                if (!/[0-9]/.test(value)) {
                  return "অন্তত একটি সংখ্যা দিন";
                }
                return null;
              }}
            >
              <Label className="mb-1.5 text-sm font-medium">
                পাসওয়ার্ড
              </Label>

              <InputGroup className="h-10 w-full rounded-lg border border-[#dfe7df]">
  <InputGroup.Input
    name="password"
    type={isVisible ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="কমপক্ষে ৮ অক্ষর"
    className="min-w-0 px-3 text-sm"
  />

  <InputGroup.Suffix className="pe-1">
    <Button
      type="button"
      isIconOnly
      aria-label={isVisible ? "Hide password" : "Show password"}
      size="sm"
      variant="ghost"
      onPress={() => setIsVisible((prev) => !prev)}
    >
      {isVisible ? (
        <Eye className="size-4" />
      ) : (
        <EyeSlash className="size-4" />
      )}
    </Button>
  </InputGroup.Suffix>
</InputGroup>

              {/* <InputGroup className="h-10 w-full rounded-lg border border-[#dfe7df] bg-transparent transition focus-within:border-[#07883e] focus-within:ring-2 focus-within:ring-[#07883e]/10">
                <InputGroup.Input
                  name="password"
                  type={isVisible ? "text" : "password"}
                  // value={password}
                  onChange={(value) => setPassword(value)}
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  className="min-w-0 px-3 text-sm"
                />

                <InputGroup.Suffix className="pe-1">
                  <Button
                    type="button"
                    isIconOnly
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    size="sm"
                    variant="ghost"
                    onPress={() => setIsVisible((prev) => !prev)}
                  >
                    {isVisible ? (
                      <Eye className="size-4" />
                    ) : (
                      <EyeSlash className="size-4" />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup> */}

              <FieldError />
            </TextField>

            {/* Confirm Password */}
            <TextField
              isRequired
              name="confirmPassword"
              className="w-full"
              validate={(value) => {
                if (!value) {
                  return "পাসওয়ার্ড আবার লিখুন";
                }
                if (value !== password) {
                  return "পাসওয়ার্ড দুটি মিলছে না";
                }
                return null;
              }}
            >
              <Label className="mb-1.5 text-sm font-medium">
                পাসওয়ার্ড নিশ্চিত করুন
              </Label>

              <Input
                type={isVisible ? "text" : "password"}
                value={confirmPassword}
                // onChange={setConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="আবার লিখুন"
                className="h-10 w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 text-sm outline-none transition focus-within:border-[#07883e] focus-within:ring-2 focus-within:ring-[#07883e]/10"
              />

              <FieldError />
            </TextField>

            {/* Error Message */}
            {errorMessage && (
              <p role="alert" className="text-sm text-red-600">
                {errorMessage}
              </p>
            )}

            {/* Signup Button */}
            <Button
              type="submit"
              isDisabled={isLoading}
              className="mt-0.5 h-10 w-full rounded-lg bg-[#07883e] text-sm font-semibold text-white shadow-[0_3px_4px_rgba(0,0,0,0.2)] transition hover:bg-[#067533] disabled:opacity-60"
            >
              {isLoading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
            </Button>
          </Form>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#dfe5df]" />
            <span className="text-xs text-[#737b74]">অথবা</span>
            <div className="h-px flex-1 bg-[#dfe5df]" />
          </div>

          {/* Social Signup */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              onPress={handleGoogleSignIn}
              variant="tertiary"
              className="h-10 min-w-0 rounded-lg border border-[#dfe7df] bg-transparent px-2 text-xs font-semibold text-[#273129] hover:bg-[#f1f5f1] sm:text-sm"
            >
              <Icon icon="devicon:google" className="shrink-0 text-base" />
              <span>Google দিয়ে চালিয়ে যান</span>
            </Button>

            <Button
              type="button"
              onPress={handleGithubSignIn}
              variant="tertiary"
              className="h-10 min-w-0 rounded-lg border border-[#dfe7df] bg-transparent px-2 text-xs font-semibold text-[#273129] hover:bg-[#f1f5f1] sm:text-sm"
            >
              <Icon icon="mdi:github" className="shrink-0 text-base" />
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </Button>
          </div>

          {/* Sign In Link */}
          <p className="mt-4 text-center text-sm text-[#343d35]">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-[#07883e] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        {/* Back Home */}
        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-sm text-[#7a837b] transition hover:text-[#07883e]"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;










// "use client";

// import { signIn, signUp } from "@/lib/auth-client";
// import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
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
// import { google } from "better-auth";
// import { useState } from "react";

// const SignUpPage = () => {
//   const [isVisible, setIsVisible] = useState(false);
  
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const data = Object.fromEntries(formData.entries());
//     // Convert FormData to plain object

//     console.log("data from the form", data);
    
//     const {data: resData, error} = await signUp.email({
//       name: data.name,
//       email: data.email,
//       password: data.password 
//     });

//     console.log("after sign up", resData, error)

//   };

//   const handleGoogleSignIn = async() => {
//     const resData = await signIn.social({
//       provider: 'google'
//     })
//   }

//   const handleGithubSignIn = async() => {
//     const resData = await signIn.social({
//       provider: "github"
//     })
//   }

//   return (
//       <div>
//       <div>
//         <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
//           <TextField
//             isRequired
//             name="name"
//             validate={(value) => {
//               if (value.length < 3) {
//                 return "Name must be at least 3 characters";
//               }
//               return null;
//             }}
//           >
//             <Label>নাম</Label>
//             <Input placeholder="যেমন: রহিম উদ্দিন" />
//             <FieldError />
//           </TextField>
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
//             <Label>ইমেইল</Label>
//             <Input placeholder="you@example.com" />
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
//             <Label>পাসওয়ার্ড</Label>
//             <Input placeholder="কমপক্ষে ৮ অক্ষর" />
//             {/* <Description>
//               Must be at least 8 characters with 1 uppercase and 1 number
//             </Description> */}
//           {/* <FieldError /> */}
//           {/* </TextField> */}
//           <div className="flex gap-2">
//             <Button type="submit">অ্যাকাউন্ট তৈরি করুন</Button>
//           </div>
//         </Form>
//         <div className="flex w-full max-w-xs flex-col gap-3">
//           <Button
//             onClick={handleGoogleSignIn}
//             className="w-full"
//             variant="tertiary"
//           >
//             <Icon icon="devicon:google" />
//             Sign up with Google
//           </Button>
//           <Button onClick={handleGithubSignIn} className="w-full" variant="tertiary">
//             <Icon icon="mdi:github" />
//             Sign up with GitHub
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;
