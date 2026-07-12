import React, { useState, useEffect } from 'react'; // Fixed spacing here
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch, 
  Modal, 
  TextInput,
  Alert,
  ActivityIndicator // Added to handle the loading state gracefully
} from 'react-native';
import axios from 'axios';

// --- TypeScript Interfaces for Core Profile States ---
interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

interface Address {
  id: string;
  label: string; 
  details: string;
}

// NOTE: If using a real device, keep your IP. If using Android Emulator, change to 'http://10.0.2.2:8000/api/profile/'
const API_URL = 'http://192.168.100.11:8000/api/profile/';

export default function ProfileScreen() {
  // --- Global Profile States ---
  const [walletBalance, setWalletBalance] = useState<number>(0.00);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchBackendData();
  }, []);

  const fetchBackendData = () => {
    axios.get(API_URL)
      .then(res => {
        // Ensures we fall back safely if data is missing or weirdly structured
        const balance = res.data && res.data.wallet_balance ? parseFloat(res.data.wallet_balance) : 0.00;
        setWalletBalance(balance);
        setLoading(false);
      })
      .catch(err => {
        console.error("Database connection error:", err);
        setLoading(false);
      });
  };

  const [profile, setProfile] = useState<UserProfile>({
    name: 'Alfred Asante',
    email: 'alfred.asante@st.ug.edu.gh',
    phone: '0541234567',
  });
  
  const [addresses, setAddresses] = useState<Address[]>([
    { id: '1', label: 'Home', details: 'Block C, East Legon, Accra' },
    { id: '2', label: 'Hostel', details: 'Pentagon Hall, UG Campus' },
  ]);
  
  const [momoNumber, setMomoNumber] = useState('0244123412');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [pushNotifications, setPushNotifications] = useState(false);
  const [biometricLogin, setBiometricLogin] = useState(false);

  // --- Modal Visibility Manager ---
  const [activeOverlay, setActiveOverlay] = useState<'topup' | 'personal' | 'addresses' | 'momo' | 'language' | 'support' | 'terms' | null>(null);

  // Temporary local input fields for form editing inside overlays
  const [topUpInput, setTopUpInput] = useState('');
  const [editName, setEditName] = useState(profile.name);
  const [editPhone, setEditPhone] = useState(profile.phone);
  const [editMomo, setEditMomo] = useState(momoNumber);
  const [newLabel, setNewLabel] = useState('');
  const [newDetails, setNewDetails] = useState('');

  // --- Logic Handlers ---
  const handleTopUpSubmit = () => {
    const amount = parseFloat(topUpInput);
    if (!isNaN(amount) && amount > 0) {
      axios.post(API_URL, { amount: amount })
        .then(res => {
          // Check for your backend response flags cleanly
          if (res.data && res.data.success) {
            setWalletBalance(parseFloat(res.data.wallet_balance)); 
            setTopUpInput('');
            setActiveOverlay(null);
            Alert.alert("Success", `₵${amount.toFixed(2)} synchronized to database.`);
          }
        })
        .catch((error) => {
          console.log(error);
          Alert.alert("Error", "Financial transaction rejected by server backend.");
        });
    } else {
      Alert.alert("Invalid Input", "Please enter a valid amount.");
    }
  };

  const handleSavePersonalInfo = () => {
    setProfile(prev => ({ ...prev, name: editName, phone: editPhone }));
    setActiveOverlay(null);
  };

  const handleSaveMomo = () => {
    if (editMomo.trim().length >= 10) {
      setMomoNumber(editMomo);
      setActiveOverlay(null);
    } else {
      Alert.alert("Error", "Please enter a valid Mobile Money phone number.");
    }
  };

  const handleAddAddress = () => {
    if (newLabel.trim() && newDetails.trim()) {
      const newAddr: Address = {
        id: Date.now().toString(),
        label: newLabel,
        details: newDetails
      };
      setAddresses(prev => [...prev, newAddr]);
      setNewLabel('');
      setNewDetails('');
    } else {
      Alert.alert("Missing Info", "Please fill in both the location label and address details.");
    }
  };

  const handleRateApp = () => {
    Alert.alert(
      "Rate ChowWallet",
      "Enjoying your food delivery experience? Rate us!",
      [
        { text: "⭐", onPress: () => Alert.alert("Thank you!", "Thanks for rating us 1 star.") },
        { text: "⭐⭐⭐", onPress: () => Alert.alert("Thank you!", "Thanks for rating us 3 stars.") },
        { text: "⭐⭐⭐⭐⭐ Excellent", onPress: () => Alert.alert("Thank you!", "Thanks for the five-star review!") },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  // Graceful loading spinner so the app doesn't crash while talking to Django
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#D97706" />
        <Text style={{ marginTop: 10, color: '#666' }}>Connecting to secure vault...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* --- Top Orange Header Banner --- */}
        <View style={styles.orangeHeader} />

        {/* --- Wallet Balance & Quick Stats Card --- */}
        <View style={styles.statsCard}>
          <View style={styles.walletRow}>
            <View>
              <Text style={styles.walletLabel}>Wallet Balance</Text>
              <Text style={styles.walletAmount}>₵{walletBalance.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.topUpButton} onPress={() => setActiveOverlay('topup')}>
              <Text style={styles.topUpText}>+ Top Up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Core Stats Matrix Layout */}
          <View style={styles.matrixRow}>
            <View style={styles.matrixItem}>
              <Text style={styles.matrixIcon}>🍽️</Text>
              <Text style={styles.matrixNumber}>12</Text>
              <Text style={styles.matrixLabel}>Orders</Text>
            </View>
            <View style={styles.matrixItem}>
              <Text style={styles.matrixIcon}>💰</Text>
              <Text style={styles.matrixNumber}>₵8.50</Text>
              <Text style={styles.matrixLabel}>Saved</Text>
            </View>
            <View style={styles.matrixItem}>
              <Text style={styles.matrixIcon}>⭐</Text>
              <Text style={styles.matrixNumber}>340</Text>
              <Text style={styles.matrixLabel}>Points</Text>
            </View>
          </View>
        </View>

        {/* --- ACCOUNT SECTION --- */}
        <Text style={styles.sectionHeader}>ACCOUNT</Text>
        <View style={styles.menuGroup}>
          <TouchableOpacity style={styles.menuItem} onPress={() => { setEditName(profile.name); setEditPhone(profile.phone); setActiveOverlay('personal'); }}>
            <Text style={styles.menuIcon}>👤</Text>
            <Text style={styles.menuText}>Personal Information</Text>
            <Text style={styles.menuValue} numberOfLines={1}>{profile.name} &gt;</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => setActiveOverlay('addresses')}>
            <Text style={styles.menuIcon}>📍</Text>
            <Text style={styles.menuText}>Delivery Addresses</Text>
            <Text style={styles.menuValue}>{addresses.length} Saved &gt;</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => { setEditMomo(momoNumber); setActiveOverlay('momo'); }}>
            <Text style={styles.menuIcon}>🏦</Text>
            <Text style={styles.menuText}>Linked MoMo Number</Text>
            <Text style={styles.menuValue}>
              {momoNumber.substring(0, 4)}...{momoNumber.substring(momoNumber.length - 3)} &gt;
            </Text>
          </TouchableOpacity>
        </View>

        {/* --- PREFERENCES SECTION --- */}
        <Text style={styles.sectionHeader}>PREFERENCES</Text>
        <View style={styles.menuGroup}>
          <View style={styles.menuItem}>
            <Text style={styles.menuIcon}>🔔</Text>
            <Text style={styles.menuText}>Push Notifications</Text>
            <Switch 
              value={pushNotifications} 
              onValueChange={setPushNotifications}
              trackColor={{ false: '#767577', true: '#D97706' }}
            />
          </View>

          <View style={styles.menuItem}>
            <Text style={styles.menuIcon}>🔑</Text>
            <Text style={styles.menuText}>Biometric Login</Text>
            <Switch 
              value={biometricLogin} 
              onValueChange={setBiometricLogin}
              trackColor={{ false: '#767577', true: '#D97706' }}
            />
          </View>

          <TouchableOpacity style={styles.menuItem} onPress={() => setActiveOverlay('language')}>
            <Text style={styles.menuIcon}>🌐</Text>
            <Text style={styles.menuText}>Language</Text>
            <Text style={styles.menuValue}>{selectedLanguage} &gt;</Text>
          </TouchableOpacity>
        </View>

        {/* --- SUPPORT SECTION --- */}
        <Text style={styles.sectionHeader}>SUPPORT</Text>
        <View style={styles.menuGroup}>
          <TouchableOpacity style={styles.menuItem} onPress={() => setActiveOverlay('support')}>
            <Text style={styles.menuIcon}>⚙️</Text>
            <Text style={styles.menuText}>Help & Support</Text>
            <Text style={styles.menuValueText}>&gt;</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => setActiveOverlay('terms')}>
            <Text style={styles.menuIcon}>📄</Text>
            <Text style={styles.menuText}>Terms & Privacy</Text>
            <Text style={styles.menuValueText}>&gt;</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleRateApp}>
            <Text style={styles.menuIcon}>⭐</Text>
            <Text style={styles.menuText}>Rate ChowWallet</Text>
            <Text style={styles.menuValueText}>&gt;</Text>
          </TouchableOpacity>
        </View>

        {/* --- Sign Out Footer --- */}
        <TouchableOpacity style={styles.signOutButton} onPress={() => Alert.alert("Sign Out", "Are you sure you want to sign out?")}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
        <Text style={styles.versionText}>ChowWallet v2.10</Text>
      </ScrollView>

      {/* --- ALL INLINE MODAL OVERLAY SCREENS --- */}
      
      {/* A. Top Up Wallet Popup Overlay */}
      <Modal visible={activeOverlay === 'topup'} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Top Up Wallet</Text>
            <Text style={styles.fieldLabel}>Enter Amount (₵)</Text>
            <TextInput
              style={styles.formInput}
              keyboardType="numeric"
              placeholder="e.g. 50"
              value={topUpInput}
              onChangeText={setTopUpInput}
            />
            <View style={styles.modalButtonGroup}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setActiveOverlay(null)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitBtn} onPress={handleTopUpSubmit}>
                <Text style={styles.submitBtnText}>Add Cash</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* B. Personal Information Editing Overlay */}
      <Modal visible={activeOverlay === 'personal'} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Personal Information</Text>
            
            <Text style={styles.fieldLabel}>Full Name</Text>
            <TextInput style={styles.formInput} value={editName} onChangeText={setEditName} />

            <Text style={styles.fieldLabel}>Phone Number</Text>
            <TextInput style={styles.formInput} keyboardType="phone-pad" value={editPhone} onChangeText={setEditPhone} />

            <Text style={styles.fieldLabel}>Email Address</Text>
            <TextInput style={[styles.formInput, { backgroundColor: '#F0F0F0', color: '#888' }]} value={profile.email} editable={false} />

            <View style={styles.modalButtonGroup}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setActiveOverlay(null)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitBtn} onPress={handleSavePersonalInfo}>
                <Text style={styles.submitBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* C. Delivery Addresses Management Overlay */}
      <Modal visible={activeOverlay === 'addresses'} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: '80%' }]}>
            <Text style={styles.modalTitle}>My Addresses</Text>
            
            <ScrollView style={{ maxHeight: 200, marginBottom: 15 }}>
              {addresses.map(item => (
                <View key={item.id} style={styles.addressListItem}>
                  <Text style={styles.addressItemLabel}>📍 {item.label}</Text>
                  <Text style={styles.addressItemDetails}>{item.details}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.divider} />
            <Text style={[styles.fieldLabel, { fontWeight: 'bold' }]}>Add New Location</Text>
            <TextInput style={styles.formInput} placeholder="Label (e.g. Office, Gym)" value={newLabel} onChangeText={setNewLabel} />
            <TextInput style={styles.formInput} placeholder="Full Delivery Details" value={newDetails} onChangeText={setNewDetails} />

            <View style={styles.modalButtonGroup}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setActiveOverlay(null)}>
                <Text style={styles.cancelBtnText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitBtn} onPress={handleAddAddress}>
                <Text style={styles.submitBtnText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* D. Linked Mobile Money Number Editing Overlay */}
      <Modal visible={activeOverlay === 'momo'} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Linked MoMo Account</Text>
            <Text style={styles.fieldLabel}>Mobile Money Number</Text>
            <TextInput 
              style={styles.formInput} 
              keyboardType="phone-pad" 
              value={editMomo} 
              onChangeText={setEditMomo}
              maxLength={10}
            />
            <Text style={{ fontSize: 11, color: '#888', marginBottom: 15 }}>
              * Used directly for automatic deductions upon one-tap checkout verification.
            </Text>
            <View style={styles.modalButtonGroup}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setActiveOverlay(null)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitBtn} onPress={handleSaveMomo}>
                <Text style={styles.submitBtnText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* E. Language Selection Modal */}
      <Modal visible={activeOverlay === 'language'} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            {['English', 'Twi', 'Ga', 'Ewe', 'Hausa'].map((lang) => (
              <TouchableOpacity 
                key={lang} 
                style={[styles.modalOption, selectedLanguage === lang && styles.activeOption]}
                onPress={() => {
                  setSelectedLanguage(lang);
                  setActiveOverlay(null);
                }}
              >
                <Text style={[styles.optionText, selectedLanguage === lang && styles.activeOptionText]}>
                  {lang}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.closeBtn} onPress={() => setActiveOverlay(null)}>
              <Text style={styles.closeBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* F. Help & Support View */}
      <Modal visible={activeOverlay === 'support'} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentLarge}>
            <Text style={styles.modalTitle}>Help & Support</Text>
            <ScrollView style={{ marginVertical: 10 }}>
              <Text style={styles.supportHeading}>📞 Live Call Support</Text>
              <Text style={styles.supportBody}>Need instant updates on your order state? Reach us at +233 24 000 0000.</Text>
              <Text style={styles.supportHeading}>💬 Dispatch Tickets</Text>
              <Text style={styles.supportBody}>Open an operational support message window. Response times standard averages under 3 mins.</Text>
            </ScrollView>
            <TouchableOpacity style={styles.closeBtnOrange} onPress={() => setActiveOverlay(null)}>
              <Text style={styles.closeBtnTextWhite}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* G. Terms & Privacy View */}
      <Modal visible={activeOverlay === 'terms'} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentLarge}>
            <Text style={styles.modalTitle}>Terms & Privacy Policy</Text>
            <ScrollView style={{ marginVertical: 10 }}>
              <Text style={styles.supportHeading}>1. Financial Processing Data</Text>
              <Text style={styles.supportBody}>ChowWallet handles network provider wallet hooks securely. Verification strings and keys remain local.</Text>
              <Text style={styles.supportHeading}>2. Deliveries Terms</Text>
              <Text style={styles.supportBody}>Merchant prep status relies entirely on local restaurant operating hours.</Text>
            </ScrollView>
            <TouchableOpacity style={styles.closeBtnOrange} onPress={() => setActiveOverlay(null)}>
              <Text style={styles.closeBtnTextWhite}>Accept & Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  orangeHeader: { height: 120, backgroundColor: '#D97706', width: '100%' },
  statsCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: -50,
    padding: 16, elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  walletRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  walletLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500'
  },
  walletAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    marginTop: 2
  },
  topUpButton: {
    backgroundColor: '#D97706',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20
  },
  topUpText: {
    color: '#FFF',
    fontWeight: 'bold', fontSize: 14
  },
  divider: {
    height: 1,
    backgroundColor: '#EFEFEF',
    marginVertical: 14
  },
  matrixRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  matrixItem: {
    alignItems: 'center'
  },
  matrixIcon: {
    fontSize: 20,
    marginBottom: 4
  },
  matrixNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222' },
  matrixLabel: { fontSize: 11,
    color: '#777',
    marginTop: 2
  },
  sectionHeader: { fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
    marginLeft: 20,
    marginTop: 22,
    marginBottom: 8
  },
  menuGroup: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#ECECEC'
  },
  menuItem: {
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
    paddingHorizontal: 14,
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#F5F5F5'
  },
  menuIcon: {
    fontSize: 16,
    marginRight: 10,
    width: 20,
    textAlign: 'center'
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontWeight: '400'
  },
  menuValue: {
    fontSize: 13,
    color: '#888',
    maxWidth: '40%'
  },
  menuValueText: {
    fontSize: 14,
    color: '#BBB',
    fontWeight: 'bold'
  },
  signOutButton: {
    marginTop: 30,
    alignItems: 'center',
    paddingVertical: 10
  },
  signOutText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold'
  },
  versionText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginTop: 4
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    width: '90%',
    padding: 20 },
  modalContentLarge: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    width: '90%',
    maxHeight: '70%',
    padding: 20
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 15,
    textAlign: 'center'
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6,
    marginTop: 10
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    width: '100%'
  },
  modalButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15
  },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10
  },
  cancelBtnText: {
    color: '#666',
    fontWeight: '600'
  },
  submitBtn: {
    backgroundColor: '#D97706',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8
  },
  submitBtnText: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  addressListItem: {
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EEE'
  },
  addressItemLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333'
  },
  addressItemDetails: {
    fontSize: 12,
    color: '#666',
    marginTop: 2
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EEE',
    alignItems: 'center',
    width: '100%'
  },
  activeOption: {
    backgroundColor: '#FFF9F2'
  },
  optionText: {
    fontSize: 15,
    color: '#333'
  },
  activeOptionText: {
    color: '#D97706',
    fontWeight: 'bold'
  },
  closeBtn: {
    marginTop: 15,
    alignItems: 'center',
    padding: 10,
    width: '100%'
  },
  closeBtnText: {
    color: '#666',
    fontSize: 15,
    fontWeight: '600'
  },
  closeBtnOrange: {
    backgroundColor: '#D97706',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  closeBtnTextWhite: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15 },
  supportHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 12,
    marginBottom: 4
  },
  supportBody: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18
  }
});