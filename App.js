import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  Fragment,
} from 'react'
import { Alert, Linking } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppLoading from 'expo-app-loading'
import * as Location from 'expo-location'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useFonts } from 'expo-font'
import { ThemeProvider } from 'styled-components/native'
import {
  UserPreferences,
  WeatherCompare,
  WeatherDetails,
} from './screens/index.js'
import { PreferencesContext } from './context/preferences-context.js'
import basic from './themes/basic'
import i18n from './i18n'
import {
  StyledHeaderTitleWrapper,
  StyledHeaderTitle,
  StyledHeaderIcon,
  StyledHeaderIconLeft,
  StyledFooter,
  StyledFooterWrapper,
  StyledFooterLinksWrapper,
  StyledFooterText,
  StyledLink,
} from './StyledApp.js'
import { APIS } from './constants.js'

export default App = () => {
  const RootStack = createStackNavigator()
  const MainStack = createStackNavigator()
  const [locationParams, setLocationParams] = useState()
  const [isAppReady, setIsAppReady] = useState(false)
  const [isPt, setIsPt] = useState(i18n.locale === 'pt')
  const [isFahrenheit, setIsFahrenheit] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState('')
  const [showDefineNewLocation, setShowDefineNewLocation] = useState(false)
  const [selectedApis, setSelectedApis] = useState([
    APIS.CLIMA_CELL,
    APIS.DARK_SKY,
    APIS.OPEN_WEATHER,
  ])

  const toggleLocale = async (isPt) => {
    try {
      setIsPt(isPt)
      await AsyncStorage.setItem('isPt', JSON.stringify(isPt))
    } catch (error) {
      console.error(error)
    }
  }

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
      t: (scope, options) =>
        i18n.t(scope, { locale: isPt ? 'pt' : 'en', ...options }),
      isPt,
      toggleLocale,
      isFahrenheit,
      toggleTemperatureUnits,
      selectedApis,
      updateSelectedApis,
      locationParams,
      setLocationParams,
      selectedLocation,
      setSelectedLocation,
      showDefineNewLocation,
      setShowDefineNewLocation,
    }),
    [
      isPt,
      isFahrenheit,
      selectedApis,
      selectedLocation,
      locationParams,
      showDefineNewLocation,
    ]
  )

  const t = preferencesContext.t

  const [fontsLoaded] = useFonts({
    Raleway: require('./assets/fonts/Raleway-Regular.ttf'),
    Vidaloka: require('./assets/fonts/Vidaloka-Regular.ttf'),
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
      isPt && setIsPt(JSON.parse(isPt))
      selectedApis && setSelectedApis(JSON.parse(selectedApis))
    } catch (error) {
      console.error(error)
    }
  }, [setIsFahrenheit, setIsPt, setSelectedApis])

  const getCurrentLocation = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      return Alert.alert(t('header.error'), t('header.locationError'))
    }

    const locationParams = await Location.getCurrentPositionAsync({})
    setLocationParams({
      latitude: locationParams.coords.latitude,
      longitude: locationParams.coords.longitude,
    })
  }, [setLocationParams])

  useEffect(() => {
    getLocalStoredData()
    getCurrentLocation()
  }, [getLocalStoredData, getCurrentLocation])

  const getDefaultTitle = () => (
    <StyledHeaderTitleWrapper translate='no'>
      <Fragment>
        <StyledHeaderTitle>WEA</StyledHeaderTitle>
        <Icon name='umbrella' size={20} color={basic.colors.font} />
        <StyledHeaderTitle>HER</StyledHeaderTitle>
        <Icon name='bolt' size={20} color={basic.colors.font} />
        <StyledHeaderTitle>S</StyledHeaderTitle>
        <Icon name='sun' size={20} color={basic.colors.highlight} />
        <StyledHeaderTitle>N</StyledHeaderTitle>
      </Fragment>
    </StyledHeaderTitleWrapper>
  )

  const headerConfigs = () => ({
    headerStyle: {
      backgroundColor: basic.colors.secondary,
    },
    headerTintColor: basic.colors.font,
    headerTitleStyle: {
      fontFamily: basic.fonts.emphasis,
      alignSelf: 'center',
      justifyContent: 'space-between',
    },
  })

  const Footer = () => (
    <StyledFooter>
      <StyledFooterWrapper>
        <StyledFooterText>{`©2021 - ${t('footer.developedBy')} ${t(
          'footer.authorName'
        )}`}</StyledFooterText>
      </StyledFooterWrapper>
      <StyledFooterLinksWrapper>
        <StyledLink
          onPress={() => Linking.openURL(t('footer.github'))}
          accessibilityLabel={`go to ${t('footer.authorName')}'s Github`}
        >
          <Icon name='github' size={23} color={basic.colors.font} />
        </StyledLink>
        <StyledLink
          onPress={() => Linking.openURL(t('footer.linkedin'))}
          accessibilityLabel={`go to ${t('footer.authorName')}'s Linkedin`}
        >
          <Icon name='linkedin' size={23} color={basic.colors.font} />
        </StyledLink>
      </StyledFooterLinksWrapper>
    </StyledFooter>
  )

  const MainStackScreen = () => (
    <MainStack.Navigator
      screenOptions={({ navigation }) => ({
        ...headerConfigs(),
        title: selectedLocation || getDefaultTitle(),
        headerMode: 'screen',
        cardStyle: { backgroundColor: basic.colors.highlight },
        headerRight: () => (
          <StyledHeaderIcon onPress={() => navigation.push('UserPreferences')}>
            <Icon name='ellipsis-v' size={22} color={basic.colors.highlight} />
          </StyledHeaderIcon>
        ),
      })}
    >
      <MainStack.Screen
        name='WeatherCompare'
        options={{
          headerLeft: () => (
            <StyledHeaderIconLeft
              onPress={() =>
                setShowDefineNewLocation(
                  (prevShowDefineNewLocation) => !prevShowDefineNewLocation
                )
              }
            >
              <Icon
                name='search-location'
                size={22}
                color={basic.colors.highlight}
              />
            </StyledHeaderIconLeft>
          ),
        }}
      >
        {(props) => (
          <WeatherCompare
            {...props}
            getDefaultTitle={getDefaultTitle}
            getCurrentLocation={getCurrentLocation}
          />
        )}
      </MainStack.Screen>
      <MainStack.Screen
        name='WeatherDetails'
        component={WeatherDetails}
        options={{
          headerRight: () => null,
          headerTitleContainerStyle: {
            left: 0,
          },
        }}
      />
    </MainStack.Navigator>
  )

  const _cacheResourcesAsync = async () => {
    const images = [require('./assets/splash.png')]

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync()
    })
    return Promise.all(cacheImages)
  }

  if (!fontsLoaded) {
    return null
  }

  if (!isAppReady) {
    return (
      <AppLoading
        startAsync={_cacheResourcesAsync}
        onFinish={() => setIsAppReady(true)}
        onError={console.warn}
      />
    )
  }

  return (
    <ThemeProvider theme={basic}>
      <PreferencesContext.Provider value={preferencesContext}>
        <NavigationContainer>
          <RootStack.Navigator mode='modal' screenOptions={headerConfigs}>
            <RootStack.Screen
              name='Main'
              component={MainStackScreen}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name='UserPreferences'
              component={UserPreferences}
              options={{
                ...headerConfigs(),
                title: t('preferences.title'),
                cardStyle: { backgroundColor: basic.colors.highlight },
                headerTitleContainerStyle: {
                  left: 0,
                },
              }}
            />
          </RootStack.Navigator>
        </NavigationContainer>
        <Footer />
      </PreferencesContext.Provider>
    </ThemeProvider>
  )
}
