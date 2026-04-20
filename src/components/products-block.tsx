"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Section } from "./section";
import { useOrderContext } from "@/store/order-store";
import { useFetchData } from "@/hooks/useApiData";

export function ProductsBlock() {
  const { token, setCart } = useOrderContext();
  const [search, setSearch] = useState("");

  const isValidToken =
    typeof token === "string" &&
    token.length > 0 &&
    !token.includes("use client");

  const { data, isLoading } = useFetchData<any>(
    "nomenclature",
    isValidToken ? token : null,
  );

  const products = Array.isArray(data) ? data : [];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return products;

    return products.filter((p: any) => {
      const name = String(p.name || "").toLowerCase();
      const article = String(p.article || "").toLowerCase();
      const id = String(p.id || "").toLowerCase();

      return name.includes(q) || article.includes(q) || id.includes(q);
    });
  }, [products, search]);

  const add = (p: any) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === p.id);

      if (ex) {
        return prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      }

      return [...prev, { ...p, qty: 1 }];
    });
  };

  return (
    <Section title="4. Товары">
      <div className="space-y-3">
        <Input
          placeholder="Поиск товара"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="border rounded-xl min-h-40 p-2 space-y-2 bg-white">
          {isLoading ? (
            <p className="text-center text-sm text-muted-foreground py-10">
              Загрузка...
            </p>
          ) : filtered.length > 0 ? (
            filtered.map((p: any) => (
              <div
                key={p.id}
                className="flex justify-between items-center p-2 border-b last:border-0"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{p.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {p.price} ₽
                  </span>
                </div>

                <Button size="sm" variant="outline" onClick={() => add(p)}>
                  Добавить
                </Button>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-muted-foreground py-10">
              {search.length > 0
                ? "Ничего не найдено"
                : "Введите название товара"}
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}
