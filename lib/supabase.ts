import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

// Use secure storage on native platforms, localStorage on web
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return Platform.OS !== 'web' 
      ? SecureStore.getItemAsync(key)
      : localStorage.getItem(key)
  },
  setItem: (key: string, value: string) => {
    // Only store essential auth data
    if (key.includes('auth')) {
      try {
        const data = JSON.parse(value);
        // Only store access token, refresh token, and expiry
        const minimalData = {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          expires_at: data.expires_at
        };
        return SecureStore.setItemAsync(key, JSON.stringify(minimalData));
      } catch (e) {
        return SecureStore.setItemAsync(key, value);
      }
    }
    return SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    return Platform.OS !== 'web'
      ? SecureStore.deleteItemAsync(key)
      : localStorage.removeItem(key)
  }
}

// Replace with your Supabase URL and anon key
const supabaseUrl = 'https://ppwuyprjtfcsvfykbddh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwd3V5cHJqdGZjc3ZmeWtiZGRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxNDg1NzgsImV4cCI6MjA1NDcyNDU3OH0.Xd4RU4KCPHHw07E52j2mt8LTj8xo6c8rBCgY_kTknwM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
}) 