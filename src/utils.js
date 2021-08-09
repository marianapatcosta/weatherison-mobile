import moment from 'moment/min/moment-with-locales'

export const getLocation = (local, isPt, wordsToDelete) => {
  if (!local) {
    return
  }
  let locationArray = local.split(',')
  locationArray = locationArray.slice(
    locationArray.length - 3 >= 0 ? locationArray.length - 3 : 0,
    locationArray.length
  )

  const itemToKeep = isPt ? 1 : 0
  wordsToDelete.forEach((word) => {
    locationArray.forEach((item, index) => {
      locationArray[index] = item.includes(word)
        ? item.split(word)[itemToKeep].trim()
        : item.trim()
    })
  })

  if (locationArray[0].includes(locationArray[1])) {
    locationArray.splice(0, 1)
  }
  return locationArray.join(', ')
}

export const getTemperatureUnits = (temperature, isFahrenheit) => {
  if (isFahrenheit) {
    temperature = Math.round((temperature * 1.8 + 32) * 10) / 10
    return `${temperature} °F`
  }
  return `${Math.round(temperature * 10) / 10} °C`
}

export const getWindUnits = (windSpeed) => {
  if (windSpeed === undefined) {
    return '-'
  }
  return typeof windSpeed === 'number'
    ? `${Math.round(windSpeed * 10) / 10} m/s`
    : `${windSpeed} m/s`
}

export const getRelativeUnits = (value) => {
  if (value === undefined) {
    return '-'
  }
  return typeof value === 'number'
    ? `${Math.round(value * 10) / 10} %`
    : /^[a-zA-Z]+$/.test(value)
    ? value
    : `${value} %`
}

export const getMoonPhase = (phase) => {
  if (phase === undefined) {
    return '-'
  }
  const upperCaseMatch = phase?.match(/[A-Z][a-z]+/g)
  if (upperCaseMatch && upperCaseMatch?.length >= 2) {
    return upperCaseMatch.join(' ').toLowerCase()
  }
  return phase.toLowerCase().replace(/[-_.]/g, ' ')
}

export const getUvValue = (value) => {
  return value === undefined ? '-' : `${Math.round(value * 100) / 100}`
}

export const getDate = (time, isPt) => {
  const locale = isPt ? 'pt' : 'en'
  const format = isPt ? 'dddd D MMMM YYYY' : 'dddd MMMM Do YYYY'
  return moment(time).locale(locale).format(format)
}

export const getDescription = (description) => {
  return (
    description.charAt(0).toUpperCase() + description.slice(1).toLowerCase() ||
    ''
  )
}

export const toPascalCase = (string) =>
  string
    .match(/[a-z0-9]+/gi)
    .map(
      (word) => `${word.charAt(0).toUpperCase()}${word.substr(1).toLowerCase()}`
    )
    .join('')
