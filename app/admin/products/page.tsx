import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getAllProducts } from '@/lib/supabase/queries'
import { ProductsGrid } from '@/components/admin/ProductsGrid'
import { LogoutButton } from '@/components/admin/LogoutButton'

export default async function AdminProductsPage() {
  const products = await getAllProducts()

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text-dark">إدارة الأصناف</h1>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 bg-primary-color text-white px-5 py-2.5 rounded-btn font-medium hover:opacity-90"
          >
            <Plus size={18} />
            إضافة صنف
          </Link>

          <LogoutButton />
        </div>
      </div>

      <ProductsGrid products={products} />
    </div>
  )
}