'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex items-center gap-2 bg-slate-100 text-text-muted px-4 py-2.5 rounded-btn font-medium text-sm hover:bg-slate-200 transition-colors"
    >
      <LogOut size={16} />
      تسجيل خروج
    </button>
  )
}