var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

const database = require('./database');
const backend = require('./backend');

var app = express();

// app.get('/',(req,res,next) => {
//   res.json({  hello: 'world' });
// });

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// reset Table
// app.get('/reset2', function(req, res) {
//   database.resetTable2(function(error, result) {
//       if (error) { 
//           console.log(error);
//           return res.json({error: error});
//       }
//       return res.json({ success: true });
//   });
// });

// app.get('/reset3', function(req, res) {
//   database.resetTable3(function(error, result) {
//       if (error) { 
//           console.log(error);
//           return res.json({error: error});
//       }
//       return res.json({ success: true });
//   });
// });

app.get('/', (req, res, next) => {
  return res.json({
      message: "Welcome to JiBaBoom - <SupEr>",
      availableEndpoints: [
           'POST /basic/insert { "data": [ {"meetingid":"1110000001","availabilityid":"1000000001","participantid":"1100000001","starttime":"1000","endtime":"1045"},{"meetingid":"1110000001","availabilityid":"1000000002","participantid":"1100000001","starttime":"1030","endtime":"1100"},{"meetingid":"1110000001","availabilityid":"1000000003","participantid":"1100000002","starttime":"1030","endtime":"1115"},{"meetingid":"1110000001","availabilityid":"1000000004","participantid":"1100000002","starttime":"1100","endtime":"1130"},{"meetingid":"1110000002","availabilityid":"1000000005","participantid":"1100000001","starttime":"1000","endtime":"1100"},{"meetingid":"1110000002","availabilityid":"1000000006","participantid":"1100000002","starttime":"1100","endtime":"1200"},{"meetingid":"1110000002","availabilityid":"1000000007","participantid":"1100000003","starttime":"1200","endtime":"1300"},{"meetingid":"1110000003","availabilityid":"1000000008","participantid":"1100000004","starttime":"1000","endtime":"1100"},{"meetingid":"1110000003","availabilityid":"1000000009","participantid":"1100000005","starttime":"1045","endtime":"1230"},{"meetingid":"1110000003","availabilityid":"1000000010","participantid":"1100000006","starttime":"1030","endtime":"1200"},{"meetingid":"1110000003","availabilityid":"1000000011","participantid":"1100000007","starttime":"1100","endtime":"1500"},{"meetingid":"1110000004","availabilityid":"1000000012","participantid":"1100000008","starttime":"1000","endtime":"1100"},{"meetingid":"1110000004","availabilityid":"1000000013","participantid":"1100000009","starttime":"1045","endtime":"1230"},{"meetingid":"1110000004","availabilityid":"1000000014","participantid":"1100000010","starttime":"1030","endtime":"1200"},{"meetingid":"1110000004","availabilityid":"1000000015","participantid":"1100000011","starttime":"1100","endtime":"1500"},{"meetingid":"1110000004","availabilityid":"1000000016","participantid":"1100000012","starttime":"1600","endtime":"1700"} ] }',
           'POST /advance/insert { "data": [ {"meetingid":"1110000001","unavailabilityid":"1000000001","participantid":"1100000001","starttime":"1000","endtime":"1045"},{"meetingid":"1110000001","unavailabilityid":"1000000002","participantid":"1100000001","starttime":"1030","endtime":"1100"},{"meetingid":"1110000001","unavailabilityid":"1000000003","participantid":"1100000002","starttime":"1030","endtime":"1115"},{"meetingid":"1110000001","unavailabilityid":"1000000004","participantid":"1100000002","starttime":"1100","endtime":"1130"},{"meetingid":"1110000002","unavailabilityid":"1000000005","participantid":"1100000001","starttime":"1000","endtime":"1100"},{"meetingid":"1110000002","unavailabilityid":"1000000006","participantid":"1100000002","starttime":"1100","endtime":"1200"},{"meetingid":"1110000002","unavailabilityid":"1000000007","participantid":"1100000003","starttime":"1200","endtime":"1300"},{"meetingid":"1110000003","unavailabilityid":"1000000008","participantid":"1100000004","starttime":"1000","endtime":"1100"},{"meetingid":"1110000003","unavailabilityid":"1000000009","participantid":"1100000005","starttime":"1045","endtime":"1230"},{"meetingid":"1110000003","unavailabilityid":"1000000010","participantid":"1100000006","starttime":"1030","endtime":"1200"},{"meetingid":"1110000003","unavailabilityid":"1000000011","participantid":"1100000007","starttime":"1100","endtime":"1500"},{"meetingid":"1110000004","unavailabilityid":"1000000012","participantid":"1100000008","starttime":"1000","endtime":"1100"},{"meetingid":"1110000004","unavailabilityid":"1000000013","participantid":"1100000009","starttime":"1045","endtime":"1230"},{"meetingid":"1110000004","unavailabilityid":"1000000014","participantid":"1100000010","starttime":"1030","endtime":"1200"},{"meetingid":"1110000004","unavailabilityid":"1000000015","participantid":"1100000011","starttime":"1100","endtime":"1500"},{"meetingid":"1110000004","unavailabilityid":"1000000016","participantid":"1100000012","starttime":"1600","endtime":"1700"} ] }',
           'GET /basic/result?meetingId=1110000001',
           'GET /basic/result?meetingId=1110000002',
           'GET /basic/result?meetingId=1110000003',
           'GET /basic/result?meetingId=1110000004',
           'GET /advance/result?meetingId=1110000001&fromTime=1000&toTime=1200',
           'GET /advance/result?meetingId=1110000002&fromTime=1000&toTime=1300',
           'GET /advance/result?meetingId=1110000003&fromTime=1000&toTime=1200',
           'GET /advance/result?meetingId=1110000004&fromTime=1000&toTime=1700',
      ]
  });
});

