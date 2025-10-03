// scripts/seed-catalog.js
// Futtatás: node scripts/seed-catalog.js
// Env: MEDUSA_ADMIN_URL, MEDUSA_ADMIN_COOKIE, ASSET_BASE (opcionális)

require("dotenv").config();
const fs = require("fs/promises");
const path = require("path");

// fetch shim (CJS környezethez)
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const BASE = process.env.MEDUSA_ADMIN_URL || "http://localhost:9000";
const COOKIE = process.env.MEDUSA_ADMIN_COOKIE; // pl. "connect.sid=s%3Aabc..."
const ASSET_BASE = process.env.ASSET_BASE?.replace(/\/+$/, "") || "";

if (!COOKIE) {
  console.error("❌ Hiányzik a MEDUSA_ADMIN_COOKIE. Add meg az .env-ben a connect.sid cookie értékét!");
  process.exit(1);
}

console.log("🌍 BASE:", BASE);
console.log("🍪 COOKIE:", COOKIE.substring(0, 30) + "...");

const headers = {
  Cookie: COOKIE,
  "Content-Type": "application/json",
};

// --- Helpers ---

async function readJSON(rel) {
  const p = path.resolve(process.cwd(), rel);
  const txt = await fs.readFile(p, "utf8");
  return JSON.parse(txt);
}

function toAbsUrl(maybePath) {
  if (!maybePath) return undefined;
  if (/^https?:\/\//i.test(maybePath)) return maybePath;
  if (maybePath.startsWith("/")) return `${ASSET_BASE}${maybePath}`;
  return `${ASSET_BASE}/${maybePath}`;
}

function centsFromNumber(n) {
  if (n == null || n === "") return undefined;
  const num = Number(n);
  if (Number.isNaN(num)) return undefined;
  return Math.round(num * 100);
}

// --- Collections ---

async function findCollectionByHandle(handle) {
  const qs = new URLSearchParams({ handle, limit: "1" });
  const res = await fetch(`${BASE}/admin/collections?${qs}`, { headers });
  if (!res.ok) throw new Error(`Collection search failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data?.collections?.[0] || null;
}

async function upsertCollection({ title, handle, metaObj }) {
  const existing = await findCollectionByHandle(handle);
  const body = { title, handle, metadata: metaObj ?? {} };

  if (existing) {
    const res = await fetch(`${BASE}/admin/collections/${existing.id}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Collection update failed [${handle}]: ${res.status} ${await res.text()}`);
    return (await res.json()).collection;
  } else {
    const res = await fetch(`${BASE}/admin/collections`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Collection create failed [${handle}]: ${res.status} ${await res.text()}`);
    return (await res.json()).collection;
  }
}

// --- Products ---

