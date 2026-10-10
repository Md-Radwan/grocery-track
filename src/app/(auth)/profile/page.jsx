"use client";

import { useState } from "react";
import { updateUser, signOut } from "@/lib/auth-client";
import { useSession } from "@/lib/auth-client";
import {Person} from '@gravity-ui/icons';
import {ArrowUturnCwLeft} from '@gravity-ui/icons';
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Image from "next/image";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const user = session?.user;

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    setIsUpdating(true);

    try {
      const res = await updateUser({
        name: name.trim(),
      });

      if (res.error) {
        toast.error(res.error.message || "প্রোফাইল আপডেট করা যায়নি");
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();``
    toast.success("সফলভাবে সাইন আউট হয়েছে।")
  };

  return (
    <main className="min-h-screen bg-[#F0F5F0] px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-[756px]">
        {/* Page heading */}
        <header className="mb-7">
          <h1 className="text-2xl font-bold tracking-tight text-[#202B23]">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-sm text-[#727B74]">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </header>

        {/* User information card */}
        <section className="mb-6 flex flex-col gap-5 rounded-2xl border border-[#DFE7DF] bg-[#FAFCFA] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex min-w-0 items-center gap-4">
            {/* Avatar */}
            <div className="flex h-[72px] w-[82px] shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#EFF0EF]">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "Profile"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Person className="h-9 w-9 text-[#667168]" />
              )}
            </div>

            {/* Name and email */}
            <div className="min-w-0">
              <h2 className="truncate text-xl font-semibold text-[#263229]">
                {user?.name || "ব্যবহারকারী"}
              </h2>
              <p className="mt-1 break-all text-base text-[#6B746D]">
                {user?.email || ""}
              </p>
            </div>
          </div>

          {/* Sign out button */}
          <Button
            type="button"
            variant="outline"
            onPress={handleSignOut}
            className="shrink-0 self-start border border-[#EF4444] bg-transparent px-5 text-[#EF4444] hover:bg-red-50 sm:self-auto"
          >
            <ArrowUturnCwLeft className="h-4 w-4" />
            সাইন আউট
          </Button>
        </section>

        {/* Profile form card */}
        <section className="rounded-2xl border border-[#DFE7DF] bg-[#FAFCFA] p-5 sm:px-5 sm:py-6">
          <h2 className="mb-8 text-lg font-bold text-[#263229]">
            তথ্য
          </h2>

          <Form onSubmit={handleUpdateUser} className="w-full">
            <TextField
              name="name"
              isRequired
              value={name}
              onChange={setName}
              validate={(value) => {
                if (value.trim().length < 3) {
                  return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
                }

                return null;
              }}
              className="w-full"
            >
              <Label className="mb-2 text-sm font-medium text-[#354139]">
                নাম
              </Label>

              <Input
                placeholder="আপনার নাম লিখুন"
                className="h-[42px] w-full rounded-lg border border-[#DFE7DF] bg-transparent px-3 text-[#263229] outline-none focus-within:border-[#07883F]"
              />

              <FieldError />
            </TextField>

            <Button
              type="submit"
              isDisabled={isUpdating}
              className="mt-4 h-[42px] w-full rounded-lg bg-[#07883F] font-semibold text-white shadow-[0_3px_0_#A8C6B0] transition-colors hover:bg-[#067534] disabled:opacity-60"
            >
              {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
            </Button>
          </Form>
        </section>
      </div>
    </main>
  );
}









// "use client";

// import { updateUser } from "@/lib/auth-client";
// import {FloppyDisk} from "@gravity-ui/icons";
// import {
//   Button,
//   Description,
//   FieldError,
//   FieldGroup,
//   Fieldset,
//   Form,
//   Input,
//   Label,
//   TextArea,
//   TextField,
// } from "@heroui/react";

// export default function profilePage() {
//   const handleUpdateUser = async(e) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const userData = Object.fromEntries(formData.entries())

//     // alert("Form submitted successfully!");

//     const resData = await updateUser({
//         name: userData.name
//     })
//   };

//   return (
//     <Form className="w-full max-w-96" onSubmit={handleUpdateUser}>
//       <Fieldset>
//         <Fieldset.Legend>Profile Settings</Fieldset.Legend>
//         <Description>Update your profile information.</Description>
//         <FieldGroup>
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
//             <Label>Name</Label>
//             <Input placeholder="Enter your name" />
//             <FieldError />
//           </TextField>

//         </FieldGroup>
//         <Fieldset.Actions>
//           <Button type="submit">
//             <FloppyDisk />
//             Save changes
//           </Button>
//           <Button type="reset" variant="secondary">
//             Cancel
//           </Button>
//         </Fieldset.Actions>
//       </Fieldset>
//     </Form>
//   );
// }