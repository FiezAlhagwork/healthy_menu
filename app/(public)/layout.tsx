import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <div>{children}
    <WhatsAppButton phoneNumber="963994322207" />
  </div>;
}
