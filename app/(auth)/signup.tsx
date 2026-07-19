// app/(auth)/signup.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop' }} 
      style={styles.background}
    >
      {/* ScrollView ensures input panels scale correctly when keyboard slides onto screen views */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.darkOverlay}>
          
          <Text style={styles.mainTitle}>Sign Up</Text>
          <Text style={styles.subtitle}>Please Sign Up to get started</Text>

          <View style={styles.formCard}>
            
            <Text style={styles.inputLabel}>NAME</Text>
            <TextInput style={styles.inputField} placeholder="John Doe" placeholderTextColor="#A1A1AA" value={name} onChangeText={setName} />

            <Text style={styles.inputLabel}>EMAIL</Text>
            <TextInput style={styles.inputField} placeholder="example@gmail.com" placeholderTextColor="#A1A1AA" value={email} onChangeText={setEmail} keyboardType="email-address" />

            <Text style={styles.inputLabel}>PASSWORD</Text>
            <TextInput style={styles.inputField} placeholder="••••••••••••" placeholderTextColor="#A1A1AA" value={password} onChangeText={setPassword} secureTextEntry />

            <Text style={styles.inputLabel}>CONFIRM PASSWORD</Text>
            <TextInput style={styles.inputField} placeholder="••••••••••••" placeholderTextColor="#A1A1AA" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

            <Text style={styles.inputLabel}>ADDRESS</Text>
            <TextInput style={styles.inputField} placeholder="eg GA-398-289" placeholderTextColor="#A1A1AA" value={address} onChangeText={setAddress} />

            <Text style={styles.inputLabel}>CONTACT</Text>
            <TextInput style={styles.inputField} placeholder="eg +233 50 345 4235" placeholderTextColor="#A1A1AA" value={contact} onChangeText={setContact} keyboardType="phone-pad" />

            <TouchableOpacity 
              style={styles.orangeSubmitBtn}
              onPress={() => router.replace('/(auth)/'as any)}
            >
              <Text style={styles.orangeSubmitBtnText}>SIGN UP</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginTop: 16, alignItems: 'center' }} onPress={() => router.back()}>
              <Text style={{ color: '#71717A', fontSize: 13 }}>Already have an account?<TouchableOpacity onPress={() => router.push('../(auth)/login')}>
                          <Text style={styles.redirectLinkText}>LOG IN</Text>
                          </TouchableOpacity></Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  scrollContainer: {
  flexGrow: 1
},
  darkOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 6
  },
  subtitle: {
    fontSize: 14,
    color: '#E4E4E7',
    textAlign: 'center',
    marginBottom: 24
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24
  },
  redirectLinkText: {
    color: '#FF7A00',
    fontWeight: 'bold',
    fontSize: 13
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4B5563',
    letterSpacing: 0.5,
    marginBottom: 4,
    marginTop: 12
  },
  inputField: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 14,
    color: '#111'
  },
  orangeSubmitBtn: {
    backgroundColor: '#FF7A00',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24
},
  orangeSubmitBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15
  }
});