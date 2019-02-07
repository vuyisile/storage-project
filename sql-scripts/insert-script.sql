
-- inserting into unit_providers table
INSERT INTO unit_providers (name,telephone_number,email)
VALUES ('space cube','01129284569','www.spacecube@outlook.com' );

INSERT INTO unit_providers (name,telephone_number,email)
VALUES ('local units','01124682884','www.localunits@gmail.com');

INSERT INTO unit_providers (name,telephone_number,email)
VALUES ('vacuume','0123336483','www.vacuume@linkin.com');


-- inserting into unit_locations
INSERT INTO unit_locations (address,provider_id)
VALUES ('65 Freight Rd, Louwlardia, Midrand, 1682,', 3);

INSERT INTO unit_locations (address,provider_id)
VALUES ('4 Kikuyu Rd, Sunninghill, Sandton, 2157',1 );

INSERT INTO unit_locations (address,provider_id)
VALUES ('William Nicol Drive, Fourways, Sandton, 2191', 2 );


-- inserting data into unit_blocks
INSERT INTO unit_blocks(block_name,location_id)
VALUES ('BL-A',3);
INSERT INTO unit_blocks(block_name,location_id)
VALUES ('BL-B',3);

INSERT INTO unit_blocks(block_name,location_id)
VALUES ('Block-1',2);
INSERT INTO unit_blocks(block_name,location_id)
VALUES ('Block-2',2);

INSERT INTO unit_blocks(block_name,location_id)
VALUES ('Block A',1);
INSERT INTO unit_blocks(block_name,location_id)
VALUES ('Block B',1);




-- inserting data into unit_types

INSERT INTO unit_types(type,unit_length,unit_width,unit_height)
VALUES ('warehouse',40,15,10);

INSERT INTO unit_types(type,unit_length,unit_width,unit_height)
VALUES ('warehouse',20,15,8);

INSERT INTO unit_types(type,unit_length,unit_width,unit_height)
VALUES ('warehouse',50,30,10);

INSERT INTO unit_types(type,unit_length,unit_width,unit_height)
VALUES ('garage',6.7,9,3);

INSERT INTO unit_types(type,unit_length,unit_width,unit_height)
VALUES ('garage',6.7,4.5,3);

INSERT INTO unit_types(type,unit_length,unit_width,unit_height)
VALUES ('garage',6.7,9,3,);

INSERT INTO unit_types(type,unit_length,unit_width,unit_height)
VALUES ('garage',6.7,4.5,3);

INSERT INTO unit_types(type,unit_length,unit_width,unit_height)
VALUES ('garage',6.7,4.5,3);

INSERT INTO unit_types(type,unit_length,unit_width,unit_height)
VALUES ('garage',6.7,11.5,3);

INSERT INTO unit_types(type,unit_length,unit_width,unit_height)
VALUES ('garage',6.7,4.5,3);

INSERT INTO unit_types(type,unit_length,unit_width,unit_height)
VALUES ('garage',6.7,4.5,3);

INSERT INTO unit_types(type,unit_length,unit_width,unit_height)
VALUES ('mini-storage room',4.5,2,3);

INSERT INTO unit_types(type,unit_length,unit_width,unit_height)
VALUES ('mini-storage room',4.5,2,3);

INSERT INTO unit_types(type,unit_length,unit_width,unit_height)
VALUES ('mini-storage room',4.5,2,3);

INSERT INTO unit_types(type,unit_length,unit_width,unit_height)
VALUES ('mini-storage room',4.5,2,3);

INSERT INTO unit_types(type,unit_length,unit_width,unit_height)
VALUES ('mini-storage room',4.5,2,3);



-- inserting data into units

INSERT INTO units(name,type_id,block_id)
VALUES ('garage',11,2);

INSERT INTO units(name,type_id,block_id)
VALUES ('garage',13,2);

INSERT INTO units(name,type_id,block_id)
VALUES ('garage',12,1);

INSERT INTO units(name,type_id,block_id)
VALUES ('garage',15,1);

INSERT INTO units(name,type_id,block_id)
VALUES ('garage',14,1);

INSERT INTO units(name,type_id,block_id)
VALUES ('warehouse',1,3);

INSERT INTO units(name,type_id,block_id)
VALUES ('warehouse',2,4);

INSERT INTO units(name,type_id,block_id)
VALUES ('warehouse',3,3);

INSERT INTO units(name,type_id,block_id)
VALUES ('garage',4,5);

INSERT INTO units(name,type_id,block_id)
VALUES ('garage',5,5);

INSERT INTO units(name,type_id,block_id)
VALUES ('garage',6,5);

INSERT INTO units(name,type_id,block_id)
VALUES ('garage',7,6);

INSERT INTO units(name,type_id,block_id)
VALUES ('garage',8,6);

INSERT INTO units(name,type_id,block_id)
VALUES ('garage',9,6);

INSERT INTO units(name,type_id,block_id)
VALUES ('garage',10,6);
