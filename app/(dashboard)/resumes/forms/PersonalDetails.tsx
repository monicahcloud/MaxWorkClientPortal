import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResumeInfoContext } from "@/app/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { updateResume } from "@/utils/actions";
import { toast } from "sonner";

interface PersonalDetailsProps {
  enableNext: (value: boolean) => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    address: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (resumeInfo) {
      setFormData({
        firstName: resumeInfo.firstName || "",
        lastName: resumeInfo.lastName || "",
        jobTitle: resumeInfo.jobTitle || "",
        address: resumeInfo.address || "",
        phone: resumeInfo.phone || "",
        email: resumeInfo.email || "",
      });
    }
  }, [resumeInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    enableNext(true);
    try {
      const updatedResume = await updateResume({ ...resumeInfo, ...formData });
      if (updatedResume) {
        toast.success("Resume updated successfully");
        setResumeInfo(updatedResume); // ✅ Update context after save
      } else {
        toast.error("Failed to update resume");
      }
    } catch (error) {
      console.error("Error updating resume:", error);
      toast.error("An error occurred while updating the resume");
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-red-700 border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get Started with your basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <Label className="text-sm">First Name</Label>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label className="text-sm">Last Name</Label>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;
