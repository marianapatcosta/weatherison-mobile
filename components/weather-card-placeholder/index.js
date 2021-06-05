import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
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
      <StyledWeatherDetailsColumn listKey={'details-column-left'}>
        <FlatList
          data={Array(3).fill('')}
          listKey={(item, index) =>
            `details-column-left-placeholder-row-${index}`
          }
          keyExtractor={(item, index) =>
            `details-column-left-placeholder-row-${index}`
          }
          renderItem={() => (
            <StyledIconTextWrapperPlaceholder>
              <StyledIconPlaceholder />
              <StyledDetailsTextPlaceholder />
            </StyledIconTextWrapperPlaceholder>
          )}
        />
      </StyledWeatherDetailsColumn>
      <StyledWeatherDetailsColumn listKey={'details-column-right'}>
        <FlatList
          data={Array(3).fill('')}
          listKey={(item, index) =>
            `details-column-right-placeholder-row-${index}`
          }
          keyExtractor={(item, index) =>
            `details-column-right-placeholder-row-${index}`
          }
          renderItem={() => (
            <StyledIconTextWrapperPlaceholder>
              <StyledIconPlaceholder />
              <StyledDetailsTextPlaceholder />
            </StyledIconTextWrapperPlaceholder>
          )}
        />
      </StyledWeatherDetailsColumn>
    </StyledWeatherDetails>
  </StyledCard>
)

export default WeatherCardPlaceholder
