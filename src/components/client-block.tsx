"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Section } from "./section";
import { useOrderContext } from "@/store/order-store";
import { useFetchData } from "@/hooks/useApiData";

export function ClientBlock() {
  const { token, setClientId, clientId } = useOrderContext();
  const [phone, setPhone] = useState("");

  const { data, isLoading } = useFetchData<any>("contragents", token);

  const clients = Array.isArray(data) ? data : [];

  const filtered = useMemo(() => {
    const q = phone.trim().toLowerCase();

    if (!q) return clients;

    return clients.filter((c: any) => {
      const name = String(c.name || "").toLowerCase();
      const phoneValue = String(c.phone || "").toLowerCase();
      const id = String(c.id || "").toLowerCase();

      return name.includes(q) || phoneValue.includes(q) || id.includes(q);
    });
  }, [clients, phone]);

  const active = clients.find((c: any) => c.id === clientId);

  return (
    <Section title="2. Клиент" desc="Поиск по телефону">
      <div className="flex gap-2">
        <Input
          placeholder="+79990000000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Button size="icon" variant="outline">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {filtered.length > 0 && (
        <div className="border rounded-lg p-2 max-h-32 overflow-auto mt-2">
          {filtered.map((c: any) => (
            <div
              key={c.id}
              className={`p-2 text-sm cursor-pointer rounded ${
                clientId === c.id ? "bg-amber-100" : "hover:bg-gray-50"
              }`}
              onClick={() => setClientId(c.id)}
            >
              {c.name} ({c.phone})
            </div>
          ))}
        </div>
      )}

      <Input
        className="mt-2"
        placeholder="Имя клиента"
        value={active ? `${active.name} (${active.phone || ""})` : ""}
        readOnly
      />
    </Section>
  );
}
