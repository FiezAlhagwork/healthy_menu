'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

interface BackButtonProps {
  href?: string // لو بدك تحدد وجهة ثابتة بدل الرجوع بالـ history
  label?: string
}

export function BackButton({ href, label = 'رجوع' }: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center gap-1.5 text-text-muted hover:text-primary-color transition-colors mb-4 text-sm font-medium"
    >
      <ArrowRight size={18} />
      {label}
    </button>
  )
}