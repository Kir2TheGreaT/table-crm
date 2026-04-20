"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Nomenclature } from "@/hooks/useApiData";

export interface CartItem extends Nomenclature {
  qty: number;
}

interface OrderContextType {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
  removeFromCart: (id: string | number) => void;
  updateCartItem: (id: string | number, qty: number, price: number) => void;
  clientId: string | number | null;
  setClientId: Dispatch<SetStateAction<string | number | null>>;
  organizationId: string | number | null;
  setOrganizationId: Dispatch<SetStateAction<string | number | null>>;
  warehouseId: string | number | null;
  setWarehouseId: Dispatch<SetStateAction<string | number | null>>;
  priceTypeId: string | number | null;
  setPriceTypeId: Dispatch<SetStateAction<string | number | null>>;
  payboxId: string | number | null;
  setPayboxId: Dispatch<SetStateAction<string | number | null>>;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [clientId, setClientId] = useState<string | number | null>(null);
  const [organizationId, setOrganizationId] = useState<string | number | null>(
    null,
  );
  const [warehouseId, setWarehouseId] = useState<string | number | null>(null);
  const [priceTypeId, setPriceTypeId] = useState<string | number | null>(null);
  const [payboxId, setPayboxId] = useState<string | number | null>(null);
  const [comment, setComment] = useState("");

  const removeFromCart = (id: string | number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCartItem = (id: string | number, qty: number, price: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty, price } : item)),
    );
  };

  return (
    <OrderContext.Provider
      value={{
        token,
        setToken,
        cart,
        setCart,
        removeFromCart,
        updateCartItem,
        clientId,
        setClientId,
        organizationId,
        setOrganizationId,
        warehouseId,
        setWarehouseId,
        priceTypeId,
        setPriceTypeId,
        payboxId,
        setPayboxId,
        comment,
        setComment,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrderContext() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return context;
}
