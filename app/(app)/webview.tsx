import { useLocalSearchParams, useRouter } from 'expo-router'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'
import { Colors, Spacing } from '../../src/constants'

export default function WebViewScreen() {
  const { url, title } = useLocalSearchParams<{ url: string; title: string }>()
  const router = useRouter()

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.back}>← Kthehu</Text>
        </TouchableOpacity>
        <Text style={s.title}>{title}</Text>
        <View style={{ width: 60 }} />
      </View>
      <WebView
        source={{ uri: url }}
        style={{ flex: 1 }}
        startInLoadingState
        renderLoading={() => (
          <View style={s.loading}>
            <ActivityIndicator color={Colors.pine} size="large" />
          </View>
        )}
      />
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.pine },
  header: {
    backgroundColor: Colors.pine,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.md,
  },
  back: { fontFamily: 'DMSans_400Regular', fontSize: 14, color: Colors.aloe },
  title: { fontFamily: 'DMSans_600SemiBold', fontSize: 15, color: Colors.white },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
