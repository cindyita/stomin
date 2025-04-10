import { usePage } from "@inertiajs/react";

import { ModalProvider } from "@/Contexts/ModalContext";
import DashboardContent from "./DashboardContent";

export default function Dashboard() {

  const { flash } = usePage().props;
  
  return (
    <ModalProvider>
      <DashboardContent alert={flash} />
    </ModalProvider>
  );
}