import Image from 'next/image'

interface MenuHeroProps {
  logoUrl?: string
  restaurantName: string
  tagline: string
}

export function MenuHero({ logoUrl, restaurantName, tagline }: MenuHeroProps) {
  return (
    <div className="flex flex-col items-center text-center py-6 md:py-8">
      {logoUrl && (
        <div className="relative w-16 h-16 md:w-20 md:h-20 mb-3 rounded-full overflow-hidden shadow-sm">
          <Image src={logoUrl} alt={restaurantName} fill className="object-cover" />
        </div>
      )}

      <h1 className="text-2xl md:text-3xl font-extrabold text-primary-color mb-1.5">
        {restaurantName}
      </h1>

      <p className="text-sm md:text-base text-text-muted">{tagline}</p>
    </div>
  )
}