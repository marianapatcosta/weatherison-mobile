import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { useColorScheme } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import { ThemeProvider } from 'styled-components/native'
import { PreferencesContext } from './src/context/preferences-context.js'
import themes from './src/themes'
import i18n from './src/i18n'
import { APIS } from './src/constants.js'
import { Routes } from './src/routes'
import { Footer } from './src/components'

export default App = () => {
  const [isFahrenheit, setIsFahrenheit] = useState(false)
  const [selectedApis, setSelectedApis] = useState([
    APIS.CLIMA_CELL,
    APIS.DARK_SKY,
    APIS.OPEN_WEATHER,
  ])
  const deviceTheme = useColorScheme()
  const theme = themes[deviceTheme] || themes.light

  const toggleTemperatureUnits = async (isFahrenheit) => {
    try {
      setIsFahrenheit(isFahrenheit)
      await AsyncStorage.setItem('isFahrenheit', JSON.stringify(isFahrenheit))
    } catch (error) {
      console.error(error)
    }
  }

  const updateSelectedApis = async (selectedApis) => {
    try {
      setSelectedApis(selectedApis)
      await AsyncStorage.setItem('selectedApis', JSON.stringify(selectedApis))
    } catch (error) {
      console.error(error)
    }
  }

  const preferencesContext = useMemo(
    () => ({
      isFahrenheit,
      toggleTemperatureUnits,
      selectedApis,
      updateSelectedApis,
    }),
    [isFahrenheit, selectedApis]
  )

  const [fontsLoaded] = useFonts({
    Raleway: require('./src/assets/fonts/Raleway-Regular.ttf'),
    Vidaloka: require('./src/assets/fonts/Vidaloka-Regular.ttf'),
  })

  const getLocalStoredData = useCallback(async () => {
    const storageLabels = ['isFahrenheit', 'isPt', 'selectedApis']
    try {
      const [isFahrenheit, isPt, selectedApis] = await Promise.all(
        storageLabels.map(async (label) => {
          return await AsyncStorage.getItem(label)
        })
      )
      isFahrenheit && setIsFahrenheit(JSON.parse(isFahrenheit))
      if (isPt) {
        i18n.locale = isPt === 'true' ? 'pt' : 'en'
      }
      selectedApis && setSelectedApis(JSON.parse(selectedApis))
    } catch (error) {
      console.error(error)
    }
  }, [setIsFahrenheit, setSelectedApis])

  useEffect(() => {
    getLocalStoredData()
  }, [getLocalStoredData])

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <PreferencesContext.Provider value={preferencesContext}>
        <Routes />
        <Footer />
      </PreferencesContext.Provider>
    </ThemeProvider>
  )
}
