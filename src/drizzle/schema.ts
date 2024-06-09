// import { Category, Description, Discount, Restaurant } from "@mui/icons-material";
import { relations } from "drizzle-orm";
import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { boolean as mysqlBoolean, datetime as mysqlDatetime, PrimaryKey } from "drizzle-orm/mysql-core";
import { integer, varchar, boolean as pgBoolean } from "drizzle-orm/pg-core";
import { idText } from "typescript";
import { or } from "sql-bricks";

// State has many Cities (1-n)
//state table
export const stateTable = pgTable("state", {
    id: serial("id").notNull().primaryKey(),
    name: varchar("name").notNull(),
    code: varchar("code", { length: 255 }).notNull()
});
//city table
export const cityTable = pgTable("city", {
    id: serial("id").notNull().primaryKey(),
    name: varchar("name").notNull(),
    state_id: integer("state_id").notNull().references(() => stateTable.id, { onDelete: "cascade" }), // Foreign key to state
});

// City has many Restaurants (1-n)
//restaurant table
export const restaurantTable = pgTable("restaurantTable", {
    ID: serial("ID").notNull().primaryKey(),
    name: varchar("name").notNull(),
    street_address: varchar("street_address").notNull(),
    zip_code: varchar("zip_code").notNull(),
    city_id: integer("city_id").notNull().references(() => cityTable.id, { onDelete: "cascade" }), // Foreign key to city
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
    // restaurant_owner_id: integer("restaurant_owner_id").notNull().references(() => restaurant_ownerTable.id, { onDelete: "cascade" }) // Foreign key to restaurant_owner
});

// Restaurant has many MenuItems (1-n)
//menu item table
export const menuItemTable = pgTable("menu_item", {
    ID: serial("ID").notNull().primaryKey(),
    name: varchar("name").notNull(),
    price: varchar("price").notNull(),
    restaurant_id: integer("restaurant_id").notNull().references(() => restaurantTable.ID, { onDelete: "cascade" }), // Foreign key to restaurant
    Category_id: integer("Category_id").notNull().references(() => categoryTable.id, { onDelete: "cascade" }), // Foreign key to category
    Description: varchar("Description", { length: 255 }).notNull(),
    ingredients: varchar("ingredients", { length: 255 }).notNull(),
    active: varchar("active", { length: 255 }).notNull(),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at")
});


//category table
export const categoryTable = pgTable("category", {
    id: serial("id").notNull().primaryKey(),
    name: varchar("name").notNull()
});

// One-to-One relationship between User and Driver
        //user table
export const userTable = pgTable("user", {
    id: serial("id").notNull().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone_number: varchar("phone_number").notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    address_id: integer("address_id").notNull().references(() => addressTable.id, { onDelete: "cascade" }), // Foreign key to address
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at")
});
        //driver table
export const driverTable = pgTable("driver", {
    id: integer("id").primaryKey(),
    car_make: varchar("car_make", { length: 255 }).notNull(),
    car_model: varchar("car_model", { length: 255 }).notNull(),
    car_year: integer("car_year").notNull(),
    user_id: integer("user_id").notNull().references(() => userTable.id, { onDelete: "cascade" }), // Foreign key to user
    online: pgBoolean("online"),
    delivering: pgBoolean("delivering"),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at")
});

// Many-to-Many relationship between Orders and MenuItems
            //order table
export const orderTable = pgTable("order", {
    id: serial("id").notNull().primaryKey(),
    restaurant_id: integer("restaurant_id").notNull().references(() => restaurantTable.ID, { onDelete: "cascade" }), 
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
    delivery_address_id: integer("delivery_address_id").notNull().references(() => addressTable.id, { onDelete: "cascade" }),
    user_id: integer("user_id").notNull().references(() => userTable.id, { onDelete: "cascade" }),
    driver_id: integer("driver_id").notNull().references(() => driverTable.id, { onDelete: "cascade" }), 
    price: integer("price").notNull(),
    Discount: integer("Discount").notNull(),
    final_price: integer("final_price").notNull(),
    Comment: varchar("Comment", { length: 255 }).notNull(),
   
    order_status: varchar("order_status", { length: 255 }).notNull()
});
            //menu item table
export const order_menu_itemTable = pgTable("order_menu_item", {
    id: serial("id").notNull().primaryKey(),
    menu_item_id: integer("menu_item_id").notNull().references(() => menuItemTable.ID, { onDelete: "cascade" }),
    order_id: integer("order_id").notNull().references(() => orderTable.id, { onDelete: "cascade" }), 
    quantity: integer("quantity").notNull(),
    price: integer("price").notNull(),
    comment: varchar("comment", { length: 255 }).notNull()
});

        // restaurant owner table

export const restaurant_ownerTable:any = pgTable("restaurant_owner", {
    id: serial("id").notNull().primaryKey(),
    owner_id: integer("owner_id").notNull().references(() => userTable.id, { onDelete: "cascade" }),
    restaurant_id: integer("restaurant_id").notNull().references(() => restaurantTable.ID, { onDelete: "cascade" }), 
    zip_code: varchar("zip_code", { length: 255 }).notNull()
});
//// address table
export const addressTable = pgTable("address", {
    id: serial("id").notNull().primaryKey(),
    street_address1: varchar("street_address1", { length: 255 }).notNull(),
    street_address2: varchar("street_address2", { length: 255 }).notNull(),
    zip_code: varchar("zip_code", { length: 255 }).notNull(),
    city_id: integer("city_id").notNull().references(() => cityTable.id, { onDelete: "cascade" }),
    delivery_instructions: varchar("delivery_instructions", { length: 255 }).notNull()
});

