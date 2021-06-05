import styled from 'styled-components/native'
import { StyledRegularText, StyledTitleText } from '../../themes/global-styles'

export const StyledWeatherDetails = styled.View``

export const StyledTitle = styled(StyledTitleText)`
  text-align: center;
  margin-top: 16px;
`

export const StyledDate = styled(StyledRegularText)`
  text-align: center;
  padding-bottom: 3px;
`

export const StyledWeatherCards = styled.FlatList.attrs({
  contentContainerStyle: (props) => ({
    alignItems: 'center',
    justifyContent: 'center',
  }),
})`
  margin: 0 auto;
  padding: 10px;
`
