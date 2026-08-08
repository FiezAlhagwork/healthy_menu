import Link from "next/link";
import { ArrowRight, MessageCircle, Send } from "lucide-react";

export default function ContactPage() {
  const whatsappNumber = "963994322207";
  const telegramUsername = "yourrestaurant";

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <Link
        href="/"
        className="flex  items-center   gap-1.5 text-text-muted hover:text-primary-color transition-colors mb-6 text-sm font-medium"
      >
        <ArrowRight size={18} className="mt-1.5" />
        رجوع للمنيو
      </Link>

      <h1 className="text-2xl font-bold text-text-dark mb-2">تواصل معنا</h1>
      <p className="text-sm text-text-muted mb-8">
        عندك سؤال أو استفسار؟ تواصل معنا مباشرة من خلال:
      </p>

      <div className="flex flex-col gap-4">
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-card-bg border border-slate-100 rounded-card p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0">
            <MessageCircle
              size={22}
              className="text-[#25D366]"
              fill="#25D366"
              strokeWidth={0}
            />
          </div>
          <div>
            <div className="font-bold text-text-dark">واتساب</div>
            <div className="text-xs text-text-muted">راسلنا مباشرة</div>
          </div>
        </a>

        <a
          href={`https://t.me/${telegramUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-card-bg border border-slate-100 rounded-card p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-12 h-12 rounded-full bg-[#26A5E4]/10 flex items-center justify-center shrink-0">
            <Send size={20} className="text-[#26A5E4]" />
          </div>
          <div>
            <div className="font-bold text-text-dark">تلغرام</div>
            <div className="text-xs text-text-muted">راسلنا عبر تلغرام</div>
          </div>
        </a>
      </div>
    </div>
  );
}
