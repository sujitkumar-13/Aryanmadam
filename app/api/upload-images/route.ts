// app/api/upload-images/route.ts
import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const type = formData.get('type') as string;
    
    // Support both productId and remedyId
    const productId = formData.get('productId') as string;
    const remedyId = formData.get('remedyId') as string;
    const itemId = productId || remedyId;

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    console.log(`📤 Uploading ${files.length} file(s) for ${remedyId ? 'remedy' : 'product'} ${itemId}`);

    const uploadPromises = files.map(async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      return new Promise((resolve, reject) => {
        // Dynamic folder based on whether it's product or remedy
        const folder = remedyId 
          ? (type === 'video' ? 'remedies/videos' : 'remedies/images')
          : (type === 'video' ? 'products/videos' : 'products/images');

        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: folder,
            resource_type: type === 'video' ? 'video' : 'image',
            public_id: `${itemId}_${Date.now()}_${Math.random().toString(36).substring(7)}`,
          },
          (error, result) => {
            if (error) {
              console.error('❌ Cloudinary upload error:', error);
              reject(error);
            } else {
              console.log('✅ Upload successful:', result?.secure_url);
              resolve(result?.secure_url);
            }
          }
        );

        uploadStream.end(buffer);
      });
    });

    const urls = await Promise.all(uploadPromises);

    return NextResponse.json({
      success: true,
      urls: urls,
      url: urls[0], // backward compatibility
    });
  } catch (error: any) {
    console.error('❌ Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed', details: error.message },
      { status: 500 }
    );
  }
}