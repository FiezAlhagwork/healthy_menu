import Image from 'next/image'

interface ProductCardProps {
  image: string
  title: string
  subtitle: string
  price: number | string
  currency: string
  badgeText?: string
  onClick?: () => void
}

export function ProductCard({
  image,
  title,
  subtitle,
  price,
  currency,
  badgeText,
  onClick,
}: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="group w-full bg-card-bg rounded-card overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col cursor-pointer"
    >
      {/* الصورة */}
      <div className="w-full h-32 md:h-48 relative overflow-hidden bg-slate-100 shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          loading="eager"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badgeText && (
          <div className="absolute top-2 right-2 bg-primary-accent text-white px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold shadow-md tracking-wide">
            {badgeText}
          </div>
        )}
      </div>

      {/* المحتوى */}
      <div className="p-3 md:p-5 flex flex-col grow justify-between">
        <div>
          <h3 className="text-sm md:text-base font-bold text-primary-color mb-1 md:mb-1.5 line-clamp-1">
            {title}
          </h3>
          <p className="text-[11px] md:text-xs text-text-muted mb-2 md:mb-4 leading-relaxed line-clamp-2">
            {subtitle}
          </p>
        </div>

        <div className="flex justify-between items-center pt-2 mt-auto border-t border-slate-50">
          <div className="text-sm md:text-lg font-extrabold text-primary-color flex items-baseline gap-1">
            {price} <span className="text-[10px] md:text-xs font-semibold text-text-muted">{currency}</span>
          </div>
        </div>
      </div>
    </div>
  )
}