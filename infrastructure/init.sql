create schema `product-scrapping-service`;

create table `product-scrapping-service`.product (id int not null,
                            amazon_id varchar(255) not null,
                            price double,
                            last_update datetime,
                        PRIMARY KEY (id));

INSERT INTO `product-scrapping-service`.product (id, amazon_id, price, last_update) VALUES (1, 'B08HK3STN4', null, null);