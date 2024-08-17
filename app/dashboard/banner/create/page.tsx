"use client";
import { createBanner, createProduct } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { bannerSchema } from "@/app/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";

export default function BannerRoute() {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [lastResult, action] = useFormState(createBanner, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: bannerSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center gap-x-4 my-5">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>

        <h1 className="text-xl font-semibold tracking-tight">New Banner</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Banner details</CardTitle>
          <CardDescription>create your banner here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                type="text"
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={fields.title.initialValue}
                placeholder="create title for banner"
              ></Input>
              <p className="text-red-500">{fields.title.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label> Image </Label>
              <input
                type="hidden"
                value={image}
                name={fields.imageString.name}
                key={fields.imageString.key}
                defaultValue={fields.imageString.initialValue}
              ></input>
              {image !== undefined ? (
                <Image
                  src={image}
                  alt="image"
                  width={200}
                  height={200}
                  loading="lazy"
                  className="w-[200px] h-[200px] object-cover border rounded-lg"
                />
              ) : (
                <UploadDropzone
                  onClientUploadComplete={(res) => {
                    setImage(res[0].url);
                  }}
                  onUploadError={() => {
                    console.log("error");
                  }}
                  endpoint="bannerImageRoute"
                ></UploadDropzone>
              )}
              <p className="text-red-500">{fields.imageString.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="creste banner" />
        </CardFooter>
      </Card>
    </form>
  );
}
