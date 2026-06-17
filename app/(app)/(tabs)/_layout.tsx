import { Tabs } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../../src/constants'
import { useAuth } from '../../../src/hooks/useAuth'

function TabIcon({ icon, label, focused }: { icon: string; label: string; focused: boolean }) {
  return (
    <View style={[s.tabItem, focused && s.tabItemFocused]}>
      <Text style={[s.tabIcon, focused && s.tabIconFocused]}>{icon}</Text>
      <Text style={[s.tabLabel, focused && s.tabLabelFocused]}>{label}</Text>
    </View>
  )
}

export default function TabLayout() {
  const { isPremium } = useAuth()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: s.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🏠" label="Home" focused={focused} />
          ),
        }}
      />
      {isPremium && (
        <Tabs.Screen
          name="diet"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="🥗" label="Dieta" focused={focused} />
            ),
          }}
        />
      )}
      {isPremium && (
        <Tabs.Screen
          name="scanner"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="📷" label="Skaner" focused={focused} />
            ),
          }}
        />
      )}
      <Tabs.Screen
        name="products"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="📦" label="Produktet" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="👤" label="Profili" focused={focused} />
          ),
        }}
      />
    </Tabs>
  )
}

const s = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
    height: 72,
    paddingBottom: 8,
    paddingTop: 4,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingHorizontal: 8,
  },
  tabItemFocused: {},
  tabIcon: {
    fontSize: 20,
    opacity: 0.4,
  },
  tabIconFocused: {
    opacity: 1,
  },
  tabLabel: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 9,
    color: Colors.muted,
    opacity: 0.6,
  },
  tabLabelFocused: {
    fontFamily: 'DMSans_600SemiBold',
    color: Colors.pine,
    opacity: 1,
  },
})
