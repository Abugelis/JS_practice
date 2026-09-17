let tip = 0;

function calculateTip (bill, service){

    if (service === "good"){
        tip = bill * 0.2;
    }
    if (service === "fair"){
        tip = bill * 0.15;
    }
    if (service === "poor"){
        tip = bill * 0.1;
    }

    return tip;
}

console.log(calculateTip(100, "fair"));