app.get('/reset', function(req, res) {
  database.resetTableBoth(function(error, result) {
      if (error) { 
          console.log(error);
          return res.json({error: error});
      }
      return res.json({ success: true });
  });
});

app.post('/basic/insert', function(req, res, next) {
  const { data } = req.body;
  database.insertMeetingInfo(data, (error, result) => {
    if (error) {
      return next(error);
    }
    res.json({"result": "success"});
  });
});
app.post('/advance/insert', function(req, res, next) {
  const { data } = req.body;
  database.insertMeetingInfoUnavailabilities(data, (error, result) => {
    if (error) {
      return next(error);
    }
    res.json({"result": "success"});
  });
});



/* app.get('/basic/data', function (req, res, next) {
  const { countryId, value__gt, page, pageSize } = req.query;
  database.getCoins(countryId, value__gt, page, pageSize, (error, result) => {
      if (error) {
        return next(error);
      }
      
      else{

      res.json(result);
      }
  });
}); */

app.get('/basic/data', function (req, res, next) {
  const { participantId, meetingId, page, pageSize } = req.query;
  database.getMeetingInfo(participantId, meetingId, page, pageSize, (error, result) => {
      if (error) {
        
        return next(error);
      } else {

        res.json(result);
        }
  });
});
app.get('/advance/data', function (req, res, next) {
  const { participantId, meetingId, page, pageSize } = req.query;
  database.getMeetingInfoUnavailability(participantId, meetingId, page, pageSize, (error, result) => {
      if (error) {
        
        return next(error);
      } else {

          res.json(result);
        }
  });
});
// app.get('/basic/result', function (req, res, next) {
//   const { meetingId } = req.query;
//   database.getAvailabilitiesForComputation(meetingId, (error, result) => {
//       if (error) {
        
//         return next(error);
//       }
    
      
//        else{

//       res.json(backend.computing(result));
//       } 
//   });
// });


// Basic Result API
app.get('/basic/result', function (req, res, next) {
  const { meetingId } = req.query;
    if (!meetingId) { 
     return next (error); 
     //res.status(500).end();
     //res.status = 500;
     //res.send(`{"Result":"meetingId not found"}`);
    }
  // check if meetingId exists if(!meetingId).... return next (error); 
  database.getAvailabilitiesForComputation(meetingId, (error, result) => {
      if (result == '') { 
        return next (error); 
        // res.status(500).end();
        // res.status = 500;
        // res.send(`{"Result":"Result not found"}`);
      }
      else if (error) { 
        return next (error); 
      }
      // check if result is an empty list if yes, return next (error); 
      const { error: computationError, result: computationResult } = backend.computing(result);
      //if (computationError) return next(computationError);
      return res.json({
        result: computationResult
      });
  });
});

/* app.get('/basic/result', function (req, res, next) {
  const { countryId, amount } = req.query;
  database.getCoinsForComputation(countryId, (error, result) => {
      if (error) return next (error);
      const { error: computationError, result: computationResult } = backend.compute(result, amount);
      if (computationError) return next(computationError);
      return res.json({
        result: computationResult,
      });
  });
}); */
app.get('/advance/result', function (req, res, next) {
  const { meetingId, fromTime, toTime } = req.query;
  database.getUnavailabilitiesForComputation(meetingId, fromTime, toTime, (error, result) => {
    
      // if (error) { 
      //   return next (error); 
      // }
      if (!meetingId){
        return next (error);
      }
      else if (result == '') {
        return next (error);
      }
      if (meetingId == null){
        return res.json({
          error: "meetingId is undefined"
        });
      };
      if (fromTime == null){
        return res.json({
          error: "fromTime is undefined"
        });
      };
      if (toTime == null){
        return res.json({
          error: "toTime is undefined"
        });
      };
    // check if result is an empty list if yes, return next (error); 
    // if (!result.meetingId) { 
    //    return next (error); 
    // }
    if (!result) { 
      return next(error);
   }
  
   
      const { error: computationError, result: computationResult } = backend.computingAdvanced(result,fromTime,toTime);
      console.log(computationResult)
      toTimeReal = computationResult.toTime;
      if (computationResult.toTime > toTime) {
        computationResult.toTime = toTime;
      };
      if (computationResult.fromTime < fromTime) {
        computationResult.fromTime = fromTime;
      };
      //if (computationError) return next(computationError);
      return res.json({
        result: computationResult
      });
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    error: err.message,
    code: err.status || 500,
  });
});

module.exports = app;


/* app.post('/basic/insert', function(req, res, next) {
  const { data } = req.body;
  database.insertMeetingInfo(data, (error, result) => {
    
    if(typeof participantId != 'bigint'){
      return next(error);
    }
    else if(typeof meetingId != 'bigint'){
      return next(error);
    }
    else if (error) {
      return next(error);
    }
    res.json({"result": "success"});
  });
}); */



/*
app.get('/basic/data', function (req, res, next) {
    const { countryId, value__gt, page, pageSize } = req.query;
    database.getCoins(countryId, value__gt, page, pageSize, (error, result) => {
        if (error) {
          return next(error);
        }
        res.json(result);
    });
});
*/