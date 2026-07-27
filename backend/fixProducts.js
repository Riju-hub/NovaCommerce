// server/fixProducts.js
import dns from 'dns';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();
dns.setServers(['8.8.8.8', '8.8.4.4']);

const fixLegacyProducts = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.DATABASE_URL;
    
    console.log('Connecting to database...');
    
    await mongoose.connect(mongoUri, {
      family: 4, // Force IPv4 to prevent Windows DNS resolution errors
    });
    
    console.log('Connected successfully!');

    // Update all products to be approved and published
    const result = await Product.updateMany(
      {},
      {
        $set: {
          isPublished: true,
          approvalStatus: 'approved',
        },
      }
    );

    console.log(`Success! Updated ${result.modifiedCount} products.`);
    process.exit(0);
  } catch (error) {
    console.error('Error fixing products:', error);
    process.exit(1);
  }
};

fixLegacyProducts();