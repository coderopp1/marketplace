

import { Button } from "@/components/ui/button";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { NavbarLinks } from "./NavbarLinks";
import { ShoppingBagIcon } from "lucide-react";
import { Cart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { auth, currentUser } from "@clerk/nextjs/server";
import Signin from "./Signin";

export  async function Navbar() {
 
  const { userId } = auth();
  const user = await currentUser();

  const cart: Cart | null = await redis.get(`cart-${user?.id}`);

  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <>
      <nav className="w-full max-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-black font-bold text-2xl lg:text-3xl font">
              Marketplace
            </h1>
          </Link>
          <div className="mx-4 justify-between flex items-center align-middle">
            <NavbarLinks />
          <Signin/>
            <SignedIn>
              <Link href="/bag" className="group p-2 flex items-center mr-2">
                <ShoppingBagIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                 {total}
                </span>
              </Link>
              <div className="mx-4">
              
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      </nav>
    </>
  );
}
