var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

// Connect string to MySQL
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'dbfinalproject.c1ociyummspu.us-west-1.rds.amazonaws.com',
  user: 'finalProject',
  password: 'starbucks',
  port: '3306',
  database: 'finalProject450'
});

connection.connect(function(err) {
  if (err) {
    console.log("Error Connection to DB" + err);
    return;
  }
  console.log("Connection established...");
});

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/index', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/q1', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'q1.html'));
});

router.get('/q2', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'q2.html'));
});


router.get('/q3', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'q3.html'));
});

router.get('/q4', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'q4.html'));
});

router.get('/q5', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'q5.html'));
});

router.get('/q6', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'q6.html'));
});

router.get('/q7', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'q7.html'));
});

router.get('/q8', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'q8.html'));
});

router.get('/g_map', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'g_map.html'));
});

router.get('/crime', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'crime.html'));
});

// To add a new page, use the templete below
/*
router.get('/routeName', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'fileName.html'));
});
*/

router.post('/dashboard', function(req, res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log(req.body); will show the print result in your terminal

  // req.body contains the json data sent from the loginController
  // e.g. to get username, use req.body.username

  var query = "SELECT county_name FROM finalProject450.Crime LIMIT 5;";
  connection.query(query, function(err, rows, fields) {
    console.log("rows", rows);
    console.log("fields", fields);
    if (err) console.log('insert error: ', err);
    else {
      res.json({
        result: 'success',
        users: rows
      });
    }
  });
});

router.post('/q1/:s', function(req, res) {
  var s = req.params.s;
  var query = "SELECT C.county_name as county, TRUNCATE(C.crime_rate_per_100000,2) as Crime_Rate, "
  + "C.murder AS murder, C.rape AS rape, C.robbery AS robbery, C.assault AS assault "
  + "FROM finalProject450.Crime C WHERE RIGHT(C.county_name, 2) = \"" + s + "\" ORDER BY Crime_Rate";
  console.log(query)
  connection.query(query, function(err, rows, fields) {
    console.log("rows", rows);
    if (err) console.log('insert error: ', err);
    else {
      res.json({
        result: 'success',
        rows: rows
      });
    }
  });
});

router.post('/q2', function(req, res) {

  var query = "SELECT RIGHT(C.county_name, 2) AS State, TRUNCATE(AVG(C.crime_rate_per_100000),2) AS Avg_Crime_Rate, "
  + "TRUNCATE(AVG(C.murder),2) AS murder, TRUNCATE(AVG(C.rape),2) AS rape, TRUNCATE(AVG(C.robbery),2) AS robbery, TRUNCATE(AVG(C.assault),2) AS assult "
  + "FROM finalProject450.Crime C GROUP BY RIGHT(C.county_name, 2) ORDER BY RIGHT(C.county_name, 2);";
  connection.query(query, function(err, rows, fields) {
    console.log("rows", rows);
    console.log("fields", fields);
    if (err) console.log('insert error: ', err);
    else {
      res.json({
        result: 'success',
        regionData: rows
      });
    }
  });
});

router.post('/getQ3', function(req, res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log(req.body); will show the print result in your terminal

  // req.body contains the json data sent from the loginController
  // e.g. to get username, use req.body.username

  var query = "SELECT C.county_name, crime_rate_per_100000, `Median Dom` as dom "
  + "FROM finalProject450.RealEstate H JOIN finalProject450.Crime C ON C.county_name = H.Region "
  + "WHERE `Period End` >= \"9/30/18\" "
  + "ORDER BY `Median Dom` DESC;";
  connection.query(query, function(err, rows, fields) {
    console.log("rows", rows);
    console.log("fields", fields);
    if (err) console.log('insert error: ', err);
    else {
      res.json({
        result: 'success',
        ans: rows
      });
    }
  });
});

