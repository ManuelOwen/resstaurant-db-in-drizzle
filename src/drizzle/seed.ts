import db from "./db";
import {
    stateTable, 
    cityTable,
    restaurantTable,
    userTable,
    menuItemTable,
    orderTable,
    categoryTable,
    driverTable,
    order_menu_itemTable,
    restaurant_ownerTable,
    addressTable,
    order_statusTable,
    stats_catalogueTable,
    commentTable,
}from "./schema";
 
// 1
const states = [
 {name: "Kenya", code: "254"},
]

// 2
const cities = [
    {name: "Nairobi", state_id: 1},
    {name: "Mombasa", state_id: 1},
    {name: "Nakuru", state_id: 1},
    {name: "Eldoret", state_id: 1},
]

// 3
const addresses = [
    {street_address1: "Kimathi Street", street_address2: "Kimathi Street", zip_code: "00100", city_id: 1, delivery_instructions: "Deliver to the receptionist"},
    {street_address1: "Moi Avenue", street_address2: "Moi Avenue", zip_code: "00100", city_id: 1, delivery_instructions: "Deliver to the receptionist"},
    {street_address1: "Kenyatta Avenue", street_address2: "Kenyatta Avenue", zip_code: "00100", city_id: 1, delivery_instructions: "Deliver to the receptionist"},
    {street_address1: "Kenyatta Avenue", street_address2: "Kenyatta Avenue", zip_code: "00100", city_id: 1, delivery_instructions: "Deliver to the receptionist"}
]

// 4
const users = [
    {name: "John Doe", email: "john@gmail.com", phone_number: "254712345678", password: "password", address_id: 1, createdAt: new Date(), updatedAt: new Date()},
    {name: "Jane Doe", email: "jane@gmail.com", phone_number: "254712345678", password: "password", address_id: 2, createdAt: new Date(), updatedAt: new Date()},
    {name: "James Doe", email: "james@gmail.com", phone_number: "254712345678", password: "password", address_id: 3, createdAt: new Date(), updatedAt: new Date()},
    {name: "Janet Doe", email: "janet@gmail.com", phone_number: "254712345678", password: "password", address_id: 4, createdAt: new Date(), updatedAt: new Date()},
]

// 5
const restaurant_owners = [
    {owner_id: 1, restaurant_id: 5, zip_code: "00100"},
    {owner_id: 2, restaurant_id: 6, zip_code: "00100"},
    {owner_id: 3, restaurant_id: 7, zip_code: "00100"},
    {owner_id: 4, restaurant_id: 8, zip_code: "00100"},
]

// 6
const restaurants = [
    {name: "Java", street_address: "Kimathi Street", zip_code: "00100", city_id: 1, createdAt: new Date(), updatedAt: new Date(),  restaurant_owner_id: 1},
    {name: "KFC", street_address: "Moi Avenue", zip_code: "00100", city_id: 1, createdAt: new Date(), updatedAt: new Date(),  restaurant_owner_id: 2},
    {name: "Artcaffe", street_address: "Kenyatta Avenue", zip_code: "00100", city_id: 1, createdAt: new Date(), updatedAt: new Date(),  restaurant_owner_id: 3},
    {name: "Steers", street_address: "Kenyatta Avenue", zip_code: "00100", city_id: 1, createdAt: new Date(), updatedAt: new Date(),  restaurant_owner_id: 4},
  
]

// 7
const menuItems = [
    {name: "Chicken Burger", price: "500", restaurant_id: 5, Category_id: 1, Description: "Chicken Burger", ingredients: "Chicken", active: "Yes", createdAt: new Date(), updatedAt: new Date()},
    {name: "Beef Burger", price: "500", restaurant_id: 6, Category_id: 1, Description: "Beef Burger", ingredients: "Beef", active: "Yes", createdAt: new Date(), updatedAt: new Date()},
    {name: "Fish Burger", price: "500", restaurant_id: 7, Category_id: 1, Description: "Fish Burger", ingredients: "Fish", active: "Yes", createdAt: new Date(), updatedAt: new Date()},
    {name: "Veggie Burger", price: "500", restaurant_id: 8, Category_id: 1, Description: "Veggie Burger", ingredients: "Veggie", active: "Yes", createdAt: new Date(), updatedAt: new Date()},
]

