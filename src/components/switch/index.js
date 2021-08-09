import React from 'react'
import { Switch as ReactSwitch } from 'react-native-switch'
import { useTheme } from 'styled-components/native'
import { StyledRegularText } from '../../themes/global-styles'
import { StyledSwitchWrapper } from './StyledSwitch'

const Switch = ({ label, value, onValueChange, activeText, inActiveText }) => {
  const theme = useTheme()

  const switchStyles = () => ({
    circleBorderWidth: 0,
    circleSize: 25,
    barHeight: 20,
    activeTextStyle: {
      color: theme.colors.secondary,
      fontFamily: theme.fonts.body,
      paddingBottom: 2,
    },
    inactiveTextStyle: {
      color: theme.colors.font,
      fontFamily: theme.fonts.body,
      paddingBottom: 2,
    },
    backgroundInactive: theme.colors.secondary,
    backgroundActive: theme.colors.font,
    circleInActiveColor: theme.colors.highlight,
    circleActiveColor: theme.colors.highlight,
    switchLeftPx: 5,
    switchRightPx: 5,
    changeValueImmediately: true,
  })

  return (
    <StyledSwitchWrapper>
      <StyledRegularText>{label}</StyledRegularText>
      <ReactSwitch
        {...switchStyles()}
        value={value}
        onValueChange={onValueChange}
        activeText={activeText}
        inActiveText={inActiveText}
      />
    </StyledSwitchWrapper>
  )
}
export default Switch
