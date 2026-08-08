import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

interface MenuNavbarProps {
  logoUrl?: string;
  restaurantName: string;
}

export function MenuNavbar({ logoUrl, restaurantName }: MenuNavbarProps) {
  return (
    <div className="flex items-center justify-between py-4 mb-4">
      <div className="flex items-center gap-2.5">
        {logoUrl && (
          <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
            <Image
              src={logoUrl}
              alt={restaurantName}
              fill
              className="object-cover"
            />
          </div>
        )}
        <span className="text-lg font-extrabold text-primary-color">
          {restaurantName}
        </span>
      </div>

      <Link
        href="/contact"
        className="flex items-center gap-1.5 bg-primary-color text-white px-4 py-2 rounded-btn text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        <MessageCircle size={16} />
        تواصل معنا
      </Link>
    </div>
  );
}
