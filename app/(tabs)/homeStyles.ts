// app/homeStyles.ts
import { StyleSheet, Platform, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  // --- Header Section ---
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 14,
    color: '#888',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    marginTop: 2,
  },
  notificationButton: {
    padding: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  // --- Wallet Card ---
  walletCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 24,
    padding: 24,
    height: 180,
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  cardBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orangeDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF7A00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardNumber: {
    color: '#A1A1AA',
    fontSize: 14,
  },
  balanceContainer: {
    marginVertical: 10,
    zIndex: 2,
  },
  balanceLabel: {
    color: '#A1A1AA',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  balanceAmount: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  cardHolderLabel: {
    color: '#71717A',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  cardHolderName: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  // --- Quick Actions ---
  actionRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FF7A00',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },
  actionButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // --- Stats Section ---
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
  },
  statCol: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#71717A',
  },
  // --- Transactions Section ---
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
  },
  seeAllText: {
    color: '#FF7A00',
    fontSize: 14,
    fontWeight: '600',
  },
  txRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
  },
  txLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  txIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F4F4F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txIcon: {
    fontSize: 18,
  },
  txTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  txDate: {
    fontSize: 12,
    color: '#71717A',
    marginTop: 2,
  },
  txAmount: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});