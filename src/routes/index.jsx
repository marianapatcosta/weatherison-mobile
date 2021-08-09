import React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from 'styled-components/native'
import {
  UserPreferences,
  WeatherCompare,
  WeatherDetails,
} from '../screens/index.js'
import i18n from '../i18n.js'
import { DefaultTitle } from '../components/index.js'

export const Routes = () => {
  const theme = useTheme()
  const RootStack = createStackNavigator()
  const MainStack = createStackNavigator()

  const appTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.primary,
    },
  }

  const defaultNavOptions = () => ({
    headerTitle: <DefaultTitle />,
    headerStyle: {
      backgroundColor: theme.colors.secondary,
    },
    headerTintColor: theme.colors.font,
    headerTitleStyle: {
      fontFamily: theme.fonts.emphasis,
      alignSelf: 'center',
      justifyContent: 'space-between',
    },
    cardStyle: { backgroundColor: theme.colors.highlight },
  })

  const MainStackScreen = () => (
    <MainStack.Navigator
      screenOptions={{
        ...defaultNavOptions(),
        headerMode: 'screen',
      }}
    >
      <MainStack.Screen name='WeatherCompare' component={WeatherCompare} />
      <MainStack.Screen
        name='WeatherDetails'
        component={WeatherDetails}
        options={{
          headerTitleContainerStyle: {
            left: 0,
          },
        }}
      />
    </MainStack.Navigator>
  )

  return (
    <NavigationContainer theme={appTheme}>
      <RootStack.Navigator mode='modal' screenOptions={defaultNavOptions}>
        <RootStack.Screen
          name='Main'
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name='UserPreferences'
          component={UserPreferences}
          options={{
            headerTitle: i18n.t('preferences.title'),
            headerTitleContainerStyle: {
              left: 0,
            },
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
