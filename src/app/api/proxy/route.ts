import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const endpointMap: Record<string, string> = {
  payboxes: "pboxes",
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const rawEndpoint = searchParams.get("endpoint");
  const token = searchParams.get("token");
  const search = searchParams.get("search") || "";

  if (!rawEndpoint || !token) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const endpoint = endpointMap[rawEndpoint] || rawEndpoint;
  const params = new URLSearchParams();
  params.set("token", token);

  if (search.trim()) {
    params.set("search", search.trim());
  }

  const targetUrl = `${BASE_URL}/${endpoint}?${params.toString()}`;

  try {
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const text = await response.text();
    let data: any = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { raw: text };
    }

    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ error: "Proxy error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const rawEndpoint = searchParams.get("endpoint");
  const token = searchParams.get("token");

  if (!rawEndpoint || !token) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const endpoint = endpointMap[rawEndpoint] || rawEndpoint;
  const body = await request.json();

  const targetUrl = `${BASE_URL}/${endpoint}/?token=${encodeURIComponent(token)}`;

  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await response.text();
    let data: any = {};

    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { raw: text };
    }

    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ error: "Proxy error" }, { status: 500 });
  }
}
