import React from "react";

interface PersonDetailPreviewProps {
  resumeInfo: {
    firstName: string;
    lastName: string;
    jobTitle: string;
    address: string;
    phone: string;
    email: string;
    themeColor: string;
  };
}

export default function PersonDetailPreview({
  resumeInfo,
}: PersonDetailPreviewProps) {
  if (!resumeInfo)
    return <p className="text-center text-gray-500">No Resume Data</p>;

  return (
    <div>
      <h1
        className="font-bold text-4xl text-center"
        style={{ color: resumeInfo.themeColor }}>
        {resumeInfo.firstName} {resumeInfo.lastName}
      </h1>
      <h2 className="text-center text-xl font-medium capitalize">
        {resumeInfo.jobTitle}
      </h2>
      <h2
        className="text-center text-md font-normal capitalize"
        style={{ color: resumeInfo.themeColor }}>
        {resumeInfo.address}
      </h2>
      <div className="flex justify-between">
        <h2
          className="font-normal text-sm"
          style={{ color: resumeInfo.themeColor }}>
          {resumeInfo.phone}
        </h2>
        <h2
          className="font-normal text-sm"
          style={{ color: resumeInfo.themeColor }}>
          {resumeInfo.email}
        </h2>
      </div>
      <hr
        className="border-2 my-2 "
        style={{ borderColor: resumeInfo.themeColor }}
      />
    </div>
  );
}
