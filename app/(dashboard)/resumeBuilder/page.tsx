"use client";
import Spinner from "@/app/components/global/Spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    title: "",
    imageURL: null,
  });

  const [imageAsset, setImageAsset] = useState({
    isImageLoading: false,
    imageURL: null,
    progress: 0,
  });

  // Handle the input field change
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevRec) => ({
      ...prevRec,
      [name]: value,
    }));
  };
  const isAllowed = (file: { type: string }) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    return allowedTypes.includes(file.type);
  };

  // Hange the image file changes
  const handleFileSelect = async (e: { target: { files: any[] } }) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (file && isAllowed(file)) {
      const storageRef = ref;
    } else {
      toast.info("Invalid File Format");
    }

    setImageAsset((prevAsset) => ({
      ...prevAsset,
      isImageLoading: true,
    }));
  };
  return (
    <>
      <div className="w-full px-4 lg:px-5 2xl:px-10 py-4 grid grid-cols-1 lg:grid-cols-12">
        {/* left container */}
        <div className="col-span-12 lg:col-span-4 2xl:col-span-3 w-full flex-1 flex items-center justify-start flex-col gap-4 px-2">
          <div className="w-full">
            <p className="text-lg text-primary capitalize ">
              Create a new template
            </p>
          </div>
          {/* template ID section */}
          <div className="w-full flex items-center justify-end">
            <p className="text-muted-foreground text-base uppercase ">
              tempid:
            </p>{" "}
            <p className="text-foreground text-sm capitalize font-bold ">
              template 1:
            </p>
          </div>
          {/* template title section */}
          <Input
            className="w-full px-4 py-3 rounded-md bg-transparent border border-gray-300 text-lg text-primary focus:text-slate-600 foucs:shadow-md outline-none"
            placeholder="Template Title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          {/* file upload section */}
          <div className="w-full bg-gray-100 backdrop-blur-md h[420px] lg:h-[620px] 2xl:h-[740px] rounded-b-md border-2 border-dotted border-gray-300 cursor-pointer flex items-center justify-center">
            {imageAsset.isImageLoading ? (
              <>
                <div className="flex flex-col items-center justify-center gap-4 ">
                  <Spinner />
                  <p>{imageAsset?.progress.toFixed(2)}%</p>
                </div>
              </>
            ) : (
              <>
                {!imageAsset?.url ? (
                  <>
                    <Label className="w-full cursor-pointer h-full">
                      <div className="flex flex-col items-center justify-center h-full w-full">
                        <div className="flex items-center justify-center cursor-pointer flex-col gap-4">
                          <Upload className="text-2xl" />
                          <p className="text-lg text-muted-foreground">
                            Click to upload
                          </p>
                        </div>
                      </div>
                      <Input
                        type="file"
                        className="w-0 h-0"
                        accept=".jpeg,.png,.jpg"
                        onChange={handleFileSelect}
                      />
                    </Label>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        </div>

        {/* right container */}
        <div className="col-span-12 lg:col-span-8 2xl:col-span-9 bg-gray-200">
          grid 2
        </div>
      </div>
    </>
  );
}
