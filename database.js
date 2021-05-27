const { Client } = require('pg');
const CONNECTION_STRING = "postgres://rtymzqdy:yZ13bO0Q4V7di8BSpkqScWlcF41C4Rez@john.db.elephantsql.com:5432/rtymzqdy";
function connect() {
    const client = new Client({
        connectionString: CONNECTION_STRING,
      })
      client.connect();
      return client;
}

/* function resetTable() {
    const client = connect();
    const query = `
        DROP TABLE IF EXISTS coin;
        CREATE TABLE coin (
            id SERIAL PRIMARY KEY,
            coin_id INTEGER UNIQUE,
            country_id INTEGER,
            value INTEGER
        );
    `;
    client.query(query, (err, res) => {
        console.log(err, res)
        client.end()
      })
} */

function resetTableBoth(callback) {
    const client = connect();
    const query = `
    DROP TABLE IF EXISTS meetingInfo;
    CREATE TABLE meetingInfo(
    meetingId BIGINT NOT NULL,
    availabilityId BIGINT PRIMARY KEY NOT NULL UNIQUE,
    participantId BIGINT NOT NULL,
    startTime CHAR(4) NOT NULL,
    endTime CHAR(4) NOT NULL
   );
    DROP TABLE IF EXISTS meetingInfoUnavailability;
    CREATE TABLE meetingInfoUnavailability(
    meetingId BIGINT NOT NULL,
    unavailabilityId BIGINT PRIMARY KEY NOT NULL UNIQUE,
    participantId BIGINT NOT NULL,
    startTime CHAR(4) NOT NULL,
    endTime CHAR(4) NOT NULL
    );
    `;
    client.query(query, (err, res) => {
        console.log(err, res);
        client.end();
        callback(err,res);
      });
};

// function resetTable2() {
//     const client = connect();
//     const query = `
//     DROP TABLE IF EXISTS meetingInfo;
//     CREATE TABLE meetingInfo(
//     meetingId BIGINT NOT NULL,
//     availabilityId BIGINT PRIMARY KEY NOT NULL UNIQUE,
//     participantId BIGINT NOT NULL,
//     startTime CHAR(4) NOT NULL,
//     endTime CHAR(4) NOT NULL
//    )
//     `;
//     client.query(query, (err, res) => {
//         console.log(err, res)
//         client.end()
//       })
// }

// function resetTable3() {
//     const client = connect();
//     const query = `
//     DROP TABLE IF EXISTS meetingInfo;
//     CREATE TABLE meetingInfo(
//     meetingId BIGINT NOT NULL,
//     unavailabilityId BIGINT PRIMARY KEY NOT NULL UNIQUE,
//     participantId BIGINT NOT NULL,
//     startTime CHAR(4) NOT NULL,
//     endTime CHAR(4) NOT NULL
//    )
//     `;
//     client.query(query, (err, res) => {
//         console.log(err, res)
//         client.end()
//       })
// }

/* function insertCoins(coins, callback) {
    let i = 1;
    const template = coins.map((coin) => `($${i++}, $${i++}, $${i++})`).join(',');
    const values = coins.reduce((reduced, coin) => [...reduced, coin.coinId, coin.countryId, coin.value],[]);
    const query = `INSERT INTO coin (coin_id, country_id, value) VALUES ${template};`;
}
 */
function insertMeetingInfo(coins, callback) {
    let i = 1;
    const template = coins.map((meetingInfo) => `($${i++}, $${i++}, $${i++}, $${i++}, $${i++})`).join(',');
    const values = coins.reduce((reduced, meetingInfo) => [...reduced, meetingInfo.meetingId, meetingInfo.availabilityId, meetingInfo.participantId, meetingInfo.startTime, meetingInfo.endTime], []);
    const query = `INSERT INTO meetingInfo (meetingId, availabilityId, participantId, startTime, endTime) VALUES ${template};`;
    console.log(query);
    console.log(values);
    const client = connect();
    console.log(values, query);
    client.query(query, values, (err, result) => {
        callback(err, result);
        client.end();
    });
};

