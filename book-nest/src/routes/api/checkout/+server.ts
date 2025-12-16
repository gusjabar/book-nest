import { Stripe } from "stripe";
import { json } from "@sveltejs/kit";
import { PRIVATE_STRIPE_KEY, PRICE_ID } from "$env/static/private";

const stripe = new Stripe(PRIVATE_STRIPE_KEY, {
  // Optional but recommended to pin/inspect API version behavior.
  // apiVersion: "2024-06-20"
});

export async function POST({ url }) {
  const origin = url.origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: PRICE_ID, quantity: 1 }],

    // Modern approach: let Stripe decide eligible methods.
    payment_method_types: ["card"], 
   
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout/failure?session_id={CHECKOUT_SESSION_ID}`,

    // Optional: helps reconciliation
    metadata: { app: "book-nest" },
  });

  if (!session.url) {
    return json(
      { error: "Stripe session URL was not returned." },
      { status: 500 }
    );
  }

  return json({ url: session.url });
}
