// app/+not-found.tsx
import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '@/constants/Styles';
import { Colors } from '@/constants/Colors';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Cette page n'existe pas.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Retour à l'accueil</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.flex1,
    ...GlobalStyles.alignCenter,
    ...GlobalStyles.justifyCenter,
    padding: 20,
    backgroundColor: Colors.dark.background,
  },
  title: {
    ...GlobalStyles.textXl,
    ...GlobalStyles.textBold,
    ...GlobalStyles.textWhite,
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    ...GlobalStyles.textLg,
    color: Colors.dark.tint,
  },
});