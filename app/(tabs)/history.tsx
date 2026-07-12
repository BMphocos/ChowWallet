// app/history.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function HistoryScreen() {
  const [activeTab, setActiveTab] = useState('All');
  
  const historyData = [
    { id: '1', title: "Auntie Muni's Kitchen", date: 'Today, 12:43 pm', amount: '-₵25.00', status: 'Delivered', type: 'expense', icon: '🍲' },
    { id: '2', title: 'MoMo Top Up', date: 'Today, 12:43 pm', amount: '+₵10.00', status: 'Completed', type: 'income', icon: '💵' },
    { id: '3', title: 'Mama Efua Kitchen', date: 'Today, 12:43 pm', amount: '-₵18.50', status: 'Delivered', type: 'expense', icon: '🍲' },
    { id: '4', title: 'MoMo Top Up', date: 'Today, 9:00 am', amount: '+₵50.00', status: 'Completed', type: 'income', icon: '💵' },
    { id: '5', title: 'Accra Grill House', date: 'Today, 9:00 am', amount: '-₵12.00', status: 'Delivered', type: 'expense', icon: '🔥' },
    { id: '6', title: "Kofi's Brokeman Spot", date: 'Today, 9:00 am', amount: '-₵55.00', status: 'Delivered', type: 'expense', icon: '🍠' },
    { id: '7', title: "Shola's Special Indomy", date: 'Today, 9:00 am', amount: '-₵32.00', status: 'Delivered', type: 'expense', icon: '🍳' },
    { id: '8', title: "Auntie Muni's Kitchen", date: 'Today, 12:43 pm', amount: '-₵25.00', status: 'Delivered', type: 'expense', icon: '🍲' },
    { id: '9', title: 'MoMo Top Up', date: 'Today, 12:43 pm', amount: '+₵10.00', status: 'Completed', type: 'income', icon: '💵' },
    { id: '10', title: 'Mama Efua Kitchen', date: 'Today, 12:43 pm', amount: '-₵18.50', status: 'Delivered', type: 'expense', icon: '🍲' },
    { id: '11', title: 'MoMo Top Up', date: 'Today, 9:00 am', amount: '+₵50.00', status: 'Completed', type: 'income', icon: '💵' },
    { id: '12', title: 'Accra Grill House', date: 'Today, 9:00 am', amount: '-₵12.00', status: 'Delivered', type: 'expense', icon: '🔥' },
    { id: '13', title: "Kofi's Brokeman Spot", date: 'Today, 9:00 am', amount: '-₵55.00', status: 'Delivered', type: 'expense', icon: '🍠' },
    { id: '14', title: "Shola's Special Indomy", date: 'Today, 9:00 am', amount: '-₵32.00', status: 'Delivered', type: 'expense', icon: '🍳' },
    { id: '15', title: "Auntie Muni's Kitchen", date: 'Today, 12:43 pm', amount: '-₵25.00', status: 'Delivered', type: 'expense', icon: '🍲' },
    { id: '16', title: 'MoMo Top Up', date: 'Today, 12:43 pm', amount: '+₵10.00', status: 'Completed', type: 'income', icon: '💵' },
    { id: '17', title: 'Mama Efua Kitchen', date: 'Today, 12:43 pm', amount: '-₵18.50', status: 'Delivered', type: 'expense', icon: '🍲' },
    { id: '18', title: 'MoMo Top Up', date: 'Today, 9:00 am', amount: '+₵50.00', status: 'Completed', type: 'income', icon: '💵' },
    { id: '19', title: 'Accra Grill House', date: 'Today, 9:00 am', amount: '-₵12.00', status: 'Delivered', type: 'expense', icon: '🔥' },
    { id: '20', title: "Kofi's Brokeman Spot", date: 'Today, 9:00 am', amount: '-₵55.00', status: 'Delivered', type: 'expense', icon: '🍠' },
    { id: '21', title: "Shola's Special Indomy", date: 'Today, 9:00 am', amount: '-₵32.00', status: 'Delivered', type: 'expense', icon: '🍳' },
    { id: '22', title: "Auntie Muni's Kitchen", date: 'Today, 12:43 pm', amount: '-₵25.00', status: 'Delivered', type: 'expense', icon: '🍲' },
    { id: '23', title: 'MoMo Top Up', date: 'Today, 12:43 pm', amount: '+₵10.00', status: 'Completed', type: 'income', icon: '💵' },
    { id: '24', title: 'Mama Efua Kitchen', date: 'Today, 12:43 pm', amount: '-₵18.50', status: 'Delivered', type: 'expense', icon: '🍲' },
    { id: '25', title: 'MoMo Top Up', date: 'Today, 9:00 am', amount: '+₵50.00', status: 'Completed', type: 'income', icon: '💵' },
    { id: '26', title: 'Accra Grill House', date: 'Today, 9:00 am', amount: '-₵12.00', status: 'Delivered', type: 'expense', icon: '🔥' },
    { id: '27', title: "Kofi's Brokeman Spot", date: 'Today, 9:00 am', amount: '-₵55.00', status: 'Delivered', type: 'expense', icon: '🍠' },
    { id: '28', title: "Shola's Special Indomy", date: 'Today, 9:00 am', amount: '-₵32.00', status: 'Delivered', type: 'expense', icon: '🍳' },
  ];

  return (
    <View style={styles.container}>
      {/* Top Header Stats */}
      <View style={styles.headerBlock}>
        <Text style={styles.mainTitle}>Transaction History</Text>
        <Text style={styles.subtext}>All your wallet activity</Text>
        
        <View style={styles.statsSummaryRow}>
          <View>
            <Text style={styles.statLabel}>↗ Total Spent</Text>
            <Text style={styles.statAmount}>₵75.00</Text>
            <Text style={styles.statCount}>7 Orders</Text>
          </View>
          <View>
            <Text style={styles.statLabel}>↙ Total Added</Text>
            <Text style={styles.statAmount}>₵75.00</Text>
            <Text style={styles.statCount}>3 Top ups</Text>
          </View>
        </View>
      </View>

      {/* Segmented Filter Pills */}
      <View style={styles.filterRow}>
        {['All', 'Orders', 'Top Ups'].map((tab) => (
          <TouchableOpacity 
            key={tab} 
            style={[styles.filterPill, activeTab === tab && styles.activePill]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.filterText, activeTab === tab && styles.activeFilterText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Transaction Feed */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 20 }}>
        {historyData.map((item) => (
          <View key={item.id} style={styles.txItem}>
            <View style={styles.txLeft}>
              <Text style={styles.txIcon}>{item.icon}</Text>
              <View>
                <Text style={styles.txTitle}>{item.title}</Text>
                <Text style={styles.txDate}>{item.date}</Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[styles.txAmount, { color: item.type === 'expense' ? '#EA001B' : '#10B981' }]}>{item.amount}</Text>
              <View style={[styles.statusBadge, { backgroundColor: item.type === 'expense' ? '#DCFCE7' : '#E0F2FE' }]}>
                <Text style={[styles.statusText, { color: item.type === 'expense' ? '#15803D' : '#0369A1' }]}>{item.status}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9', paddingTop: 60 },
  headerBlock: { paddingHorizontal: 24, marginBottom: 15 },
  mainTitle: { fontSize: 24, fontWeight: 'bold', color: '#111' },
  subtext: { fontSize: 13, color: '#71717A', marginTop: 2 },
  statsSummaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, backgroundColor: '#FFF', padding: 16, borderRadius: 16 },
  statLabel: { fontSize: 12, color: '#71717A' },
  statAmount: { fontSize: 20, fontWeight: 'bold', color: '#111', marginVertical: 4 },
  statCount: { fontSize: 11, color: '#A1A1AA' },
  filterRow: { flexDirection: 'row', gap: 12, paddingHorizontal: 24, marginBottom: 15 },
  filterPill: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, backgroundColor: 'transparent' },
  activePill: { backgroundColor: '#FF7A00' },
  filterText: { color: '#71717A', fontWeight: '600', fontSize: 14 },
  activeFilterText: { color: '#FFF' },
  txItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF', padding: 16, borderRadius: 16, marginBottom: 10 },
  txLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  txIcon: { fontSize: 22 },
  txTitle: { fontSize: 15, fontWeight: '600', color: '#111' },
  txDate: { fontSize: 12, color: '#71717A', marginTop: 2 },
  txAmount: { fontSize: 15, fontWeight: 'bold' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, marginTop: 4 },
  statusText: { fontSize: 10, fontWeight: '700' },
});
