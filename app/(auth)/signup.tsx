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

export default function SignupScreen() {
  const router = useRouter()
  const { signUp } = useAuth()
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignup = async () => {
    if (!name || !username || !email || !password) {
      setError('Plotëso të gjitha fushat.')
      return
    }
    if (password.length < 6) {
      setError('Fjalëkalimi duhet të ketë të paktën 6 karaktere.')
      return
    }
    setLoading(true)
    setError('')
    const { error: err } = await signUp(
      email.trim().toLowerCase(),
      password,
      name.trim(),
      username.trim().toLowerCase()
    )
    if (err) setError(err)
    setLoading(false)
  }

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backText}>← Kthehu</Text>
        </TouchableOpacity>
        <Text style={s.title}>Krijo llogarinë</Text>
        <Text style={s.subtitle}>Falas — pa kartë krediti</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={s.form} keyboardShouldPersistTaps="handled">
          <View style={s.field}>
            <Text style={s.label}>EMRI</Text>
            <TextInput
              style={s.input}
              value={name}
              onChangeText={setName}
              placeholder="Emri yt"
              placeholderTextColor={Colors.mutedLight}
              autoComplete="name"
            />
          </View>

          <View style={s.field}>
            <Text style={s.label}>USERNAME</Text>
            <TextInput
              style={s.input}
              value={username}
              onChangeText={setUsername}
              placeholder="username"
              placeholderTextColor={Colors.mutedLight}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

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
              placeholder="Minimum 6 karaktere"
              placeholderTextColor={Colors.mutedLight}
              secureTextEntry
              autoComplete="new-password"
            />
          </View>

          {error ? <Text style={s.error}>{error}</Text> : null}

          <TouchableOpacity
            style={[s.btnPrimary, loading && { opacity: 0.6 }]}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color={Colors.white} />
              : <Text style={s.btnPrimaryText}>Krijo llogarinë →</Text>
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

          <Text style={s.terms}>
            Duke u regjistruar pranon Kushtet e Përdorimit të SoHealthy
          </Text>

          <TouchableOpacity
            style={s.switchRow}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={s.switchText}>
              Ke llogari?{' '}
              <Text style={s.switchLink}>Hyr këtu</Text>
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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
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
  terms: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 11,
    color: Colors.muted,
    textAlign: 'center',
    marginTop: Spacing.lg,
    lineHeight: 16,
  },
  switchRow: {
    marginTop: Spacing.lg,
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
