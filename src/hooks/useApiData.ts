"use client";

import { useState, useEffect } from "react";

export function useFetchData<T>(
  endpoint: string,
  token: string | null,
  search: string = "",
) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token || token === "null" || token.length < 5) {
      setData([]);
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const url =
          `/api/proxy?endpoint=${encodeURIComponent(endpoint)}` +
          `&token=${encodeURIComponent(token)}` +
          `&search=${encodeURIComponent(search)}`;

        const response = await fetch(url, {
          method: "GET",
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        });

        const json = await response.json().catch(() => null);

        if (!response.ok) {
          console.error(`API ERROR ${response.status}:`, json);
          setData([]);
          return;
        }

        let extracted: T[] = [];

        if (Array.isArray(json)) {
          extracted = json;
        } else if (json?.data && Array.isArray(json.data)) {
          extracted = json.data;
        } else if (json?.rows && Array.isArray(json.rows)) {
          extracted = json.rows;
        } else if (json?.items && Array.isArray(json.items)) {
          extracted = json.items;
        } else if (json?.result && Array.isArray(json.result)) {
          extracted = json.result;
        } else if (json && typeof json === "object") {
          const firstArrayKey = Object.keys(json).find((key) =>
            Array.isArray(json[key]),
          );

          if (firstArrayKey) {
            extracted = json[firstArrayKey];
          }
        }

        setData(extracted);
      } catch (error: any) {
        if (error?.name !== "AbortError") {
          console.error("FETCH ERROR:", error);
          setData([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchData, search ? 400 : 0);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [endpoint, token, search]);

  return { data, isLoading };
}
export function useCreateSale() {
  const [isLoading, setIsLoading] = useState(false);

  const createSale = async (token: string, saleData: any) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/proxy?endpoint=docs_sales&token=${encodeURIComponent(token)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(saleData),
        },
      );

      const json = await response.json().catch(() => null);

      if (!response.ok) {
        console.error(`CREATE SALE ERROR ${response.status}:`, json);
      }

      return {
        success: response.ok,
        data: json,
        status: response.status,
      };
    } catch (error) {
      console.error("CREATE SALE FETCH ERROR:", error);
      return {
        success: false,
        error,
        data: null,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { createSale, isLoading };
}
