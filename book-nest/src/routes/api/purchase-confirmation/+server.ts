import { json } from "@sveltejs/kit";
import sgMail from "@sendgrid/mail";
import { Buffer } from "node:buffer";
import {
  SENDGRID_API_KEY,
  PRIVATE_EBOOK_URL,
  SENDGRID_EMAIL_FROM,
} from "$env/static/private";

sgMail.setApiKey(SENDGRID_API_KEY);

export async function POST({ request }) {
  const evt = await request.json();

  console.log("stripe event type:", evt?.type);
  console.log("stripe object type:", evt?.data?.object?.object);

  // ✅ Only fulfill on Checkout completion
  if (evt?.type !== "checkout.session.completed") {
    return json({ received: true }); // return 200 to Stripe
  }

  const session = evt.data.object; // checkout.session

  const customerEmail = session?.customer_details?.email ?? null;
  const customerName = session?.customer_details?.name ?? "Customer";

  if (!customerEmail) {
    // If you want, you can retrieve the session from Stripe here for more data.
    return json(
      { success: false, message: "No customer email in session" },
      { status: 400 }
    );
  }

  const response = await fetch(PRIVATE_EBOOK_URL);
  if (!response.ok) {
    return json(
      { success: false, message: "Failed to fetch the ebook" },
      { status: 500 }
    );
  }

  const pdfBuffer = await response.arrayBuffer();
  const pdfBase64 = Buffer.from(pdfBuffer).toString("base64");

  // Checkout Sessions use amount_total + currency
  const amount = session?.amount_total ?? "unknown";
  const currency = session?.currency ?? "unknown";
  const sessionId = session?.id ?? "unknown";

  const emailContent = {
    to: customerEmail,
    from: SENDGRID_EMAIL_FROM,
    subject: "Payment Confirmation",
    text: `Dear ${customerName},\n\nYour payment of ${amount} ${currency} for the order ${sessionId} has been confirmed.\n\nThank you for your purchase!`,
    attachments: [
      {
        content: pdfBase64,
        filename: "ebook.pdf",
        type: "application/pdf",
        disposition: "attachment",
      },
    ],
  };

  try {
    await sgMail.send(emailContent);
    return json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    return json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
