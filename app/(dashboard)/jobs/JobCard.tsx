import React from "react";
import { JobType } from "@/utils/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Banknote, Briefcase, RadioTower } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteJob from "./DeleteJob";
import JobInfo from "./JobInfo";
import { Badge } from "@/components/ui/badge";

export default function JobCard({ job }: { job: JobType }) {
  return (
    <>
      <Card className="bg-muted">
        <CardHeader>
          <CardDescription className="uppercase text-xl font-bold">
            {job.location}
          </CardDescription>
          <CardTitle className="capitalize text-2xl">{job.position}</CardTitle>
        </CardHeader>
        <CardContent className=" gap-4">
          <JobInfo icon={<Briefcase />} text={job.mode} />
          <JobInfo icon={<Banknote />} text="$120,000 - $150,00 / Yearly" />
          <CardDescription>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis
            laboriosam porro, dicta sed inventore tenetur numquam ipsam in et
            laborum exercitationem, nulla quae fuga, aperiam nisi est corrupti
            provident labore?
          </CardDescription>
          <Badge className="w-32  mx-50 justify-center mt-2">
            <JobInfo
              icon={<RadioTower className="w-4 h-4" />}
              text={job.status}
            />
          </Badge>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button asChild size="sm">
            <Link href={`/jobs/${job.id}`}>edit</Link>
          </Button>
          <DeleteJob id={job.id} />
        </CardFooter>
      </Card>
    </>
  );
}
