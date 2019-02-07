const hash = require('js-sha256');
var pg = require('pg')
const connectionString = "postgres://skywalker:max121xam@localhost:5432/storage_service"
const client = new pg.Client(connectionString);
client.connect();
const hashingHelper = require('./crypto')

//__________________________________ business __________________________________:
async function saveBusiness(details) {
    const query = await client.query(`INSERT INTO unit_providers (company_name,contact_person_name,telephone_number,email) 
    VALUES ('${details.business}','${details.username}','${details.telephone}','${details.email}')`);
    return query;
}

async function getAllBusinesses(provider) {
    const businesses = await client.query(`SELECT company_name FROM unit_providers WHERE email=$1`,[provider]);
    return businesses;
}
async function getBusinessId(details) {
    const data = await client.query(`SELECT id FROM unit_providers WHERE company_name = '${details.companyIdName}'`);
    companyId = data.rows[0].id;
    return companyId;
}

//__________________________________ Location __________________________________:
async function saveLocation(details, businessId) {
    const query = await client.query(`INSERT INTO unit_locations (address_line1, address_line2, city_or_town, zip_code, provider_id) 
        VALUES ('${details.addressLine1}','${details.addressLine2}','${details.cityOrTown}','${details.zipCode}','${businessId}')`);
    return details;
}
async function getAllLocations(provider) {
    var providerId =  await client.query(`SELECT id FROM unit_providers WHERE email=$1;`,[provider]);
    var locations = await client.query(`SELECT * FROM unit_locations WHERE provider_id=$1`,[providerId.rows[0].id]);
    return locations;
}
async function fetchLocationId(details) {
    var loc = details.location.split(', ')
    var data = await client.query('SELECT id FROM unit_locations WHERE address_line1=$1 AND address_line2=$2 AND city_or_town=$3 AND zip_code=$4', [loc[0], loc[1], loc[2], loc[3]]);
    return data.rows[0].id;
}

// __________________________________ block __________________________________:
async function saveBlock(details, locId) {
    await client.query(`INSERT INTO unit_blocks (block_name,location_id) 
    VALUES ('${details.blockName}','${locId}')`);
    // return query;
}
async function getAllBlocks() {

    const blocks = await client.query(`SELECT id,block_name FROM unit_blocks;`);
    return blocks.rows
}

// __________________________________ unit_types __________________________________:
async function saveTypes(unitType, length, height, width) {

    const query = await client.query(`INSERT INTO unit_types (type,unit_length,unit_height,unit_width) 
    VALUES ($1,$2,$3,$4)`, [unitType, length, height, width]);
    return query;
}

async function getAllTypesOfUnits() {
    const unitTypes = await client.query(`SELECT * FROM unit_types;`);
    return unitTypes.rows;
}

// ___________________________________ Units ________________________________________:
async function saveUnits(unitName, blockId, typeId) {

    const query = await client.query(`INSERT INTO units ( name,block_id,type_id,status) 
    VALUES ($1,$2,$3,$4)`, [unitName, blockId, typeId, 'available']);
    return query;
}
function cb(response) {
    console.log('response:', response)
}
//____________________________________customers_______________________________
async function saveCustomer(details) {
    var password = details.password
    var query = {};
    try {
        var encrypt = await hashingHelper.hashPassword(password)
        console.log('pswd:', encrypt);
        query = await client.query(`INSERT INTO customers (name, password, email, telephone,role) 
        VALUES ('${details.username}','${encrypt.hash}','${details.email}','${details.telephone}','${details.role}')`);
        if (details.role === 'business') {
            await saveBusiness(details)
        } else if (details.role === 'tenant') {
            await client.query(`INSERT INTO tenants (name, email, telephone)
            VALUES ('${details.username}','${details.email}','${details.telephone}')`);

        }
    } catch (error) {
        console.log('error!!', error)
    }

    return query;

}

