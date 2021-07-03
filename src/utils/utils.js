export const checkExistanceInArray = (array, id) => {
    // returns true or false
    if(typeof array[0] == 'string'){
        return !!array.find((item) => item === id);
    }
    return !!array.find((item) => item._id === id);
};

// truncate text to character limit
export const truncateText = (text, numberOfCharacters) =>{
    if(text.length >= numberOfCharacters){
        return text.substring(0,numberOfCharacters)+'...';
    }
    return text;
}

// convert youtube video duration
export const convertDuration = (duration) => {
    let modifiedDuration = '';

    // if no seconds provided add 00 secs
    if(duration[duration.length - 1] === "M"){
        modifiedDuration = duration.replace("PT","").replace("H",":").replace("M",":")+"00";
    }
    else{
        modifiedDuration = duration.replace("PT","").replace("H",":").replace("M",":").replace("S","");
    }
    // console.log('modified: ', modifiedDuration);
    return modifiedDuration;
}

// convert number
export const convertNumberScale = (number) => {
    let numberToString = number.toString();

    let scaledNumber = ''
    
    if(numberToString.length < 4){
        return numberToString;
    }    
    else if(numberToString.length > 3 && numberToString.length < 7){
        scaledNumber = numberToString.slice(0,-3)+"K";
        return scaledNumber
    }
    else if(numberToString.length > 6 && numberToString.length < 10){
        scaledNumber = numberToString.slice(0,-6)+"."+numberToString[1]+"M";
        return scaledNumber
    }
    else{
        return numberToString;
    }
};