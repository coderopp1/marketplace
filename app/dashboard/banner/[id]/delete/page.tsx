import { deleteBanner } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function DeleteBannerRoute({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Are You Absolutely Sure</CardTitle>
          <CardDescription>
            this cannot be undone . please take carefull steps
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant="secondary" asChild>
            <Link href={`/dashboard/banner/`}>Cancel</Link>
          </Button>
          <form action={deleteBanner}>
            <input type="hidden" name="bannerId" value={params.id} />
            <SubmitButton text="delete" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
