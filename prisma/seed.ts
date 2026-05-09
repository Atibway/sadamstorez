import { PrismaClient } from '../generated/prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL!,
}).$extends(withAccelerate());

async function main() {
  console.log('Starting database seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@bamshopping.com' },
    update: {},
    create: {
      email: 'admin@bamshopping.com',
      name: 'Admin User',
      username: 'admin',
      password: hashedPassword,
      phone: '+256700000000',
      city: 'Kampala',
      country: 'Uganda',
      role: 'ADMIN',
    },
  });
  console.log('Created admin user:', adminUser.email);

  // Create regular test user
  const userPassword = await bcrypt.hash('user123', 10);
  const testUser = await prisma.user.upsert({
    where: { email: 'user@bamshopping.com' },
    update: {},
    create: {
      email: 'user@bamshopping.com',
      name: 'Test User',
      username: 'testuser',
      password: userPassword,
      phone: '+256712345678',
      city: 'Kampala',
      country: 'Uganda',
      role: 'USER',
    },
  });
  console.log('Created test user:', testUser.email);

  // Create billboards
  const billboard1 = await prisma.billboard.create({
    data: {
      label: 'Fresh Groceries Special',
    },
  });

  const billboard2 = await prisma.billboard.create({
    data: {
      label: 'Electronics Sale',
    },
  });

  const billboard3 = await prisma.billboard.create({
    data: {
      label: 'Fashion Week',
    },
  });

  console.log('Created 3 billboards');

  // Create billboard images
  await prisma.billboardImages.create({
    data: {
      name: 'Groceries Banner',
      url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
      billboardId: billboard1.id,
    },
  });

  await prisma.billboardImages.create({
    data: {
      name: 'Electronics Banner',
      url: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800',
      billboardId: billboard2.id,
    },
  });

  await prisma.billboardImages.create({
    data: {
      name: 'Fashion Banner',
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      billboardId: billboard3.id,
    },
  });

  console.log('Created billboard images');

  // Create categories
  const groceriesCategory = await prisma.category.create({
    data: {
      name: 'Groceries',
      icon: '🥬',
      billboardId: billboard1.id,
    },
  });

  const electronicsCategory = await prisma.category.create({
    data: {
      name: 'Electronics',
      icon: '📱',
      billboardId: billboard2.id,
    },
  });

  const fashionCategory = await prisma.category.create({
    data: {
      name: 'Fashion',
      icon: '👕',
      billboardId: billboard3.id,
    },
  });

  const homeCategory = await prisma.category.create({
    data: {
      name: 'Home & Living',
      icon: '🏠',
      billboardId: billboard1.id,
    },
  });

  const beautyCategory = await prisma.category.create({
    data: {
      name: 'Beauty & Health',
      icon: '💄',
      billboardId: billboard1.id,
    },
  });

  const sportsCategory = await prisma.category.create({
    data: {
      name: 'Sports & Outdoors',
      icon: '⚽',
      billboardId: billboard2.id,
    },
  });

  console.log('Created 6 categories');

  // Create subcategories for groceries
  const fruitsSubcategory = await prisma.subcategory.create({
    data: {
      name: 'Fruits',
      categoryId: groceriesCategory.id,
    },
  });

  const vegetablesSubcategory = await prisma.subcategory.create({
    data: {
      name: 'Vegetables',
      categoryId: groceriesCategory.id,
    },
  });

  const dairySubcategory = await prisma.subcategory.create({
    data: {
      name: 'Dairy & Eggs',
      categoryId: groceriesCategory.id,
    },
  });

  const bakerySubcategory = await prisma.subcategory.create({
    data: {
      name: 'Bakery',
      categoryId: groceriesCategory.id,
    },
  });

  // Create subcategories for electronics
  const phonesSubcategory = await prisma.subcategory.create({
    data: {
      name: 'Phones',
      categoryId: electronicsCategory.id,
    },
  });

  const laptopsSubcategory = await prisma.subcategory.create({
    data: {
      name: 'Laptops',
      categoryId: electronicsCategory.id,
    },
  });

  const appliancesSubcategory = await prisma.subcategory.create({
    data: {
      name: 'Appliances',
      categoryId: electronicsCategory.id,
    },
  });

  // Create subcategories for fashion
  const menSubcategory = await prisma.subcategory.create({
    data: {
      name: "Men's Clothing",
      categoryId: fashionCategory.id,
    },
  });

  const womenSubcategory = await prisma.subcategory.create({
    data: {
      name: "Women's Clothing",
      categoryId: fashionCategory.id,
    },
  });

  const shoesSubcategory = await prisma.subcategory.create({
    data: {
      name: 'Shoes',
      categoryId: fashionCategory.id,
    },
  });

  // Create subcategories for home
  const furnitureSubcategory = await prisma.subcategory.create({
    data: {
      name: 'Furniture',
      categoryId: homeCategory.id,
    },
  });

  const kitchenSubcategory = await prisma.subcategory.create({
    data: {
      name: 'Kitchen',
      categoryId: homeCategory.id,
    },
  });

  console.log('Created 11 subcategories');

  // Create sizes
  const sizeS = await prisma.size.create({
    data: { name: 'Small', value: 'S' },
  });

  const sizeM = await prisma.size.create({
    data: { name: 'Medium', value: 'M' },
  });

  const sizeL = await prisma.size.create({
    data: { name: 'Large', value: 'L' },
  });

  const sizeXL = await prisma.size.create({
    data: { name: 'Extra Large', value: 'XL' },
  });

  const sizeXXL = await prisma.size.create({
    data: { name: 'Double Extra Large', value: 'XXL' },
  });

  console.log('Created 5 sizes');

  // Create colors
  const colorRed = await prisma.color.create({
    data: { name: 'Red', value: '#FF0000' },
  });

  const colorBlue = await prisma.color.create({
    data: { name: 'Blue', value: '#0000FF' },
  });

  const colorGreen = await prisma.color.create({
    data: { name: 'Green', value: '#008000' },
  });

  const colorBlack = await prisma.color.create({
    data: { name: 'Black', value: '#000000' },
  });

  const colorWhite = await prisma.color.create({
    data: { name: 'White', value: '#FFFFFF' },
  });

  const colorYellow = await prisma.color.create({
    data: { name: 'Yellow', value: '#FFFF00' },
  });

  console.log('Created 6 colors');

  // Create products
  // Groceries products
  const appleProduct = await prisma.product.create({
    data: {
      name: 'Fresh Apples',
      description: 'Premium quality apples, fresh from the farm. Perfect for snacking or baking.',
      price: 5000,
      priceDiscount: 0,
      countInStock: 100,
      isFeatured: true,
      isArchived: false,
      categoryId: groceriesCategory.id,
      subcategoryId: fruitsSubcategory.id,
      sizeId: sizeM.id,
      colorId: colorRed.id,
      rating: 5,
    },
  });

  const bananaProduct = await prisma.product.create({
    data: {
      name: 'Ripe Bananas',
      description: 'Sweet and nutritious bananas, perfect for smoothies or as a healthy snack.',
      price: 3000,
      priceDiscount: 0,
      countInStock: 150,
      isFeatured: true,
      isArchived: false,
      categoryId: groceriesCategory.id,
      subcategoryId: fruitsSubcategory.id,
      sizeId: sizeM.id,
      colorId: colorYellow.id,
      rating: 4,
    },
  });

  const milkProduct = await prisma.product.create({
    data: {
      name: 'Fresh Milk 1L',
      description: 'Pure and fresh whole milk, rich in calcium and nutrients.',
      price: 4500,
      priceDiscount: 0,
      countInStock: 80,
      isFeatured: true,
      isArchived: false,
      categoryId: groceriesCategory.id,
      subcategoryId: dairySubcategory.id,
      sizeId: sizeL.id,
      colorId: colorWhite.id,
      rating: 5,
    },
  });

  const breadProduct = await prisma.product.create({
    data: {
      name: 'Whole Wheat Bread',
      description: 'Freshly baked whole wheat bread, healthy and delicious.',
      price: 3500,
      priceDiscount: 0,
      countInStock: 60,
      isFeatured: false,
      isArchived: false,
      categoryId: groceriesCategory.id,
      subcategoryId: bakerySubcategory.id,
      sizeId: sizeM.id,
      colorId: colorYellow.id,
      rating: 4,
    },
  });

  // Electronics products
  const phoneProduct = await prisma.product.create({
    data: {
      name: 'Smartphone Pro',
      description: 'Latest smartphone with advanced features, great camera and long battery life.',
      price: 1500000,
      priceDiscount: 10,
      countInStock: 30,
      isFeatured: true,
      isArchived: false,
      categoryId: electronicsCategory.id,
      subcategoryId: phonesSubcategory.id,
      sizeId: sizeM.id,
      colorId: colorBlack.id,
      rating: 5,
    },
  });

  const laptopProduct = await prisma.product.create({
    data: {
      name: 'Laptop Ultra',
      description: 'High-performance laptop for work and gaming, fast processor and great display.',
      price: 3500000,
      priceDiscount: 5,
      countInStock: 20,
      isFeatured: true,
      isArchived: false,
      categoryId: electronicsCategory.id,
      subcategoryId: laptopsSubcategory.id,
      sizeId: sizeL.id,
      colorId: colorBlue.id,
      rating: 5,
    },
  });

  const fridgeProduct = await prisma.product.create({
    data: {
      name: 'Refrigerator Double Door',
      description: 'Energy-efficient refrigerator with double door, perfect for families.',
      price: 2500000,
      priceDiscount: 0,
      countInStock: 15,
      isFeatured: false,
      isArchived: false,
      categoryId: electronicsCategory.id,
      subcategoryId: appliancesSubcategory.id,
      sizeId: sizeXL.id,
      colorId: colorWhite.id,
      rating: 4,
    },
  });

  // Fashion products
  const tshirtProduct = await prisma.product.create({
    data: {
      name: 'Cotton T-Shirt',
      description: 'Comfortable 100% cotton t-shirt, perfect for everyday wear.',
      price: 25000,
      priceDiscount: 0,
      countInStock: 200,
      isFeatured: true,
      isArchived: false,
      categoryId: fashionCategory.id,
      subcategoryId: menSubcategory.id,
      sizeId: sizeM.id,
      colorId: colorBlue.id,
      rating: 4,
    },
  });

  const dressProduct = await prisma.product.create({
    data: {
      name: 'Elegant Dress',
      description: 'Beautiful elegant dress for special occasions, made with premium fabric.',
      price: 85000,
      priceDiscount: 15,
      countInStock: 50,
      isFeatured: true,
      isArchived: false,
      categoryId: fashionCategory.id,
      subcategoryId: womenSubcategory.id,
      sizeId: sizeM.id,
      colorId: colorRed.id,
      rating: 5,
    },
  });

  const sneakersProduct = await prisma.product.create({
    data: {
      name: 'Sports Sneakers',
      description: 'Comfortable and stylish sneakers, perfect for sports and casual wear.',
      price: 120000,
      priceDiscount: 0,
      countInStock: 80,
      isFeatured: true,
      isArchived: false,
      categoryId: fashionCategory.id,
      subcategoryId: shoesSubcategory.id,
      sizeId: sizeM.id,
      colorId: colorWhite.id,
      rating: 4,
    },
  });

  // Home products
  const sofaProduct = await prisma.product.create({
    data: {
      name: 'Modern Sofa Set',
      description: 'Stylish and comfortable sofa set, perfect for your living room.',
      price: 1800000,
      priceDiscount: 10,
      countInStock: 10,
      isFeatured: false,
      isArchived: false,
      categoryId: homeCategory.id,
      subcategoryId: furnitureSubcategory.id,
      sizeId: sizeXL.id,
      colorId: colorBlue.id,
      rating: 4,
    },
  });

  const blenderProduct = await prisma.product.create({
    data: {
      name: 'Kitchen Blender',
      description: 'Powerful kitchen blender for smoothies, soups, and more.',
      price: 150000,
      priceDiscount: 0,
      countInStock: 40,
      isFeatured: false,
      isArchived: false,
      categoryId: homeCategory.id,
      subcategoryId: kitchenSubcategory.id,
      sizeId: sizeM.id,
      colorId: colorBlack.id,
      rating: 4,
    },
  });

  console.log('Created 12 products');

  // Create product images
  await prisma.image.createMany({
    data: [
      { url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400', productId: appleProduct.id },
      { url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400', productId: bananaProduct.id },
      { url: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400', productId: milkProduct.id },
      { url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', productId: breadProduct.id },
      { url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', productId: phoneProduct.id },
      { url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', productId: laptopProduct.id },
      { url: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400', productId: fridgeProduct.id },
      { url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', productId: tshirtProduct.id },
      { url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', productId: dressProduct.id },
      { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', productId: sneakersProduct.id },
      { url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', productId: sofaProduct.id },
      { url: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400', productId: blenderProduct.id },
    ],
  });

  console.log('Created product images');

  console.log('Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
