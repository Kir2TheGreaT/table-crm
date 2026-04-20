"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Section } from "./section";
import { useOrderContext } from "@/store/order-store";

export function CashboxConnect() {
  const { setToken, token } = useOrderContext();

  const [val, setVal] = useState(token || "");

  useEffect(() => {
    if (token) setVal(token);
  }, [token]);

  const handleConnect = () => {
    const trimmedToken = val.trim();
    if (trimmedToken) {
      setToken(trimmedToken);
    }
  };

  return (
    <Section
      title="1. Подключение кассы"
      desc="Введите API токен для доступа к данным"
    >
      <div className="space-y-3">
        <Input
          type="password"
          placeholder="Токен кассы"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <Button
          className={`w-full transition-all ${token ? "bg-green-600 hover:bg-green-700" : "bg-amber-700 hover:bg-amber-800"}`}
          onClick={handleConnect}
        >
          {token ? "Подключено ✓" : "Подключить"}
        </Button>
      </div>
    </Section>
  );
}
