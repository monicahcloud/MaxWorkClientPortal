"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useResumeBuilder } from "@/app/context/ResumeBuilderContext";

function PersonalDetailsForm() {
  const [loading, setLoading] = React.useState(false);

  // ⬇️ Get data and updater from context
  const { personalInfo, setPersonalInfo } = useResumeBuilder();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Saved Personal Info:", personalInfo);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="p-5 shadow-lg rounded-lg w-full border-red-700 border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get Started with your basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <Label className="text-sm">First Name</Label>
            <Input
              name="firstName"
              value={personalInfo.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label className="text-sm">Last Name</Label>
            <Input
              name="lastName"
              value={personalInfo.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-span-2">
            <Label className="text-sm">Job Title</Label>
            <Input
              name="jobTitle"
              value={personalInfo.jobTitle}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-span-2">
            <Label className="text-sm">Address</Label>
            <Input
              name="address"
              value={personalInfo.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label className="text-sm">Department</Label>
            <Input
              name="department"
              value={personalInfo.department}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label className="text-sm">Email Address</Label>
            <Input
              name="email"
              value={personalInfo.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label className="text-sm">Phone Number</Label>
            <Input
              name="phone"
              value={personalInfo.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label className="text-sm">Website</Label>
            <Input
              name="website"
              value={personalInfo.website}
              onChange={handleInputChange}
              required
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
}

export default PersonalDetailsForm;
