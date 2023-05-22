import React from "react";
import Navbar from "./components/Navbar";

export default function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="bg-[#15161A] h-screen">
      <div>
        <Navbar />
        <div className="flex items-center justify-center mx-auto">
          {props.children}
        </div>
      </div>
    </div>
  );
}
