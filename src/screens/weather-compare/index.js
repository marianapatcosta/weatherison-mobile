import React, {
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useLayoutEffect,
} from 'react'
import { Alert, RefreshControl, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useTheme } from 'styled-components/native'
import * as Location from 'expo-location'
import 'allsettled-polyfill'
import {
  DefaultTitle,
  DefineLocation,
  DefineTime,
  WeatherCard,
  WeatherCardPlaceholder,
} from '../../components'
import { WEATHER_FORECAST_TIMES, API_URL } from '../../constants'
import { PreferencesContext } from '../../context/preferences-context'
import { getLocation } from '../../utils'
import i18n from '../../i18n'
import {
  StyledHeaderIconRight,
  StyledHeaderIconLeft,
  StyledHeader,
  StyledWeatherCompare,
  StyledWeatherCards,
  StyledNotAvailable,
} from './StyledWeatherCompare.js'

const WeatherCompare = ({ navigation }) => {
  const { selectedApis } = useContext(PreferencesContext)
  const isPt = i18n.locale === 'pt'
  const t = i18n.t
  const [selectedTime, setSelectedTime] = useState(
    WEATHER_FORECAST_TIMES.CURRENT
  )
  const [weatherResponses, setWeatherResponses] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [newLocation, setNewLocation] = useState('')
  const theme = useTheme()
  const [showDefineNewLocation, setShowDefineNewLocation] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState('')
  const [locationParams, setLocationParams] = useState()

  const weatherInfoForSelectedTime = useMemo(
    () =>
      weatherResponses
        ? weatherResponses.map((response) => ({
            weatherInfo: response[selectedTime],
            apiName: response.apiName,
          }))
        : [],
    [weatherResponses, selectedTime]
  )

  const getCurrentLocation = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      return Alert.alert(t('header.error'), t('header.locationError'))
    }

    try {
      const locationParams = await Location.getCurrentPositionAsync({
        timeout: 5000,
      })
      setLocationParams({
        latitude: locationParams.coords.latitude,
        longitude: locationParams.coords.longitude,
      })
    } catch (error) {
      return Alert.alert(t('header.error'), t('header.locationError'))
    }
  }, [setLocationParams])

  const getRejectedApis = (responses) => {
    const rejectedApisIndexes = responses
      .map((response, index) =>
        response.status !== 'fulfilled' ? index : undefined
      )
      .filter((index) => index !== undefined)
    if (rejectedApisIndexes.length) {
      const rejectedApis = selectedApis
        .filter((_, index) =>
          rejectedApisIndexes.join(', ').includes('' + index)
        )
        .map((api) => api)
        .join(', ')
      rejectedApis &&
        Alert.alert(
          t('header.error'),
          t('weatherCompare.weatherApisError', {
            apis: rejectedApis,
          })
        )
    }
  }

  const getLocationQueryParameters = () => {
    let queryString = ''
    for (const param in locationParams) {
      queryString = `${queryString && `${queryString}&`}${param}=${
        locationParams[param]
      }`
    }
    return queryString
  }

  const fetchWeatherForecastData = useCallback(
    async (signal) => {
      const locationQueryParameters = getLocationQueryParameters()
      if (!locationQueryParameters) return
      try {
        setIsLoading(true)
        const responses = await Promise.allSettled(
          selectedApis.map(async (api) => {
            const response = await fetch(
              `${API_URL}weather?&apiName=${api}&lang=${
                isPt ? 'pt' : 'en'
              }&${locationQueryParameters}`,
              { signal }
            )
            const responseData = await response.json()
            if (responseData?.error) {
              const error = new Error(responseData.data.error)
              error.name = ''
              throw error
            }

            return {
              ...responseData.forecast,
              apiName: responseData.forecast.name,
              location: responseData.location,
            }
          })
        )
        handleFetchWeatherForecastSuccess(responses)
      } catch (error) {
        Alert.alert(t('header.error'), t('weatherCompare.weatherError'))
      } finally {
        setIsLoading(false)
      }
    },
    [selectedApis, getRejectedApis]
  )

  const handleFetchWeatherForecastSuccess = (responses) => {
    const responsesData = responses
      .map((response) => response.value)
      .filter((response) => response)
    setWeatherResponses(responsesData)
    const location = getLocation(
      responsesData?.find((response) => response)?.location || '',
      isPt,
      t('header.wordsToDelete')
    )
    setSelectedLocation(location)
    navigation.setOptions({ title: location })
    getRejectedApis(responses)
  }

  const handleForecastTimePress = (index) => {
    setSelectedTime(Object.values(WEATHER_FORECAST_TIMES)[index])
  }

  const handleCardPress = (index) => {
    const times = Object.values(WEATHER_FORECAST_TIMES)
    times.shift()
    const weatherDetailsData = times.map(
      (time) => weatherResponses[index][time]
    )
    const apiName = weatherResponses[index].apiName
    navigation.push('WeatherDetails', {
      weatherDetailsData,
      apiName,
      selectedLocation,
    })
  }

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await fetchWeatherForecastData()
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }, [])

  const handleCurrentLocationClick = () => {
    getCurrentLocation()
    setSelectedLocation('')
    setShowDefineNewLocation(false)
  }

  const handleOnSubmitNewLocation = () => {
    navigation.setOptions({ title: <DefaultTitle /> })
    setLocationParams({ location: newLocation })
    setSelectedLocation('')
    setNewLocation('')
    setShowDefineNewLocation(false)
  }

  const toggleShowDefineNewLocation = () =>
    setShowDefineNewLocation(
      (prevShowDefineNewLocation) => !prevShowDefineNewLocation
    )

  useEffect(() => {
    getCurrentLocation()
  }, [])

  useEffect(() => {
    let isUnmounted = false
    if (isUnmounted) return
    const httAbortController = new AbortController()
    fetchWeatherForecastData(httAbortController.signal)
    return () => {
      httAbortController.abort()
      isUnmounted = true
    }
  }, [selectedApis, isPt, locationParams])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <StyledHeaderIconLeft onPress={toggleShowDefineNewLocation}>
          <Icon
            name='search-location'
            size={22}
            color={theme.colors.highlight}
          />
        </StyledHeaderIconLeft>
      ),
      headerRight: () => (
        <StyledHeaderIconRight
          onPress={() => navigation.push('UserPreferences')}
        >
          <Icon name='ellipsis-v' size={22} color={theme.colors.highlight} />
        </StyledHeaderIconRight>
      ),
    })
  }, [navigation, toggleShowDefineNewLocation])

  const renderMain = () => {
    if (isLoading) {
      return (
        <StyledWeatherCards
          data={Array(2).fill('')}
          keyExtractor={(_, index) => `weather-placeholder-${index}`}
          renderItem={() => <WeatherCardPlaceholder />}
        ></StyledWeatherCards>
      )
    }

    if (!!weatherInfoForSelectedTime?.length) {
      return (
        <StyledWeatherCards
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={weatherInfoForSelectedTime}
          keyExtractor={(item) => `weather-card-${item.apiName}`}
          renderItem={({ item, index }) => (
            <WeatherCard
              weatherInfo={item.weatherInfo}
              apiName={item.apiName}
              selectedTime={selectedTime}
              onPress={() => handleCardPress(index)}
            />
          )}
          ListFooterComponent={<View style={{ margin: 30 }} />}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => handleRefresh()}
            />
          }
        />
      )
    }

    return (
      <StyledNotAvailable>
        <WeatherCard />
      </StyledNotAvailable>
    )
  }

  return (
    <StyledWeatherCompare>
      <StyledHeader>
        <DefineLocation
          location={newLocation}
          showDefineNewLocation={showDefineNewLocation}
          onChangeLocation={setNewLocation}
          handleOnSubmitNewLocation={handleOnSubmitNewLocation}
          handleCurrentLocationClick={handleCurrentLocationClick}
        />
        <DefineTime handleForecastTimePress={handleForecastTimePress} />
      </StyledHeader>
      {renderMain()}
    </StyledWeatherCompare>
  )
}

export default WeatherCompare
