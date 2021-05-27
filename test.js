const backend = require('./backend');

let input = [{ value: 10 }, { value: 20 }, { value: 50}, { value: 100}];
// console.log(backend.compute(input, 250));

let { error, result } = backend.compute(input, 250);
if (error) {
    console.log(error);
} else { 
    if (result['50'] === 1 && result['100'] == 2) {
        console.log("Test passed!", result);
    } else {
        console.log("!!!!! Test Failed !!!!!", result);
    }
}



input = [{ value: 10 }, { value: 20 }, { value: 50}, { value: 100}];
// console.log(backend.compute(input, 250));

({ error, result } = backend.compute(input, 280));
if (error) {
    console.log(error);
} else { 
    if (result['50'] === 1 && result['100'] == 2 && result['10'] == 1 && result['20'] == 1) {
        console.log("Test passed!", result);
    } else {
        console.log("!!!!! Test Failed !!!!!", result);
    }
}