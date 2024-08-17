"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/dashboard/orders" },
  { name: "Products", href: "/dashboard/products" },
  { name: "banner Picture", href: "/dashboard/banner" },
];

const Dashboardnavigation = () => {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            link.href === pathname
              ? "text-black font-bold"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
};

export default Dashboardnavigation;
