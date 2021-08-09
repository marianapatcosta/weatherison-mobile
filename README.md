# weatherison mobile

Mobile app developed with React Native, Expo and Styled Components to compare the weather forecast retrieved from the following weather APIs:

- accuweather
- dark sky
- clima cell
- IPMA
- open weather
- weather bit

The user can select which APIs want to consult and the default screen shows the comparative current weeather information. The comparative weather information for `today`and `tomorrow` can be accessed in this screen. By clicking on the displayed information for a specific API, another screen is rendered, showing the weather forecast information of that API for the following 5 days.

The expo-location is used to get user's location and display the forecast for this location by default. In addition, forecast information can be obtained to any location, by typing `city` and `country` in the search field.

This app uses i18n and can be visualized either in english or in portuguese. Temperature can be observed in `celsius`or `fahrenheit` degrees

![weatherison-mobile-overview](https://user-images.githubusercontent.com/43031902/124001501-99b0f900-d9cc-11eb-95e3-06dc429b6020.png)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development using Expo Go
```
yarn start
```

### Build expo app for android devices
```
expo build:android
```

### Build expo app for ios devices
```
expo build:ios
```
