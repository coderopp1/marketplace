"use client";
"use client";
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
import { SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, XIcon } from "lucide-react";
import Link from "next/link";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { useFormState } from "react-dom";
import { createProduct, editProduct } from "@/app/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/app/lib/zodSchemas";
import { useState } from "react";
import Image from "next/image";
import { categories } from "@/app/lib/category";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { type $Enums } from "@prisma/client";

interface iAppProps {
  data: {
    id: string;
    name: string;
    descrition: string;
    status: $Enums.ProductStatus;
    price: number;
    images: string[];
    category: $Enums.Category;
    isFeatured: boolean;
  };
}

export function EditForm({ data }: iAppProps) {
  const [images, setImages] = useState<string[]>(data.images);
  const [lastResult, action] = useFormState(editProduct, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };
  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
        <input type="hidden" name="productId"  value={data.id}/>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">Edit Product</h1>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Product Detals</CardTitle>
          <CardDescription>
            in this form you can Update your products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                type="text"
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={data.name}
                className="w-full"
                placeholder="Product Name"
              />
              <p className="text-red-500">{fields.name.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Textarea
                key={fields.descrition.key}
                name={fields.descrition.name}
                defaultValue={data.descrition}
                placeholder="Write Your description here"
              />
              <p className="text-red-500">{fields.descrition.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>price</Label>
              <Input
                key={fields.price.key}
                name={fields.price.name}
                defaultValue={data.price}
                type="number"
                placeholder="$55"
              />
              <p className="text-red-500">{fields.price.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Featured Product</Label>
              <Switch
                key={fields.isFeatured.key}
                name={fields.isFeatured.name}
                defaultChecked={data.isFeatured}
              />
              <p className="text-red-500">{fields.isFeatured.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Status</Label>
              <Select
                key={fields.status.key}
                name={fields.status.name}
                defaultValue={data.status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.status.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Category</Label>
              <Select
                key={fields.category.key}
                name={fields.category.name}
                defaultValue={data.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.category.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label> Images</Label>
              <input
                type="hidden"
                value={images}
                key={fields.images.key}
                name={fields.images.name}
                defaultValue={fields.images.initialValue as any}
              ></input>
              {images.length > 0 ? (
                <div className="flex gap-5">
                  {images.map((image, index) => (
                    <div className="relative w-[100px] h-[100px]" key={index}>
                      <Image
                        height={100}
                        width={100}
                        src={image}
                        alt="Product image"
                        className="w-full h-full object-cover rounded-lg border"
                        loading="lazy"
                      />
                      <button
                        onClick={() => {
                          handleDelete(index);
                        }}
                        type="button"
                        className="abolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white"
                      >
                        <XIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImages(res.map((r) => r.url));
                  }}
                  onUploadError={() => {
                    alert("Something went wrong");
                  }}
                />
              )}
              <p className="text-red-500">{fields.images.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Update Product" />
        </CardFooter>
      </Card>
    </form>
  );
}
