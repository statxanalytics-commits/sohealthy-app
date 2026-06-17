import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
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

export default function LoginScreen() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Plotëso të gjitha fushat.')
      return
    }
    setLoading(true)
    setError('')
    const { error: err } = await signIn(email.trim().toLowerCase(), password)
    if (err) setError(err)
    setLoading(false)
  }

  return (
    <SafeAreaView style={s.safe}>
      {/* Green header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backText}>← Kthehu</Text>
        </TouchableOpacity>
        <Text style={s.title}>Hyr në llogari</Text>
        <Text style={s.subtitle}>Mirë se u ktheve</Text>
      </View>

      {/* White form body */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={s.form} keyboardShouldPersistTaps="handled">
          <View style={s.field}>
            <Text style={s.label}>EMAIL</Text>
            <TextInput
              style={s.input}
              value={email}
              onChangeText={setEmail}
              placeholder="adresa@email.com"
              placeholderTextColor={Colors.mutedLight}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
          </View>

          <View style={s.field}>
            <Text style={s.label}>FJALËKALIMI</Text>
            <TextInput
              style={s.input}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={Colors.mutedLight}
              secureTextEntry
              autoComplete="password"
            />
          </View>

          <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
            <Text style={s.forgot}>Harrova fjalëkalimin</Text>
          </TouchableOpacity>

          {error ? <Text style={s.error}>{error}</Text> : null}

          <TouchableOpacity
            style={[s.btnPrimary, loading && { opacity: 0.6 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color={Colors.white} />
              : <Text style={s.btnPrimaryText}>Hyr →</Text>
            }
          </TouchableOpacity>

          <View style={s.dividerRow}>
            <View style={s.dividerLine} />
            <Text style={s.dividerText}>ose</Text>
            <View style={s.dividerLine} />
          </View>

          <TouchableOpacity style={s.btnSecondary}>
            <Text style={s.btnSecondaryText}>Hyr me Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={s.switchRow}
            onPress={() => router.push('/(auth)/signup')}
          >
            <Text style={s.switchText}>
              Nuk ke llogari?{' '}
              <Text style={s.switchLink}>Regjistrohu falas</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
  backText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: Colors.aloe,
  },
  title: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 26,
    color: Colors.white,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    color: Colors.aloe,
  },
  form: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing.xxl,
    flexGrow: 1,
  },
  field: { marginBottom: Spacing.lg },
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
    paddingVertical: 13,
    fontSize: 15,
    fontFamily: 'DMSans_400Regular',
    color: Colors.pine,
  },
  forgot: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
    color: Colors.aloe,
    marginBottom: Spacing.xl,
  },
  error: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    color: Colors.goji,
    marginBottom: Spacing.md,
  },
  btnPrimary: {
    backgroundColor: Colors.pine,
    borderRadius: Radius.md,
    paddingVertical: 15,
    alignItems: 'center',
  },
  btnPrimaryText: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 15,
    color: Colors.white,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginVertical: Spacing.lg,
  },
  dividerLine: { flex: 1, height: 0.5, backgroundColor: Colors.border },
  dividerText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
    color: Colors.muted,
  },
  btnSecondary: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingVertical: 13,
    alignItems: 'center',
  },
  btnSecondaryText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
    color: Colors.pine,
  },
  switchRow: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  switchText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    color: Colors.muted,
  },
  switchLink: {
    fontFamily: 'DMSans_600SemiBold',
    color: Colors.pine,
  },
})
