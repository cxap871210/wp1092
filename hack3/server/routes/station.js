import Station from '../models/station'

const tidyUpData = (data, result) => {
  // process data from mongo and return correct form of data
  // the data form should be like this:
  // data = {
  //   R: [
  //     {
  //       station_id: 'R1',
  //       station_name: '象山',
  //       ...
  //     },
  //     {
  //       station_id: 'R2',
  //       station_name: '101/世貿中心',
  //       ...
  //     }
  //   ],
  //   G: [
  //     ...
  //   ]
  // }
  
  
    data.sort((a, b) => (a.station_id > b.station_id) ? 1 : -1)
    
    let letter = []
    for(let index = 0 ; index < data.length ; index ++)
    {
      if(letter.includes(data[index].station_id[0] === false))
      {
        letter.push(data[index].station_id[0])
      }
    }

    for(let index = 0 ; index < letter.length ; index++)
    {
      let temp = []
      for(let j = 0 ; j < data.length ; j++)
      {
        if (data[j].station_id[0] === letter[index])
        {
          temp.push(data[j])
        }
      }
      result[letter[index]] = temp
    }


  return result
}

const calculate = (data, start, end) => {
  let startLine = start[0]
  let endLine = end[0]
  let startInd = parseInt(start.slice(1, start.length)) - 1
  let endInd = parseInt(end.slice(1, end.length)) - 1
  let intersection = data[startLine].filter(s => data[endLine].some(a => a.station_name === s.station_name))[0]
  let intersection_ano = data[endLine].filter(s => data[startLine].some(a => a.station_name === s.station_name))[0]
  let dis = 0

  if (startLine !== endLine && start === intersection) {  // if start from intersection
    startLine = endLine
    startInd = intersection_ano.station_order - 1
  }

  if (startInd > endInd && startLine === endLine) { // check end order > start order
    return -1
  }
  else if (endInd === startInd && startLine === endLine) { // check whether same station
    return 0
  }
  else if (startLine !== endLine && startInd === intersection.station_order - 1 && endInd === intersection_ano.station_order - 1) { // check whether intersection
    return 0
  }
  else if (startLine !== endLine && startInd < intersection.station_order - 1 && endInd < intersection_ano.station_order - 1) { // check invalid route passing through intersection (end with smaller station order)
    return -1
  }
  else if (startLine !== endLine && startInd > intersection.station_order - 1) { // check invalid route passing through intersection (begin beyond intersection)
    return -1
  }
  
  if (startLine === endLine) { // same line (R -> R or G -> G)
    for (let i = startInd; i < endInd; i++) {
      dis += data[startLine][i].distance_to_next
    }
    return dis
  }
  else { // R -> G or G -> R
    for (let i = startInd; i < intersection.station_order - 1; i++) {
      dis += data[startLine][i].distance_to_next
    }

    for (let i = intersection_ano.station_order - 1; i < endInd; i++) {
      dis += data[endLine][i].distance_to_next
    }

    return dis
  }
}

// 1st API
const GetStations = async (req, res) => {
  let data = []
  let result = {}

  try {
    // fetch data from mongo
    // coding here ...

    const findAll = async () => {
      data = await Station.find()
    }

    result = tidyUpData(data, result)

    if (Object.keys(result).length) {
      // return correct response here ...
      res.status(200).send({ message: 'success', data: result })
    }
    else {
      throw new Error('Something Wrong !')
    }
  } catch (err) {
    console.error(err.name + ' ' + err.message)
    res.status(403).send({ message: 'error', data: [] })
    // return correct response here ...
  }
}

// 2nd API
const CalculateDistance = async (req, res) => {
  let data = []
  let result = {}
  let answer = -1

  try {
    const start = '' // get parameter from frontend
    const end = '' // get parameter from frontend

    // fetch data from mongo
    // coding here ...
    
    result = tidyUpData(data, result)
    answer = calculate(result, start, end)

    if (Object.keys(result).length) {
      // return correct response here ...
    }
    else {
      throw new Error('Something Wrong !')
    }
  } catch (err) {
    console.error(err.name + ' ' + err.message)
    // return correct response here ...
  }
}

export { GetStations, CalculateDistance}
