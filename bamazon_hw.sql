CREATE DATABASE IF NOT EXISTS bamazon_cust_db;

USE bamazon_cust_db;

CREATE TABLE IF NOT EXISTS bamazon_store(
id INTEGER(11) AUTO_INCREMENT NOT NULL,
product VARCHAR(50),
department VARCHAR(50),
price DECIMAL(5,2),
quantity INTEGER(11),
PRIMARY KEY(id)
);


SELECT * FROM bamazon_store;
INSERT INTO bamazon_store
(product,department,price,quantity)
VALUES
('Samsung Galaxy S8+','Electronics',799.00,10),
('SoftLips Lip Balm', 'Health & Beauty',18.77,20),
('Mountain Dew','Food & Beverages',5.99,200),
('Bamazon Reverb','Electronics',150.00,50),
('Javascript for Dummies','Books & Textbooks',39.99,100),
('Sheepskin Leather Jacket','Clothing & Apparel',199.00,5),
('Power Block Dumbbells','Sports &  Outdoors',780.00,3),
('Seagull Entourage','Musical Instruments',349.00,15),
('Quest Longboard','Sports & Outdoors',69.00,300),
('MuscleGen Medical Grade Protein',36.79,250),
('WD40','Automotive Parts & Accessories',7.78,1000),
('Thus Spoke Zarathustra','Books & Textbooks',20.99,600);
