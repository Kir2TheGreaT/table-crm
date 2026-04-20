"use client";

import { Section } from "./section";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useOrderContext } from "@/store/order-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CartBlock() {
  const { cart, removeFromCart, updateCartItem } = useOrderContext();

  const handleQtyChange = (
    id: string | number,
    val: string,
    currentPrice: number,
  ) => {
    const qty = Number(val);
    updateCartItem(id, Number.isNaN(qty) ? 0 : qty, Number(currentPrice) || 0);
  };

  const handlePriceChange = (
    id: string | number,
    val: string,
    currentQty: number,
  ) => {
    const price = Number(val);
    updateCartItem(
      id,
      Number(currentQty) || 0,
      Number.isNaN(price) ? 0 : price,
    );
  };

  return (
    <Section
      title={
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-4 w-4" />
          <span>Корзина</span>
        </div>
      }
      desc="Количество, цена и сумма по позициям"
    >
      {cart.length === 0 ? (
        <div className="py-6 text-muted-foreground text-sm">
          Добавьте хотя бы один товар
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => {
            const qty = Number(item.qty) || 0;
            const price = Number(item.price) || 0;
            const total = qty * price;

            return (
              <div
                key={item.id}
                className="border rounded-2xl p-4 space-y-4 bg-card relative shadow-sm"
              >
                <div className="flex justify-between items-start pr-8">
                  <div className="font-medium text-base">{item.name}</div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">
                      Количество
                    </Label>

                    <Input
                      type="number"
                      value={String(item.qty ?? "")}
                      onChange={(e) =>
                        handleQtyChange(item.id, e.target.value, price)
                      }
                      className="h-10 rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">
                      Цена
                    </Label>

                    <Input
                      type="number"
                      value={String(item.price ?? "")}
                      onChange={(e) =>
                        handlePriceChange(item.id, e.target.value, qty)
                      }
                      className="h-10 rounded-xl"
                    />
                  </div>
                </div>

                <div className="text-right font-medium pt-2 border-t text-sm">
                  Сумма:{" "}
                  {total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  ₽
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
}
