import React from 'react'
import {
  StyledCard,
  StyledCardHeader,
  StyledCardWeatherMain,
  StyledImagePlaceholder,
  StyledTemperature,
  StyledCurrentTemperature,
  StyledApparentTemperature,
  StyledDescription,
  StyledWeatherDetails,
  StyledWeatherDetailsColumn,
  StyledIconPlaceholder,
  StyledDetailsTextPlaceholder,
  StyledIconTextWrapperPlaceholder,
} from './StyledWeatherCardPlaceholder'

const WeatherCardPlaceholder = () => (
  <StyledCard>
    <StyledCardHeader>
      <StyledCardWeatherMain>
        <StyledImagePlaceholder />
        <StyledTemperature>
          <StyledCurrentTemperature />
          <StyledApparentTemperature />
        </StyledTemperature>
      </StyledCardWeatherMain>
      <StyledDescription />
    </StyledCardHeader>
    <StyledWeatherDetails>
      {Array(2)
        .fill('')
        .map((_, index) => (
          <StyledWeatherDetailsColumn
            key={`details-column-placeholder-${index}`}
          >
            {Array(3)
              .fill('')
              .map((_, rowIndex) => (
                <StyledIconTextWrapperPlaceholder
                  key={`details-column-left-placeholder-row-${rowIndex}`}
                >
                  <StyledIconPlaceholder />
                  <StyledDetailsTextPlaceholder />
                </StyledIconTextWrapperPlaceholder>
              ))}
          </StyledWeatherDetailsColumn>
        ))}
    </StyledWeatherDetails>
  </StyledCard>
)

export default WeatherCardPlaceholder
