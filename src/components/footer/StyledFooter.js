import styled from 'styled-components/native'
import { StyledRegularText } from '../../themes/global-styles'

export const StyledFooter = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  height: 40px;
  padding: 10px 10px 5px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const StyledFooterWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

export const StyledFooterLinksWrapper = styled(StyledFooterWrapper)``

export const StyledFooterText = styled(StyledRegularText)`
  font-size: 12px;
  text-align: left;
`

export const StyledLink = styled.TouchableOpacity`
  text-decoration: none;
  margin-left: 15px;
`
