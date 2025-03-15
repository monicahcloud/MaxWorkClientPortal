import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/about"]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) return; // Allow public access

  auth().protect(); // Protect all other routes
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // Apply middleware to all routes except static files
};