router.post('/q4', function(req, res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log(req.body); will show the print result in your terminal

  // req.body contains the json data sent from the loginController
  // e.g. to get username, use req.body.username

  var query = "SELECT C.county_name as county, max(crime_rate_per_100000) as crime_rate, "
  + "max(`Homes Sold`) as homes_sold FROM Crime C JOIN RealEstate R on R.Region=C.county_name "
  + "group by C.county_name order by R.`Homes Sold` DESC;"

  connection.query(query, function(err, rows, fields) {
    console.log("rows", rows);
    console.log("fields", fields);
    if (err) console.log('insert error: ', err);
    else {
      res.json({
        result: 'success',
        rows: rows
      });
    }
  });
});

router.post('/q5', function(req, res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log(req.body); will show the print result in your terminal

  // req.body contains the json data sent from the loginController
  // e.g. to get username, use req.body.username

  var query = "SELECT C.county_name AS neighborhood, TRUNCATE(crime_rate_per_100000,2) AS crime, `Inventory` AS new_listings "
  + "FROM RealEstate H JOIN Crime C ON C.county_name = H.region "
  + "WHERE `Period End` >= \"9/30/18\" "
  + "ORDER BY new_listings DESC;"

  connection.query(query, function(err, rows, fields) {
    console.log("rows", rows);
    console.log("fields", fields);
    if (err) console.log('insert error: ', err);
    else {
      res.json({
        result: 'success',
        rows: rows
      });
    }
  });
});

router.post('/q6/:t/:p/:s', function(req, res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log(req.body); will show the print result in your terminal

  // req.body contains the json data sent from the loginController
  // e.g. to get username, use req.body.username
  var t = req.params.t;
  var p = req.params.p;
  var s = req.params.s;
  // var query = "SELECT C.county_name, `Median Sale Price` AS median_sale_price,"
  // + " crime_rate_per_100000 FROM RealEstate H JOIN Crime C JOIN "
  // + "(SELECT trans.county_name AS county_name FROM TransportationDemographics trans " 
  // + "JOIN State states ON trans.state = states.stateName WHERE states.stateCode = \"" + s + "\" ";

  // if (t == "Driving") {
  //   query = query + "ORDER BY trans.Drive ";
  // } else if (t == "Carpool") {
  //   query = query + "ORDER BY trans.Carpool ";
  // } else if (t == "Bus") {
  //   query = query + "ORDER BY trans.Transit ";
  // } else if (t == "Walk") {
  //   query = query + "ORDER BY trans.Walk ";
  // } else if (t == "Other") {
  //   query = query + "ORDER BY trans.OtherTransp ";
  // }

  // query = query + "DESC LIMIT 100) AS s ON C.county_name = H.region " 
  // + "AND s.county_name = C.county WHERE C.state = \"" + s + "\" AND `Median Sale Price` < " + p + " GROUP BY C.county_name;"
  // console.log(query);

  var query = "SELECT s.county_name, `Median Sale Price` AS median_sale_price,"
  + " crime_rate_per_100000 FROM RealEstate H JOIN Crime C JOIN "
  + "(SELECT * FROM TransportationDemographics trans " 
  + "JOIN State states ON trans.state = states.stateName WHERE states.stateCode = \"" + s + "\" ";

  query = query + "LIMIT 100) AS s ON C.county_name = H.region " 
  + "AND s.county_name = C.county WHERE C.state = \"" + s + "\" AND `Median Sale Price` < " + p + " GROUP BY C.county_name "

  if (t == "Driving") {
    query = query + "ORDER BY s.Drive DESC;";
  } else if (t == "Carpool") {
    query = query + "ORDER BY s.Carpool DESC;";
  } else if (t == "Bus") {
    query = query + "ORDER BY s.Transit DESC;";
  } else if (t == "Walk") {
    query = query + "ORDER BY s.Walk DESC;";
  } else if (t == "Other") {
    query = query + "ORDER BY s.OtherTransp DESC;";
  }

  connection.query(query, function(err, rows, fields) {
    //console.log("rows", rows);
    //console.log("fields", fields);
    if (err) console.log('insert error: ', err);
    else {
      res.json({
        result: 'success',
        rows: rows,
        query: query
      });
    }
  });
});