function insertMeetingInfoUnavailabilities(coins, callback) {
    let i = 1;
    const template = coins.map((meetingInfoUnavailability) => `($${i++}, $${i++}, $${i++}, $${i++}, $${i++})`).join(',');
    const values = coins.reduce((reduced, meetingInfoUnavailability) => [...reduced, meetingInfoUnavailability.meetingId, meetingInfoUnavailability.unavailabilityId, meetingInfoUnavailability.participantId, meetingInfoUnavailability.startTime, meetingInfoUnavailability.endTime], []);
    const query = `INSERT INTO meetingInfoUnavailability (meetingId, unavailabilityId, participantId, startTime, endTime) VALUES ${template};`;
    console.log(query);
    console.log(values);
    const client = connect();
    console.log(values, query);
    client.query(query, values, (err, result) => {
        callback(err, result);
        client.end();
    });
};

/* function compute(coins, amount) {
    try {
        return { error : null, result: coinChange(coins, parseInt(amount)) };
    } catch (error) {
        return { error, result: null};
    }
} */
function compute(meetingId, duration) {
    try {
        return { error : null, result: coinChange(meetingId, parseInt(duration)) };
    } catch (error) {
        return { error, result: null};
    }
};
    /* function coinChange(coinsObj, amount) {
        const coinReq = new Array(amount + 1).fill(null).map((_) => []);
        // console.log(coinReq);
        // [[], [], [], [], [], ..., []] if amount is 10, then I will have 11 empty arrays
        const coins = coinsObj.map(({ value }) => parseInt(value));
        // console.log(coins);
        // coins := [{ coinId: 10 digit number, countryId: 10 digit number, value: number }]
        const l = coins.length;
        for (let amt = 1; amt <= amount; amt++) { // iterate through 1 to amount; all the amounts
            for (let j = 0; j < l; j++) { // iterate through each of the coins for each amount
                if (coins[j] <= amt) {
                    if (coinReq[amt].length === 0 || coinReq[amt - coins[j]].length + 1 < coinReq[amt].length) {
                        // console.log(coinReq[amt - coins[j]]);
                        coinReq[amt] = [...coinReq[amt - coins[j]], coins[j]];
                    }
                }
            }
        } */
    // function getAvailabilityForComputation(meetingId, duration) {
    //     const availabilityReq = new Array(duration + 1).fill(null).map((_) => []);
    //     // console.log(coinReq);
    //     // [[], [], [], [], [], ..., []] if amount is 10, then I will have 11 empty arrays
    //     const coins = coinsObj.map(({ value }) => parseInt(value));
    //     // console.log(coins);
    //     // coins := [{ coinId: 10 digit number, countryId: 10 digit number, value: number }]
    //     const l = meetingId.length;
    //     for (let count = 1; count <= duration; count++) { // iterate through 1 to amount; all the amounts
    //         for (let j = 0; j < l; j++) { // iterate through each of the coins for each amount
    //             if (coins[j] <= count) {
    //                 if (coinReq[count].length === 0 || coinReq[count - coins[j]].length + 1 < coinReq[count].length) {
    //                     // console.log(coinReq[amt - coins[j]]);
    //                     coinReq[count] = [...coinReq[count - coins[j]], coins[j]];
    //                 }
    //             }
    //         }
    //     }
    //     return availabilityReq[duration].reduce((result, coin) => {
    //         if (!result[coin]) result[coin] = 0;
    //         result[coin]++;
    //         return result;
    //     }, {})
    // }
    

/* function getCoins(countryId, value__gt, page = 0, pageSize = 10, callback) {
    let whereClause;
    let i = 1;
    const values = [];
    if (!countryId && !value__gt) whereClause = '';
    else {
        whereClause = 'WHERE ';
        if (countryId) {
            whereClause += `country_Id = $${i++}`;
            values.push(parseInt(countryId));
        };
        if (value__gt) {
            whereClause += (countryId) ? ` AND value > $${i++}` : `value > $${i++}`;
        values.push(parseInt(value__gt));
        };
    }
    let limitOffsetClause = `LIMIT $${i++} OFFSET $${i++}`;
    values.push(parseInt(pageSize)); // limit = page size
    values.push(parseInt(page) * parseInt(pageSize)); // offset page * pageSize
    const query = `SELECT * FROM coin ${whereClause} ${limitOffsetClause}`;

    const client = connect();
    client.query(query,values,function(err, result){
        client.end();
        if (err) return callback(err, result);
        const { rows } = result;
        callback(err,rows);
    })
} */


