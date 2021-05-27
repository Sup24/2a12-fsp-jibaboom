// Coin change problem
 
// 10, 20, 50, 100
 
// pay an amount with the least number of coins.
// 1000 - 10 * 100
// 150 - 100 + 50
// 170 - 100 + 50 + 20

const database = require('./database');
const { response, json } = require('express');
 
// function compute(coins, amount) {
//     try {
//         return { error : null, result: coinChange(coins, parseInt(amount)) };
//     } catch (error) {
//         return { error, result: null};
//     }
// }

function computing(availabilities) {
    try {
        return { error : null, result: optimiseMeetingTime(availabilities) };
    } catch (error) {
        return { error, result: null};
    }
}


function computingAdvanced(combinedAvailabilities, fromTime, toTime) {
    try {
        //console.log('ComputingAdvance', combinedAvailabilities);
        return { error : null, result: optimiseMeetingTimeUnavailabilities(combinedAvailabilities, parseInt(fromTime), parseInt(toTime)) };
    } catch (error) {
        return { error, result: null};
    }
}



 
// function coinChange(coinsObj, amount) {
//     const coinReq = new Array(amount + 1).fill(null).map((_) => []);
//     // console.log(coinReq);
//     // [[], [], [], [], [], ..., []] if amount is 10, then I will have 11 empty arrays
//     const coins = coinsObj.map(({ value }) => parseInt(value));
//     // console.log(coins);
//     // coins := [{ coinId: 10 digit number, countryId: 10 digit number, value: number }]
//     const l = coins.length;
//     for (let amt = 1; amt <= amount; amt++) { // iterate through 1 to amount; all the amounts
//         for (let j = 0; j < l; j++) { // iterate through each of the coins for each amount
//             if (coins[j] <= amt) {
//                 if (coinReq[amt].length === 0 || coinReq[amt - coins[j]].length + 1 < coinReq[amt].length) {
//                     // console.log(coinReq[amt - coins[j]]);
//                     coinReq[amt] = [...coinReq[amt - coins[j]], coins[j]];
//                 }
//             }
//         }
//     }
//     return coinReq[amount].reduce((result, coin) => {
//         if (!result[coin]) result[coin] = 0;
//         result[coin]++;
//         return result;
//     }, {});
// }


function combineOverlappingSlots(availabilities) {
   combinedAvailabilities = [] // array to hold the combined availabilities
   availabilities.map((availability) => {
        combined = false;
    // boolean to keep track of whether this availabilities has been combined with another
    // search if participantId already exists in the combined array of availabilities
        for (let i = 0; i < combinedAvailabilities.length; i++) {
        // participantId found in the combined array, hence check if there’s any overlap
            if (availability.participantid == combinedAvailabilities[i].participantid) {
            // this availability starts later than the existing one
                if (availability.starttime >= combinedAvailabilities[i].starttime) {
                // it’s only considered an overlap if this availability starts BEFORE the existing ends
                    if(availability.starttime <= combinedAvailabilities[i].endtime) {
                    // update the endTime of this availability if it ends later than the existing one
                        if ( availability.endtime >= combinedAvailabilities[i].endtime) {
                            combinedAvailabilities[i].endtime = availability.endtime;
                        }
                        combined = true;
                        break;
                    }
                } else {
                    // it’s only considered an overlap if this availability ends AFTER the existing starts
                    if ( availability.endtime >= combinedAvailabilities[i].starttime){
                    // update the startTime of existing availability to this availability’s startTime
                    // availability.startTime is definitely earlier than existing availability’s startTime
                    // because if it was later, it would have landed in the IF statement above, and not here
                        combinedAvailabilities[i].starttime = availability.starttime;
                        combined = true; // mark combined as TRUE to indicate the slot has already been combined
                        break;
                    }
                }
        
            }
        }

        
// if this availability is not combined into existing availabilities, means there’s no overlap
// hence, just push it into the array as it is
        if(!combined){
            combinedAvailabilities.push(availability);
        }
    });
   
   
    return combinedAvailabilities;
};



