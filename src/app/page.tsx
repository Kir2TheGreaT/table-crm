import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CashboxConnect } from "@/components/cashbox-connect";
import { ClientBlock } from "@/components/client-block";
import { ParamsBlock } from "@/components/params-block";
import { ProductsBlock } from "@/components/products-block";
import { CartBlock } from "@/components/cart-block";
import { CommentBlock } from "@/components/comment-block";
import { FooterBar } from "@/components/footer-bar";

export default function Page() {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-md mx-auto p-4 space-y-4">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Мобильный заказ</CardTitle>
            <CardDescription>Мини CRM для создания продажи</CardDescription>
          </CardHeader>
        </Card>
        <CashboxConnect />
        <ClientBlock />
        <ParamsBlock />
        <ProductsBlock />
        <CartBlock />
        <CommentBlock />
      </div>
      <FooterBar />
    </div>
  );
}
