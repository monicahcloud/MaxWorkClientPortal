"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Certification } from "@/app/context/ResumeBuilderContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface CertificationFormProps {
  certification: Certification;
  index: number;
  onChange: (updated: Certification) => void; // Corrected prop type
  onRemove: (index: number) => void;
  onComplete: () => void;
  resumeId: string;
}

function CertificationForm({
  certification,
  index,
  onChange,
  onRemove,
  onComplete,
  resumeId,
}: CertificationFormProps) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange({ ...certification, [name]: value }); // Corrected line
  };

  const handleIssueDateChange = (date: Date | undefined) => {
    onChange({ ...certification, issueDate: date || new Date() }); // Corrected line
  };

  const handleExpirationDateChange = (date: Date | undefined) => {
    onChange({ ...certification, expirationDate: date || undefined }); // Corrected line
  };

  return (
    <div className="border p-4 rounded-md mt-4 bg-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Certification #{index + 1}</h2>
        <Button variant="destructive" size="sm" onClick={() => onRemove(index)}>
          Remove
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Certification Name</Label>
          <Input
            type="text"
            name="title"
            value={certification?.title || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label>Issuing Organization</Label>
          <Input
            type="text"
            name="issuer"
            value={certification?.issuer || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="w-full">
          <Label>Issue Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !certification?.issueDate && "text-muted-foreground"
                )}>
                {certification?.issueDate
                  ? format(certification.issueDate, "PPP")
                  : "Pick a date"}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={certification?.issueDate}
                onSelect={handleIssueDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="w-full">
          <Label>Expiration Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !certification?.expirationDate && "text-muted-foreground"
                )}>
                {certification?.expirationDate
                  ? format(certification.expirationDate, "PPP")
                  : "Pick a date"}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={certification?.expirationDate}
                onSelect={handleExpirationDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default CertificationForm;
