"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, WholeWord } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useResumeBuilder } from "@/app/context/ResumeBuilderContext";

const languages = [
  { name: "English", percentage: 100 },
  { name: "Spanish", percentage: 60 },
  { name: "German", percentage: 20 },
  { name: "French", percentage: 60 },
];

const renderCircles = (percentage) => {
  const filledCount = Math.round((percentage / 100) * 5);
  return Array.from({ length: 5 }, (_, i) => (
    <span
      key={i}
      className={`text-lg ${
        i < filledCount ? "text-cyan-500" : "text-gray-200"
      }`}>
      ●
    </span>
  ));
};

const FunctionalPreviewPage = () => {
  const {
    personalInfo,
    summary,
    image,
    experiences,
    education,
    certifications,
  } = useResumeBuilder();

  return (
    <form className="flex  font-sans max-w-3xl mx-auto shadow-lg">
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

            <h2 className="text-sm mx-auto font-bold my-6 underline underline-offset-4 uppercase">
              Contact
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                {/* <Mail className="w-2 h-2  text-white" /> */}
                <p className="text-xs text-left -ml-7">
                  {personalInfo.email || "you@example.com"}
                </p>
              </div>
              <div className="flex items-center">
                {/* <Phone className="w-5 h-5 mr-2 text-white" /> */}
                <p className="text-xs text-left -ml-7">
                  {personalInfo.phone || "000-000-0000"}
                </p>
              </div>
              <div className="flex items-center">
                {/* <MapPin className="w-5 h-5 mr-2 text-white" /> */}
                <p className="text-xs text-left -ml-7">
                  {personalInfo.address || "Your City, State"}
                </p>
              </div>
              <div className="flex items-center text-sm ">
                {/* <WholeWord className="w-5 h-5 mr-2 text-white" /> */}
                <p className="text-xs text-left -ml-7">
                  {personalInfo.website || "linkedin.com/in/yourprofile"}
                </p>
              </div>

              <div className="mt-10">
                <h1 className="uppercase underline underline-offset-6 mb-4 text-md font-semibold">
                  Skills
                </h1>
                <div className="mt-1">
                  <h2 className="text-xs text-left -ml-7">PHP OOPs</h2>
                  <div className="h-2 text-left -ml-7  bg-gray-200 w-[120px]">
                    <div
                      className="h-2 bg-cyan-500"
                      style={{ width: "80%" }}></div>
                  </div>
                </div>
                <div className="mt-1">
                  <h2 className="text-xs text-left -ml-7">JavaScript</h2>
                  <div className="h-2 text-left -ml-7 bg-gray-200 w-[120px]">
                    <div
                      className="h-2 bg-cyan-500"
                      style={{ width: "50%" }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h1 className="uppercase underline text-md underline-offset-4 mb-4 font-semibold">
                  Languages
                </h1>
                <div>
                  {languages.map((lang, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm text-left -ml-7 items-center">
                      <span>{lang.name}</span>
                      <div>{renderCircles(lang.percentage)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-2/3 bg-neutral-100 p-4 text-left space-y-3">
        <Card className="bg-gray-100 border-none text-center">
          <CardContent className="border-none">
            <h1 className="text-2xl font-semibold mb-1 text-gray-800">
              {personalInfo.firstName || "First Name"}{" "}
              {personalInfo.lastName || "Last Name"}
            </h1>
            <hr className="w-3/4 mx-auto border-gray-800 border-1" />
            <p className="text-md text-gray-600 text-center mt-1">
              {personalInfo.jobTitle || "Your Job Title"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-transparent border-none shadow-none mt-2">
          <CardContent className="text-left">
            <h1 className="text-sm text-cyan-600 font-semibold uppercase mb-2">
              Summary
            </h1>
            <hr className="mb-2" />
            <p className="text-xs whitespace-pre-line text-wrap ">{summary}</p>
          </CardContent>
        </Card>

        <Card className="bg-transparent border-none shadow-none -mt-10">
          <CardContent className="text-left">
            <h1 className="text-sm text-cyan-600 font-semibold uppercase mb-2">
              Experience
            </h1>
            <hr className="mb-2" />
            {experiences.map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between">
                  <h2 className="text-xs font-bold ">{exp.role}</h2>
                  <span className="text-xs">{exp.time || "--"}</span>
                </div>
                <h3 className="text-xs font-bold ">{exp.company}</h3>
                <p className="text-xs whitespace-pre-line">
                  {exp.responsibilities}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-transparent border-none shadow-none -mt-10">
          <CardContent className="text-left">
            <h1 className="text-sm font-semibold text-cyan-600 uppercase mb-2">
              Education
            </h1>
            <hr className="mb-2" />
            {education.map((edu, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between">
                  <h2 className="text-xs font-bold">{edu.degree}</h2>
                  <span className="text-xs">
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>
                <h3 className="text-xs">{edu.school}</h3>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-transparent border-none shadow-none -mt-5">
          <CardContent>
            <h1 className="text-sm font-semibold text-cyan-600 uppercase mb-2">
              Certifications
            </h1>
            <hr className="mb-2" />
            {certifications.map((cert, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between">
                  <h2 className="text-xs font-bold">{cert.title}</h2>
                  <span className="text-xs">
                    {new Date(cert.issueDate).getFullYear()}
                  </span>
                </div>
                <h3 className="text-xs">{cert.issuer}</h3>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="text-center mt-16">
          <Button type="submit">Save</Button>
        </div>
      </div>
    </form>
  );
};

export default FunctionalPreviewPage;