function getMeetingInfo(participantid, meetingid, page = 0, pageSize = 10, callback) {
    let whereClause;
    let i = 1;
    const values = [];
    if (!participantid && !meetingid) {
        whereClause = '';
    } else {
        whereClause = 'WHERE ';
        if (participantid) {
            whereClause += `participantid = $${i++}`;
            values.push(parseInt(participantid));
        };
        if (meetingid) {
            whereClause += (participantid) ? ` AND meetingid = $${i++}` : `meetingid = $${i++}`;
            values.push(parseInt(meetingid));
        };
    };
    let limitOffsetClause = `LIMIT $${i++} OFFSET $${i++}`;
    values.push(parseInt(pageSize)); // limit = page size
    values.push(parseInt(page) * parseInt(pageSize)); // offset page * pageSize
    const query = `SELECT * FROM meetingInfo ${whereClause} ${limitOffsetClause}`;

    const client = connect();
    client.query(query,values,function(err, result){
        client.end();
        if (err) {
            return callback(err, result);
        } else {
            const { rows } = result;
            callback(err,rows);
    };
    });
};

function getMeetingInfoUnavailability(participantid, meetingid, page = 0, pageSize = 10, callback) {
    let whereClause;
    let i = 1;
    const values = [];
    if (!participantid && !meetingid) {
        whereClause = '';
    } else {
        whereClause = 'WHERE ';
        if (participantid) {
            whereClause += `participantid = $${i++}`;
            values.push(parseInt(participantid));
        };
        if (meetingid) {
            whereClause += (participantid) ? ` AND meetingid = $${i++}` : `meetingid = $${i++}`;
            values.push(parseInt(meetingid));
        };
    }
    let limitOffsetClause = `LIMIT $${i++} OFFSET $${i++}`;
    values.push(parseInt(pageSize)); // limit = page size
    values.push(parseInt(page) * parseInt(pageSize)); // offset page * pageSize
    const query = `SELECT * FROM meetingInfoUnavailability ${whereClause} ${limitOffsetClause}`;

    const client = connect();
    client.query(query,values,function(err, result){
        client.end();
        if (err) {
            return callback(err, result);
        }
        else{
            const { rows } = result;
            callback(err,rows);
    };
    });
};

function getAvailabilitiesForComputation(meetingId, callback) {
    let whereClause;
    let i = 1;
    const values = [];
    //&& !duration
    if (!meetingId) {
        whereClause = '';
    } else {
        whereClause = 'WHERE ';
        if (meetingId) {
            whereClause += `meetingid = $${i++}`;
            //whereClause += `participantid = $${i++}`;
            values.push(parseInt(meetingId));
        };
        // if (meetingId) {
        //     whereClause += (duration) ? ` AND meetingid = $${i++}` : `meetingid = $${i++}`;
        //     values.push(parseInt(meetingId));
        // };
    }
    //let limitOffsetClause = `LIMIT $${i++} OFFSET $${i++}`;
    //${limitOffsetClause}
    const query = `SELECT * FROM meetingInfo ${whereClause} `;

    const client = connect();
    
    client.query(query,values,function(err, result) {
        client.end();
        if (err) {
            return callback(err, result);
        } else {
            const { rows } = result;
            callback(err,rows);
    };
});
    
};


function getUnavailabilitiesForComputation(meetingId, fromTime, toTime, callback) {
    let whereClause;
    let i = 1;
    const values = [];
    //&& !duration
    if (!meetingId) {
        whereClause = '';
    } else {
        whereClause = 'WHERE ';
        if (meetingId) {
            whereClause += `meetingid = $${i++}`;
            //whereClause += `participantid = $${i++}`;
            values.push(parseInt(meetingId));
        };
        // if (meetingId) {
        //     whereClause += (duration) ? ` AND meetingid = $${i++}` : `meetingid = $${i++}`;
        //     values.push(parseInt(meetingId));
        // };
    }
    //let limitOffsetClause = `LIMIT $${i++} OFFSET $${i++}`;
    //${limitOffsetClause}
    const query = `SELECT * FROM meetingInfoUnavailability ${whereClause} `;

    const client = connect();
    
    client.query(query,values,function(err, result) {
        client.end();
        if (err) {
            return callback(err, result);
        } else {
            const { rows } = result;
            callback(err,rows);
    };
});
    
};

