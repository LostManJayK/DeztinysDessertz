-- Add main menu options
INSERT INTO MenuItems(item_name)
VALUES
	('Cakes'),
    ('Cupcakes'),
    ('Dipped Dessertz');
    
-- BUILD CAKE OPTIONS

-- Add cake types
INSERT INTO CakeOptions(cake_types)
VALUES
	('Tiered'),
    ('Layered'),
    ('Sheet'),
    ('Cheescake (Baked)'),
    ('Cheesecake (No-Bake)');
    
-- Add cake flavours
INSERT INTO CakeOptions(cake_flavours)
VALUES
	('Chocolate'),
    ('Vanilla'),
    ('Angel Food'),
    ('Confetti'),
    ('Other');
    
-- Add filling flavours
INSERT INTO CakeOptions(filling_flavours)
VALUES
	('Same as buttercream'),
    ('Ganache'),
    ('Strawberries & Cream'),
    ('Marshmallow Fluff'),
    ('Nutella'),
    ('Cookies & Cream'),
    ('Other');
    
-- BUILD SNACK OPTIONS

-- Add snack types
INSERT INTO DippedDessertzOptions(snack_types)
VALUES
	('Strawberries'),
    ('Pretzels'),
    ('Dezzy Dotz'),
    ('Cake Pops'),
    ('Marshmallow'),
    ('Oreos')