function optimiseMeetingTime(availabilities) {
    ans = 0;
    count = 0;
    data = [];
    events = [];
    people = [];
    combinedAvailabilities = combineOverlappingSlots(availabilities);
    for (i = 0; i < combinedAvailabilities.length; i++) {
        events.push(new Array(availabilities[i].starttime,"start"));
        events.push(new Array(availabilities[i].endtime,"end"));
    }
    events.sort();
    console.log(events);
    
    // people = []

    // availabilities => availabilities.filter((participantid, i) => availabilities.indexOf(participantid) != i)

    // var start = false; 
    //     for (j = 0; j < array.length; j++) { 
    //         for (k = 0; k < outputArray.length; k++) { 
    //             if ( array[j] == outputArray[k] ) { 
    //                 start = true; 
    //             } 
    //         } 
    //         count++; 
    //         if (count == 1 && start == false) { 
    //             outputArray.push(array[j]); 
    //         } 
    //         start = false; 
    //         count = 0; 
    //     }

    for (i = 0; i < events.length; i++) {

        if (events[i][1] == 'start') {
            // availabilities.splice(i, 1)
            // availabilities[i].participantid != availabilities[i-1].participantid
            count += 1;
        }
        if (events[i][1] =='end') {
            // endtime when ans = count
            if (i <= count) {
                // endtime = availabilities[i].endtime;
            }
            //
            count -= 1;
        }
        //Max no of ppl in the room at a time
        if (count > ans){
            //starttime here
            starttime = events[i][0];
            endtime = events[i+1][0];
            // starttime = availabilities[i].starttime;
            //
        ans = Math.max(ans, count);
        // participants = availabilities[i].participantid;
        // people.push(participants);
        // console.log(participants);
        }
        // participants = availabilities[2].participantid;
        // console.log(participants);
        // return participants;
    }

    //console.log(participants);

    // Figure out who can make it for this time slot
    
    //

    // Account for overlapping intervals(Step 1)[Look through list of participantId]
    // return ans;
    // console.log(availabilities.length);
    //console.log(data);

   
//'No. of Participants'  : ans,
participants = []; // array to store participants who can make it
combinedAvailabilities.map((availability) => {
    if ( availability.starttime <= starttime && availability.endtime >= endtime ){
        participants.push(parseInt(availability.participantid)); // we're only interested in participantId
    }
});

console.log('No. of Participants: ' + ans);
console.log('fromTime: ' + starttime);
console.log('toTime: ' + endtime);
console.log('participantId Listing: ' + participants);
    result = {
     fromTime:  starttime.toString().padStart(4, '0'), 
     toTime: endtime.toString().padStart(4, '0'),
     participants: participants.map((person_id) => {
        return {
            participantId: person_id
        };
    })
};
    
    
    return result;
    // return starttime;
    // return endtime
    // return people;

};

function optimiseMeetingTimeUnavailabilities (combinedAvailabilities, fromTime, toTime) {
    availabilityDatasAdvanced = [];
    combinedAvailabilities = combineOverlappingSlots(combinedAvailabilities);
    //console.log('optimiseMeetingTimeUnavailabilities', combinedAvailabilities.length);
    for (let i = 0; i < combinedAvailabilities.length; i++) {
        let unavailabilityDataAdvanced = combinedAvailabilities[i];
        console.log(unavailabilityDataAdvanced.endtime,unavailabilityDataAdvanced.starttime);
        let participantId = unavailabilityDataAdvanced.participantid;
        let startTime = parseInt(unavailabilityDataAdvanced.starttime);
        let endTime = parseInt(unavailabilityDataAdvanced.endtime);
        // fromTime = parseInt(optimseMeetingTime.result.fromTime);
        // toTime = parseInt(optimseMeetingTime.result.toTime);
        fromTime = parseInt(fromTime);
        toTime = parseInt(toTime);
        console.log(startTime,endTime,fromTime,toTime);
        if (startTime > fromTime && endTime < toTime) {
			availabilityDataA = {
				participantid: participantId,
				starttime: fromTime,
				endtime: startTime,
			};
			availabilityDataB = {
				participantid: participantId,
				starttime: endTime,
				endtime: toTime,
			};
			availabilityDatasAdvanced.push(availabilityDataA);
			availabilityDatasAdvanced.push(availabilityDataB);
        }
 // Unavailability for whole period starting from here. else if clause
        else if (fromTime == 0 && toTime == 2359) {
			availabilityData = {
				participantid: '',
				starttime: '',
				endtime: '',
			};
			availabilityDatasAdvanced.push(availabilityData);
        }
 
        else if (startTime <= fromTime) {
			availabilityData = {
				participantid: participantId,
				starttime: endTime,
				endtime: toTime,
			};
			availabilityDatasAdvanced.push(availabilityData);
        }
        
        else if (endTime >= toTime) {
			availabilityData = {
				participantid: participantId,
				starttime: fromTime,
				endtime: startTime,
			};
			availabilityDatasAdvanced.push(availabilityData);
        }

        else {
			availabilityDatasAdvanced.push({
				participantid: participantId,
				starttime: fromTime,
				endtime: toTime,
			});
		}
        
    }
    console.log(availabilityDatasAdvanced);
    
    return optimiseMeetingTime(availabilityDatasAdvanced);

    

};








// availabilities = database.getAvailabilitiesForComputation(9087700997);
//availabilities = [[ 1, 2 ], [ 2, 4 ], [ 3, 6 ]]
//availabilities = [[ 1000, 1200 ], [ 1130, 1400 ], [ 1200, 1400 ],[0900,1130]]
// availabilities = ["start", 1000],["end", 1200], 
//                 ["start", 1130],["end", 1400],
//                 ["start", 1200],["end", 1400],
//                 ["start", 0900],["end", 1130]
                //  ["start", 0700],["end", 0900],
                //  ["start", "10:00"],["end", "12:00"],
                //  ["start", "13:00"],["end", "15:00"],
                //  ["start", "17:00"],["end", "18:00"]
                 



//optimiseMeetingTime(availabilities)

