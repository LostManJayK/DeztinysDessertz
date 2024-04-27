-- Add main menu options
INSERT IGNORE INTO MenuItems(item_name)
VALUES
	('Cakes'),
    ('Cupcakes'),
    ('Dipped Dessertz');
    
-- BUILD CAKE OPTIONS

-- Add cake types
INSERT IGNORE INTO CakeOptions(cake_types)
VALUES
	('Tiered'),
    ('Layered'),
    ('Sheet'),
    ('Cheescake (Baked)'),
    ('Cheesecake (No-Bake)');
    
-- Add cake flavours
INSERT IGNORE INTO CakeOptions(cake_flavours)
VALUES
	('Chocolate'),
    ('Vanilla'),
    ('Angel Food'),
    ('Confetti'),
    ('Other');
    
-- Add filling flavours
INSERT IGNORE INTO CakeOptions(filling_flavours)
VALUES
	('Same as buttercream'),
    ('Ganache'),
    ('Strawberries & Cream'),
    ('Marshmallow Fluff'),
    ('Nutella'),
    ('Cookies & Cream'),
    ('Other');
    
-- BUILD DIPPED DESSERT OPTIONS

-- Add dessert types
INSERT IGNORE INTO DippedDessertzOptions(dessert_types)
VALUES
	('Strawberries'),
    ('Pretzels'),
    ('Dezzy Dotz'),
    ('Cake Pops'),
    ('Marshmallow'),
    ('Oreos');
