import Constants from 'expo-constants'

const ENV = {
  DEV: {
    API_URL: 'http://192.168.1.83:8000/api/v1',
  },
  PROD: {
    API_URL: 'https://weatherison.herokuapp.com/api/v1',
  },
}

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (!env) return ENV.DEV
  if (env.indexOf('dev') !== -1) return ENV.DEV
  if (env.indexOf('prod') !== -1) return ENV.PROD
}

const selectedENV = getEnvVars();

export default selectedENV;