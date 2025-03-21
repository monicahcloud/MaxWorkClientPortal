import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ResumeSelection from "./ResumeSelection";

export default function ResumeBuilderPage() {
  const queryClient = new QueryClient();
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <h1 className="text-2xl font-semibold text-center mb-10">
          Build Your Resume by Choosing a Template
        </h1>{" "}
        <ResumeSelection />
      </HydrationBoundary>
    </>
  );
}
