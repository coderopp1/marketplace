import { createProduct } from "@/app/actions";
import { bannerSchema } from "@/app/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { MoreHorizontal, PlusCircle, User2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";
import prisma from "@/app/lib/db";

async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function BannerRoute() {
  const data = await getData();
  return (
    <>
      <div className="flex items-center justify-end">
        <Button asChild className="flex gap-x-2">
          <Link href="/dashboard/banner/create">
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Add banner</span>
          </Link>
        </Button>
      </div>
      <Card className="mt-5">
        <CardTitle className="mx-5 font-bold mt-2">Banners</CardTitle>
        <CardDescription className="mx-5 font-medium mt-2">
          manange your banner
        </CardDescription>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Images</TableHead>
                <TableHead>Products</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    < Image  alt="produdct image" src={item.imageString}
                    width={64}
                    height={64}
                    className="rounded-lg object-cover h-16 w-16" />
                  </TableCell>
                  <TableCell className="font-medium"> {item.title}</TableCell>
                  <TableCell className="text-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/banner/${item.id}/delete`}>delete</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
