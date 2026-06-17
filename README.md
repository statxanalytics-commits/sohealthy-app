# SoHealthy App

React Native / Expo app for SoHealthy wellness ecosystem.

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure Supabase
1. Go to [supabase.com](https://supabase.com) → your project
2. Copy `.env.example` to `.env.local`
3. Fill in `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`
4. Run `supabase/schema.sql` in Supabase SQL Editor

### 3. Import order codes
In Supabase SQL Editor, import your codes from Google Sheets:
```sql
insert into orders (order_code, client_name, sheet_source)
values
  ('QK235-01518', 'Kledi_xh', 'ULTRA'),
  -- add all your codes here
on conflict (order_code) do nothing;
```

### 4. Run the app
```bash
npx expo start
```
- Press `i` for iOS simulator
- Press `a` for Android emulator  
- Scan QR code with Expo Go app on your phone

## Project Structure

```
app/
├── _layout.tsx          ← Root layout + auth routing
├── (auth)/
│   ├── splash.tsx       ← Splash/landing screen
│   ├── login.tsx        ← Login screen
│   └── signup.tsx       ← Register screen
└── (app)/
    ├── (tabs)/
    │   ├── home.tsx     ← Main hub screen
    │   ├── diet.tsx     ← Diet plan (premium)
    │   ├── scanner.tsx  ← Food scanner (premium)
    │   ├── products.tsx ← My products + tracker
    │   └── profile.tsx  ← User profile
    ├── activate.tsx     ← Enter order code
    ├── webview.tsx      ← WebView for free tools
    ├── product-guide.tsx ← Product instructions
    └── progress.tsx     ← Progress + scan history

src/
├── constants/index.ts   ← Colors, fonts, product config
├── hooks/useAuth.tsx    ← Auth context + Supabase
└── lib/supabase.ts      ← Supabase client

supabase/
└── schema.sql           ← Database schema
```

## Existing backends (Vercel)
- Scanner: `https://project-iaeqw.vercel.app/api/analyze`
- Diet generate: `https://sohealthy-diet.vercel.app/api/generate-diet`
- Diet validate: `https://sohealthy-diet.vercel.app/api/validate-code`

## Build for stores
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure
eas build:configure

# Build iOS (requires Apple Developer account $99/year)
eas build --platform ios

# Build Android (requires Google Play account $25 one-time)
eas build --platform android
```
