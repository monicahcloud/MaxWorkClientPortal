"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, WholeWord } from "lucide-react";
import { useResumeBuilder } from "@/app/context/ResumeBuilderContext";

const FunctionalFormPage = () => {
  const {
    personalInfo,
    setPersonalInfo,
    summary,
    setSummary,
    image,
    setImage,
    experiences,
    setExperiences,
    education,
    setEducation,
    certifications,
    setCertifications,
  } = useResumeBuilder();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePersonalChange = (
    field: keyof typeof personalInfo,
    value: string
  ) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
  };

  const handleExperienceChange = (
    field: keyof typeof experiences,
    value: string
  ) => {
    setExperiences({ ...experiences, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      personalInfo,
      summary,
      image,
      experiences,
      education,
      certifications,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex p-4 font-sans max-w-3xl mx-auto shadow-lg">
      <div className="w-1/3 bg-cyan-700 p-4">
        <Card className="bg-transparent border-none shadow-none">
          <CardContent className="text-white">
            {image ? (
              <Image
                src={image}
                alt="Uploaded Profile"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full mx-auto object-cover"
              />
            ) : (
              <div className="w-24 h-24 mx-auto rounded-full border-gray-300 bg-white mb-2 flex items-center justify-center text-sm text-gray-500">
                No Image
              </div>
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4 text-xs"
            />

            <h2 className="text-sm font-bold my-6 underline underline-offset-4 uppercase">
              Contact
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-white" />
                <Input
                  placeholder="Email"
                  className="text-black"
                  value={personalInfo.email}
                  onChange={(e) =>
                    handlePersonalChange("email", e.target.value)
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-white" />
                <Input
                  placeholder="Phone"
                  className="text-black"
                  value={personalInfo.phone}
                  onChange={(e) =>
                    handlePersonalChange("phone", e.target.value)
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-white" />
                <Input
                  placeholder="Address"
                  className="text-black"
                  value={personalInfo.address}
                  onChange={(e) =>
                    handlePersonalChange("address", e.target.value)
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <WholeWord className="w-5 h-5 text-white" />
                <Input
                  placeholder="Website"
                  className="text-black"
                  value={personalInfo.website}
                  onChange={(e) =>
                    handlePersonalChange("website", e.target.value)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-2/3 bg-neutral-100 p-4 text-left space-y-3">
        <Card className="bg-gray-100 border-none text-center">
          <CardContent className="border-none">
            <Input
              placeholder="Full Name"
              className="text-2xl font-semibold text-center text-gray-800 mb-2"
              value={`${personalInfo.firstName} ${personalInfo.lastName}`.trim()}
              onChange={(e) => {
                const [first, ...rest] = e.target.value.split(" ");
                setPersonalInfo({
                  ...personalInfo,
                  firstName: first,
                  lastName: rest.join(" "),
                });
              }}
            />
            <hr className="w-3/4 mx-auto border-gray-800 border-1" />
            <Input
              placeholder="Job Title"
              className="text-lg text-center text-gray-600 mt-2"
              value={personalInfo.jobTitle}
              onChange={(e) => handlePersonalChange("jobTitle", e.target.value)}
            />
          </CardContent>
        </Card>
        <Card className="bg-transparent border-none shadow-none mt-2">
          <CardContent className="text-left">
            <h1 className="text-sm text-cyan-600 font-semibold uppercase mb-2">
              Summary
            </h1>
            <hr className="mb-2" />
            <Textarea
              placeholder="Write a brief summary about yourself..."
              className="w-full text-xs"
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </CardContent>
        </Card>
        {/* Experience Section */}
        <Card className="bg-transparent border-none shadow-none mt-2">
          <CardContent className="text-left">
            <h1 className="text-sm text-cyan-600 font-semibold uppercase mb-2">
              Experience
            </h1>
            <hr className="mb-2" />

            <div className="space-y-1 mb-4">
              <Input
                placeholder="Job Title"
                className="text-xs"
                value={experiences.role}
                onChange={(e) => handleExperienceChange("role", e.target.value)}
              />
              <Input
                placeholder="Company Name"
                className="text-xs"
                value={experiences.company}
                onChange={(e) => {
                  handleExperienceChange("company", e.target.value);
                }}
              />
              <Input
                placeholder="Dates"
                className="text-xs"
                value={experiences.time || ""}
                onChange={(e) => {
                  handleExperienceChange("time", e.target.value);
                }}
              />
              <Textarea
                placeholder="Describe your responsibilities..."
                className="w-full text-xs"
                rows={3}
                value={experiences.duties || ""}
                onChange={(e) => {
                  handleExperienceChange("duties", e.target.value);
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Education Section */}
        <Card className="bg-transparent border-none shadow-none mt-2">
          <CardContent className="text-left">
            <h1 className="text-sm font-semibold text-cyan-600 uppercase mb-2">
              Education
            </h1>
            <hr className="mb-2" />
            {education.map((edu, index) => (
              <div key={index} className="space-y-1 mb-4">
                <Input
                  placeholder="Degree"
                  className="text-xs"
                  value={edu.degree}
                  onChange={(e) => {
                    const updated = [...education];
                    updated[index].degree = e.target.value;
                    setEducation(updated);
                  }}
                />
                <Input
                  placeholder="School"
                  className="text-xs"
                  value={edu.school}
                  onChange={(e) => {
                    const updated = [...education];
                    updated[index].school = e.target.value;
                    setEducation(updated);
                  }}
                />
                <Input
                  placeholder="Field"
                  className="text-xs"
                  value={edu.field}
                  onChange={(e) => {
                    const updated = [...education];
                    updated[index].field = e.target.value;
                    setEducation(updated);
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Certifications Section */}
        <Card className="bg-transparent border-none shadow-none mt-2">
          <CardContent className="text-left">
            <h1 className="text-sm font-semibold text-cyan-600 uppercase mb-2">
              Certifications
            </h1>
            <hr className="mb-2" />
            {certifications.map((cert, index) => (
              <div key={index} className="space-y-1 mb-4">
                <Input
                  placeholder="Certificate Title"
                  className="text-xs"
                  value={cert.title}
                  onChange={(e) => {
                    const updated = [...certifications];
                    updated[index].title = e.target.value;
                    setCertifications(updated);
                  }}
                />
                <Input
                  placeholder="Issuer"
                  className="text-xs"
                  value={cert.issuer}
                  onChange={(e) => {
                    const updated = [...certifications];
                    updated[index].issuer = e.target.value;
                    setCertifications(updated);
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </form>
  );
};

export default FunctionalFormPage;
