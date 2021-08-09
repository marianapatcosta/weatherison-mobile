import styled from 'styled-components/native'

export const StyledWeatherCompare = styled.View``

const StyledHeaderIcon = styled.TouchableOpacity`
  margin-left: 20px;
  height: 48px;
  width: 48px;
  justify-content: center;
`

export const StyledHeaderIconLeft = styled(StyledHeaderIcon)`
  align-self: flex-start;
`

export const StyledHeaderIconRight = styled(StyledHeaderIcon)`
  align-self: flex-end;
`

export const StyledHeader = styled.View`
  justify-content: center;
  position: relative;
`

export const StyledWeatherCards = styled.FlatList.attrs({
  contentContainerStyle: (props) => ({
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  }),
})`
  margin: 10px auto;
  padding: 10px;
`

export const StyledNotAvailable = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 80px;
`