async function checkIfExits(email) {
    var status = true;
    const finder = await client.query(`SELECT * FROM customers WHERE email=$1`, [email]);
    if (finder.rows.length === 0) {
        status = false;
        return { status }
    }
    return { status, user: finder.rows[0] }
}
async function getAllUnits() {
    const query = await client.query(`SELECT * FROM units`);
    return query;
}
async function getBusinessData(email) {
    console.log('typeof email :', typeof email);
    const query = await client.query(`SELECT unit_providers.id,unit_locations.address_line1,unit_locations.address_line2, unit_locations.city_or_town,
    unit_locations.zip_code, units.id, units.name, units.status, unit_types.type, unit_types.unit_length, 
    unit_types.unit_width, unit_types.unit_height, unit_blocks.block_name
    FROM public.unit_providers, public.unit_locations,public.unit_types, public.units, public.unit_blocks
    WHERE unit_providers.email = $1 AND unit_locations.provider_id=unit_providers.id AND units.type_id = unit_types.id AND units.block_id = unit_blocks.id AND unit_blocks.location_id=unit_locations.id`, [email])
    return query;
}

async function combineAllTables() {
    const query = client.query(`SELECT units.id, units.name, units.status, unit_types.type, unit_types.unit_length, 
        unit_types.unit_width, unit_types.unit_height, unit_blocks.block_name,
         unit_locations.address_line1,unit_locations.address_line2, unit_locations.city_or_town,
         unit_locations.zip_code 
        FROM public.unit_types, public.units, public.unit_blocks, public.unit_locations
        WHERE units.status='available' AND units.type_id = unit_types.id AND units.block_id = unit_blocks.id AND unit_blocks.location_id=unit_locations.id
    
    `);
    return query
}

async function getMyUnits(user) {
    console.log('user :', user);

    try {
        var userId = await client.query(`SELECT customers.id FROM customers WHERE email=$1`, [user.email]);
        console.log('userId :', userId.rows[0].id);
        var unitId = await client.query(`SELECT * FROM public.customer_units WHERE customer_id=${userId.rows[0].id}`);
        console.log('unitId :', unitId.rows);
    } catch (error) {
        console.log('error :', error);
    }
    var units = []
  
    for (const index in unitId.rows) {
        const query = await client.query(`SELECT unit_providers.id,unit_locations.address_line1,unit_locations.address_line2, unit_locations.city_or_town,
        unit_locations.zip_code, units.id, units.name, units.status, unit_types.type, unit_types.unit_length, 
        unit_types.unit_width, unit_types.unit_height, unit_blocks.block_name
        FROM public.unit_providers, public.unit_locations,public.unit_types, public.units, public.unit_blocks
        WHERE units.id = $1 AND unit_locations.provider_id=unit_providers.id AND units.type_id = unit_types.id AND units.block_id = unit_blocks.id AND unit_blocks.location_id=unit_locations.id`,[unitId.rows[index].id])   
        units.push(query.rows[0])
    }
    console.log('units :', units);
    return units;
}

async function updateUnit(id, user) {
    const query = client.query(`UPDATE public.units
    SET status='rented'
    WHERE id=${id.id};
    `).then(res => console.log(res))
        .catch(e => console.log(e))
    var userId = await client.query(`SELECT customers.id FROM customers WHERE email=$1`, [user.email]);
    client.query(`INSERT INTO customer_units (unit_id,customer_id) VALUES  ('${id.id}','${userId.rows[0].id}')`)
}

module.exports = {
    fetchLocationId,
    saveTypes,
    saveBlock,
    saveBusiness,
    saveLocation,
    saveUnits,
    getAllBlocks,
    getAllBusinesses,
    getAllLocations,
    getAllTypesOfUnits,
    getBusinessId,
    saveCustomer,
    checkIfExits,
    getAllUnits,
    combineAllTables,
    updateUnit,
    getBusinessData,
    getMyUnits
}