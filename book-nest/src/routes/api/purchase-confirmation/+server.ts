import Stripe from "stripe";
import { json } from "@sveltejs/kit";
import sgMail from "@sendgrid/mail";
import { Buffer } from "node:buffer";
import {
  PRIVATE_STRIPE_KEY,
  PRIVATE_STRIPE_WEBHOOK_SECRET,
  SENDGRID_API_KEY,
  SENDGRID_EMAIL_FROM,
  PRIVATE_EBOOK_URL,
} from "$env/static/private";

const stripe = new Stripe(PRIVATE_STRIPE_KEY);
sgMail.setApiKey(SENDGRID_API_KEY);

export async function POST({ request }) {
  const sig = request.headers.get("stripe-signature");
  if (!sig)
    return json({ error: "Missing Stripe-Signature header" }, { status: 400 });

  // ✅ RAW BODY BYTES (no JSON parsing, no string decoding)
  const rawBody = Buffer.from(await request.arrayBuffer());

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, PRIVATE_STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return json({ error: "Invalid signature" }, { status: 400 });
  }

  // ✅ Only fulfill on the event you care about
  if (event.type !== "checkout.session.completed") {
    return json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const customerEmail = session.customer_details?.email;
  const customerName = session.customer_details?.name ?? "Customer";

  if (!customerEmail) {
    return json({ error: "No customer email on session" }, { status: 400 });
  }

  const response = await fetch(PRIVATE_EBOOK_URL);
  if (!response.ok)
    return json({ error: "Failed to fetch ebook" }, { status: 500 });

  const pdfBase64 = Buffer.from(await response.arrayBuffer()).toString(
    "base64"
  );

  const emailContent = {
    to: customerEmail,
    from: SENDGRID_EMAIL_FROM,
    subject: "Payment Confirmation",
    text: `Dear ${customerName},\n\nYour payment has been confirmed.\n\nThank you for your purchase!`,
    attachments: [
      {
        content: pdfBase64,
        filename: "ebook.pdf",
        type: "application/pdf",
        disposition: "attachment",
      },
    ],
  };
console.log(emailContent);
  await sgMail.send(emailContent);

  return json({ received: true });
}
