CREATE TABLE IF NOT EXISTS unit_providers (
    id serial PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    contact_person_name VARCHAR NOT NULL,
    telephone_number VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);CREATE TABLE IF NOT EXISTS unit_locations (
    id serial PRIMARY KEY,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255) NOT NULL,
    city_or_town VARCHAR(255) NOT NULL,
    zip_code VARCHAR(255) NOT NULL, 
    provider_id INT REFERENCES unit_providers(id) NOT NULL
);CREATE TABLE IF NOT EXISTS unit_blocks (
    id serial PRIMARY KEY,
    block_name VARCHAR(255) NOT NULL,
    location_id INT REFERENCES unit_locations(id) NOT NULL
);CREATE TABLE IF NOT EXISTS units (
    id serial PRIMARY KEY,
    name VARCHAR(225) NOT NULL,
    status VARCHAR(10) NOT NULL,
    block_id INT REFERENCES unit_blocks(id),
    type_id INT REFERENCES unit_types(id)
);CREATE TABLE IF NOT EXISTS unit_types (
    id serial PRIMARY KEY,
    type varchar(225) NOT NULL,
    unit_length INT NOT NULL,
    unit_width INT NOT NULL ,
    unit_height INT NOT NULL
);CREATE TABLE IF NOT EXISTS customer_units (
    id serial PRIMARY KEY,
    customer_id INT REFERENCES customers(id) NOT NULL,
    unit_id INT REFERENCES units(id) NOT NULL
);CREATE TABLE IF NOT EXISTS customers (
    id serial PRIMARY KEY,
    name VARCHAR(100),
    password VARCHAR(100),
    email VARCHAR(100),
    telephone VARCHAR(100),
    role VARCHAR(10)
);CREATE TABLE IF NOT EXISTS tenants (
    id serial PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    telephone VARCHAR(100)
);


