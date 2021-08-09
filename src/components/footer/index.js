import React from 'react'
import { Linking } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useTheme } from 'styled-components/native'
import i18n from '../../i18n'
import {
  StyledFooter,
  StyledFooterWrapper,
  StyledFooterLinksWrapper,
  StyledFooterText,
  StyledLink,
} from './StyledFooter.js'

const DefaultTitle = () => {
  const theme = useTheme()
  const t = i18n.t
  return (
    <StyledFooter>
      <StyledFooterWrapper>
        <StyledFooterText>{`©2021 - ${t('footer.developedBy')} ${t(
          'footer.authorName'
        )}`}</StyledFooterText>
      </StyledFooterWrapper>
      <StyledFooterLinksWrapper>
        <StyledLink
          onPress={() => Linking.openURL(t('footer.github'))}
          accessibilityLabel={`go to ${t('footer.authorName')}'s Github`}
        >
          <Icon name='github' size={23} color={theme.colors.font} />
        </StyledLink>
        <StyledLink
          onPress={() => Linking.openURL(t('footer.linkedin'))}
          accessibilityLabel={`go to ${t('footer.authorName')}'s Linkedin`}
        >
          <Icon name='linkedin' size={23} color={theme.colors.font} />
        </StyledLink>
      </StyledFooterLinksWrapper>
    </StyledFooter>
  )
}
export default DefaultTitle
