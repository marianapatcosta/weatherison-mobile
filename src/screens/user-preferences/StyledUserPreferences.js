import styled from 'styled-components/native'
import { StyledLoadingItem } from '../../themes/global-styles'

export const StyledUserPreferences = styled.View`
  margin-top: 60px;
`
export const StyledUserPreferencesContent = styled.View`
  margin: 0 auto;
  border-radius: 5px;
  box-shadow: 0 2px 2px ${({ theme }) => theme.colors.black};
  padding: 20px;
  width: 90%;
  background-color: ${({ theme }) => theme.colors.primary};
`

export const StyledSwitchWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px 4px 5px 0;
`

export const StyledApis = styled.View`
  margin-top: 20px;
  border-top-color: ${({ theme }) => theme.colors.secondary};
  border-top-width: 2px;
  padding-top: 20px;
`
export const StyledSwitchLabelPlaceholder = styled(StyledLoadingItem)`
  width: 100px;
  height: 16px;
`

export const StyledSwitchPlaceholder = styled(StyledLoadingItem)`
  width: 50px;
  height: 20px;
`