function getDurationForComputation(duration, callback) {
    const client = connect();
    client.query(`SELECT * FROM meetingInfo WHERE duration = $1`, [duration], (err, result) => {
        client.end();
        if (err) {
            return callback(err, result);
        };
        const { rows } = result;
        callback(err, rows);
    });
};

/*function getCoinsForComputation(countryId, callback) {
    const client = connect();
    client.query(`SELECT * FROM coin WHERE country_id = $1`, [countryId], (err, result) => {
        client.end();
        if (err) return callback(err, result);
        const { rows } = result;
        callback(err, rows);
    });
} */

 module.exports = {
    //resetTable,
    //insertCoins,
    insertMeetingInfo,
    getMeetingInfo,
    compute,
    //getMeetingResult,
    //getCoinsForComputation,
    // resetTable2,
    // resetTable3,
    resetTableBoth,
    //getCoins,
    getDurationForComputation,
    getAvailabilitiesForComputation,
    insertMeetingInfoUnavailabilities,
    getMeetingInfoUnavailability,
    getUnavailabilitiesForComputation,
}



 
/*
function getCoins(countryId, value__gt, page = 0, pageSize = 10, callback) {
    let whereClause;
    let i = 1;
    const values = [];
    if (!countryId && !value__gt) whereClause = '';
    else {
        whereClause = 'WHERE ';
        if (countryId) {
            whereClause += `country_Id = $${i++}`;
            values.push(parseInt(countryId));
        };
        if (value__gt) {
            whereClause += (countryId) ? ` AND value > $${i++}` : `value > $${i++}`;
        values.push(parseInt(value__gt));
        };
    }
    let limitOffsetClause = `LIMIT $${i++} OFFSET $${i++}`;
    values.push(parseInt(pageSize)); // limit = page size
    values.push(parseInt(page) * parseInt(pageSize)); // offset page * pageSize
    const query = `SELECT * FROM coin ${whereClause} ${limitOffsetClause}`;

    const client = connect();
    client.query(query,values,function(err, result){
        client.end();
        if (err) return callback(err, result);
        const { rows } = result;
        callback(err,rows);
    })
} */



/* function getMeetingInfo(participantId,meetingId, page = 0, pageSize = 10, callback) {
    let whereClause;
    let i = 1;
    const values = [];
    if (!participantId && !meetingId) whereClause = '';
    else {
        whereClause = 'WHERE ';
        if (participantId) {
            whereClause += `participantId = $${i++}`;
            values.push(parseInt(participantId));
        };
        if (meetingId) {
            whereClause +=`meetingId = $${i++}`;
            values.push(parseInt(meetingId));
        };
    }
    let limitOffsetClause = `LIMIT $${i++} OFFSET $${i++}`;
    values.push(parseInt(pageSize)); // limit = page size
    values.push(parseInt(page) * parseInt(pageSize)); // offset page * pageSize
    const query = `SELECT * FROM "MeetingInfo" ${whereClause} ${limitOffsetClause}`;
    console.log(query);
    console.log(values);
    const client = connect();
    client.query(query, values, function (err, result) {
        client.end();
        if (err) return callback(err, result);
        const { rows } = result;
        callback(err, rows);
    })
} */




/* function getMeetingInfo(participantId, meetingId, page = 0, pageSize = 10, callback) {
    let whereClause;
    let i = 1;
    const values = [];
    if (!participantId && !meetingId) whereClause = '';
    else {
        whereClause = 'WHERE ';
        if (participantId) {
            whereClause += `participantId = $${i++}`;
            values.push(parseInt(participantId));
        };
        if (meetingId) {
            whereClause += `meetingId = $${i++}`;
            values.push(parseInt(meetingId));
        };
    }
    let limitOffsetClause = `LIMIT $${i++} OFFSET $${i++}`;
    values.push(parseInt(pageSize)); // limit = page size
    values.push(parseInt(page) * parseInt(pageSize)); // offset page * pageSize
    const query = `SELECT * FROM "MeetingInfo" ${whereClause} ${limitOffsetClause}`;

    const client = connect();
    client.query(query,values,function(err, result){
        client.end();
        if (err) return callback(err, result);
        const { rows } = result;
        callback(err,rows);
    })
} */