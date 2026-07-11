// app/index.tsx
import React, { useState } from 'react'; // 1. Import useState to track if popups are open
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { styles } from './homeStyles';

export default function Page() {
  // 2. CREATE THE LIGHT SWITCHES (State Variables)
  // These start as 'false', meaning the popups are hidden by default.
  const [topUpVisible, setTopUpVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState('₵10');

  const transactions = [
    { id: '1', title: 'Auntie Muni', date: 'Today, 12:43 pm', amount: '-₵25.00', type: 'expense', icon: '🍲' },
    { id: '2', title: 'MoMo Top Up', date: 'Today, 12:43 pm', amount: '+₵10.00', type: 'income', icon: '💵' },
    { id: '3', title: 'Auntie Muni', date: 'Today, 12:43 pm', amount: '-₵18.50', type: 'expense', icon: '🍲' },
    { id: '4', title: 'MoMo Top Up', date: 'Today, 12:43 pm', amount: '+₵50.00', type: 'income', icon: '💵' },
  ];

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
            <Text style={styles.balanceAmount}>₵ 75.00</Text>
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
          {/* 3. FLIP THE SWITCH: Clicking this turns 'topUpVisible' to true, opening the popup */}
          <TouchableOpacity style={styles.actionButton} onPress={() => setTopUpVisible(true)}>
            <Text style={styles.actionButtonText}>+  Top Up Wallet</Text>
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
          <Text style={styles.seeAllText}>see all &gt;</Text>
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

      {/* ========================================================= */}
      {/* --- POPUP 1: SELECT TOP UP AMOUNT MODAL (Screenshot 5) --- */}
      {/* ========================================================= */}
      <Modal visible={topUpVisible} transparent animationType="fade">
        <View style={modalStyles.overlayBackground}>
          <View style={modalStyles.whiteCard}>
            
            {/* Close 'X' Button */}
            <TouchableOpacity style={modalStyles.closeButton} onPress={() => setTopUpVisible(false)}>
              <Text style={modalStyles.closeXText}>✕</Text>
            </TouchableOpacity>
            
            <Text style={modalStyles.modalHeading}>Top Up Wallet</Text>
            <Text style={modalStyles.modalSubheading}>Select an amount to add via MoMo</Text>
            
            {/* Amount Selection Blocks Grid */}
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

            {/* Pay Button */}
            <TouchableOpacity 
              style={modalStyles.orangePayBtn}
              onPress={() => {
                setTopUpVisible(false);       // Close Amount Selection popup
                setSuccessVisible(true);      // Open Success popup!
              }}
            >
              <Text style={modalStyles.orangePayBtnText}>Add {selectedAmount} via MoMo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ========================================================= */}
      {/* --- POPUP 2: TOP UP SUCCESS MODAL (Screenshot 6) ------- */}
      {/* ========================================================= */}
      <Modal visible={successVisible} transparent animationType="fade">
        <View style={modalStyles.overlayBackground}>
          <View style={[modalStyles.whiteCard, { alignItems: 'center', paddingVertical: 32 }]}>
            
            {/* Round Checkmark Circle Icon */}
            <View style={modalStyles.checkmarkCircle}>
              <Text style={modalStyles.checkmarkIcon}>✓</Text>
            </View>
            
            <Text style={modalStyles.successHeaderTitle}>Top Up Successfull</Text>
            <Text style={modalStyles.successBodyMessage}>{selectedAmount}.00 added to your wallet</Text>
            
            {/* Done Close Button */}
            <TouchableOpacity style={modalStyles.doneBtn} onPress={() => setSuccessVisible(false)}>
              <Text style={modalStyles.doneBtnText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

// Styles specifically for handling popup layers
const modalStyles = StyleSheet.create({
  overlayBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark dim effect overlay over your screen
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
    backgroundColor: '#FFF8F0', // Slight light orange tint
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