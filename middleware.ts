import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/about"]); // Define public routes

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth(); // Get the user ID from Clerk

  if (!userId && !isPublicRoute(req)) {
    return Response.redirect(new URL("/", req.url)); // Redirect only unauthenticated users
  }

  // Allow authenticated users access to all routes
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // Apply middleware to all routes except static files
};
