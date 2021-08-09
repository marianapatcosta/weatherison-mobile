import styled from 'styled-components/native'
import { Animated } from 'react-native'

export const StyledInputWrapper = styled(Animated.View)`
  margin: 16px 10px 5px;
  flex-direction: row;
  align-items: center;
  position: absolute;
  width: 95%;
  top: 0;
  z-index: 2;
`

export const StyledInput = styled.TextInput`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.font};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  padding: 5px 10px;
  flex: 2;
  font-family: ${({ theme }) => theme.fonts.body};
`

export const StyledLocationButton = styled.TouchableOpacity`
  margin-left: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 5px 10px;
  border-radius: 5px;
`