// function optimiseMeetingTimeUnavailabilities(unavailabilities) {
//     ans = 0;
//     count = 0;
//     data = [];
//     events = [];
//     for (i = 0; i < unavailabilities.length; i++) {
//         events.push(new Array(unavailabilities[i].starttime,"start"))
//         events.push(new Array(unavailabilities[i].endtime,"end"))
//     }
//     events.sort();
//     console.log(events);
//     console.log(unavailabilities)
//     people = []

//     // availabilities => availabilities.filter((participantid, i) => availabilities.indexOf(participantid) != i)

//     // var start = false; 
//     //     for (j = 0; j < array.length; j++) { 
//     //         for (k = 0; k < outputArray.length; k++) { 
//     //             if ( array[j] == outputArray[k] ) { 
//     //                 start = true; 
//     //             } 
//     //         } 
//     //         count++; 
//     //         if (count == 1 && start == false) { 
//     //             outputArray.push(array[j]); 
//     //         } 
//     //         start = false; 
//     //         count = 0; 
//     //     }

//     for (i = 0; i < events.length; i++) {

//         if (events[i][1] == 'start') {
//             // availabilities.splice(i, 1)
//             // availabilities[i].participantid != availabilities[i-1].participantid
//             count += 1;
//         }
       
//         if (events[i][1] =='end') {
//             // endtime when ans = count
//             if (i <= count) {
//                 endtime = events[i][0];
//                 // endtime = availabilities[i].endtime;
//             }
//             //
//             count -= 1;
            
//         }
//         //Max no of ppl in the room at a time
//         if (count > ans){
//             //starttime here
//             starttime = events[i][0];
//             // starttime = availabilities[i].starttime;
//             //
//         ans = Math.max(ans, count);
//         participants = unavailabilities[i].participantid;
//         people.push(participants);
//         // console.log(participants);
//         }
//         // participants = availabilities[2].participantid;
//         // console.log(participants);
//         // return participants;
//     }
// }
// unavailabilityDatas = [
// 	{ participantId: 1, unavailabilityData: 1, startTime: '0300', endTime: '0400' },
// 	{ participantId: 2, unavailabilityData: 2, startTime: '0100', endTime: '0200' },
// ];
// function convertUnavailabilityToAvailability(data, fromTime, toTime) {
// 	 availabilityDatas = [];
// 	for (let i = 0; i < data.length; i++) {
// 		unavailabilityData = data[i];
// 		participantId = unavailabilityData.participantId;
// 		startTime = parseInt(unavailabilityData.starttime);
// 		endTime = parseInt(unavailabilityData.endtime);
// 		fromTime = parseInt(fromTime);
// 		toTime = parseInt(toTime);
// 		if (startTime > fromTime && endTime < toTime) {
// 			availabilityData1 = {
// 				participantid: participantId,
// 				startTime: fromTime,
// 				endTime: startTime,
// 			};
// 			availabilityData2 = {
// 				participantid: participantId,
// 				startTime: endTime,
// 				endTime: toTime,
// 			};
// 			availabilityDatas.push(availabilityData1);
// 			availabilityDatas.push(availabilityData2);
// 		} else if (startTime <= fromTime) {
// 			availabilityData = {
// 				participantid: participantId,
// 				startTime: endTime,
// 				endTime: toTime,
// 			};
// 			availabilityDatas.push(availabilityData);
// 		} else if (endTime >= toTime) {
// 			availabilityData = {
// 				participantid: participantId,
// 				startTime: fromTime,
// 				endTime: startTime,
// 			};
// 			availabilityDatas.push(availabilityData);
// 		} else {
// 			availabilityDatas.push({
// 				participantid: participantId,
// 				startTime: fromTime,
// 				endTime: toTime,
// 			});
// 		}
// 	}
// 	return availabilityDatas;
// }

module.exports = {
    //compute,
    // coinChange,
    computing,
    //unComputing,
    computingAdvanced,
}

/* # Python3 program that prmaximum 
# number of overlap 
# among given ranges 

# Function that prmaximum 
# overlap among ranges 
def overlap(v): 

	# variable to store the maximum 
	# count 
	ans = 0
	count = 0
	data = [] 

	# storing the x and y 
	# coordinates in data vector 
	for i in range(len(v)): 

		# pushing the x coordinate 
		data.append([v[i][0], 'x']) 

		# pushing the y coordinate 
		data.append([v[i][1], 'y']) 

	# sorting of ranges 
	data = sorted(data) 

	# Traverse the data vector to 
	# count number of overlaps 
	for i in range(len(data)): 

		# if x occur it means a new range 
		# is added so we increase count 
		if (data[i][1] == 'x'): 
			count += 1

		# if y occur it means a range 
		# is ended so we decrease count 
		if (data[i][1] == 'y'): 
			count -= 1

		# updating the value of ans 
		# after every traversal 
		ans = max(ans, count) 

	# printing the maximum value 
	print(ans) 

# Driver code 
v = [ [ 1, 2 ], [ 2, 4 ], [ 3, 6 ] ] 
overlap(v) 

# This code is contributed by mohit kumar 29 
 */