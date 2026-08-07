import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber: string; // بصيغة دولية بدون + أو مسافات، مثلاً "963912345678"
  message?: string;
}

export function WhatsAppButton({
  phoneNumber,
  message = "مرحباً، بدي أستفسر عن المنيو",
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message);
  const link = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 left-5 md:bottom-8 md:left-8 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/40 hover:scale-105 transition-transform"
      aria-label="تواصل معنا عبر واتساب"
    >
      <MessageCircle size={26} fill="white" strokeWidth={0} />
    </a>
  );
}
