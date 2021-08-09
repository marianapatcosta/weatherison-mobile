import React, { useEffect, useRef } from 'react'
import { Dimensions, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useTheme } from 'styled-components/native'
import i18n from '../../i18n'
import {
  StyledInput,
  StyledLocationButton,
  StyledInputWrapper,
} from './StyledDefineLocation'

const DefineLocation = ({
  location,
  showDefineNewLocation,
  onChangeLocation,
  handleOnSubmitNewLocation,
  handleCurrentLocationClick,
}) => {
  const theme = useTheme()
  const t = i18n.t
  const moveAnimation = useRef(new Animated.Value(0)).current

  const translateXAnimation = moveAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').width, 0],
  })

  useEffect(() => {
    Animated.timing(moveAnimation, {
      toValue: showDefineNewLocation ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [showDefineNewLocation])

  return (
    <StyledInputWrapper
      style={{
        transform: [{ translateX: translateXAnimation }],
      }}
    >
      <StyledInput
        value={location}
        onChangeText={onChangeLocation}
        onSubmitEditing={handleOnSubmitNewLocation}
        placeholder={t('header.locationPlaceholder')}
        placeholderTextColor={theme.colors.font}
      />
      <StyledLocationButton onPress={handleCurrentLocationClick}>
        <Icon name='map-marker-alt' size={22} color={theme.colors.font} />
      </StyledLocationButton>
    </StyledInputWrapper>
  )
}
export default DefineLocation
