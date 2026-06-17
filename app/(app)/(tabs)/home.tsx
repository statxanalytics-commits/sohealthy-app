import { useRouter } from 'expo-router'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { API, Colors, LOGO, Radius, Spacing } from '../../../src/constants'
import { useAuth } from '../../../src/hooks/useAuth'

const FREE_TOOLS = [
  { id: 'challenge', icon: '📅', name: 'Challenge 30d', sub: 'Program falas', url: API.challenge },
  { id: 'calculator', icon: '⚖️', name: 'Kalkulator Peshe', sub: 'Sa kg do humbasësh', url: API.calculator },
  { id: 'quiz', icon: '✨', name: 'Quiz Produktesh', sub: 'Gjej produktin ideal', url: API.quiz },
  { id: 'bodyCalc', icon: '📊', name: 'Llogaritje Trupi', sub: 'BMI, TDEE, makrot', url: API.bodyCalc },
]

const PREMIUM_TOOLS = [
  { id: 'diet', icon: '🥗', name: 'Plani i dietës', sub: '14 ditë personale', route: '/(app)/(tabs)/diet' },
  { id: 'scanner', icon: '📷', name: 'Skaner ushqimesh', sub: 'Analizo vaktet', route: '/(app)/(tabs)/scanner' },
  { id: 'tracker', icon: '⏰', name: 'Tracker', sub: 'Produktet ditore', route: '/(app)/(tabs)/products' },
  { id: 'progress', icon: '📈', name: 'Progresi', sub: 'Historia jote', route: '/(app)/progress' },
]

export default function HomeScreen() {
  const { profile, isPremium } = useAuth()
  const router = useRouter()

  const daysSinceStart = profile?.plan_start
    ? Math.floor((Date.now() - new Date(profile.plan_start).getTime()) / 86400000) + 1
    : null

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      {/* Header */}
      <View style={s.header}>
        <View style={s.headerTop}>
          <View style={s.logoRow}>
            <Image source={{ uri: LOGO }} style={s.logoImg} />
            <Text style={s.logoText}>SoHealthy</Text>
          </View>
          <View style={s.headerRight}>
            {isPremium && (
              <View style={s.premiumBadge}>
                <Text style={s.premiumBadgeText}>⭐ Premium</Text>
              </View>
            )}
            <View style={s.avatar}>
              <Text style={s.avatarText}>
                {profile?.name?.charAt(0)?.toUpperCase() ?? '?'}
              </Text>
            </View>
          </View>
        </View>

        <View style={s.greetBox}>
          {daysSinceStart ? (
            <>
              <Text style={s.greetTitle}>Dita {daysSinceStart} e programit 💚</Text>
              <Text style={s.greetSub}>Vazhdo kështu, {profile?.name?.split(' ')[0]}!</Text>
            </>
          ) : (
            <>
              <Text style={s.greetTitle}>Mirë se erdhe, {profile?.name?.split(' ')[0]} 👋</Text>
              <Text style={s.greetSub}>Fillo udhëtimin tënd të shëndetit</Text>
            </>
          )}
        </View>
      </View>

      <ScrollView style={s.body} showsVerticalScrollIndicator={false}>

        {/* Free tools */}
        <Text style={s.sectionLabel}>Mjetet falas</Text>
        <View style={s.grid}>
          {FREE_TOOLS.map(tool => (
            <TouchableOpacity
              key={tool.id}
              style={s.freeTile}
              onPress={() => router.push({ pathname: '/(app)/webview', params: { url: tool.url, title: tool.name } })}
            >
              <Text style={s.tileIcon}>{tool.icon}</Text>
              <Text style={s.tileName}>{tool.name}</Text>
              <Text style={s.tileSub}>{tool.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Premium section */}
        {isPremium ? (
          <>
            <Text style={s.sectionLabel}>Mjetet e tua</Text>
            <View style={s.grid}>
              {PREMIUM_TOOLS.map(tool => (
                <TouchableOpacity
                  key={tool.id}
                  style={s.premiumTile}
                  onPress={() => router.push(tool.route as any)}
                >
                  <Text style={s.tileIcon}>{tool.icon}</Text>
                  <Text style={[s.tileName, { color: Colors.white }]}>{tool.name}</Text>
                  <Text style={[s.tileSub, { color: Colors.aloe, opacity: 0.8 }]}>{tool.sub}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <>
            <Text style={s.sectionLabel}>Premium</Text>
            <TouchableOpacity
              style={s.unlockBanner}
              onPress={() => router.push('/(app)/activate')}
            >
              <View style={s.unlockIcon}>
                <Text style={{ fontSize: 20 }}>🔓</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.unlockTitle}>Zhblloko mjetet premium</Text>
                <Text style={s.unlockSub}>Fut kodin e porosisë tënde</Text>
              </View>
              <Text style={{ color: Colors.aloe, fontSize: 18 }}>›</Text>
            </TouchableOpacity>
          </>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.alabaster },
  header: {
    backgroundColor: Colors.pine,
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  logoImg: { width: 28, height: 28, borderRadius: 8 },
  logoText: { fontFamily: 'DMSans_600SemiBold', fontSize: 16, color: Colors.white },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  premiumBadge: {
    backgroundColor: 'rgba(113,181,162,0.2)',
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
  },
  premiumBadgeText: { fontFamily: 'DMSans_600SemiBold', fontSize: 10, color: Colors.aloe },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.aloe,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontFamily: 'DMSans_600SemiBold', fontSize: 13, color: Colors.pine },
  greetBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  greetTitle: { fontFamily: 'DMSans_600SemiBold', fontSize: 16, color: Colors.white, marginBottom: 3 },
  greetSub: { fontFamily: 'DMSans_400Regular', fontSize: 12, color: Colors.aloe },
  body: { flex: 1, padding: Spacing.lg },
  sectionLabel: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 10,
    color: Colors.muted,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
    marginTop: Spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  freeTile: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  premiumTile: {
    width: '48%',
    backgroundColor: Colors.pine,
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  tileIcon: { fontSize: 22, marginBottom: Spacing.sm },
  tileName: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 13,
    color: Colors.pine,
    marginBottom: 2,
  },
  tileSub: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 11,
    color: Colors.muted,
  },
  unlockBanner: {
    backgroundColor: Colors.pine,
    borderRadius: Radius.md,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  unlockIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(113,181,162,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unlockTitle: { fontFamily: 'DMSans_600SemiBold', fontSize: 14, color: Colors.white, marginBottom: 2 },
  unlockSub: { fontFamily: 'DMSans_400Regular', fontSize: 12, color: Colors.aloe },
})