async function findProductByHandle(handle) {
  const qs = new URLSearchParams({ handle, limit: "1" });
  const res = await fetch(`${BASE}/admin/products?${qs}`, { headers });
  if (!res.ok) throw new Error(`Product search failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data?.products?.[0] || null;
}

function packProductBody(p, collection_id) {
  const imagesArray = Array.isArray(p.images)
    ? p.images.map((img) => ({
        url: toAbsUrl(img.src || img.url || img.path || img),
      }))
    : [];

  const metadata = {
    meta: p.meta ?? null,
    aggregateRating: p.aggregateRating ?? null,
    blogtags: p.blogtags ?? null,
    audience: p.audience ?? null,
    material: p.material ?? null,
    mprice: p.mprice ?? null,
    m2price: p.m2price ?? null,
    m3price: p.m3price ?? null,
    palprice: p.palprice ?? null,
    discountPrice: p.discountPrice ?? null,
    discountPercent: p.discountPercent ?? null,
    discountValidUntil: p.discountValidUntil ?? null,
    longDescription: p.longDescription ?? null,
    longDescription2: p.longDescription2 ?? null,
    specs: p.specs ?? null,
    shippingDetails: p.shippingDetails ?? null,
    imagesAlt: Array.isArray(p.images) ? p.images.map((i) => i.alt || null) : null,
  };

  if (metadata.meta?.image) {
    metadata.meta.image = toAbsUrl(metadata.meta.image);
  }

  return {
    title: p.name || p.title || p.slug,
    handle: p.slug || p.handle,
    description: p.description || "",
    thumbnail: imagesArray[0]?.url,
    images: imagesArray,
    status: "published",
    collection_id,
    metadata,
    // 🔑 mindig legyen legalább 1 option
    options: p.options?.length
    ? p.options
    : [
        {
          title: "Méret",
          values: [p.specs?.Méret || p.name || p.slug || "Default"], // legalább egy érték
        },
      ],
  };
}


async function createOrUpdateProduct(p, collection_id) {
  const handle = p.slug || p.handle;
  if (!handle) throw new Error(`Hiányzik a slug/handle: ${JSON.stringify(p).slice(0, 120)}...`);

  const body = packProductBody(p, collection_id);
  const existing = await findProductByHandle(handle);

  if (existing) {
    const upd = await fetch(`${BASE}/admin/products/${existing.id}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    if (!upd.ok) throw new Error(`Product update failed [${handle}]: ${upd.status} ${await upd.text()}`);
    return (await upd.json()).product;
  } else {
    const crt = await fetch(`${BASE}/admin/products`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    if (!crt.ok) throw new Error(`Product create failed [${handle}]: ${crt.status} ${await crt.text()}`);
    return (await crt.json()).product;
  }
}

async function ensureVariantPrice(product, src) {
  if (src.price == null && !src.prices) return;

  const currency = (src.currency || "HUF").toLowerCase();
  const pricesPayload = src.prices
    ? src.prices.map((pr) => ({
        currency_code: (pr.currency || currency).toLowerCase(),
        amount: centsFromNumber(pr.amount),
      }))
    : [{ currency_code: currency, amount: centsFromNumber(src.price) }];

  const hasVariant = Array.isArray(product.variants) && product.variants.length > 0;

  if (!hasVariant) {
    const sku = src.sku || `SKU-${product.handle}`;
    const body = {
      title: "Default",
      sku,
      prices: pricesPayload,
    };
    const res = await fetch(`${BASE}/admin/products/${product.id}/variants`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Variant create failed [${product.handle}]: ${res.status} ${await res.text()}`);
    return (await res.json()).variant;
  } else {
    const v = product.variants[0];
    const body = {
      prices: pricesPayload,
      sku: v.sku || src.sku || `SKU-${product.handle}`,
    };
    const res = await fetch(`${BASE}/admin/variants/${v.id}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.warn(`⚠️ Variant update failed [${product.handle}]: ${res.status} ${await res.text()}`);
    }
    return v;
  }
}

// --- Main ---

async function main() {
  const catalog = await readJSON("data/catalog.json");
  if (!Array.isArray(catalog)) throw new Error("A data/catalog.json gyökere TÖMB legyen (kategória-blokkokkal).");

  console.log(`ℹ️ Kategória blokkok: ${catalog.length}`);

  for (const block of catalog) {
    const catTitle = block.category || block.maincategory || "Kategória";
    const catHandle = block.slug || catTitle
      .toLowerCase()
      .normalize("NFD").replace(/\p{Diacritic}/gu, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const collectionMeta = {
      maincategory: block.maincategory ?? null,
      meta: block.meta ?? null,
      faqdesc: block.faqdesc ?? null,
      faq: block.faq ?? null,
      description: block.description ?? null,
    };
    if (collectionMeta.meta?.image) {
      collectionMeta.meta.image = toAbsUrl(collectionMeta.meta.image);
    }

    const collection = await upsertCollection({
      title: catTitle,
      handle: catHandle,
      metaObj: collectionMeta,
    });

    console.log(`✅ Kategória kész: ${collection.title} (${collection.handle})`);

    if (Array.isArray(block.products)) {
      for (const p of block.products) {
        try {
          const prod = await createOrUpdateProduct(p, collection.id);
          await ensureVariantPrice(prod, p);
          console.log(`   → termék OK: ${p.slug || p.name}`);
        } catch (e) {
          console.error(`   ❌ termék hiba [${p.slug || p.name}]:`, e.message);
        }
      }
    }
  }

  console.log("🎉 Kész: kategóriák és termékek feltöltve.");
}

main().catch((e) => {
  console.error("❌ Kritikus hiba:", e);
  process.exit(1);
});
