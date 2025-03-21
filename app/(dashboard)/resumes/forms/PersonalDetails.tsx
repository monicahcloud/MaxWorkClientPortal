import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResumeInfoContext } from "@/app/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { updateResume } from "@/utils/actions";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

interface PersonalDetailsProps {
  enableNext: (value: boolean) => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [loading, setLoading] = useState(false);
  const params = useParams();
  const resumeId = params?.resumeId; // Extract resumeId

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
  useEffect(() => {
    console.log("Params from useParams():", params); // Debugging
  }, [params]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    enableNext(false);
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const resumeId = Array.isArray(params?.resumeId)
      ? params.resumeId[0]
      : params?.resumeId || resumeInfo?.id;
    console.log(params.resumeId);
    if (!resumeId) {
      toast.error("Resume ID is missing");
      setLoading(false);
      return;
    }
    console.log("Personal Details", resumeId);
    try {
      const updatedResume = await updateResume(resumeId, formData);

      if (updatedResume) {
        setResumeInfo(updatedResume); // ✅ Update state/context
        toast.success("Details updated successfully");
        enableNext(true);
      }
    } catch (error) {
      toast.error("Failed to update details");
    } finally {
      setLoading(false);
    }
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
          <div className="col-span-2">
            <Label className="text-sm">Job Title</Label>
            <Input
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-span-2">
            <Label className="text-sm">Address</Label>
            <Input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label className="text-sm">Phone Number</Label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label className="text-sm">Email Address</Label>
            <Input
              name="email"
              value={formData.email}
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
};

export default PersonalDetails;
