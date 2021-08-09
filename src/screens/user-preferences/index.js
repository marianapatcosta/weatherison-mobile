import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import { View, Alert, RefreshControl } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Switch } from '../../components'
import { PreferencesContext } from '../../context/preferences-context'
import i18n from '../../i18n'
import { StyledTitleText } from '../../themes/global-styles'
import { API_URL } from '../../constants'
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
  const [isPt, setIsPt] = useState(i18n.locale === 'pt')
  const {
    isFahrenheit,
    toggleTemperatureUnits,
    selectedApis,
    updateSelectedApis,
  } = useContext(PreferencesContext)
  const t = i18n.t

  const fetchApis = useCallback(async (signal) => {
    try {
      setIsLoading(true)
      const response = await fetch(`${API_URL}apis`, {
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

  const toggleLocale = async (isPt) => {
    try {
      i18n.locale = isPt ? 'pt' : 'en'
      setIsPt(isPt)
      await AsyncStorage.setItem('isPt', JSON.stringify(isPt))
    } catch (error) {
      console.error(error)
    }
  }

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
          keyExtractor={(_, index) => `api-placeholder-${index}`}
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
            <Switch
              label={item.name}
              value={item.selected}
              onValueChange={(newValue) =>
                handleSelectedApisUpdate(newValue, index)
              }
              activeText={t('preferences.off')}
              inActiveText={t('preferences.on')}
            />
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
          <Switch
            label={t('preferences.temperatureUnit')}
            value={isFahrenheit}
            onValueChange={(newIsFahrenheit) =>
              toggleTemperatureUnits(newIsFahrenheit)
            }
            activeText={t('preferences.celsius')}
            inActiveText={t('preferences.fahrenheit')}
          />
          <Switch
            label={t('preferences.language')}
            value={isPt}
            onValueChange={(newIsPt) => toggleLocale(newIsPt)}
            activeText={t('preferences.english')}
            inActiveText={t('preferences.portuguese')}
          />
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
