import { registerRootComponent } from 'expo';
import App from './app/index'; // The actual root component is handled by Expo Router

// This file is typically used for `registerRootComponent`.
// With Expo Router, the main entry is 'expo-router/entry' defined in package.json.
// So, this file is mostly kept for standard Expo project structure, but not directly used to render components.
// All application logic starts from app/_layout.tsx and app/(tabs)/_layout.tsx.

export default App; // This line might be misleading; the actual root is managed by Expo Router.