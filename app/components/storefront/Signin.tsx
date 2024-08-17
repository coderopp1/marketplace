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

import { SignedOut, SignIn, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Signin = () => {
  const router = useRouter();
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (signedIn) {
      router.push("/api/auth/creation"); // Redirect to the specified route after the user signs in
    }
  }, [signedIn, router]);

  useEffect(() => {
    // This effect simulates a check to see if the user has signed in.
    // Replace this logic with an actual check if needed.
    const checkSignInStatus = () => {
      // Simulating the sign-in status update
      setSignedIn(true);
    };

    checkSignInStatus();
  }, []);

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
