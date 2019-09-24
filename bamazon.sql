drop database if exists bamazon;

create database bamazon;

use bamazon;

create table products (
    item_id int not null auto_increment,
    product_name varchar(45) null,
    department_name varchar(45) null,
    price decimal(10, 2) null,
    stock_quantity int null,
    primary key(item_id)
 );
 
 insert into products (product_name, department_name, price, stock_quantity) values ("Basketball", "Sports Gear", 39.99, 100), ("Nike Long Sleeve", "Clothing", 40.99, 100);
 insert into products (product_name, department_name, price, stock_quantity) values ("Borderlands 3", "Video Games", 59.99, 50), ("Samsung Smart TV", "Electronics", 450.00, 10);
 insert into products (product_name, department_name, price, stock_quantity) values ("Nerf Gun", "Toys", 29.99, 30), ("Monopoly", "Board Games", 15.99, 20);
 insert into products (product_name, department_name, price, stock_quantity) values ("Iphone 11", "Electronics", 1099.99, 5), ("Lifeproof Phone Case", "Electronics", 99.99, 15);
  insert into products (product_name, department_name, price, stock_quantity) values ("James Charles Pallet", "Make Up", 38.00, 20), ("Nike Leggings", "Clothing", 45.99, 100);


select * from products;

update products set stock_quantity = stock_quantity - 50 where item_id=1;
select * from products;