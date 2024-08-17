// "use client";

// import { SignedOut, SignIn, SignInButton } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// const Signin = () => {
//   const router = useRouter();

//   useEffect(() => {
//     // Redirect to the specified route after the user signs in
//     router.push("/api/auth/creation"); // Ensure the path is correct
//   }, [router]);

//   return (
//     <SignedOut>
//       <div className="ml-4">
//         <SignInButton />
//       </div>
//       <SignIn routing="path" path="/api/auth/sign-in" />
//     </SignedOut>
//   );
// };

// export default Signin;
"use client";

import { SignedOut, SignIn, SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const Signin = () => {
  const router = useRouter();
  const { isSignedIn } = useUser(); // Check the user's sign-in status
  const isSignedInRef = useRef(isSignedIn);

  useEffect(() => {
    // Use the ref to store the sign-in status
    if (isSignedInRef.current) {
      router.push("/api/auth/creation"); // Redirect to the specified route after the user signs in
    }
    // Update the ref with the latest isSignedIn value
    isSignedInRef.current = isSignedIn;
  }, [isSignedIn, router]);

  return (
    <SignedOut>
      <div className="ml-4">
        <SignInButton />
      </div>
      <SignIn routing="path" path="/api/auth/sign-in" />
    </SignedOut>
  );
};

export default Signin;
