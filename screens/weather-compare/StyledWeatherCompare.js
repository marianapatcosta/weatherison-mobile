import styled from 'styled-components/native'
import { Animated } from 'react-native'
import { StyledRegularText } from '../../themes/global-styles'

export const StyledWeatherCompare = styled.View``

export const StyledHeaderIconLeft = styled.TouchableOpacity`
  margin-left: 20px;
`

export const StyledHeader = styled.View`
  justify-content: center;
  position: relative;
`

export const StyledForecastTimes = styled.FlatList.attrs({
  contentContainerStyle: (props) => ({
    alignItems: 'center',
    flexDirection: 'row',
  }),
})`
  margin: 16px auto 0;
`

export const StyledForecastTime = styled.TouchableOpacity`
  text-align: center;
  margin: 0 5px;
  min-width: 48px;
  padding: 5px;
`

export const StyledForecastTimeText = styled(StyledRegularText)`
  font-size: 16px;

  ${({ isActive }) =>
    isActive &&
    `
    border-bottom: 2px solid ${({ theme }) => theme.colors.font};
    font-weight: 700;
    font-size: 18px;
  `}
`
export const StyledInputWrapper = styled(Animated.View)`
  margin: 16px 10px 5px;
  flex-direction: row;
  align-items: center;
  position: absolute;
  width: 95%;
  top: 0;
  z-index: 2;
`

export const StyledInput = styled.TextInput`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.font};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  padding: 5px 10px;
  flex: 2;
  font-family: ${({ theme }) => theme.fonts.body};
`

export const StyledLocationButton = styled.TouchableOpacity`
  margin-left: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 5px 10px;
  border-radius: 5px;
`

export const StyledWeatherCards = styled.FlatList.attrs({
  contentContainerStyle: (props) => ({
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  }),
})`
  margin: 10px auto;
  padding: 10px;
`

export const StyledNotAvailable = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 80px;
`
