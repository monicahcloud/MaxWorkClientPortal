import React from "react";
import Link from "next/link";
import img from "@/public/error.svg";
import Image from "next/image";

function ErrorPage() {
  return (
    <div className="w-full">
      <Image src={img} alt="not found" priority />
      <h3>Ohhh! Page Not Found</h3>
      <Link href="/">Back to Home Page</Link>
    </div>
  );
}

export default ErrorPage;
