// import prisma from "@/app/lib/db";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const { userId } = auth();
//     const user = await currentUser();
  

//     if (!userId || !user) {
//       return NextResponse.redirect("http://localhost:3000/"); // Redirect to an error page or login page
//     }

//     let dbUser = await prisma.user.findUnique({
//       where: {
//         id: user.id,
//       },
//     });

//     if (!dbUser) {
//       dbUser = await prisma.user.create({
//         data: {
//           id: user.id,
//           firstName: user.firstName ?? "",
//           lastName: user.lastName ?? "",
        
//         },
//       });
//     }

//     return NextResponse.redirect("http://localhost:3000/");
//   } catch (error) {
   
//     return NextResponse.redirect("http://localhost:3000/"); // Redirect to an error page or handle the error
//   }
// }

import prisma from "@/app/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
  noStore();
  const { userId } = auth();
  const user = await currentUser();

  if (!user || user === null || !user.id) {
    throw new Error("Something went wrong...");
  }

  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
        email: user.emailAddresses[0]?.emailAddress ?? "",
  
        profileImage:
        user.imageUrl ?? `https://avatar.vercel.sh/${user.firstName}`,
      },
    });
  }

  return NextResponse.redirect(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : "https://https://marketplace-42tz.vercel.app"
  );
}