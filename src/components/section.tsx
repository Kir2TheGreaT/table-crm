"use client";

import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface SectionProps {
  title: ReactNode;
  desc?: string;
  children: ReactNode;
}

export function Section({ title, desc, children }: SectionProps) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
        {desc && <CardDescription>{desc}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-3">{children}</CardContent>
    </Card>
  );
}
