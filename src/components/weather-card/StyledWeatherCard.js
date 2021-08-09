import Icon from 'react-native-vector-icons/FontAwesome5'
import styled, { css } from 'styled-components/native'
import { StyledRegularText } from '../../themes/global-styles'

const cardStyles = css`
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 2px 5px 3px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  width: 270px;
  min-height: 250px;
  margin-bottom: 10px;
`

const notAvailableStyles = css`
  margin: 0 auto;
`

export const StyledCard = styled.View`
  ${cardStyles}
  ${({ isNotAvailable }) => isNotAvailable && `${notAvailableStyles}`}
`

export const StyledCardTouch = styled.TouchableOpacity`
  ${cardStyles}
  ${({ isNotAvailable }) => isNotAvailable && `${notAvailableStyles}`}
`

export const StyledCardHeader = styled.View`
  overflow: hidden;
  width: 100%;
  padding: 10px;
`

export const StyledImageError = styled.Image`
  width: 200px;
  height: 200px;
  margin: 0 auto;
`

export const StyledErrorText = styled(StyledRegularText)`
  text-align: center;
  margin-top: 10px;
`


export const StyledIcon = styled(Icon)`
  padding-right: 5px;
`

export const StyledCardWeatherMain = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

export const StyledCardWeatherImage = styled.Image`
  width: 80px;
  height: 80px;
`

export const StyledTemperature = styled.View`
  padding-top: 10px;
`

export const StyledCurrentTemperature = styled(StyledRegularText)`
  font-size: 22px;
`

export const StyledIconTextWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`

export const StyledWeatherText = styled(StyledRegularText)`
  font-size: 14px;
`

export const StyledWeatherDetails = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.primary};
  border-top-width: 1px;
  padding: 0 10px;
  background-color: ${({ theme }) => theme.colors.tertiary};
`

export const StyledWeatherDetailsColumn = styled.View`
  padding: 8px 0;
`

export const StyledSourceText = styled(StyledRegularText)`
  padding: 5px 10px;
  text-align: right;
  font-style: italic;
  color: ${({ theme }) => theme.colors.highlight};
`
