-- selecting data from unit_providers table
SELECT * FROM unit_providers;

-- selecting data from unit_locations table
SELECT * FROM unit_locations;

-- selecting data from unit_blocks table
SELECT * FROM unit_blocks;

-- selecting data from unit_types table
SELECT * FROM unit_types;

-- selecting data from units table
SELECT * FROM units;

-- selecting all unit_types where type is 'garage'
SELECT * FROM unit_types WHERE type = 'garage';

-- selecting all unit_types where width > 3m
SELECT * FROM unit_types WHERE unit_width > 3;

-- selecting all units for a business
