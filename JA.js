const rows = [
	{ participantid: 1, availabilityId: 1, startTime: '0100', endTime: '0300' },
	{ participantid: 1, availabilityId: 1, startTime: '0130', endTime: '0330' },
	{ participantid: 2, availabilityId: 2, startTime: '0200', endTime: '0400' },
];

function compute(data) {
	// 1. convert data into events
	/**
	 *[
        {participantId: 1, type: 0, time: 900},
        {participantId: 1, type: 1, time: 1000}
        {participantId: 2, type: 0, time: 900},
        {participantId: 2, type: 1, time: 1000}
        {participantId: 3, type: 0, time: 900},
        {participantId: 3, type: 1, time: 1000}
    ]
    1. Correctly select the set of availability data for computation (based on the meetingId)
    2. Split each data into 2 event the start event and end event, e.g. split [1000, 1045] to ("Start", 1000) and ("End", 1045)
    3. Sort the event based on time.
    4. Maintain a counter, starting from 0.
    5. For each pair event, event i and event i+1
        Check that if event i is a "Start" event, increment the counter by 1
        Otherwise if event i is a "End" event, decrement the counter by 1
        Record the time period (Keep track of the time which had the maximum count)
            time of event i to time of event i + 1
	 */

	// STEP 2
	const events = [];
	for (let i = 0; i < rows.length; i++) {
		const availabilityData = rows[i];
		const enterEvent = {
			participantId: availabilityData.participantid,
			type: 0,
			time: parseInt(availabilityData.startTime),
		};
		const exitEvent = {
			participantId: availabilityData.participantid,
			type: 1,
			time: parseInt(availabilityData.endTime),
		};
		events.push(enterEvent, exitEvent);
	}

	// STEP 3
	events.sort(function (e1, e2) {
		//1. positive number -->e2 ahead e1
		//2. negative number --> e1 ahead e2
		//3. 0 --> whichever order e1 and e2 current have.
		return e1.time - e2.time;
	});

	// STEP 4
	let counter = 0;
	let bestStartTime = 0;
	let bestEndTime = 0;
	let bestCounter = 0;
	// i, i + 1;
	// array length is 4, then my i + 1 cannot be 4 or greater.
	for (let i = 0; i + 1 < events.length; i++) {
		const event1 = events[i];
		const event2 = events[i + 1];
		if (event1.type === 0) {
			// Check that if event i is a "Start" event, increment the counter by 1
			counter += 1;
		} else {
			//Otherwise if event i is a "End" event, decrement the counter by 1
			counter -= 1;
		}
		/*
        Record the time period (Keep track of the time which had the maximum count)
            time of event i to time of event i + 1
        */
		if (counter > bestCounter) {
			bestStartTime = event1.time;
			bestEndTime = event2.time;
			bestCounter = counter;
		}
	}

	// STEP 5. Find out the participants who are actually available
	const availableParticipants = [];
	const addedParticipants = {};
	for (let i = 0; i < data.length; i++) {
		const availabilityData = data[i];
		if (
			availabilityData.startTime <= bestStartTime &&
			availabilityData.endTime >= bestEndTime &&
			!addedParticipants[availabilityData.participantid]
		) {
			addedParticipants[availabilityData.participantid] = true;
			availableParticipants.push({ participantId: availabilityData.participantid });
		}
	}

	return {
		fromTime: bestStartTime.toString().padStart(4, '0'),
		toTime: bestEndTime.toString().padStart(4, '0'),
		participants: availableParticipants,
	};
}

console.log(compute(rows));

const unavailabilityDatas = [
	{ participantId: 1, unavailabilityData: 1, startTime: '0300', endTime: '0400' },
	{ participantId: 2, unavailabilityData: 2, startTime: '0100', endTime: '0200' },
];

function convertUnavailabilityToAvailability(data, fromTime, toTime) {
	const availabilityDatas = [];
	for (let i = 0; i < data.length; i++) {
		const unavailabilityData = data[i];
		const participantId = unavailabilityData.participantId;
		const startTime = parseInt(unavailabilityData.startTime);
		const endTime = parseInt(unavailabilityData.endTime);
		fromTime = parseInt(fromTime);
		toTime = parseInt(toTime);
		if (startTime > fromTime && endTime < toTime) {
			const availabilityData1 = {
				participantid: participantId,
				startTime: fromTime,
				endTime: startTime,
			};
			const availabilityData2 = {
				participantid: participantId,
				startTime: endTime,
				endTime: toTime,
			};
			availabilityDatas.push(availabilityData1);
			availabilityDatas.push(availabilityData2);
		} else if (startTime <= fromTime) {
			const availabilityData = {
				participantid: participantId,
				startTime: endTime,
				endTime: toTime,
			};
			availabilityDatas.push(availabilityData);
		} else if (endTime >= toTime) {
			const availabilityData = {
				participantid: participantId,
				startTime: fromTime,
				endTime: startTime,
			};
			availabilityDatas.push(availabilityData);
		} else {
			availabilityDatas.push({
				participantid: participantId,
				startTime: fromTime,
				endTime: toTime,
			});
		}
	}
	return availabilityDatas;
}

// const availabilityData = convertUnavailabilityToAvailability(unavailabilityDatas, '0100', '0400');
// console.log(availabilityData);
// console.log(compute(availabilityData));
/**
 *
const rows = [
	{ participantid: 1, availabilityId: 1, startTime: '1100', endTime: '1300' },
	{ participantid: 2, availabilityId: 2, startTime: '1200', endTime: '1400' },
];
 */
