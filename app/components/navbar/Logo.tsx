import Link from "next/link";
import Image from "next/image";

function Logo() {
  return (
    <Link href="/">
      <Image
        src="/MaxWorkLogo.png"
        alt="Logo"
        width={200}
        height={200}
        style={{ width: "300px", height: "75px" }}
        priority
      />
    </Link>
  );
}

export default Logo;
