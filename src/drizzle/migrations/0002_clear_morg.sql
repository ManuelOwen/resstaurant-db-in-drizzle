ALTER TABLE "restaurantTable" DROP CONSTRAINT "restaurantTable_restaurant_owner_id_restaurant_owner_id_fk";
--> statement-breakpoint
ALTER TABLE "restaurantTable" DROP COLUMN IF EXISTS "restaurant_owner_id";