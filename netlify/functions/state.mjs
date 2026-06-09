import { getStore } from "@netlify/blobs";

export default async (req) => {
  // We maken een opslag 'opstelling-store' aan in Netlify
  const store = getStore("opstelling-store");

  // Als de website vraagt om de opstelling (GET)
  if (req.method === "GET") {
    const data = await store.get("huidige", { type: "json" });
    return new Response(JSON.stringify(data || {}), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Als de website een nieuwe opstelling wil opslaan (POST)
  if (req.method === "POST") {
    const body = await req.json();
    await store.setJSON("huidige", body);
    return new Response("Opgeslagen", { status: 200 });
  }

  return new Response("Niet toegestaan", { status: 405 });
};

// Deze configuratie vertelt Netlify op welk webadres dit script moet draaien
export const config = {
  path: "/api/state"
};