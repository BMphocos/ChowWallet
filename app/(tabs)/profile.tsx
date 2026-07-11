// app/profile.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Modal } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const [pushEnabled, setPushEnabled] = useState(false);
  const [bioEnabled, setBioEnabled] = useState(false);

  // 1. ADD STATE FOR POPUPS
  const [topUpVisible, setTopUpVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState('₵10');

  return (
    <View style={styles.container}>
      {/* Golden/Orange Header Summary */}
      <View style={styles.topCard}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.walletLabel}>Wallet Balance</Text>
            <Text style={styles.walletBalance}>₵75.00</Text>
          </View>
          {/* 2. TRIGGER THE MODAL ON PRESS */}
          <TouchableOpacity style={styles.topUpBtn} onPress={() => setTopUpVisible(true)}>
            <Text style={styles.topUpText}>+ Top Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.gridItem}><Text style={styles.gridIcon}>🍴</Text><Text style={styles.gridVal}>12</Text><Text style={styles.gridSub}>Orders</Text></View>
          <View style={styles.gridItem}><Text style={styles.gridIcon}>🛍️</Text><Text style={styles.gridVal}>₵8.50</Text><Text style={styles.gridSub}>Saved</Text></View>
          <View style={styles.gridItem}><Text style={styles.gridIcon}>⭐</Text><Text style={styles.gridVal}>340</Text><Text style={styles.gridSub}>Points</Text></View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 30 }}>
        {/* Account Section */}
        <Text style={styles.sectionLabel}>ACCOUNT</Text>
        <View style={styles.menuGroup}>
          <MenuRow icon="👤" label="Personal Information" value="Alfred Asante" />
          <MenuRow icon="📍" label="Delivery Addresses" value="2 Saved" />
          <MenuRow icon="🏦" label="Linked MoMo Number" value="0244...412" />
        </View>

        {/* Preferences Section */}
        <Text style={styles.sectionLabel}>PREFERENCES</Text>
        <View style={styles.menuGroup}>
          <View style={styles.row}>
            <Text style={styles.rowLeft}>🔔  Push Notifications</Text>
            <Switch value={pushEnabled} onValueChange={setPushEnabled} trackColor={{ true: '#FF7A00' }} />
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLeft}>🔑  Biometric Login</Text>
            <Switch value={bioEnabled} onValueChange={setBioEnabled} trackColor={{ true: '#FF7A00' }} />
          </View>
          <MenuRow icon="🌐" label="Language" value="English" />
        </View>

        {/* Support Section */}
        <Text style={styles.sectionLabel}>SUPPORT</Text>
        <View style={styles.menuGroup}>
          <MenuRow icon="⚙️" label="Help & Support" />
          <MenuRow icon="📄" label="Terms & Privacy" />
          <MenuRow icon="⭐" label="Rate ChowWallet" />
        </View>

        {/* Sign Out Action */}
        <TouchableOpacity style={styles.signOutButton}
        onPress={() => router.replace('/auth/login' as any)}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
        <Text style={styles.versionText}>ChowWallet v2.10</Text>
      </ScrollView>

      {/* ========================================================= */}
      {/* --- POPUP 1: SELECT TOP UP AMOUNT MODAL ------------------ */}
      {/* ========================================================= */}
      <Modal visible={topUpVisible} transparent animationType="fade">
        <View style={modalStyles.overlayBackground}>
          <View style={modalStyles.whiteCard}>
            
            <TouchableOpacity style={modalStyles.closeButton} onPress={() => setTopUpVisible(false)}>
              <Text style={modalStyles.closeXText}>✕</Text>
            </TouchableOpacity>
            
            <Text style={modalStyles.modalHeading}>Top Up Wallet</Text>
            <Text style={modalStyles.modalSubheading}>Select an amount to add via MoMo</Text>
            
            <View style={modalStyles.pillsGrid}>
              {['₵10', '₵20', '₵50', '₵100'].map((amt) => (
                <TouchableOpacity 
                  key={amt} 
                  style={[modalStyles.amtPill, selectedAmount === amt && modalStyles.selectedAmtPill]}
                  onPress={() => setSelectedAmount(amt)}
                >
                  <Text style={[modalStyles.amtText, selectedAmount === amt && modalStyles.selectedAmtText]}>{amt}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={modalStyles.orangePayBtn}
              onPress={() => {
                setTopUpVisible(false);
                setSuccessVisible(true);
              }}
            >
              <Text style={modalStyles.orangePayBtnText}>Add {selectedAmount} via MoMo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ========================================================= */}
      {/* --- POPUP 2: TOP UP SUCCESS MODAL ------------------------ */}
      {/* ========================================================= */}
      <Modal visible={successVisible} transparent animationType="fade">
        <View style={modalStyles.overlayBackground}>
          <View style={[modalStyles.whiteCard, { alignItems: 'center', paddingVertical: 32 }]}>
            
            <View style={modalStyles.checkmarkCircle}>
              <Text style={modalStyles.checkmarkIcon}>✓</Text>
            </View>
            
            <Text style={modalStyles.successHeaderTitle}>Top Up Successful</Text>
            <Text style={modalStyles.successBodyMessage}>{selectedAmount}.00 added to your wallet</Text>
            
            <TouchableOpacity style={modalStyles.doneBtn} onPress={() => setSuccessVisible(false)}>
              <Text style={modalStyles.doneBtnText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

function MenuRow({ icon, label, value }: { icon: string; label: string; value?: string }) {
  return (
    <TouchableOpacity style={styles.row}>
      <Text style={styles.rowText}>{icon}   {label}</Text>
      <Text style={styles.rowValue}>{value ? `${value}  >` : '>'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  topCard: { backgroundColor: '#FF7A00', paddingTop: 60, paddingHorizontal: 24, paddingBottom: 24, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  walletLabel: { color: '#FFECCC', fontSize: 13 },
  walletBalance: { color: '#FFF', fontSize: 28, fontWeight: 'bold', marginTop: 4 },
  topUpBtn: { backgroundColor: '#FFF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  topUpText: { color: '#FF7A00', fontWeight: 'bold', fontSize: 13 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 16, padding: 12 },
  gridItem: { alignItems: 'center', flex: 1 },
  gridIcon: { fontSize: 16 },
  gridVal: { color: '#FFF', fontWeight: 'bold', fontSize: 15, marginTop: 4 },
  gridSub: { color: '#FFECCC', fontSize: 11 },
  sectionLabel: { fontSize: 12, fontWeight: '700', color: '#71717A', marginTop: 24, marginBottom: 8, letterSpacing: 0.5 },
  menuGroup: { backgroundColor: '#FFF', borderRadius: 16, overflow: 'hidden', paddingHorizontal: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F4F4F5' },
  rowText: { fontSize: 15, color: '#111', fontWeight: '500' },
  rowLeft: { fontSize: 15, color: '#111', fontWeight: '500' },
  rowValue: { fontSize: 14, color: '#A1A1AA' },
  signOutButton: { marginTop: 30, alignItems: 'center', paddingVertical: 12 },
  signOutText: { color: '#EF4444', fontSize: 18, fontWeight: 'bold' },
  versionText: { color: '#A1A1AA', fontSize: 12, textAlign: 'center', marginTop: 4, marginBottom: 20 }
});

// Styles specifically for handling popup layers
const modalStyles = StyleSheet.create({
  overlayBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteCard: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 4,
    zIndex: 5,
  },
  closeXText: {
    fontSize: 14,
    color: '#A1A1AA',
    fontWeight: 'bold',
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
  },
  modalSubheading: {
    fontSize: 13,
    color: '#71717A',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 24,
  },
  pillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  amtPill: {
    width: '47%',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  selectedAmtPill: {
    borderColor: '#FF7A00',
    backgroundColor: '#FFF8F0',
  },
  amtText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  selectedAmtText: {
    color: '#FF7A00',
  },
  orangePayBtn: {
    backgroundColor: '#FF7A00',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  orangePayBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  checkmarkCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FF7A00',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkmarkIcon: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  successHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  successBodyMessage: {
    fontSize: 14,
    color: '#71717A',
    marginTop: 6,
    marginBottom: 28,
  },
  doneBtn: {
    backgroundColor: '#FF7A00',
    paddingHorizontal: 36,
    paddingVertical: 10,
    borderRadius: 20,
  },
  doneBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});