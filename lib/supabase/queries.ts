import { createClient } from "@/lib/supabase/server";

export async function getAllProducts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name, slug)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getPublicProducts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name, slug)")
    .eq("is_available", true)
    .order("sort_order");

  if (error) throw error;
  return data;
}

export async function getCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");

  if (error) throw error;
  return data;
}
