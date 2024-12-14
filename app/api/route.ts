import Stripe from "stripe";
export async function POST(request: Request) {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);
  const { line_items } = await request.json();
  console.log(line_items);

  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  return Response.json(JSON.stringify({ id: session.id }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