//8
const categories = [
    {name: "Burgers"},
    {name: "Pizza"},
    {name: "Sandwiches"},
    {name: "Salads"},
]


//9
const drivers = [
    {car_make: "Toyota", car_model: "Corolla", car_year: 2010, user_id: 1, online: true, delivering: false, createdAt: new Date(), updatedAt: new Date()},
    {car_make: "Toyota", car_model: "Corolla", car_year: 2010, user_id: 2, online: true, delivering: false, createdAt: new Date(), updatedAt: new Date()},
    {car_make: "Toyota", car_model: "Corolla", car_year: 2010, user_id: 3, online: true, delivering: false, createdAt: new Date(), updatedAt: new Date()},
    {car_make: "Toyota", car_model: "Corolla", car_year: 2010, user_id: 4, online: true, delivering: false, createdAt: new Date(), updatedAt: new Date()},
]


//10
const order_menu_item = [
    {menu_item_id: 1, order_id: 1, quantity: 1, price: 500, comment: "No onions"},
    {menu_item_id: 2, order_id: 2, quantity: 1, price: 500, comment: "No onions"},
    {menu_item_id: 3, order_id: 3, quantity: 1, price: 500, comment: "No onions"},
    {menu_item_id: 4, order_id: 4, quantity: 1, price: 500, comment: "No onions"},
]
// export const orderTable = pgTable("order", {
//     id: serial("id").notNull().primaryKey(),
//     restaurant_id: integer("restaurant_id").notNull().references(() => restaurantTable.ID, { onDelete: "cascade" }), 
//     createdAt: timestamp("created_at"),
//     updatedAt: timestamp("updated_at"),
//     delivery_address_id: integer("delivery_address_id").notNull().references(() => addressTable.id, { onDelete: "cascade" }),
//     user_id: integer("user_id").notNull().references(() => userTable.id, { onDelete: "cascade" }),
//     driver_id: integer("driver_id").notNull().references(() => driverTable.id, { onDelete: "cascade" }), 
//     price: integer("price").notNull(),
//     Discount: integer("Discount").notNull(),
//     final_price: integer("final_price").notNull(),
//     Comment: varchar("Comment", { length: 255 }).notNull(),
//     created_at: timestamp("created_at"),
//     updated_at: timestamp("updated_at"),
//     order_status: varchar("order_status", { length: 255 }).notNull()
// });
//12
const orders = [
    {restaurant_id: 5, delivery_address_id: 1, user_id: 1, driver_id: 1, price: 500, Discount: 0, final_price: 500, Comment: "No onions", order_status: "Pending", created_at: new Date(), updated_at: new Date()},
    {restaurant_id: 6, delivery_address_id: 2, user_id: 2, driver_id: 2, price: 500, Discount: 0, final_price: 500, Comment: "No onions", order_status: "Pending", created_at: new Date(), updated_at: new Date()},
    {restaurant_id: 7, delivery_address_id: 3, user_id: 3, driver_id: 3, price: 500, Discount: 0, final_price: 500, Comment: "No onions", order_status: "Pending", created_at: new Date(), updated_at: new Date()},
    {restaurant_id: 8, delivery_address_id: 4, user_id: 4, driver_id: 4, price: 500, Discount: 0, final_price: 500, Comment: "No onions", order_status: "Pending", created_at: new Date(), updated_at: new Date()},
]



async function seed() {
    // await db.insert(stateTable).values(states)
    // await db.insert(cityTable).values(cities)
    // await db.insert(addressTable).values(addresses)
    // await db.insert(userTable).values(users)
    // await db.insert(restaurantTable).values(restaurants)
    // await db.insert(restaurant_ownerTable).values(restaurant_owners)
    // await db.insert(menuItemTable).values(menuItems)
    // await db.insert(categoryTable).values(categories)
    // await db.insert(orderTable).values(orders)
    await db.insert(driverTable).values(drivers)
    // await db.insert(order_menu_itemTable).values(order_menu_item)
}

seed().then(() => console.log("Seeding complete")).catch(console.error)