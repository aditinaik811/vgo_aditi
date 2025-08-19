"use client";

import SidebarLayout from "@/components/SidebarLayout";
import AccountDetailsPage from "./account/page";

export default function DashboardPage() {
  return (
    <SidebarLayout>
      <AccountDetailsPage />
    </SidebarLayout>
  );
}
