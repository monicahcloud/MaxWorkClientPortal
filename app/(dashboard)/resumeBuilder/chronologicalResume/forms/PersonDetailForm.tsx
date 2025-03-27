"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useResumeBuilder } from "@/app/context/ResumeBuilderContext";
import { toast } from "sonner";

interface Props {
  onComplete: () => void;
  resumeId: string;
}

const PersonDetailForm: React.FC<Props> = ({ onComplete, resumeId }) => {
  const [loading, setLoading] = useState(false);
  const { personalInfo, setPersonalInfo } = useResumeBuilder();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!resumeId) {
        toast.error("Missing resume ID.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/resume/personal-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeId, ...personalInfo }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong saving your info.");
        return;
      }

      toast.success("Personal info saved successfully!");
      onComplete();
    } catch (err) {
      toast.error("Unable to save personal info. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg w-full border-blue-700 border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get started with your basic information.</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <Label className="text-sm">First Name</Label>
            <Input
              required
              name="firstName"
              value={personalInfo?.firstName || ""}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label className="text-sm">Last Name</Label>
            <Input
              required
              name="lastName"
              value={personalInfo?.lastName || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-2">
            <Label className="text-sm">Job Title</Label>
            <Input
              required
              name="jobTitle"
              value={personalInfo?.jobTitle || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-2">
            <Label className="text-sm">Address</Label>
            <Input
              required
              name="address"
              value={personalInfo?.address || ""}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label className="text-sm">Email Address</Label>
            <Input
              required
              name="email"
              value={personalInfo?.email || ""}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label className="text-sm">Phone Number</Label>
            <Input
              required
              name="phone"
              value={personalInfo?.phone || ""}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label className="text-sm">Website</Label>
            <Input
              required
              name="website"
              value={personalInfo?.website || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonDetailForm;
