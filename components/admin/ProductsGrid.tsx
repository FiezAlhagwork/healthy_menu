'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminProductCard } from './AdminProductCard'
import { DeleteConfirmModal } from './DeleteConfirmModal'
import { ProductDetailsSheet } from '@/components/ui/ProductDetailsSheet'
import { createClient } from '@/lib/supabase/client'

interface Product {
  id: string
  name: string
  description: string | null
  ingredients: string | null
  price: number
  image_url: string | null
  is_available: boolean
  calories: number | null
  protein_g: number | null
  carbs_g: number | null
  fat_g: number | null
  categories: { name: string } | null
}

export function ProductsGrid({ products }: { products: Product[] }) {
  const router = useRouter()
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  const [productToView, setProductToView] = useState<Product | null>(null)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!productToDelete) return
    setDeleting(true)

    const supabase = createClient()
    const { error } = await supabase.from('products').delete().eq('id', productToDelete.id)

    setDeleting(false)

    if (error) {
      alert('صار خطأ أثناء الحذف')
      return
    }

    setProductToDelete(null)
    router.refresh()
  }

  if (products.length === 0) {
    return (
      <p className="text-text-muted text-center py-12">
        لا يوجد أصناف بعد — اضغط إضافة صنف للبدء
      </p>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <AdminProductCard
            key={product.id}
            image={product.image_url || '/placeholder.png'}
            title={product.name}
            subtitle={product.description || ''}
            price={product.price}
            currency="$"
            isAvailable={product.is_available}
            onView={() => setProductToView(product)}
            onEdit={() => router.push(`/admin/products/${product.id}/edit`)}
            onDelete={() => setProductToDelete(product)}
          />
        ))}
      </div>

      {productToView && (
        <ProductDetailsSheet
          isOpen={!!productToView}
          onClose={() => setProductToView(null)}
          product={{
            name: productToView.name,
            categoryName: productToView.categories?.name || '',
            image: productToView.image_url || '/placeholder.png',
            price: productToView.price,
            currency: 'SYP',
            description: productToView.description,
            calories: productToView.calories,
            protein_g: productToView.protein_g,
            carbs_g: productToView.carbs_g,
            fat_g: productToView.fat_g,
            ingredients: productToView.ingredients,
          }}
        />
      )}

      <DeleteConfirmModal
        isOpen={!!productToDelete}
        productName={productToDelete?.name || ''}
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setProductToDelete(null)}
      />
    </>
  )
}