// app/api/creative/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ FIXED: Slug to Category Name Mapping
const SLUG_TO_CATEGORY: Record<string, string[]> = {
  "art-craft": [  // ← Changed from "art-and-craft" to "art-craft"
    "Creative & Handcrafted > Art & Craft",
    "Art & Craft"
  ],
  "handmade-special": [  // ← Match the slug from Navbar
    "Creative & Handcrafted > Handmade Occasion-Special Items",
    "Handmade Occasion-Special Items"
  ],
  "jutt-item": [
    "Creative & Handcrafted > Jutt Item",
    "Jutt Item"
  ],
  "coir-products": [  // ← Add this
    "Creative & Handcrafted > Coir Products",
    "Coir Products"
  ],
  // Add subcategories
  "dry-flowers": [
    "Creative & Handcrafted > Coir Products > Dry Flowers",
    "Dry Flowers"
  ]
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("category");

    if (!categorySlug) {
      return NextResponse.json(
        { error: "Category parameter is required" },
        { status: 400 }
      );
    }

    console.log("🔍 Received category slug:", categorySlug);

    // Get possible category names for this slug
    const possibleCategories = SLUG_TO_CATEGORY[categorySlug];

    if (!possibleCategories) {
      console.log("❌ No mapping found for slug:", categorySlug);
      return NextResponse.json([], { status: 200 }); // Return empty array
    }

    console.log("✅ Searching for categories:", possibleCategories);

    // Search for products matching any of the category variations
    const products = await prisma.product.findMany({
      where: {
        OR: possibleCategories.map((cat) => ({
          category: {
            contains: cat,
            mode: "insensitive",
          },
        })),
        status: "ACTIVE",
      },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        oldPrice: true,
        images: true,
        rating: true,
        stock: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(`✅ Found ${products.length} products for slug "${categorySlug}"`);
    
    // Log first product's category for debugging
    if (products.length > 0) {
      console.log("📦 Sample product category:", products[0].category);
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ Error fetching creative products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}