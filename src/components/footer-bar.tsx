"use client";

import { Button } from "@/components/ui/button";
import { useOrderContext } from "@/store/order-store";
import { useCreateSale } from "@/hooks/useApiData";

export function FooterBar() {
  const {
    token,
    cart,
    clientId,
    organizationId,
    warehouseId,
    payboxId,
    priceTypeId,
    comment,
  } = useOrderContext();

  const { createSale, isLoading } = useCreateSale();

  const total = cart.reduce((sum, item) => {
    const p = Number(item.price) || 0;
    const q = Number(item.qty) || 0;
    return sum + p * q;
  }, 0);

  const disabled =
    !token ||
    !clientId ||
    !organizationId ||
    !warehouseId ||
    cart.length === 0 ||
    isLoading;

  const handleSubmit = async (conducted: boolean) => {
    if (disabled || !token) return;

    const payload = [
      {
        priority: 0,
        dated: Math.floor(Date.now() / 1000),
        operation: "Заказ",
        tax_included: true,
        tax_active: true,
        status: conducted,
        paid_rubles: total.toFixed(2),
        paid_lt: 0,
        contragent: Number(clientId),
        organization: Number(organizationId),
        warehouse: Number(warehouseId),
        paybox: payboxId ? Number(payboxId) : null,
        comment: comment || "",
        goods: cart.map((item) => ({
          nomenclature: Number(item.id),
          price: Number(item.price),
          quantity: Number(item.qty),
          unit: 1,
          discount: 0,
          sum_discounted: Number(item.price) * Number(item.qty),
        })),
      },
    ];

    const result = await createSale(token, payload);

    if (result.success) {
      alert(
        conducted ? "Продажа создана и проведена!" : "Продажа успешно создана!",
      );
    } else {
      alert("Ошибка при создании продажи.");
      console.error(result.data);
    }
  };

  return (
    <div className="sticky bottom-0 border-t bg-background p-4 space-y-3 shadow-lg">
      <div className="flex justify-center gap-65 items-center font-semibold text-lg px-4">
        <span>Итого</span>
        <span>{total.toLocaleString()} ₽</span>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <Button
          className="w-full max-w-sm bg-amber-700 hover:bg-amber-800 text-white h-12 rounded-xl"
          disabled={disabled}
          onClick={() => handleSubmit(false)}
        >
          {isLoading ? "Создание..." : "Создать продажу"}
        </Button>
        <Button
          variant="secondary"
          className="w-full max-w-sm h-12 rounded-xl"
          disabled={disabled}
          onClick={() => handleSubmit(true)}
        >
          {isLoading ? "Проведение..." : "Создать и провести"}
        </Button>
      </div>
      {disabled && cart.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Добавьте товары в корзину
        </p>
      )}
    </div>
  );
}
