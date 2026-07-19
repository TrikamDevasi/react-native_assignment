# SmartFieldSurvey 📋

A React Native mobile application built with **Expo** and **Expo Router** for conducting smart field surveys. The app provides a complete survey workflow with device-native features including camera, location, contacts, and clipboard integration.

---

## Features

| Screen | Description |
|--------|-------------|
| **Dashboard** | Overview with quick-action cards and recent survey list |
| **New Survey** | Create field surveys with title, description, and linked location/contacts |
| **Survey History** | Browse and review all completed surveys |
| **Camera** | Capture photos for survey documentation |
| **Location** | Capture and display GPS coordinates for field surveys |
| **Contacts** | Browse and attach device contacts to surveys |
| **Clipboard** | Copy and paste data between surveys |
| **Settings** | App preferences and configuration |
| **Survey Preview** | Full preview of a saved survey |

## Navigation

- **Drawer navigation** — swipe from the left or tap the hamburger icon to access all screens
- **Bottom tab navigation** — Dashboard, New Survey, History, and Profile tabs

## Tech Stack

- [Expo](https://expo.dev/) `~57.0.7` — managed workflow
- [Expo Router](https://expo.github.io/router/) `^57.0.7` — file-based routing
- [React Native](https://reactnative.dev/) `0.86.0`
- [React](https://react.dev/) `19.2.3`
- [React Navigation Drawer](https://reactnavigation.org/) `^7.13.2`
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) `^4.5.2`
- [expo-camera](https://docs.expo.dev/versions/latest/sdk/camera/) — camera capture
- [expo-location](https://docs.expo.dev/versions/latest/sdk/location/) — GPS location
- [expo-contacts](https://docs.expo.dev/versions/latest/sdk/contacts/) — device contacts
- [expo-clipboard](https://docs.expo.dev/versions/latest/sdk/clipboard/) — clipboard access

## Project Structure

```
SmartFieldSurvey/
├── app/
│   ├── _layout.js          # Root drawer layout + SurveyProvider wrapper
│   ├── (tabs)/
│   │   ├── _layout.js      # Bottom tab navigator
│   │   ├── index.js        # Dashboard screen
│   │   ├── new-survey.js   # Create survey screen
│   │   ├── history.js      # Survey history screen
│   │   └── profile.js      # Profile screen
│   ├── camera.js           # Camera screen
│   ├── contacts.js         # Contacts screen
│   ├── location.js         # Location screen
│   ├── clipboard.js        # Clipboard screen
│   ├── settings.js         # Settings screen
│   └── survey-preview.js   # Survey detail/preview screen
├── components/
│   ├── AppHeader.js        # Reusable header component
│   ├── ContactItem.js      # Contact list item
│   ├── EmptyState.js       # Empty list placeholder
│   ├── PrimaryButton.js    # Styled button
│   ├── QuickActionCard.js  # Dashboard action card
│   └── SurveyCard.js       # Survey list card
├── context/
│   └── SurveyContext.js    # Global survey state (React Context)
├── assets/                 # Icons, splash, images
├── app.json                # Expo configuration
└── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Expo Go](https://expo.dev/go) app on your mobile device, **or** an Android/iOS simulator

### Installation

```bash
# Clone the repo
git clone https://github.com/TrikamDevasi/SmartFieldSurvey.git
cd SmartFieldSurvey

# Install dependencies
npm install

# Start the Expo development server
npm start
```

Then scan the QR code with **Expo Go** on your phone, or press `a` for Android / `i` for iOS simulator.

### Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the Expo dev server |
| `npm run android` | Open on Android device/emulator |
| `npm run ios` | Open on iOS simulator |
| `npm run web` | Open in web browser |

## Permissions

The app requests the following device permissions at runtime:

- 📷 **Camera** — for capturing survey photos
- 📍 **Location** — for GPS tagging of survey entries
- 👤 **Contacts** — for linking contacts to surveys

## License

MIT — see [LICENSE](./LICENSE) for details.
