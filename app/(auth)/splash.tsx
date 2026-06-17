import { useRouter } from 'expo-router'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, LOGO, Radius, Spacing } from '../../src/constants'

export default function SplashScreen() {
  const router = useRouter()

  return (
    <SafeAreaView style={s.container}>
      <View style={s.center}>
        <Image source={{ uri: LOGO }} style={s.logo} />
        <Text style={s.title}>Shëndeti{'\n'}fillon këtu</Text>
        <Text style={s.sub}>
          Mjetet, planet dhe produktet{'\n'}SoHealthy — gjithçka në një vend
        </Text>
      </View>

      <View style={s.buttons}>
        <TouchableOpacity
          style={s.btnMain}
          onPress={() => router.push('/(auth)/signup')}
        >
          <Text style={s.btnMainText}>Krijo llogari falas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={s.btnSec}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={s.btnSecText}>Kam llogari — hyr</Text>
        </TouchableOpacity>

        <Text style={s.hint}>
          Ke blerë?{' '}
          <Text style={s.hintBold}>Fut kodin pas hyrjes →</Text>
        </Text>
      </View>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pine,
    paddingHorizontal: Spacing.xxl,
    justifyContent: 'space-between',
    paddingBottom: Spacing.xxxl,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 20,
    marginBottom: Spacing.xxl,
  },
  title: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 36,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 42,
    letterSpacing: -0.5,
    marginBottom: Spacing.lg,
  },
  sub: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: Colors.aloe,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttons: {
    gap: Spacing.md,
  },
  btnMain: {
    backgroundColor: Colors.aloe,
    borderRadius: Radius.md,
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnMainText: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 15,
    color: Colors.pine,
    letterSpacing: 0.3,
  },
  btnSec: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: Radius.md,
    paddingVertical: 15,
    alignItems: 'center',
  },
  btnSecText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 15,
    color: Colors.white,
  },
  hint: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
    color: Colors.aloe,
    textAlign: 'center',
    marginTop: Spacing.sm,
    opacity: 0.8,
  },
  hintBold: {
    fontFamily: 'DMSans_600SemiBold',
    color: Colors.white,
  },
})
