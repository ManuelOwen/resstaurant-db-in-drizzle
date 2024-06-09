// import 'dotenv/config';
// import db from './drizzle/db';
// import {
//   cityTable,
//   restaurantTable,
//   menuItemTable,
//   categoryTable,
//   stateTable,
//   restaurant_ownerTable,
//   addressTable,
//   order_menu_itemTable,
//   orderTable,
//   userTable,
//   driverTable,
//   order_statusTable,
//   stats_catalogueTable,
//   commentTable,
//   TIcity,
//   TIrestaurant,
//   TImenu_item,
//   TIcategory,
//   TIstate,
//   TIrestaurant_owner,
//   TIaddress,
//   TIorder_menu_item,
//   TIorder,
//   TIuser,
//   TIdriver,
//   TIorder_status,
//   TIstats_catalogue,
//   TIcomment
// } from './drizzle/schema';

// const insertData = async () => {
//   try {
//     // Insert into stateTable
//     const state = await db.insert(stateTable).values({
//       name: 'Sample State',
//       city: 'Sample City',
//       code: 'SC',
//     } as TIstate).returning();

//     // Insert into cityTable
//     const city = await db.insert(cityTable).values({
//       name: 'Sample City',
//       state_id: state.id,
//       state: 'Sample State',
//       restaurant: 'Sample Restaurant',
//     } as TIcity).returning();

//     // Insert into restaurantTable
//     const restaurant = await db.insert(restaurantTable).values({
//       name: 'Sample Restaurant',
//       street_address: '123 Sample St',
//       zip_code: '12345',
//       city_id: city.id,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       menu_item: 'Sample Menu Item',
//       orders: 'Sample Order',
//       city: 'Sample City',
//       restaurant_owner: 'Sample Owner',
//     } as TIrestaurant).returning();

//     // Insert into categoryTable
//     const category = await db.insert(categoryTable).values({
//       name: 'Sample Category',
//       menu_item: 'Sample Menu Item',
//     } as TIcategory).returning();

//     // Insert into menuItemTable
//     const menuItem = await db.insert(menuItemTable).values({
//       name: 'Sample Menu Item',
//       price: '9.99',
//       restaurant_id: restaurant.id,
//       restaurant: 'Sample Restaurant',
//       Category_id: category.id,
//       Description: 'Sample Description',
//       ingredients: 'Sample Ingredients',
//       active: 'true',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       order_menu_item: 'Sample Order Menu Item',
//     } as TImenu_item).returning();

//     // Insert into userTable
//     const user = await db.insert(userTable).values({
//       name: 'Sample User',
//       email: 'sample@example.com',
//       phone_number: 1234567890,
//       password: 'password123',
//       address: 1,
//       orders: 'Sample Order',
//       email_verified: true,
//       confirmation_code: 'ABC123',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       comment: 'Sample Comment',
//       driver: 'Sample Driver',
//       restaurant_ownerTable: 'Sample Owner',
//     } as TIuser).returning();

//     // Insert into addressTable
//     const address = await db.insert(addressTable).values({
//       street_address1: '123 Main St',
//       street_address2: 'Apt 4B',
//       zip_code: '12345',
//       city: 'Sample City',
//       delivery_instructions: 'Leave at front door',
//       city_id: city.id,
//       user_id: user.id,
//       users: 'Sample User',
//       orders: 'Sample Order',
//     } as TIaddress).returning();

//     // Insert into restaurant_ownerTable
//     await db.insert(restaurant_ownerTable).values({
//       restaurant: 'Sample Restaurant',
//       zip_code: '12345',
//       restaurant_owner: 'Sample Owner',
//       restaurant_id: restaurant.id,
//     } as TIrestaurant_owner);

//     // Insert into orderTable
//     const order = await db.insert(orderTable).values({
//       restaurant_id: restaurant.id,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       delivery_address_id: address.id,
//       user_id: user.id,
//       driver_id: 1, // assuming a driver with ID 1 exists
//       price: 100,
//       Discount: 10,
//       final_price: 90,
//       Comment: 'Sample Comment',
//       created_at: new Date(),
//       updated_at: new Date(),
//       comments: 'Sample Comments',
//       order_menu_item: 'Sample Order Menu Item',
//       order_status: 'Pending',
//       address: '123 Main St, Apt 4B, Sample City',
//       driver: 'Sample Driver',
//       restaurant: 'Sample Restaurant',
//       users: 'Sample User',
//     } as TIorder).returning();

//     // Insert into order_menu_itemTable
//     await db.insert(order_menu_itemTable).values({
//       menu_item_id: menuItem.id,
//       order_id: order.id,
//       quantity: 2,
//       menu_item: 'Sample Menu Item',
//       orders: 'Sample Order',
//       price: 19.98,
//       comment: 'Sample Comment',
//     } as TIorder_menu_item);

//     // Insert into driverTable
//     const driver = await db.insert(driverTable).values({
//       car_make: 'Toyota',
//       car_model: 'Corolla',
//       car_year: 2020,
//       user_id: user.id,
//       online: true,
//       delivering: false,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       users: 'Sample User',
//       orders: 'Sample Order',
//     } as TIdriver).returning();

//     // Insert into order_statusTable
//     await db.insert(order_statusTable).values({
//       order_id: order.id,
//       stats_catalogue_id: 1, // assuming a stats_catalogue with ID 1 exists
//       createdAt: new Date(),
//       orders: 'Sample Order',
//       status_catalogue: 'Pending',
//     } as TIorder_status);

//     // Insert into stats_catalogueTable
//     const statsCatalogue = await db.insert(stats_catalogueTable).values({
//       name: 'Pending',
//       order_status: 'Pending',
//     } as TIstats_catalogue).returning();

//     // Insert into commentTable
//     await db.insert(commentTable).values({
//       order_id: order.id,
//       user_id: user.id,
//       comment_text: 'Great service!',
//       is_complaint: false,
//       is_praise: true,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       orders: 'Sample Order',
//       users: 'Sample User',
//     } as TIcomment);

//     console.log('Data inserted successfully');
//   } catch (error) {
//     console.error('Error inserting data:', error);
//   } finally {
//     await db.client.end(); // Close the database connection
//   }
// };

// // Run the insertion script
// insertData().catch((error) => {
//   console.error('Error in insertData:', error);
// });
