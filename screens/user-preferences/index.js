import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import { View, Alert, RefreshControl } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Switch } from 'react-native-switch'
import { useTheme } from 'styled-components'
import { PreferencesContext } from '../../context/preferences-context'
import { StyledRegularText, StyledTitleText } from '../../themes/global-styles'
import ENV_VARS from '../../variables'
import {
  StyledUserPreferences,
  StyledUserPreferencesContent,
  StyledSwitchWrapper,
  StyledApis,
  StyledSwitchLabelPlaceholder,
  StyledSwitchPlaceholder,
} from './StyledUserPreferences'

const UserPreferences = () => {
  const [apis, setApis] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const {
    t,
    isPt,
    toggleLocale,
    isFahrenheit,
    toggleTemperatureUnits,
    selectedApis,
    updateSelectedApis,
  } = useContext(PreferencesContext)
  const theme = useTheme()

  const switchStyles = () => ({
    circleBorderWidth: 0,
    circleSize: 25,
    barHeight: 20,
    activeTextStyle: {
      color: theme.colors.secondary,
      fontFamily: theme.fonts.body,
      paddingBottom: 2,
    },
    inactiveTextStyle: {
      color: theme.colors.font,
      fontFamily: theme.fonts.body,
      paddingBottom: 2,
    },
    backgroundInactive: theme.colors.secondary,
    backgroundActive: theme.colors.font,
    circleInActiveColor: theme.colors.highlight,
    circleActiveColor: theme.colors.highlight,
    switchLeftPx: 5,
    switchRightPx: 5,
    changeValueImmediately: true,
  })

  const fetchApis = useCallback(async (signal) => {
    try {
      setIsLoading(true)
      const response = await fetch(`${ENV_VARS.API_URL}/apis`, {
        signal,
      })
      if (response.ok) {
        const apis = await response.json()
        setApis(apis)
      }
    } catch (error) {
      Alert.alert(t('header.error'), t('preferences.apiError'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  const apisToRender = useMemo(
    () =>
      apis.map((api) => ({
        name: api,
        selected: selectedApis.includes(api),
      })),
    [apis, selectedApis]
  )

  const handleSelectedApisUpdate = (value, index) => {
    const apiToUpdate = apisToRender[index]
    if (selectedApis.length === 1 && apiToUpdate.selected) {
      return Alert.alert(t('preferences.apiSelectionError'))
    }

    const updatedSelectedApis = value
      ? [...selectedApis, apiToUpdate.name]
      : selectedApis.filter((api) => api !== apiToUpdate.name)
    updateSelectedApis(updatedSelectedApis)
  }

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await fetchApis()
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }, [])

  useEffect(() => {
    const httAbortController = new AbortController()
    fetchApis(httAbortController.signal)

    return () => httAbortController.abort()
  }, [fetchApis])

  const renderApis = () => {
    if (isLoading) {
      return (
        <FlatList
          data={Array(5).fill(5)}
          keyExtractor={(item, index) => `api-placeholder-${index}`}
          renderItem={() => (
            <StyledSwitchWrapper>
              <StyledSwitchLabelPlaceholder />
              <StyledSwitchPlaceholder />
            </StyledSwitchWrapper>
          )}
        />
      )
    }

    if (!!apis.length) {
      return (
        <FlatList
          data={apisToRender}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => (
            <StyledSwitchWrapper>
              <StyledRegularText>{item.name}</StyledRegularText>
              <Switch
                {...switchStyles()}
                value={item.selected}
                onValueChange={(newValue) =>
                  handleSelectedApisUpdate(newValue, index)
                }
                activeText={t('preferences.off')}
                inActiveText={t('preferences.on')}
              />
            </StyledSwitchWrapper>
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => handleRefresh()}
            />
          }
        />
      )
    }
  }

  return (
    <StyledUserPreferences>
      <StyledUserPreferencesContent>
        <View>
          <StyledTitleText>{t('preferences.settings')}</StyledTitleText>
          <StyledSwitchWrapper>
            <StyledRegularText>
              {t('preferences.temperatureUnit')}
            </StyledRegularText>
            <Switch
              {...switchStyles()}
              value={isFahrenheit}
              onValueChange={(newIsFahrenheit) =>
                toggleTemperatureUnits(newIsFahrenheit)
              }
              activeText={t('preferences.celsius')}
              inActiveText={t('preferences.fahrenheit')}
            />
          </StyledSwitchWrapper>
          <StyledSwitchWrapper>
            <StyledRegularText>{t('preferences.language')}</StyledRegularText>
            <Switch
              {...switchStyles()}
              value={isPt}
              onValueChange={(newIsPt) => toggleLocale(newIsPt)}
              activeText={t('preferences.english')}
              inActiveText={t('preferences.portuguese')}
            />
          </StyledSwitchWrapper>
        </View>
        <StyledApis>
          <StyledTitleText>{t('preferences.weatherSources')}</StyledTitleText>
          {renderApis()}
        </StyledApis>
      </StyledUserPreferencesContent>
    </StyledUserPreferences>
  )
}

export default UserPreferences
