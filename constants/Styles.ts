// constants/Styles.ts
import { StyleSheet } from 'react-native';
import { Colors } from './Colors';

export const GlobalStyles = StyleSheet.create({
  flex1: { flex: 1 },
  flexRow: { flexDirection: 'row' },
  flexCol: { flexDirection: 'column' },
  justifyCenter: { justifyContent: 'center' },
  alignCenter: { alignItems: 'center' },
  justifyBetween: { justifyContent: 'space-between' },
  alignStart: { alignItems: 'flex-start' },
  alignEnd: { alignItems: 'flex-end' },
  itemsCenter: { alignItems: 'center' },
  selfCenter: { alignSelf: 'center' },

  // Spacing (equivalent to Tailwind m, p)
  p4: { padding: 16 },
  py4: { paddingVertical: 16 },
  px4: { paddingHorizontal: 16 },
  pt4: { paddingTop: 16 },
  pb4: { paddingBottom: 16 },
  pl4: { paddingLeft: 16 },
  pr4: { paddingRight: 16 },

  m2: { margin: 8 },
  m4: { margin: 16 },
  mt2: { marginTop: 8 },
  mt4: { marginTop: 16 },
  mb2: { marginBottom: 8 },
  mb4: { marginBottom: 16 },
  ml2: { marginLeft: 8 },
  ml4: { marginLeft: 16 },
  mr2: { marginRight: 8 },
  mr4: { marginRight: 16 },
  mxAuto: { marginLeft: 'auto', marginRight: 'auto' },

  // Text styles
  textBase: { fontSize: 16, color: Colors.dark.text },
  textLg: { fontSize: 18, color: Colors.dark.text },
  textXl: { fontSize: 20, color: Colors.dark.text },
  text2xl: { fontSize: 24, color: Colors.dark.text },
  text3xl: { fontSize: 30, color: Colors.dark.text },
  textWhite: { color: 'white' },
  textGray: { color: Colors.gray },
  textPrimary: { color: Colors.primary },
  textBold: { fontWeight: 'bold' },
  textCenter: { textAlign: 'center' },
  textRight: { textAlign: 'right' },

  // Backgrounds
  bgBlack: { backgroundColor: Colors.dark.background },
  bgGray: { backgroundColor: Colors.darkGray },
  bgLightGray: { backgroundColor: Colors.lightGray },
  bgTransparent: { backgroundColor: 'transparent' },

  // Borders
  borderB: { borderBottomWidth: 1, borderColor: Colors.lightGray },
  roundedFull: { borderRadius: 9999 },
  roundedMd: { borderRadius: 6 },
  roundedLg: { borderRadius: 12 },

  // Width/Height
  wFull: { width: '100%' },
  hFull: { height: '100%' },
  w16: { width: 64 },
  h16: { height: 64 },

  // Position
  absolute: { position: 'absolute' },
  bottom0: { bottom: 0 },
  left0: { left: 0 },
  right0: { right: 0 },
  top0: { top: 0 },
  z10: { zIndex: 10 },
  z20: { zIndex: 20 },
});