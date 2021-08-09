import styled from 'styled-components/native'
import { StyledLoadingItem } from '../../themes/global-styles'

export const StyledCard = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 2px 5px 3px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  width: 270px;
  min-height: 250px;
  margin-bottom: 10px;
`

export const StyledCardHeader = styled.View`
  overflow: hidden;
  width: 100%;
  padding: 10px;
`

export const StyledCardWeatherMain = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

export const StyledImagePlaceholder = styled(StyledLoadingItem)`
  width: 80px;
  height: 80px;
`

export const StyledTemperature = styled.View`
  width: 50%;
  padding-left: 16px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
`

export const StyledCurrentTemperature = styled(StyledLoadingItem)`
  height: 22px;
  width: 65%;
`

export const StyledApparentTemperature = styled(StyledLoadingItem)`
  height: 14px;
  margin-top: 10px;
  width: 80%;
`

export const StyledDescription = styled(StyledLoadingItem)`
  width: 70%;
  height: 14px;
  margin-top: 8px;
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

export const StyledIconTextWrapperPlaceholder = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`

export const StyledIconPlaceholder = styled(StyledLoadingItem)`
  width: 16px;
  height: 20px;
`

export const StyledDetailsTextPlaceholder = styled(StyledLoadingItem)`
  width: 45%;
  height: 16px;
  margin-left: 10px;
`
