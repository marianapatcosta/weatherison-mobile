import React, { Fragment } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useTheme } from 'styled-components/native'
import {
  StyledHeaderTitleWrapper,
  StyledHeaderTitle,
} from './StyledDefaultTitle'

const DefaultTitle = () => {
  const theme = useTheme()
  return (
    <StyledHeaderTitleWrapper translate='no'>
      <Fragment>
        <StyledHeaderTitle>WEA</StyledHeaderTitle>
        <Icon name='umbrella' size={20} color={theme.colors.font} />
        <StyledHeaderTitle>HER</StyledHeaderTitle>
        <Icon name='bolt' size={20} color={theme.colors.font} />
        <StyledHeaderTitle>S</StyledHeaderTitle>
        <Icon name='sun' size={20} color={theme.colors.highlight} />
        <StyledHeaderTitle>N</StyledHeaderTitle>
      </Fragment>
    </StyledHeaderTitleWrapper>
  )
}
export default DefaultTitle
