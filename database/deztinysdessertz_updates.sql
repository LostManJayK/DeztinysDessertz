USE DeztinysDessertzDB;

-- Change the contact column in orders table to cutomer_email and customer_phone
ALTER TABLE Orders
	DROP COLUMN contact,
	ADD COLUMN customer_email VARCHAR(50) NOT NULL,
	ADD COLUMN customer_phone VARCHAR(14),
    ADD COLUMN time_fulfilled TIME,
    ADD COLUMN order_contents JSON,
    MODIFY COLUMN customer_id INT UNSIGNED NULL,
    AUTO_INCREMENT = 19;
    
