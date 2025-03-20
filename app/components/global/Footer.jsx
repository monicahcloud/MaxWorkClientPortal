import React from "react";
import logo from "@/public/MaxWorkLogo.png";
import Link from "next/link";
function Footer() {
  return (
    <div className="w-full flex items-center justify-between border-t px-5 h-5 border-gray-300">
      <div className="flex items-center justify-center gap-3 py-3">
        <img src={logo} className="w-8 h-auto object-contain" alt="Logo" />
      </div>
      <div className="flex items-center justify-center gap-3 py-3">
        <Link href="/home" className="text-blue-700 text-sm">
          Home
        </Link>
        <Link href="/home" className="text-blue-700 text-sm">
          Contact
        </Link>
        <Link href="/home" className="text-blue-700 text-sm whitespace-nowrap">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}

export default Footer;
