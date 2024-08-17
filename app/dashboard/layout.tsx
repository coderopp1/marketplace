import React, { ReactNode } from "react";
import Dashboardnavigation from "../components/dashboard/Dashboardnavigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CircleUser, Link, MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId } = auth();
  const user = await currentUser();

  if (
    !userId ||
    user?.emailAddresses[0].emailAddress !== "arukumargupta@gmail.com"
  ) {
    return redirect("/");
  }

  return (
    <>
      <div className="flex w-full flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="stucky top-0 flex h-16 items-center justify-between gap-4 border-b bg-white">
          <nav className="hidden font-medium  md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Dashboardnavigation />
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="shrink-0 md:hidden"
                variant="outline"
                size="icon"
              >
                <MenuIcon className="h-5 w-4"></MenuIcon>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-6 text-lg font-medium mt-5">
                <Dashboardnavigation />
              </nav>
            </SheetContent>
          </Sheet>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
        <main className="my-5 font-medium">{children}</main>
      </div>
    </>
  );
}