router.post('/q7/:s', function(req, res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log(req.body); will show the print result in your terminal

  // req.body contains the json data sent from the loginController
  // e.g. to get username, use req.body.username

  var s = req.params.s;
  var query = "SELECT county FROM County WHERE state = \"" + s + "\";"

  connection.query(query, function(err, rows, fields) {
    console.log("rows", rows);
    console.log("fields", fields);
    if (err) console.log('insert error: ', err);
    else {
      res.json({
        result: 'success',
        rows: rows
      });
    }
  });
});

router.post('/q8', function(req, res) {
  // Gender diversity: Absolute difference between proportion < 0.05
  // Racial diversity: Asian >= median, Black >= median, Hispanic >= median, Native >= median
  // Pacific's median was 0, so arbitrarily set it >= 0.01 
  // White's median was too high, 83.6, so arbitrarily set it >= 50
  
  var query = "SELECT distinct(r.County), r.State, TRUNCATE(`Crime Rate`,2) as crime, `Median Sale Price` as price, "
  + "TRUNCATE((Men / (Men + Women)) * 100,2) as Men, TRUNCATE((Women / (Men + Women)) * 100,2) as Women, "
  + "Asian, Black, Hispanic, Native, Pacific, White "
  + "FROM "
  + "(SELECT C.county as County, C.state as State, crime_rate_per_100000 as `Crime Rate`, `Median Sale Price` "
  + "FROM RealEstate R JOIN Crime C ON R.Region = C.county_name WHERE `Period End` >= \"9/30/18\") as r "
  + "INNER JOIN "
  + "(SELECT Men, Women, stateCode as state, county_name as county "
  + "FROM GenderDemographics g JOIN State sc ON g.state = sc.stateName) as Gender "
  + "ON r.State = Gender.state and r.County = Gender.county "
  + "INNER JOIN "
  + "(SELECT Asian, Black, Hispanic, Native, Pacific, White, stateCode as state, county_name as county "
  + "FROM RacialDemographics r JOIN State sc ON r.state = sc.stateName) as Race "
  + "ON r.State = Race.state and r.County = Race.county "
  + "WHERE ABS((Men / (Men + Women)) - (Women/ (Men + Women))) < 0.05 "
  + "and Asian >= 0.6 and Black >= 2 and Hispanic >= 4.1 and Native >= 0.3 and Pacific >= 0.01 and White >= 50;";

  connection.query(query, function(err, rows, fields) {
    console.log("rows", rows);
    console.log("fields", fields);
    if (err) console.log('insert error: ', err);
    else {
      res.json({
        result: 'success',
        rows: rows
      });
    }
  });
});

router.post('/getState', function(req, res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log(req.body); will show the print result in your terminal

  // req.body contains the json data sent from the loginController
  // e.g. to get username, use req.body.username

  var query = "SELECT stateCode FROM State;"

  connection.query(query, function(err, rows, fields) {
    console.log("rows", rows);
    console.log("fields", fields);
    if (err) console.log('insert error: ', err);
    else {
      res.json({
        result: 'success',
        rows: rows
      });
    }
  });
});

router.post('/g_map', function(req, res) {

  var query = "SELECT county_name as county, crime_rate_per_100000 as crime_rate "
  + "FROM finalProject450.Crime;";
  connection.query(query, function(err, rows, fields) {
    console.log("rows", rows);
    console.log("fields", fields);
    if (err) console.log('insert error: ', err);
    else {
      res.json({
        result: 'success',
        rows: rows
      });
    }
  });
});

// template for GET requests
/*
router.get('/routeName/:customParameter', function(req, res) {

  var myData = req.params.customParameter;    // if you have a custom parameter
  var query = '';

  // console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});
*/
module.exports = router;