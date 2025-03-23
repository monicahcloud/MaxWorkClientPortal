import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getUserResumes } from "@/utils/actions";
import Resumes from "../resumeBuilder/Resumes";

export default async function ResumesList() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["userResumes"],
    queryFn: getUserResumes,
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div>
          <div>
            <Resumes />
          </div>
        </div>
      </HydrationBoundary>
    </>
  );
}
