import React, { useState } from 'react'
import i18n from '../../i18n'
import {
  StyledForecastTimes,
  StyledForecastTime,
  StyledForecastTimeText,
} from './StyledDefineTime'

const DefineTime = ({ handleForecastTimePress }) => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0)
  const t = i18n.t

  const handlePress = (index) => {
    setActiveButtonIndex(index)
    handleForecastTimePress(index)
  }

  return (
    <StyledForecastTimes
      numColumns={3}
      data={t('weatherCompare.timesToSelect')}
      keyExtractor={(item) => item}
      renderItem={({ item, index }) => (
        <StyledForecastTime onPress={() => handlePress(index)}>
          <StyledForecastTimeText isActive={activeButtonIndex === index}>
            {item}
          </StyledForecastTimeText>
        </StyledForecastTime>
      )}
    />
  )
}
export default DefineTime
