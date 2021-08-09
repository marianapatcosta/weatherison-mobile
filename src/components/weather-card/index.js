import React, { useContext, Fragment } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { APIS } from '../../constants'
import { PreferencesContext } from '../../context/preferences-context'
import {
  StyledRegularText,
  StyledSubText,
  StyledTitleText,
} from '../../themes/global-styles'
import { useTheme } from 'styled-components/native'
import {
  getMoonPhase,
  getRelativeUnits,
  getTemperatureUnits,
  getUvValue,
  getWindUnits,
  toPascalCase,
} from '../../utils'
import * as Images from '../../assets/weather-icons'
import i18n from '../../i18n'
import {
  StyledCard,
  StyledCardTouch,
  StyledCardHeader,
  StyledIcon,
  StyledCardWeatherMain,
  StyledCardWeatherImage,
  StyledTemperature,
  StyledCurrentTemperature,
  StyledIconTextWrapper,
  StyledWeatherText,
  StyledWeatherDetails,
  StyledWeatherDetailsColumn,
  StyledSourceText,
  StyledImageError,
  StyledErrorText,
} from './StyledWeatherCard'

const WeatherCard = ({ weatherInfo, apiName, selectedTime, onPress }) => {
  const { isFahrenheit } = useContext(PreferencesContext)
  const theme = useTheme()
  const t = i18n.t

  const getIcon = (apiName, icon) => {
    try {
      if (apiName === APIS.ACCUWEATHER || apiName === APIS.OPEN_WEATHER)
        return Images[toPascalCase(apiName)][toPascalCase(`Icon${icon}`)]

      if (apiName === APIS.IPMA) return Images.ErrorIcon

      return Images[toPascalCase(apiName)][toPascalCase(icon)]
    } catch (error) {
      return Images.ErrorIcon
    }
  }

  const renderCurrentTemperature = () => (
    <StyledTemperature>
      <StyledCurrentTemperature>
        {getTemperatureUnits(weatherInfo.temperature, isFahrenheit)}
      </StyledCurrentTemperature>
      <StyledIconTextWrapper>
        <Icon name='thermometer-half' size={16} color={theme.colors.font} />
        <StyledSubText>{t('weatherCard.app')}</StyledSubText>
        <StyledRegularText>
          {getTemperatureUnits(weatherInfo.apparentTemperature, isFahrenheit)}
        </StyledRegularText>
      </StyledIconTextWrapper>
    </StyledTemperature>
  )

  const renderTemperature = () => (
    <StyledTemperature>
      <StyledIconTextWrapper>
        <StyledIcon name='temperature-low' size={16} color='#afccf1' />
        <StyledRegularText>
          {getTemperatureUnits(weatherInfo.temperatureMin, isFahrenheit)}
        </StyledRegularText>
      </StyledIconTextWrapper>
      <StyledIconTextWrapper>
        <StyledIcon name='temperature-high' size={16} color='#b33030' />
        <StyledRegularText>
          {getTemperatureUnits(weatherInfo.temperatureMax, isFahrenheit)}
        </StyledRegularText>
      </StyledIconTextWrapper>
    </StyledTemperature>
  )

  const renderWeatherInfoHeader = () => {
    return (
      <StyledCardHeader>
        <StyledCardWeatherMain>
          <StyledCardWeatherImage
            source={getIcon(apiName, weatherInfo.icon)}
            accessibilityLabel='weather icon'
          />
          {selectedTime === 'current'
            ? renderCurrentTemperature()
            : renderTemperature()}
        </StyledCardWeatherMain>
        <StyledWeatherText>{weatherInfo.description}</StyledWeatherText>
      </StyledCardHeader>
    )
  }

  const WeatherDetailsItem = ({ icon, text, titleText }) => (
    <StyledIconTextWrapper>
      {icon ? (
        <StyledIcon name={icon} size={17} color={theme.colors.font} />
      ) : (
        <StyledTitleText
          style={{ paddingRight: 5, fontWeight: '700', fontSize: 14 }}
        >
          UV
        </StyledTitleText>
      )}
      <StyledWeatherText>{text}</StyledWeatherText>
    </StyledIconTextWrapper>
  )

  const renderWeatherDetails = () => (
    <StyledWeatherDetails>
      <StyledWeatherDetailsColumn>
        <WeatherDetailsItem
          icon='wind'
          text={`${getWindUnits(weatherInfo.windSpeed)} ${
            weatherInfo.windDirection || '-'
          }`}
        />
        <WeatherDetailsItem
          titleText='UV'
          text={getUvValue(weatherInfo.uvIndex)}
        />
        <WeatherDetailsItem
          icon='moon'
          text={getMoonPhase(weatherInfo.moonPhase)}
        />
      </StyledWeatherDetailsColumn>
      <StyledWeatherDetailsColumn>
        <WeatherDetailsItem
          icon='tint'
          text={getRelativeUnits(weatherInfo.humidity)}
        />
        <WeatherDetailsItem
          icon='cloud-rain'
          text={getRelativeUnits(weatherInfo.precipitationIntensity)}
        />
        <WeatherDetailsItem
          icon='umbrella'
          text={getRelativeUnits(weatherInfo.precipitationProbability)}
        />
      </StyledWeatherDetailsColumn>
    </StyledWeatherDetails>
  )

  const renderWeatherInfo = () => (
    <Fragment>
      {renderWeatherInfoHeader()}
      {renderWeatherDetails()}
      {!!onPress && (
        <StyledSourceText>{apiName.split('-').join(' ')}</StyledSourceText>
      )}
    </Fragment>
  )

  const renderNotAvailable = () => (
    <Fragment>
      <StyledImageError
        source={require('../../assets/weather-icons/error.png')}
        accessibilityLabel='error icon'
      />
      <StyledErrorText>{t('weatherCard.notAvailable')}</StyledErrorText>
    </Fragment>
  )

  return !!onPress ? (
    <StyledCardTouch
      onPress={onPress}
      notAvailable={!weatherInfo}
      accessibilityLabel={t('weatherCard.pressCard', { apiName })}
    >
      {!!weatherInfo ? renderWeatherInfo() : renderNotAvailable()}
    </StyledCardTouch>
  ) : (
    <StyledCard notAvailable={!weatherInfo}>
      {!!weatherInfo ? renderWeatherInfo() : renderNotAvailable()}
    </StyledCard>
  )
}

export default WeatherCard
