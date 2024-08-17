import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);


// Create matchers for the public routes
const isPublicRoute = createRouteMatcher(["/", "/api/auth/creation"]);

export default clerkMiddleware((auth, req) => {
  // Make public routes accessible without authentication
  if (isPublicRoute(req)) {
    return NextResponse.next(); // Continue without enforcing authentication
  }
  // Restrict dashboard routes to signed-in users
  if (isDashboardRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
