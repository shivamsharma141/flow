"use client";

import Sidebar from "../component/sidebar/sidebar";





export default function MainLayout({ children }) {
  return <Sidebar>{children}</Sidebar>;
  
}
