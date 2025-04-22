import React from "react";
import { NavbarComponents } from "./NavbarComponents";
import { Outlet } from "react-router";
import FooterComponent from "./FooterComponent";


export default function RootLayout() {
  return (
    <div className="font-[Suwannaphum]">
      {/* navbar */}
      <NavbarComponents />
      <main >
        <Outlet />
      </main>
      {/* footer */}
      <FooterComponent />
    </div>
  );
}