//order status table
export const order_statusTable = pgTable("order_status", {
    id: serial("id").notNull().primaryKey(),
    order_id: integer("order_id").notNull().references(() => orderTable.id, { onDelete: "cascade" }), 
    stats_catalogue_id: integer("stats_catalogue_id").notNull().references(() => stats_catalogueTable.id, { onDelete: "cascade" }), 
    createdAt: timestamp("created_at")
});
        //stats catalogue table 

export const stats_catalogueTable = pgTable("stats_catalogue", {
    id: serial("id").notNull().primaryKey(),
    name: varchar("name", { length: 255 }).notNull()
});
        //comment table
export const commentTable = pgTable("comment", {
    id: serial("id").notNull().primaryKey(),
    order_id: integer("order_id").notNull().references(() => orderTable.id, { onDelete: "cascade" }), // Foreign key to order
    user_id: integer("user_id").notNull().references(() => userTable.id, { onDelete: "cascade" }), // Foreign key to user
    comment_text: varchar("comment_text", { length: 255 }).notNull(),
    is_complaint: pgBoolean("is_complaint"),
    is_praise: pgBoolean("is_praise"),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at")
});
export type TIuser = typeof userTable.$inferInsert;
export type TSuser = typeof userTable.$inferInsert;
export type TIcity = typeof userTable.$inferInsert;
export type TScity = typeof userTable.$inferInsert;
export type TIrestaurant = typeof userTable.$inferInsert;
export type TSrestaurant = typeof userTable.$inferInsert;
export type TImenu_item = typeof userTable.$inferInsert;
export type TSmenu_item = typeof userTable.$inferInsert;
export type TIcategory = typeof userTable.$inferInsert;
export type TScategory = typeof userTable.$inferInsert;
export type TIstate = typeof userTable.$inferInsert;
export type TSstate = typeof userTable.$inferInsert;
export type TIrestaurant_owner = typeof userTable.$inferInsert;
export type TSrestaurant_owner = typeof userTable.$inferInsert;
export type TIaddress = typeof userTable.$inferInsert;
export type TSaddress = typeof userTable.$inferInsert;
export type TIorder_menu_item = typeof userTable.$inferInsert;
export type TSorder_menu_item = typeof userTable.$inferInsert;
export type TIorder = typeof userTable.$inferInsert;
export type TSorder = typeof userTable.$inferInsert;
export type TIdriver = typeof userTable.$inferInsert;
export type TSdriver = typeof userTable.$inferInsert;
export type TIorder_status = typeof userTable.$inferInsert;
export type TSorder_status = typeof userTable.$inferInsert;
export type TIstats_catalogue = typeof userTable.$inferInsert;
export type TSstats_catalogue = typeof userTable.$inferInsert;
export type TIcomment = typeof userTable.$inferInsert;
export type TScomment = typeof userTable.$inferInsert;

//one-many relations



    //driver order relations
    // export const driver_order_relations = relations(driverTable, ({many})=>({
    //     orders:many(orderTable)
    // }))
   
     //1-1 relations
   
    
    //order user relations
    export const order_user_relations = relations(orderTable, ({one})=>({
        user:one(userTable, {
            fields:[orderTable.user_id],
            references:[userTable.id]
        }),

    }))
    //order restaurant relations
    export const order_restaurant_relations = relations(orderTable, ({one})=>({
        restaurant:one(restaurantTable, {
            fields:[orderTable.restaurant_id],
            references:[restaurantTable.ID]
        }),
        deliver_to:one(addressTable, {
            fields:[orderTable.delivery_address_id],
            references:[addressTable.id]
        }),
        ordered_by:one(userTable, {
            fields:[orderTable.user_id],
            references:[userTable.id]
        }),
        delivered_by:one(driverTable, {
            fields:[orderTable.driver_id],
            references:[driverTable.id]
        }),

    }))
    //user comment relations
    export const user_comment_relations = relations(userTable, ({one})=>({
        comments:one(commentTable, {
            fields:[userTable.id],
            references:[commentTable.user_id]
        }),
        regarding:one(orderTable, {
            fields:[userTable.id],
            references:[orderTable.user_id]
        })
       

    }))
    //order comment relations
    export const order_comment_relations = relations(orderTable, ({one})=>({
        comments:one(commentTable, {
            fields:[orderTable.id],
            references:[commentTable.order_id]
        })
    }))
    //order status relations
    export const order_status_relations = relations(orderTable, ({one})=>({
        status:one(order_statusTable, {
            fields:[orderTable.id],
            references:[order_statusTable.order_id]
        })
    }))    //order status catalogue relations
    export const order_status_catalogue_relations = relations(order_statusTable, ({one})=>({
        status:one(stats_catalogueTable, {
            fields:[order_statusTable.stats_catalogue_id],
            references:[stats_catalogueTable.id]
        })
    }))
   
    //order menu item relations
    export const order_menu_item_relations = relations(orderTable, ({one})=>({
        items:one(order_menu_itemTable, {
            fields:[orderTable.id],
            references:[order_menu_itemTable.order_id]
        })
    }))

   // order menu item relations

    export const menu_item_order_relations = relations(menuItemTable, ({one})=>({
        orders:one(order_menu_itemTable, {
            fields:[menuItemTable.ID],
            references:[order_menu_itemTable.menu_item_id]
        })
    }))

    export const restaurant_owner_relations = relations(restaurantTable, ({one})=>({
        owner:one(restaurant_ownerTable, {  // means restaurant has one owner
            fields:[restaurantTable.ID], 
            references:[restaurant_ownerTable.restaurant_id]  // references the restaurant id
        })

    }))




  

