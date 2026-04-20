"use client";

import { Textarea } from "@/components/ui/textarea";
import { Section } from "./section";
import { useOrderContext } from "@/store/order-store";

export function CommentBlock() {
  const { comment, setComment } = useOrderContext();

  return (
    <Section title="Комментарий">
      <Textarea
        placeholder="Комментарий к заказу"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
    </Section>
  );
}
