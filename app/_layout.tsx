import { DMSans_400Regular, DMSans_500Medium, DMSans_600SemiBold, useFonts } from '@expo-google-fonts/dm-sans'
import { Slot, useRouter, useSegments } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { AuthProvider, useAuth } from '../src/hooks/useAuth'

SplashScreen.preventAutoHideAsync()

function RootLayoutNav() {
  const { session, loading } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    const inAuthGroup = segments[0] === '(auth)'
    const inAppGroup = segments[0] === '(app)'

    if (!session && !inAuthGroup) {
      router.replace('/(auth)/splash')
    } else if (session && inAuthGroup) {
      router.replace('/(app)/(tabs)/home')
    }
  }, [session, loading])

  return <Slot />
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
  })

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  )
}
