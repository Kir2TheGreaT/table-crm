"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Section } from "./section";
import { useOrderContext } from "@/store/order-store";
import { useFetchData } from "@/hooks/useApiData";

export function ParamsBlock() {
  const {
    token,
    setOrganizationId,
    setWarehouseId,
    setPriceTypeId,
    setPayboxId,
  } = useOrderContext();

  const { data: orgs, isLoading: l1 } = useFetchData<any>(
    "organizations",
    token,
  );
  const { data: whs, isLoading: l2 } = useFetchData<any>("warehouses", token);
  const { data: pts, isLoading: l3 } = useFetchData<any>("price_types", token);
  const { data: pbs, isLoading: l4 } = useFetchData<any>(
    "meta/payboxes",
    token,
  );

  const renderItems = (items: any[]) => {
    if (!items || items.length === 0)
      return (
        <SelectItem value="none" disabled>
          Нет данных
        </SelectItem>
      );
    return items.map((i) => (
      <SelectItem key={i.id} value={String(i.id)}>
        {i.name || i.title || `ID: ${i.id}`}
      </SelectItem>
    ));
  };

  return (
    <Section title="3. Параметры продажи">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label>Организация</Label>
          <Select onValueChange={setOrganizationId} modal={false}>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={l1 ? "Загрузка..." : "Выбрать организацию"}
              />
            </SelectTrigger>
            <SelectContent>{renderItems(orgs)}</SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>Счет (Касса)</Label>
          <Select onValueChange={setPayboxId} modal={false}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={l4 ? "Загрузка..." : "Выбрать счет"} />
            </SelectTrigger>
            <SelectContent>{renderItems(pbs)}</SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>Склад</Label>
          <Select onValueChange={setWarehouseId} modal={false}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={l2 ? "Загрузка..." : "Выбрать склад"} />
            </SelectTrigger>
            <SelectContent>{renderItems(whs)}</SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>Тип цен</Label>
          <Select onValueChange={setPriceTypeId} modal={false}>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={l3 ? "Загрузка..." : "Выбрать тип цен"}
              />
            </SelectTrigger>
            <SelectContent>{renderItems(pts)}</SelectContent>
          </Select>
        </div>
      </div>
    </Section>
  );
}
