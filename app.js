var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
var pg = require('pg')
const ref = require("./ref-functions/functions");
const hash = require('js-sha512');
const crypto = require('./ref-functions/crypto')
const jwt = require('./jwt');
var jsonwebtoken = require("jsonwebtoken");
require('dotenv').config();



const connectionString = process.env.DATABASE_URL;

const client = new pg.Client(connectionString);
client.connect();


app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//_____________________________________passport-jwt_____________________________
const passport = require('passport');
const passportJWT = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy;
// const jwt = require('jsonwebtoken');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

app.use(passport.initialize());
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    var check = await ref.checkIfExits(email);
    if (check.status === true) {
      var verification = await crypto.verifyPassword(password, check.user.password)
      if (verification === true) {
        console.log('You are now logged-In')
        return done(null, check, 'You are now logged-In');
      }
    } else {
      return done(null, false, "Incorrect Email or Password")
    }
  } catch (error) {
    console.log('error :', error);
    return done(error)
  }
}
))



// ____________express-code________________________



app.post('/business', jwt.verifyJWT_MW, async function (req, res) {
  try {
    await ref.saveBusiness(req.body);
    res.sendStatus(201).end()
  } catch (error) {
    res.sendStatus(500).end()
  }
});

app.get('/businesses', jwt.verifyJWT_MW, async function (req, res) {
  var user = jsonwebtoken.decode(req.headers['auth'])
  console.log('user :', user);
  var businesses = await ref.getAllBusinesses(user.email);
  if (businesses) {
    res.send(businesses.rows).status(201).end();
  } else {
    res.status(500).end();
  }
});

app.post('/location', jwt.verifyJWT_MW, async function (req, res) {
  try {
    businessId = await ref.getBusinessId(req.body);
    console.log('req', req.body)
    var save = await ref.saveLocation(req.body, businessId);
    // console.log('save :', save);
    res.sendStatus(201).end()
  } catch (error) {
    console.log('error', error)
    res.sendStatus(500).end()
  }
});

app.get('/locations', jwt.verifyJWT_MW, async function (req, res) {
  var user = jsonwebtoken.decode(req.headers['auth'])
  const locations = await ref.getAllLocations(user.email);
  if (locations) {
    res.send(locations.rows).status(201).end();
  } else {
    res.statusStatus(500).end();
  }
});

app.post('/block', jwt.verifyJWT_MW, async function (req, res) {
  var details = req.body;
  try {
    const locationId = await ref.fetchLocationId(details);
    await ref.saveBlock(details, locationId);
    res.sendStatus(201).end()
  } catch (error) {
    console.log('error', error)
    res.sendStatus(500)
  }
});
app.get('/blocks', jwt.verifyJWT_MW, async function (req, res) {
  var blocks = await ref.getAllBlocks();
  if (blocks) {
    res.send(blocks).status(201).end();
  } else {
    res.statusStatus(500).end();
  }
});

app.post('/type', jwt.verifyJWT_MW, async function (req, res) {
  var details = req.body;
  console.log('details :', details);
  try {
    await ref.saveTypes(details.unitType, details.length, details.height, details.width)
    res.sendStatus(201).end()
  } catch (error) {
    console.log('error', error)
    res.sendStatus(500)
  }

});

app.get('/types', jwt.verifyJWT_MW, async function (req, res) {
  var allTypesOfUnits = await ref.getAllTypesOfUnits();
  if (allTypesOfUnits) {
    res.send(allTypesOfUnits).status(201).end();
  } else {
    res.statusStatus(500).end();
  }
});

app.post('/unit', jwt.verifyJWT_MW, async function (req, res) {
  var details = req.body;
  try {
    console.log('helper function', ref.saveUnits(details.unitName, details.block[0], details.unitType[0]));

    await ref.saveUnits(details.unitName, details.block[0], details.unitType[0]);
    res.sendStatus(201).end()
  } catch (error) {
    console.log('error', error)
    res.sendStatus(500)
  }
});

app.get('/availableUnits', jwt.verifyJWT_MW, async function (req, res) {
  var user = jsonwebtoken.decode(req.headers['auth'])
  var allUnits = await ref.combineAllTables();
  if (allUnits) {
    res.send(allUnits.rows).status(201).end();
  } else {
    res.statusStatus(500).end();
  }
});

app.get('/myUnits', jwt.verifyJWT_MW, async function (req, res) {
  var user = jsonwebtoken.decode(req.headers['auth'])
  if (user.userType === 'business') {
    var userDb = await ref.getBusinessData(user.email)
    console.log('userDb :', userDb);
    if (userDb) {
      res.send(userDb.rows).status(201).end();
    } else {
      res.statusStatus(500).end();
    }
  } else {
    var allUnits = await ref.getMyUnits(user);
    console.log('allUnits :', allUnits);
    if (allUnits) {
      res.send(allUnits).status(201).end();
    } else {
      res.statusStatus(500).end();
    }
  }
});

app.post('/updateUnitStatus', jwt.verifyJWT_MW, async (req, res) => {
  let unit_id = req.body;
  var user = jsonwebtoken.decode(req.headers['auth'])
  try {
    await ref.updateUnit(unit_id, user)
    res.sendStatus(201).end()
  } catch (error) {
    console.log('error', error)
    res.sendStatus(500)
  }
})


app.post('/signup', async function (req, res) {
  var details = req.body
  try {
    var check = await ref.checkIfExits(details.email);
    console.log({ check })
    if (check.status === false) {
      await ref.saveCustomer(details);
      res.sendStatus(201).end()
    }
    // res.sendStatus(200)
  } catch (error) {
    console.log('error', error)
    res.sendStatus(500)
  }
})

app.post('/login', async function (req, res) {
  passport.authenticate('local', (err, data, message) => {
    if (data === false) {
      res.status(204).end();
    } else if (err) {
      res.status(204).end();
    }
    req.login(data, () => {
      var userDetails = { userName: data.user.name, email: data.user.email, telephone: data.user.telephone, userType: data.user.role }
      const token = jwt.generateToken(userDetails);
      // console.log('token :', token);
      res.json({ message, token }).status(202).end();
    });
  })(req, res);
})

app.get('/logout', function (req, res) {
  console.log('req.user :', req.user);
  req.logout()
  res.redirect('/')
})


app.listen(3001)