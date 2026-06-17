import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Radius, Spacing } from '../../src/constants'
import { useAuth } from '../../src/hooks/useAuth'

const WHAT_YOU_GET = [
  { icon: '🥗', text: 'Plani i dietës — 14 ditë personal' },
  { icon: '📷', text: 'Skaner ushqimesh me AI' },
  { icon: '⏰', text: 'Tracker + njoftime ditore' },
  { icon: '📖', text: 'Guidat e plota të produkteve' },
  { icon: '📈', text: 'Progresi dhe historia' },
]

export default function ActivateScreen() {
  const router = useRouter()
  const { activatePremium } = useAuth()
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleActivate = async () => {
    if (!code.trim()) {
      setError('Fut kodin e porosisë.')
      return
    }
    setLoading(true)
    setError('')
    const { error: err } = await activatePremium(code.trim())
    if (err) {
      setError(err)
    } else {
      setSuccess(true)
      setTimeout(() => router.replace('/(app)/(tabs)/home'), 1500)
    }
    setLoading(false)
  }

  if (success) {
    return (
      <SafeAreaView style={[s.safe, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ fontSize: 60, marginBottom: 20 }}>🎉</Text>
        <Text style={s.successTitle}>Premium aktivizuar!</Text>
        <Text style={s.successSub}>Mirë se vjen në SoHealthy Premium</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backText}>← Kthehu</Text>
        </TouchableOpacity>
        <Text style={s.title}>Aktivizo premium</Text>
        <Text style={s.subtitle}>Ke blerë? Fut kodin dhe hap gjithçka</Text>
      </View>

      <ScrollView contentContainerStyle={s.body} keyboardShouldPersistTaps="handled">
        {/* What you get */}
        <View style={s.card}>
          <Text style={s.cardLabel}>ÇFARË FITON</Text>
          {WHAT_YOU_GET.map((item, i) => (
            <View key={i} style={s.getRow}>
              <View style={s.getIcon}>
                <Text style={{ fontSize: 16 }}>{item.icon}</Text>
              </View>
              <Text style={s.getText}>{item.text}</Text>
            </View>
          ))}
        </View>

        {/* Code input */}
        <Text style={s.label}>KODI I POROSISË</Text>
        <TextInput
          style={[s.input, error ? s.inputErr : null]}
          value={code}
          onChangeText={t => { setCode(t.toUpperCase()); setError('') }}
          placeholder="QK235-XXXXX"
          placeholderTextColor={Colors.mutedLight}
          autoCapitalize="characters"
          autoCorrect={false}
        />

        {error ? <Text style={s.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[s.btn, loading && { opacity: 0.6 }]}
          onPress={handleActivate}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color={Colors.white} />
            : <Text style={s.btnText}>Aktivizo tani →</Text>
          }
        </TouchableOpacity>

        <Text style={s.note}>
          Kodin e gjen në emailin e konfirmimit ose shkruaj në DM{' '}
          <Text style={{ fontFamily: 'DMSans_600SemiBold', color: Colors.pine }}>@sohealthy.al</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.pine },
  header: {
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  backBtn: { marginBottom: Spacing.lg },
  backText: { fontFamily: 'DMSans_400Regular', fontSize: 14, color: Colors.aloe },
  title: { fontFamily: 'DMSans_600SemiBold', fontSize: 24, color: Colors.white, marginBottom: 4 },
  subtitle: { fontFamily: 'DMSans_400Regular', fontSize: 13, color: Colors.aloe },
  body: {
    backgroundColor: Colors.alabaster,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: Spacing.xxl,
    flexGrow: 1,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  cardLabel: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 10,
    color: Colors.muted,
    letterSpacing: 1.2,
    marginBottom: Spacing.md,
  },
  getRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  getIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  getText: { fontFamily: 'DMSans_500Medium', fontSize: 13, color: Colors.pine, flex: 1 },
  label: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 10,
    color: Colors.muted,
    letterSpacing: 1,
    marginBottom: 6,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 15,
    fontSize: 18,
    fontFamily: 'DMSans_600SemiBold',
    color: Colors.pine,
    letterSpacing: 2,
    marginBottom: Spacing.sm,
  },
  inputErr: { borderColor: Colors.goji },
  error: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    color: Colors.goji,
    marginBottom: Spacing.md,
  },
  btn: {
    backgroundColor: Colors.pine,
    borderRadius: Radius.md,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  btnText: { fontFamily: 'DMSans_600SemiBold', fontSize: 15, color: Colors.white },
  note: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
    color: Colors.muted,
    textAlign: 'center',
    marginTop: Spacing.xl,
    lineHeight: 18,
  },
  successTitle: { fontFamily: 'DMSans_600SemiBold', fontSize: 24, color: Colors.white, marginBottom: 8 },
  successSub: { fontFamily: 'DMSans_400Regular', fontSize: 15, color: Colors.aloe },
})
