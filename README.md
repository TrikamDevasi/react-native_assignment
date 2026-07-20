# SmartFieldSurvey 📋🚀

Welcome to **SmartFieldSurvey** — a powerful, offline-capable React Native mobile application designed for field professionals. Built with the modern **Expo** and **Expo Router** ecosystem, this app streamlines the process of capturing data, photos, and geographical information during field surveys.

---

## 🌟 Key Features

SmartFieldSurvey is packed with device-native integrations to ensure rapid and accurate data collection in the field:

- 📊 **Interactive Dashboard:** Get a quick overview of your activities with summary statistics and easy access to recent surveys.
- 📝 **Comprehensive Survey Creation:** Build field surveys with rich metadata, including titles, detailed descriptions, and linked assets.
- 📷 **Native Camera Integration:** Capture field documentation directly within the app and attach photos to your survey entries.
- 📍 **GPS & Location Tagging:** Automatically fetch and attach precise geographical coordinates to your field reports.
- 👤 **Contact Linking:** Access your device's address book to assign or link local contacts to specific surveys.
- 📋 **Clipboard Utilities:** Seamlessly copy and paste data between surveys and external applications.
- 📂 **Survey History & Preview:** Browse, search, and review all previously completed surveys in an organized list.

---

## 🧭 Navigation & UX

The app employs a dual-navigation architecture for a seamless user experience:
- **Drawer Navigation:** Swipe from the left (or tap the hamburger icon) to quickly access deep screens like Settings, Contacts, and Clipboard utilities.
- **Bottom Tabs:** Navigate between core modules: **Dashboard**, **New Survey**, **History**, and **Profile**.

---

## 🛠️ Technology Stack

Built using the bleeding-edge of the React Native ecosystem:

- **[Expo SDK](https://expo.dev/)** `~54.0.0` — Managed workflow for hassle-free device capability access.
- **[Expo Router](https://expo.github.io/router/)** `~6.0.24` — Next.js style file-based routing tailored for mobile.
- **[React Native](https://reactnative.dev/)** `0.81.5` — Core mobile UI framework.
- **[React](https://react.dev/)** `19.1.0` — The engine driving our component architecture.
- **[React Navigation Drawer](https://reactnavigation.org/)** `^7.13.2` — Smooth sidebar navigation.
- **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)** `~3.16.0` — Hardware-accelerated animations.
- **[Lucide React Native](https://lucide.dev/)** `^1.25.0` — Crisp, modern vector icons.
- **Device SDKs:** `expo-camera`, `expo-location`, `expo-contacts`, `expo-clipboard`.

---

## 📁 Project Architecture

The codebase follows an intuitive, domain-driven structure using `.jsx` extensions:

```text
SmartFieldSurvey/
├── app/
│   ├── _layout.jsx         # Root Drawer layout & Global SurveyProvider wrapper
│   ├── (tabs)/
│   │   ├── _layout.jsx     # Bottom Tab Navigator configuration
│   │   ├── index.jsx       # Dashboard / Home Screen
│   │   ├── new-survey.jsx  # Survey Creation workflow
│   │   ├── history.jsx     # Browse saved surveys
│   │   └── profile.jsx     # User profile and stats
│   ├── camera.jsx          # Camera capture module
│   ├── contacts.jsx        # Device contact picker module
│   ├── location.jsx        # GPS coordinates module
│   ├── clipboard.jsx       # Clipboard inspection module
│   ├── settings.jsx        # App configuration screen
│   └── survey-preview.jsx  # Detailed view for a specific survey
├── components/             # Reusable, stateless UI components
│   ├── AppHeader.js        # Universal navigation header
│   ├── ContactItem.js      # Contact list rows
│   ├── EmptyState.js       # Placeholder for empty lists
│   ├── PrimaryButton.js    # Themed action buttons
│   ├── QuickActionCard.js  # Dashboard action shortcuts
│   ├── SurveyCard.js       # Survey history list items
│   └── (others...)
├── context/
│   └── SurveyContext.js    # Global React Context for managing survey state
├── constants/
│   └── theme.js            # Centralized design tokens (colors, spacing, fonts)
├── assets/                 # App icons, splash screens, and images
├── app.json                # Expo manifest and plugin configuration
└── package.json            # Project dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- The **Expo Go** app installed on your physical iOS/Android device **OR** a properly configured iOS Simulator / Android Emulator.

### Installation & Running

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TrikamDevasi/SmartFieldSurvey.git
   cd SmartFieldSurvey
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npx expo start
   ```

4. **Launch the App:**
   - **Physical Device:** Open the Expo Go app and scan the QR code printed in the terminal.
   - **Simulator/Emulator:** Press `a` (for Android) or `i` (for iOS) in the terminal.

---

## 🔐 Device Permissions

To unlock the full potential of SmartFieldSurvey, the app will request the following runtime permissions:

- 📷 **Camera (`CAMERA`)** — Required to take photos inside the app for survey documentation.
- 📍 **Location (`ACCESS_FINE_LOCATION`)** — Required to attach accurate GPS tags to your survey reports.
- 👤 **Contacts (`READ_CONTACTS`)** — Required to link people from your address book to specific tasks or surveys.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.
