import { ModalProvider } from "@/Contexts/ModalContext";
import DashboardContent from "./DashboardContent";
import { usePage } from "@inertiajs/react";

export default function Dashboard() {
  const { flash } = usePage().props;
  return (
    <ModalProvider>
      <DashboardContent alert={flash} />
    </ModalProvider>
  );
}