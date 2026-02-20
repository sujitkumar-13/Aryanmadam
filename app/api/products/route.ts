// app/api/products/route.ts - COMPLETE FILE (Replace entirely)

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ================== GET - Fetch Products ==================
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const maxPrice = searchParams.get("maxPrice");
    const search = searchParams.get("search");

    console.log("📥 GET /api/products called");
    console.log("Query params:", { category, maxPrice, search });

    // Build the where clause dynamically
    const where: any = {
      status: "ACTIVE", // Only fetch active products
    };

    // Filter by category if provided
    if (category && category !== "All") {
      if (category === "Gifts Under Rs.699") {
        where.price = { lte: 699 };
      } else {
        where.category = category;
      }
    }

    // Filter by max price if provided
    if (maxPrice) {
      const priceLimit = parseInt(maxPrice);
      if (!where.price) {
        where.price = {};
      }
      where.price.lte = priceLimit;
    }

    // Search in title if query provided
    if (search) {
      where.title = {
        contains: search,
        mode: "insensitive",
      };
    }

    console.log("🔍 Fetching products with filter:", where);

    // Fetch products from database
    const products = await prisma.product.findMany({
      where,
      orderBy: {
        createdAt: "desc", // Newest first
      },
    });

    console.log(`✅ Found ${products.length} products`);

    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error fetching products:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// ================== POST - Create Product ==================
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("📥 POST /api/products called");
    console.log("Body:", body);

    // Generate unique SKU based on category
    const generateSKU = (category: string) => {
      const categoryPrefix = category.substring(0, 3).toUpperCase();
      const randomNumber = Math.floor(10000 + Math.random() * 90000);
      return `${categoryPrefix}-${randomNumber}`;
    };

    const sku = generateSKU(body.category || "PRD");

    // Ensure stock is a number
    const stock = typeof body.stock === 'number' ? body.stock : 
                  typeof body.initialStock === 'number' ? body.initialStock : 0;

    // Create product with all fields
    const product = await prisma.product.create({
      data: {
        title: body.title,
        details: body.details || null,
        description: body.description,
        price: body.price,
        oldPrice: body.oldPrice || null,
        exclusive: body.exclusive || null,
        stock: stock,
        images: body.images || [],
        video: body.video || null,
        colour: body.colour || [],
        insideBox: body.insideBox || [],
        rating: body.rating || 0,
        reviews: body.reviews || 0,
        badge: body.badge || null,
        sku: sku,
        category: body.category || "Other",
        stone: body.stone || null,
        status: body.status || "ACTIVE",
      },
    });

    console.log("✅ Product created:", product.id);

    return NextResponse.json(
      { 
        success: true, 
        product,
        id: product.id,
        productId: product.id 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error creating product:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}