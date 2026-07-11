// app/(auth)/login.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  return (
    // Replicates your candle-lit green background theme
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop' }} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.darkOverlay}>
        
        <Text style={styles.mainTitle}>Log In</Text>
        <Text style={styles.subtitle}>Please Sign In to your existing account</Text>

        {/* White Floating Form Box */}
        <View style={styles.formCard}>
        
          {/* Email input field */}
        <Text style={styles.inputLabel}>EMAIL</Text>
        <TextInput
            style={styles.inputField}
            placeholder="example@gmail.com"
            placeholderTextColor="#A1A1AA"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
        />

        <Text style={styles.inputLabel}>PASSWORD</Text>
        <View style={{ position: 'relative' }}>
            <TextInput
                style={styles.inputField}
                placeholder="••••••••••••"
                placeholderTextColor="#A1A1AA"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={secureText}
                autoCapitalize="none"
            />
            <TouchableOpacity
                style={styles.eyeIconContainer}
                onPress={() => setSecureText(!secureText)}
            >
        <Text style={{ fontSize: 16, color: '#A1A1AA' }}>{secureText ? '👁️' : '🙈'}</Text>
            </TouchableOpacity>
    </View>

        <TouchableOpacity style={styles.rememberRow}>
            <Text style={styles.rememberText}>Remember me</Text>
        </TouchableOpacity>

          {/* Big Action Orange Login Button */}
        <TouchableOpacity
            style={styles.orangeSubmitBtn}
            onPress={() => router.replace('/tabs/'as any)} // Swaps screen architecture to main dashboard tab layout
        >
            <Text style={styles.orangeSubmitBtnText}>LOG IN</Text>
        </TouchableOpacity>

          {/* Link navigation setup to point over to your signup file */}
        <View style={styles.footerRedirectRow}>
            <Text style={styles.redirectLabel}>Dont have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/signup'as any)}>
            <Text style={styles.redirectLinkText}>SIGN UP</Text>
            </TouchableOpacity>
        </View>

        <Text style={styles.dividerText}>Or</Text>

          {/* Third-Party Social Login Integrations Rows */}
        <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialIconCircle}><Text style={styles.socialEmoji}>🔵</Text></TouchableOpacity>
            <TouchableOpacity style={styles.socialIconCircle}><Text style={styles.socialEmoji}>🟢</Text></TouchableOpacity>
            <TouchableOpacity style={styles.socialIconCircle}><Text style={styles.socialEmoji}>⚫</Text></TouchableOpacity>
        </View>

        </View>
    </View>
    </ImageBackground>
);
}

const styles = StyleSheet.create({
  background: { flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height },
  darkOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.25)', justifyContent: 'center', paddingHorizontal: 24 },
  mainTitle: { fontSize: 32, fontWeight: 'bold', color: '#FFF', textAlign: 'center', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#E4E4E7', textAlign: 'center', marginBottom: 30 },
  formCard: { backgroundColor: '#FFFFFF', borderRadius: 28, padding: 24, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 15, elevation: 8 },
  inputLabel: { fontSize: 11, fontWeight: '700', color: '#4B5563', letterSpacing: 0.5, marginBottom: 6, marginTop: 14 },
  inputField: { backgroundColor: '#F3F4F6', paddingVertical: 14, paddingHorizontal: 16, borderRadius: 12, fontSize: 15, color: '#111', marginBottom: 4 },
  eyeIconContainer: { position: 'absolute', right: 16, top: 14 },
  rememberRow: { marginVertical: 12 },
  rememberText: { color: '#71717A', fontSize: 13 },
  orangeSubmitBtn: { backgroundColor: '#FF7A00', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  orangeSubmitBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 15, letterSpacing: 0.5 },
  footerRedirectRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  redirectLabel: { color: '#71717A', fontSize: 13 },
  redirectLinkText: { color: '#FF7A00', fontWeight: 'bold', fontSize: 13 },
  dividerText: { textStyle: 'center', textAlign: 'center', color: '#A1A1AA', marginVertical: 15, fontSize: 13 },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginBottom: 10 },
  socialIconCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' },
  socialEmoji: { fontSize: 18 }
});