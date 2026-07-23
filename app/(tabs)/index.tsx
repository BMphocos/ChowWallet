// app/index.tsx
import React, { useState, useCallback } from 'react'; 
import { 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  Alert, 
  TouchableOpacity, 
  Modal, 
  StyleSheet, 
  ActivityIndicator 
} from 'react-native';
import { styles } from './homeStyles';
import { router } from 'expo-router';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';


const API_URL = 'http://192.168.100.11:8000/api/profile/';

export default function Page() {
  // --- Core Wallet and Load Status States ---
  const [walletBalance, setWalletBalance] = useState<number>(0.00);
  const [loading, setLoading] = useState<boolean>(true);

  const [activeOverlay, setActiveOverlay] = useState<'topup' | null>(null);
  const [topUpInput, setTopUpInput] = useState('');

  // Fetches on initial mount AND every time this tab regains focus, so a
  // top-up made on another tab (e.g. Profile) is reflected here too.
  useFocusEffect(
    useCallback(() => {
      fetchWalletBalance();
    }, [])
  );

  const fetchWalletBalance = () => {
    axios.get(API_URL)
      .then(res => {
        const balance = res.data && res.data.wallet_balance ? parseFloat(res.data.wallet_balance) : 0.00;
        setWalletBalance(balance);
        setLoading(false);
      })
      .catch(err => {
        console.error("Database sync failed on home view:", err);
        setLoading(false);
      });
  };

  // 2. Push Top Up requests directly into the PostgreSQL Database via Django
  const handleTopUpSubmit = () => {
    const amount = parseFloat(topUpInput);
    if (!isNaN(amount) && amount > 0) {
      axios.post(API_URL, { amount: amount })
        .then(res => {
          if (res.data && res.data.success) {
            setWalletBalance(parseFloat(res.data.wallet_balance)); // Balance updates globally across views instantly
            setTopUpInput('');
            setActiveOverlay(null);
            Alert.alert("Success", `₵${amount.toFixed(2)} synchronized to database.`);
          }
        })
        .catch(err => {
          console.error(err);
          Alert.alert("Server Connection Error", "Could not verify financial balance with the vault.");
        });
    } else {
      Alert.alert("Invalid Amount", "Please input a valid numeric sum to top up.");
    }
  };

  const transactions = [
    { id: '1', title: 'Auntie Muni', date: 'Today, 12:43 pm', amount: '-₵25.00', type: 'expense', icon: '🍲' },
    { id: '2', title: 'MoMo Top Up', date: 'Today, 12:43 pm', amount: '+₵10.00', type: 'income', icon: '💵' },
    { id: '3', title: 'Auntie Muni', date: 'Today, 12:43 pm', amount: '-₵18.50', type: 'expense', icon: '🍲' },
    { id: '4', title: 'MoMo Top Up', date: 'Today, 12:43 pm', amount: '+₵50.00', type: 'income', icon: '💵' },
    { id: '5', title: "Auntie Muni's Kitchen", date: 'Today, 12:43 pm', amount: '-₵25.00', status: 'Delivered', type: 'expense', icon: '🍲' },
    { id: '6', title: 'MoMo Top Up', date: 'Today, 12:43 pm', amount: '+₵10.00', status: 'Completed', type: 'income', icon: '💵' },
    { id: '7', title: 'Mama Efua Kitchen', date: 'Today, 12:43 pm', amount: '-₵18.50', status: 'Delivered', type: 'expense', icon: '🍲' },
    { id: '8', title: 'MoMo Top Up', date: 'Today, 9:00 am', amount: '+₵50.00', status: 'Completed', type: 'income', icon: '💵' },
  ];

  // Prevent UI flashes or runtime NaN display while waiting for backend response
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#D97706" />
        <Text style={{ marginTop: 10, color: '#666' }}>Synchronizing currency records...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* --- Header Row --- */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greetingText}>Good afternoon,</Text>
            <Text style={styles.nameText}>Alfred Forson</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Text style={{ fontSize: 22 }}>🔔</Text>
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* --- Wallet Card --- */}
        <View style={styles.walletCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardBrand}>
              <View style={styles.orangeDot}><Text style={{ color: '#FFF', fontSize: 10, fontWeight: 'bold' }}>C</Text></View>
              <Text style={styles.brandText}>ChowWallet</Text>
            </View>
            <Text style={styles.cardNumber}>....4821</Text>
          </View>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Current Balance</Text>
            <Text style={styles.balanceAmount}>₵{walletBalance.toFixed(2)}</Text>
          </View>
          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.cardHolderLabel}>Card Holder</Text>
              <Text style={styles.cardHolderName}>Alfred Forson</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: -8 }}>
              <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#EA001B', opacity: 0.9 }} />
              <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#F79E1B', opacity: 0.9 }} />
            </View>
          </View>
        </View>

        {/* --- Quick Action Buttons --- */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={modalStyles.topUpButton} onPress={() => setActiveOverlay('topup')}>
            <Text style={modalStyles.topUpText}>+ Top Up</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>🍴  Order Food</Text>
          </TouchableOpacity>
        </View>

        {/* --- Stats Breakdowns --- */}
        <View style={styles.statsRow}>
          <View style={styles.statCol}>
            <Text style={[styles.statValue, { color: '#EA001B' }]}>₵25.50</Text>
            <Text style={styles.statLabel}>Spend Today</Text>
          </View>
          <View style={[styles.statCol, { borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#E4E4E7' }]}>
            <Text style={[styles.statValue, { color: '#F79E1B' }]}>₵25.50</Text>
            <Text style={styles.statLabel}>This Week</Text>
          </View>
          <View style={styles.statCol}>
            <Text style={[styles.statValue, { color: '#10B981' }]}>12</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
        </View>

        {/* --- Recent Transactions Section --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/history' as any)}>
            <Text style={{ color: 'orange' }}>see all &gt;</Text>
          </TouchableOpacity>
        </View>

        {transactions.map((tx) => (
          <View key={tx.id} style={styles.txRow}>
            <View style={styles.txLeft}>
              <View style={styles.txIconContainer}><Text style={{ fontSize: 18 }}>{tx.icon}</Text></View>
              <View>
                <Text style={styles.txTitle}>{tx.title}</Text>
                <Text style={styles.txDate}>{tx.date}</Text>
              </View>
            </View>
            <Text style={[styles.txAmount, { color: tx.type === 'expense' ? '#EA001B' : '#10B981' }]}>{tx.amount}</Text>
          </View>
        ))}
      </ScrollView>

      {/* --- Top Up Wallet Popup Overlay --- */}
      <Modal visible={activeOverlay === 'topup'} transparent animationType="slide">
        <View style={modalStyles.modalOverlay}>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.modalTitle}>Top Up Wallet</Text>
            <Text style={modalStyles.fieldLabel}>Enter Amount (₵)</Text>
            <TextInput
              style={modalStyles.formInput}
              keyboardType="numeric"
              placeholder="e.g. 50"
              value={topUpInput}
              onChangeText={setTopUpInput}
            />
            <View style={modalStyles.modalButtonGroup}>
              <TouchableOpacity style={modalStyles.cancelBtn} onPress={() => setActiveOverlay(null)}>
                <Text style={modalStyles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={modalStyles.submitBtn} onPress={handleTopUpSubmit}>
                <Text style={modalStyles.submitBtnText}>Add Cash</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const modalStyles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalContent: { backgroundColor: '#FFF', borderRadius: 16, width: '90%', padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#111', marginBottom: 15, textAlign: 'center' },
  fieldLabel: { fontSize: 13, fontWeight: '600', color: '#444', marginBottom: 6, marginTop: 10 },
  formInput: { borderWidth: 1, borderColor: '#DDD', borderRadius: 8, paddingHorizontal: 12, height: 40, fontSize: 14, color: '#333', marginBottom: 10, width: '100%' },
  modalButtonGroup: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 15 },
  cancelBtn: { paddingHorizontal: 16, paddingVertical: 10, marginRight: 10 },
  cancelBtnText: { color: '#666', fontWeight: '600' },
  submitBtn: { backgroundColor: '#D97706', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  submitBtnText: { color: '#FFF', fontWeight: 'bold' },
  topUpButton: { backgroundColor: '#D97706', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  topUpText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 }
});