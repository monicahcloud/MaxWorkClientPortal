import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUserResumes } from "@/utils/actions";
import Resumes from "../../resumeBuilder/Resumes";

// Import your client component

export default async function ResumesPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["userResumes"],
    queryFn: getUserResumes,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Resumes />
    </HydrationBoundary>
  );
}
