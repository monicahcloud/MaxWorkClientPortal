"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function CreateJobForm() {
  // 1. Define your form.
  //   const form =
  //     useForm <
  //     z.infer <
  //     typeof formSchema >>
  //       {
  //         resolver: zodResolver(formSchema),
  //         defaultValues: {
  //           username: "",
  //         },
  //       };

  // 2. Define a submit handler.
  function onSubmit() {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <h1> your in the create job form component</h1>
    </>
  );
}
export default CreateJobForm;
