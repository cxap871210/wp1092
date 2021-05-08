let number

function getRandom(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
};


const getNumber = (forceRestart = false) => {
  // TODO:
  // generate a random number if number is undefined or forceRestart is true
  if (forceRestart === true | typeof(number) === "undefined")
  {
    number = getRandom(0,100)
    console.log('start', number)
  }
  // console.log('getNumber:', number)
  return number
}

export default getNumber
