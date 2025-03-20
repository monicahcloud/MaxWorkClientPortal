import { PlusSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Spinner from "@/app/components/global/Spinner";
import { createResume } from "@/utils/actions";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createAndEditResumeSchema,
  CreateAndEditResumeType,
} from "@/utils/types";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

export default function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useUser();

  const form = useForm<CreateAndEditResumeType>({
    resolver: zodResolver(createAndEditResumeSchema),
    defaultValues: {
      resumeTitle: "",
    },
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: CreateAndEditResumeType) => {
      console.log("🔥 `mutate()` triggered with values:", values); // Debugging log
      if (!user) {
        toast("User not authenticated");
        console.error("❌ No user found");
        return;
      }
      console.log("🚀 Calling `createResume` with:", values);

      try {
        const newResume = await createResume({
          ...values,
          userName: user.fullName || "",
          userEmail: user.primaryEmailAddress?.emailAddress || "",
        });

        console.log("✅ Resume created:", newResume);
        return newResume;
      } catch (error) {
        console.error("❌ Error in `createResume` call:", error);
      }
    },

    onSuccess: (data) => {
      if (!data) {
        toast("No resume title saved");
        console.error("❌ No data returned from createResume");
        return;
      }

      toast("Resume title created");
      queryClient.invalidateQueries({ queryKey: ["resumes"] });

      console.log("🔄 Redirecting to:", `/resumes/${data.id}`);
      console.log("Data ID type:", typeof data.id); // Check the type
      console.log("Data ID value:", data.id); // Check the value
      if (typeof data.id === "string" && data.id.trim() !== "") {
        router.push(`/resumes/${data.id}`);
      } else {
        console.error("❌ Invalid data.id for redirection:", data.id);
      }

      form.reset();
      setOpenDialog(false);
    },
    onError: (error) => {
      console.error("❌ Error creating resume:", error);
      toast("Error creating resume");
    },
  });

  function onSubmit(values: CreateAndEditResumeType) {
    console.log("🚀 onSubmit called with values:", values);
    mutate(values);
  }

  return (
    <div>
      <div
        className="p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer "
        onClick={() => setOpenDialog(true)}>
        <PlusSquare />
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <div className="">
              <DialogDescription>
                Add a title for your new resume.
              </DialogDescription>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg-muted p-8 rounded">
                <Input
                  type="text"
                  {...form.register("resumeTitle")}
                  className="my-2 capitalize"
                  placeholder="Ex. Full Stack Resume"
                />
                <div className="flex justify-end gap-5">
                  <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? <Spinner /> : "Create Title"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
