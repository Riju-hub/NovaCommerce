import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Store from '../models/Store.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { mockUsers, mockCategories, mockProducts } from './mockData.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log('🧹 Clearing existing database collections...');
    await User.deleteMany();
    await Store.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log('👤 Creating Users...');
    const createdUsers = [];
    for (const u of mockUsers) {
      const user = await User.create(u);
      createdUsers.push(user);
    }

    const vendorUser = createdUsers.find((u) => u.role === 'vendor');

    console.log('🏪 Creating Vendor Store...');
    const store = await Store.create({
      vendor: vendorUser._id,
      name: 'Tech & Style Hub',
      description: 'Your premier shop for top electronics and lifestyle goods.',
      status: 'approved',
    });

    vendorUser.store = store._id;
    await vendorUser.save();

    console.log('📁 Creating Categories...');
    const createdCategories = await Category.insertMany(mockCategories);

    console.log('📦 Creating Products...');
    const sampleProducts = mockProducts.map((product) => ({
      ...product,
      store: store._id,
      category: createdCategories[0]._id, // Attach to Electronics category
    }));

    await Product.insertMany(sampleProducts);

    console.log('✅ Database Seeded Successfully!');
    console.log('----------------------------------------------------');
    console.log('🔑 Seeded Credentials:');
    console.log('   Admin:    bhabasindhudas621@gmail.com / montagem');
    console.log('   Vendor:   vendor@gmail.com / vendor');
    console.log('   Customer: customer@gmail.com / customer');
    console.log('----------------------------------------------------');

    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedData();