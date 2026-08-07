import { getPublicProducts, getCategories } from '@/lib/supabase/queries'
import { MenuView } from '@/components/menu/MenuView'

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getPublicProducts(),
    getCategories(),
  ])

  return <MenuView products={products} categories={categories} />
}