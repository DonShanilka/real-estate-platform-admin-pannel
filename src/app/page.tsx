import { redirect } from "next/navigation";
import { Sidebar } from "../components/layout/Sidebar";

export default function Home() {
  redirect("/auth/login");
}