"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("الإيميل أو الباسورد غلط");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-right px-4">
      <div className="w-full max-w-sm bg-card-bg rounded-card p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-text-dark text-center mb-6">
          تسجيل دخول
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            type="email"
            label="الإيميل"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            label="الباسورد"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <Button type="submit" loading={loading} className="mt-2">
            دخول
          </Button>
        </form>
      </div>
    </div>
  );
}
