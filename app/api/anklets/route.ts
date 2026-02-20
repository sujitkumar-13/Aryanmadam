import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    console.log("🔍 Anklets API called with category:", category);

    if (!category) {
      return NextResponse.json(
        { error: "Category parameter is required" },
        { status: 400 }
      );
    }

    // Convert slug to proper category format
    const categoryMap: Record<string, string> = {
      "all-anklets": "Crystals & Spiritual > Anklets",
      "crystal-clocks": "Crystals & Spiritual > Anklets > Crystal Clocks",
      "crystal-pyramid": "Crystals & Spiritual > Anklets > Crystal Pyramid",
      "crystal-pencils": "Crystals & Spiritual > Anklets > Crystal Pencils",
      "crystal-box": "Crystals & Spiritual > Anklets > Crystal Box",
      "crystal-idols": "Crystals & Spiritual > Anklets > Crystal Idols",
      "pyrite-dust-frames": "Crystals & Spiritual > Anklets > Pyrite Dust Frames",
      "seven-chakra-frames": "Crystals & Spiritual > Anklets > Seven Chakra Healing Frames",
      "crystal-strings": "Crystals & Spiritual > Anklets > Crystal Strings",
      "crystal-animals": "Crystals & Spiritual > Anklets > Crystal Animals",
    };

    const fullCategory = categoryMap[category];

    console.log("📂 Looking for category:", fullCategory);

    if (!fullCategory) {
      console.log("❌ Unknown category slug:", category);
      return NextResponse.json(
        { error: `Unknown category: ${category}` },
        { status: 404 }
      );
    }

    // Fetch products matching this category
    let products;

    if (category === "all-anklets") {
      console.log("🔎 Fetching ALL anklets products");
      products = await prisma.product.findMany({
        where: {
          category: {
            startsWith: "Crystals & Spiritual > Anklets",
          },
          status: "ACTIVE",
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      console.log("🔎 Fetching products for exact category:", fullCategory);
      products = await prisma.product.findMany({
        where: {
          category: fullCategory,
          status: "ACTIVE",
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    console.log(`✅ Found ${products.length} products`);

    // If no products found for specific category, try partial match
    if (products.length === 0 && category !== "all-anklets") {
      console.log("🔄 No exact matches, trying partial match...");
      products = await prisma.product.findMany({
        where: {
          category: {
            contains: category.replace(/-/g, " "),
            mode: "insensitive",
          },
          status: "ACTIVE",
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      console.log(`✅ Found ${products.length} products with partial match`);
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ Error fetching anklet products:", error);
    console.error("Error details:", error instanceof Error ? error.message : error);
    
    return NextResponse.json(
      { 
        error: "Failed to fetch products",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}