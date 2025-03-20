import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import React from "react";

function Experience() {
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-red-700 border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add Your previous Job experience</p>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" className="text-primary">
            {" "}
            + Add More Experience
          </Button>
          <Button variant="outline" className="text-primary">
            {" "}
            - Remove
          </Button>
        </div>
        <Button>
          <LoaderCircle className="animate-spin" />
        </Button>
      </div>
    </div>
  );
}

export default Experience;
