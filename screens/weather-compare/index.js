import React, {
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
  useLayoutEffect,
} from 'react'
import { Alert, Animated, Dimensions, RefreshControl, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useTheme } from 'styled-components'
import 'allsettled-polyfill'
import { WeatherCard, WeatherCardPlaceholder } from '../../components'
import { WEATHER_FORECAST_TIMES } from '../../constants'
import { PreferencesContext } from '../../context/preferences-context'
import { getLocation } from '../../utils'
import ENV_VARS from '../../variables'
import {
  StyledHeaderIconLeft,
  StyledHeader,
  StyledWeatherCompare,
  StyledForecastTimes,
  StyledForecastTime,
  StyledForecastTimeText,
  StyledWeatherCards,
  StyledNotAvailable,
  StyledInput,
  StyledLocationButton,
  StyledInputWrapper,
} from './StyledWeatherCompare.js'

const WeatherCompare = ({
  navigation,
  getDefaultTitle,
  getCurrentLocation,
}) => {
  const {
    t,
    isPt,
    selectedApis,
    locationParams,
    setLocationParams,
    setSelectedLocation,
  } = useContext(PreferencesContext)
  const [selectedTime, setSelectedTime] = useState(
    WEATHER_FORECAST_TIMES.CURRENT
  )
  const [activeButtonIndex, setActiveButtonIndex] = useState(0)
  const [weatherResponses, setWeatherResponses] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [noData, setNoData] = useState(false)
  const [newLocation, setNewLocation] = useState('')
  const theme = useTheme()
  const moveAnimation = useRef(new Animated.Value(0)).current
  const [showDefineNewLocation, setShowDefineNewLocation] = useState(false)
  const translateXAnimation = moveAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('screen').width, 0],
  })

  const getRejectedApis = (responses) => {
    const rejectedApisIndexes = responses
      .map((response, index) =>
        response.status !== 'fulfilled' ? index : undefined
      )
      .filter((index) => index !== undefined)
    if (rejectedApisIndexes.length) {
      const rejectedApis = selectedApis
        .filter((api, index) =>
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
    let queryString
    for (const param in locationParams) {
      queryString = `${queryString}&${param}=${locationParams[param]}`
    }
    return queryString
  }

  const fetchWeatherForecastData = useCallback(
    async (signal) => {
      try {
        setIsLoading(true)
        const responses = await Promise.allSettled(
          selectedApis.map(async (api) => {
            // weatherison.herokuapp.com
            const response = await fetch(
              `${ENV_VARS.API_URL}/weather?&apiName=${api}&lang=${
                isPt ? 'pt' : 'en'
              }&${getLocationQueryParameters()}`,
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
        navigation.setOptions({ title: location || getDefaultTitle() })
        getRejectedApis(responses)
      } catch (error) {
        setNoData(true)
        Alert.alert(t('header.error'), t('weatherCompare.weatherError'))
      } finally {
        setIsLoading(false)
      }
    },
    [selectedApis, getRejectedApis]
  )

  const handleForecastTimePress = (index) => {
    setSelectedTime(Object.values(WEATHER_FORECAST_TIMES)[index])
    setActiveButtonIndex(index)
  }
  const weatherInfoForSelectedTime = useMemo(
    () =>
      weatherResponses?.map((response) => ({
        weatherInfo: response[selectedTime],
        apiName: response.apiName,
      })),
    [weatherResponses, selectedTime]
  )

  const handleCardPress = (index) => {
    const times = Object.values(WEATHER_FORECAST_TIMES)
    times.shift()
    const weatherDetailsData = times.map(
      (time) => weatherResponses[index][time]
    )
    const apiName = weatherResponses[index].apiName
    navigation.push('WeatherDetails', { weatherDetailsData, apiName })
  }

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await fetchWeatherForecastData()
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }, [])

  const handleCurrentLocationClick = () => {
    setShowDefineNewLocation(false)
    getCurrentLocation()
    setSelectedLocation('')
    setShowDefineNewLocation(false)
  }

  const handleOnSubmitNewLocation = () => {
    navigation.setOptions({ title: getDefaultTitle() })
    setLocationParams({ location: newLocation })
    setSelectedLocation('')
    setNewLocation('')
    setShowDefineNewLocation(false)
  }

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

  useEffect(() => {
    Animated.timing(moveAnimation, {
      toValue: showDefineNewLocation ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [showDefineNewLocation])

  const toggleShowDefineNewLocation = () =>
    setShowDefineNewLocation(
      (prevShowDefineNewLocation) => !prevShowDefineNewLocation
    )

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
    })
  }, [navigation, toggleShowDefineNewLocation])

  const renderDefineTime = () => (
    <StyledForecastTimes
      numColumns={3}
      data={t('weatherCompare.timesToSelect')}
      keyExtractor={(item) => item}
      renderItem={({ item, index }) => (
        <StyledForecastTime onPress={() => handleForecastTimePress(index)}>
          <StyledForecastTimeText isActive={activeButtonIndex === index}>
            {item}
          </StyledForecastTimeText>
        </StyledForecastTime>
      )}
    />
  )

  const renderDefineLocation = () => (
    <StyledInputWrapper
      style={{
        transform: [{ translateX: translateXAnimation }],
      }}
    >
      <StyledInput
        value={newLocation}
        onChangeText={setNewLocation}
        onSubmitEditing={handleOnSubmitNewLocation}
        placeholder={t('header.locationPlaceholder')}
        placeholderTextColor={theme.colors.font}
      />
      <StyledLocationButton onPress={handleCurrentLocationClick}>
        <Icon name='map-marker-alt' size={22} color={theme.colors.font} />
      </StyledLocationButton>
    </StyledInputWrapper>
  )

  const renderHeader = () => (
    <StyledHeader>
      {renderDefineLocation()}
      {renderDefineTime()}
    </StyledHeader>
  )

  const renderMain = () => {
    if (noData) {
      return (
        <StyledNotAvailable>
          <WeatherCard />
        </StyledNotAvailable>
      )
    }
    if (!!weatherInfoForSelectedTime) {
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
      <StyledWeatherCards
        data={Array(2).fill('')}
        keyExtractor={(item, index) => `weather-placeholder-${index}`}
        renderItem={() => <WeatherCardPlaceholder />}
      />
    )
  }

  return (
    <StyledWeatherCompare>
      {renderHeader()}
      {renderMain()}
    </StyledWeatherCompare>
  )
}

export default WeatherCompare
