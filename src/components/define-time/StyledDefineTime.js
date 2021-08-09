import styled from 'styled-components/native'
import { StyledRegularText } from '../../themes/global-styles'

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