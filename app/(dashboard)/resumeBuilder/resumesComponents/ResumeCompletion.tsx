"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Assuming you're using shadcn/ui or similar
import { Button } from "@/components/ui/button";

interface ResumeCompletionPromptProps {
  onComplete?: () => void; // Optional callback for completion logic
}

const ResumeCompletion: React.FC<ResumeCompletionPromptProps> = ({
  onComplete,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false); // dialog state

  const handleFinish = () => {
    setOpen(false); // close dialog
    if (onComplete) {
      onComplete(); // Execute any completion logic passed via prop
      router.push("/resumes"); // Redirect to the resumes page
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg w-full border-blue-700 border-t-4 mt-10">
      <div className="mb-8">
        <h2 className="font-bold text-lg">You're All Set!</h2>
        <p>
          Please review your resume. If everything looks good, click the button
          to finish.
        </p>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="justify-center flex">
            {" "}
            <Button className="text-center justify-center">
              Finish Building Resume
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Finished Building Your Resume?</DialogTitle>
            <DialogDescription>
              Are you sure you've completed all sections of your resume?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleFinish}>
              Yes, I'm Finished
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResumeCompletion;
