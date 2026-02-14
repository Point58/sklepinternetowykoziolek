import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type OrderItem = {
  name: string;
  price: string;
  quantity: number;
};

type OrderData = {
  customer: {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    postalCode: string;
    phone: string;
    email: string;
  };
  items: OrderItem[];
  totalPrice: string;
};

export async function POST(request: Request) {
  try {
    const body: OrderData = await request.json();
    const { customer, items, totalPrice } = body;

    if (
      !customer.firstName ||
      !customer.lastName ||
      !customer.street ||
      !customer.city ||
      !customer.postalCode ||
      !customer.phone ||
      !customer.email
    ) {
      return NextResponse.json(
        { error: "Wszystkie pola są wymagane." },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Koszyk jest pusty." },
        { status: 400 }
      );
    }

    const orderNumber = `ZAM-${Date.now().toString(36).toUpperCase()}`;
    const orderDate = new Date().toLocaleString("pl-PL", {
      dateStyle: "long",
      timeStyle: "short",
    });

    const productRowsHtml = items
      .map(
        (item) =>
          `<tr>
            <td style="padding:8px 12px;border-bottom:1px solid #eee">${item.name}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right">${item.price}</td>
          </tr>`
      )
      .join("");

    const productLinesText = items
      .map((item) => `  - ${item.name} × ${item.quantity} — ${item.price}`)
      .join("\n");

    const emailText = `NOWE ZAMÓWIENIE ${orderNumber}
Data: ${orderDate}

DANE KLIENTA:
  Imię i nazwisko: ${customer.firstName} ${customer.lastName}
  Adres: ${customer.street}, ${customer.postalCode} ${customer.city}
  Telefon: ${customer.phone}
  Email: ${customer.email}

ZAMÓWIONE PRODUKTY:
${productLinesText}

SUMA: ${totalPrice}
PŁATNOŚĆ: Za pobraniem

---
Skontaktuj się z klientem:
  Tel: ${customer.phone}
  Email: ${customer.email}`;

    const emailHtml = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333">
  <div style="background:#111;color:#fff;padding:24px 30px;border-radius:12px 12px 0 0">
    <h1 style="margin:0;font-size:20px">Nowe zamówienie!</h1>
    <p style="margin:6px 0 0;font-size:14px;color:#aaa">${orderNumber} &middot; ${orderDate}</p>
  </div>

  <div style="border:1px solid #e5e5e5;border-top:none;padding:24px 30px;border-radius:0 0 12px 12px">
    <h2 style="font-size:16px;margin:0 0 12px;color:#111">Dane klienta</h2>
    <table style="font-size:14px;line-height:1.6">
      <tr><td style="color:#888;padding-right:12px">Imię i nazwisko</td><td><strong>${customer.firstName} ${customer.lastName}</strong></td></tr>
      <tr><td style="color:#888;padding-right:12px">Adres</td><td>${customer.street}, ${customer.postalCode} ${customer.city}</td></tr>
      <tr><td style="color:#888;padding-right:12px">Telefon</td><td><a href="tel:${customer.phone}" style="color:#2563eb">${customer.phone}</a></td></tr>
      <tr><td style="color:#888;padding-right:12px">Email</td><td><a href="mailto:${customer.email}" style="color:#2563eb">${customer.email}</a></td></tr>
    </table>

    <hr style="border:none;border-top:1px solid #e5e5e5;margin:20px 0">

    <h2 style="font-size:16px;margin:0 0 12px;color:#111">Zamówione produkty</h2>
    <table style="width:100%;font-size:14px;border-collapse:collapse">
      <thead>
        <tr style="background:#f9f9f9">
          <th style="padding:8px 12px;text-align:left;font-weight:600">Produkt</th>
          <th style="padding:8px 12px;text-align:center;font-weight:600">Ilość</th>
          <th style="padding:8px 12px;text-align:right;font-weight:600">Cena</th>
        </tr>
      </thead>
      <tbody>${productRowsHtml}</tbody>
    </table>

    <div style="margin-top:16px;padding:14px 16px;background:#f0fdf4;border-radius:8px;display:flex;justify-content:space-between;font-size:15px">
      <strong>Suma: ${totalPrice}</strong>
      <span style="margin-left:20px;color:#666">Płatność: za pobraniem</span>
    </div>

    <hr style="border:none;border-top:1px solid #e5e5e5;margin:20px 0">

    <p style="font-size:13px;color:#888;margin:0">
      Skontaktuj się z klientem:
      <a href="tel:${customer.phone}" style="color:#2563eb">${customer.phone}</a> ·
      <a href="mailto:${customer.email}" style="color:#2563eb">${customer.email}</a>
    </p>
  </div>
</div>`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      replyTo: customer.email,
      subject: `Nowe zamówienie ${orderNumber} — ${customer.firstName} ${customer.lastName}`,
      text: emailText,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Błąd wysyłki zamówienia:", error);
    return NextResponse.json(
      { error: "Nie udało się wysłać zamówienia. Spróbuj ponownie." },
      { status: 500 }
    );
  }
}
