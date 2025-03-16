import React from "react";
import { JobType } from "@/utils/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Banknote, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteJob from "./DeleteJob";
import JobInfo from "./JobInfo";

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
        <CardContent>
          <JobInfo icon={<Briefcase />} text={job.mode} />
          <JobInfo icon={<Banknote />} text="$120,000 - $150,00 / Yearly" />
          <CardDescription>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis
            laboriosam porro, dicta sed inventore tenetur numquam ipsam in et
            laborum exercitationem, nulla quae fuga, aperiam nisi est corrupti
            provident labore?
          </CardDescription>
        </CardContent>
        <Button asChild size="sm">
          <Link href={`/jobs/${job.id}`}>edit</Link>
        </Button>
        {/* <DeleteJob id={job.id} /> */}
      </Card>
    </>
  );
}
