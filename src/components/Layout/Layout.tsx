"use client";

import { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import AppNavbar from "./Navbar/Navbar";
// import AppFooter from "./Footer/Footer";

const Empty = () => {
  return <></>;
};

export default function AppLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  let Navbar: any = AppNavbar;
  // let Footer: any = AppFooter;

  if (pathname?.includes("/login") || pathname?.includes("/sign-up")) {
    Navbar = Empty;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow ">{children}</div>
      {/* <Footer /> */}
    </div>
  );
}
