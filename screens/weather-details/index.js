import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'
import { WeatherCard } from '../../components'
import { PreferencesContext } from '../../context/preferences-context'
import { getDate } from '../../utils'
import {
  StyledWeatherDetails,
  StyledTitle,
  StyledWeatherCards,
  StyledDate,
} from './StyledWeatherDetails.js'

const WeatherDetails = ({ route, navigation }) => {
  const { weatherDetailsData, apiName } = route.params
  const { t, isPt, selectedLocation } = useContext(PreferencesContext)
  useEffect(() => navigation.setOptions({ title: selectedLocation }), [selectedLocation])

  return (
    <StyledWeatherDetails>
      <StyledTitle>
        {t('weatherDetails.title', {
          apiName: apiName.toUpperCase().split('-').join(' '),
        })}
      </StyledTitle>
      <StyledWeatherCards
        data={weatherDetailsData}
        keyExtractor={(item) => item.time}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            <StyledDate>{getDate(item.time, isPt)}</StyledDate>
            <WeatherCard weatherInfo={item} apiName={apiName}/>
          </View>
        )}
        ListFooterComponent={ <View style={{ margin: 30 }} />}
      />
    </StyledWeatherDetails>
  )
}

export default WeatherDetails
