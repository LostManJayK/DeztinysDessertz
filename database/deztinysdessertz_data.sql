USE DeztinysDessertzDB;

-- Add main menu options
INSERT IGNORE INTO MenuItems(item_name)
VALUES
('Cakes'),
('Cupcakes'),
('Dipped Dessertz'),
('Other Dessertz'),
('Something else?');


-- OPTIONS TABLES

-- Cake Types
INSERT IGNORE INTO CakeTypes(type_name)
VALUES
('Tiered'),
('Layered'),
('Sheet'),
('No-Bake Cheesecake'),
('Baked Cheesecake');

-- Cake Tiers
INSERT IGNORE INTO CakeTiers(tier_vals)
VALUES
('2'),
('3'),
('4');

-- Cake Layers
INSERT IGNORE INTO CakeLayers(layer_vals)
VALUES
('1'),
('2'),
('3'),
('4'),
('5'),
('6');

-- Cake Flavours
INSERT IGNORE INTO CakeFlavours(flavour_name)
VALUES
('Chocolate'),
('Vanilla'),
('Red Velvet'),
('Angel Food'),
('Other');

-- Cake Fillings
INSERT IGNORE INTO CakeFillings(filling_name)
VALUES
('None'),
('Ganache'),
('Strawberry'),
('Boston Cream'),
('Marshmallow'),
('Other');

-- Cake Shapes
INSERT IGNORE INTO CakeShapes(shape_name)
VALUES
('Circle'),
('Square'),
('Heart'),
('Other');

-- Cake Sizes
INSERT IGNORE INTO CakeSizes(size)
VALUES
(4),
(6),
(8);

-- Cupcake Quantities
INSERT IGNORE INTO CupcakeQuantities(quantity)
VALUES
	(6),
	(12),
	(18),
	(24),
	(36),
	(48);
	
-- Dipped Desert Types
INSERT IGNORE INTO DippedDessertTypes(type_name)
VALUES
	('Dezzy Dotz'),
	('Cake Pops'),
	('Pretzels'),
	('Almonds'),
	('Peanuts'),
	('Mixed Nuts'),
	('Strawberries'),
	('Grapes'),
	('Mangoes'),
	('Banana'),
	('Apple'),
	('Other');
	
-- Dipped Dessert Quantities
INSERT IGNORE INTO DippedDessertQuantities(quantity)
VALUES
('5'),
('10'),
('20'),
('40');
	
-- Coatings
INSERT IGNORE INTO Coatings(coating_name)
VALUES
('Dark Chocolate'),
('Milk Chocolate'),
('Vanilla Yogurt'),
('Strawberry Yogurt'),
('Caramel'),
('Candy');
	
-- Other Dessert Types
INSERT IGNORE INTO OtherDessertTypes(type_name)
VALUES
	('Cake Cups'),
    ('Cheesecake Cups');
    
-- Other Dessert Quantities
INSERT IGNORE INTO OtherDessertQuantities(quantity)
VALUES
	('5'),
	('10'),
	('20'),
	('40');
    
-- Options Tables

INSERT IGNORE INTO CakeOptions(option_name, option_id, option_list)
VALUES
	('Cake Type', 'cake_type', 'CakeTypes'),
    ('Tiers', 'num_tiers', 'CakeTiers'),
    ('Layers per Tier', 'num_layers', 'CakeLayers'),
    ('Cake Flavour', 'cake_flavour', 'CakeFlavours'),
    ('Filling', 'cake_filling', 'CakeFillings'),
    ('Size', 'cake_size', 'CakeSizes'),
    ('Shape', 'cake_shape', 'CakeShapes');
    
INSERT IGNORE INTO CupcakeOptions(option_name, option_id, option_list)
VALUES
	('Cupcake Flavour', 'cupcake_flavour', 'CakeFlavours'),
    ('Filling', 'cupcake_filling', 'CakeFillings'),
    ('Quantity', 'num_cupcakes', 'CupcakeQuantities');
    
INSERT IGNORE INTO DippedDessertOptions(option_name, option_id, option_list)
VALUES
	('Dessert Type', 'dipped_dessert_type', 'DippedDessertTypes'),
    ('Coating', 'dipped_dessert_coating', 'Coatings'),
    ('Quantity', 'num_dipped_desserts', 'DippedDessertQuantities');
    
INSERT IGNORE INTO OtherDessertOptions(option_name, option_id, option_list)
VALUES
	('Dessert Type', 'other_dessert_type', 'OtherDessertTypes'),
    ('Quantity', 'num_other_desserts', 'OtherDessertQuantities');
    
INSERT IGNORE INTO RequestOptions(option_name, option_id)
VALUES
	('Dessert Name', 'request_name');
    
	

	