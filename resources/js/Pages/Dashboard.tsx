import { ModalProvider } from "@/Contexts/ModalContext";
import DashboardContent from "./DashboardContent";

export default function Dashboard() {
  return (
    <ModalProvider>
      <DashboardContent />
    </ModalProvider>
  );
}