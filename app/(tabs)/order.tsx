import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Modal 
} from 'react-native';

// --- TypeScript Interfaces ---
interface MenuItem {
  id: string;
  name: string;
  basePrice: number;
  quantity: number;
}

interface Vendor {
  id: string;
  name: string;
  category: string;
  rating: number;
  time: string;
  minOrder?: number;
  isFeatured?: boolean;
}

export default function OrderScreen() {
  // 1. App State
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  // Menu items state for the active modal
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: '1', name: 'Boiled Yam', basePrice: 5, quantity: 1 },
    { id: '2', name: 'Boiled Egg', basePrice: 4, quantity: 1 },
    { id: '3', name: 'Kontomere', basePrice: 5, quantity: 3 },
    { id: '4', name: 'Pear', basePrice: 5, quantity: 1 },
    { id: '5', name: 'Meat', basePrice: 15, quantity: 2 },
    { id: '6', name: 'Fish', basePrice: 10, quantity: 1 },
  ]);

  // 2. Mock Vendors Data (from your images)
  const vendors: Vendor[] = [
    { id: 'v1', name: "Auntie Muni's Kitchen", category: 'Ghanaian Local', rating: 4.9, time: '15-25 min', minOrder: 10, isFeatured: true },
    { id: 'v2', name: "Shola's special Indomy", category: 'Ghanaian Local', rating: 4.3, time: '20-30 min' },
    { id: 'v3', name: "Kofi's Gill House", category: 'Ghanaian Local', rating: 3.7, time: '5-10 min' },
  ];

  const categories = ['All', 'Local', 'Grills', 'Healthy', 'Street Food'];

  // 3. Logic Handlers
  const handleVendorPress = (vendor: Vendor) => {
    if (vendor.name === "Auntie Muni's Kitchen") {
      setSelectedVendor(vendor);
      setModalVisible(true);
    }
  };

  const handleIncrement = (id: string) => {
    setMenuItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const totalCartAmount = menuItems.reduce(
    (sum, item) => sum + item.basePrice * item.quantity, 
    0
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* --- Header --- */}
        <Text style={styles.headerTitle}>Order Food</Text>
        <Text style={styles.headerSubtitle}>Find your favourite local vendors</Text>

        {/* --- Search Bar --- */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput 
            style={styles.searchInput} 
            placeholder="search for Waakye or jollof..."
            placeholderTextColor="#888"
          />
        </View>

        {/* --- Categories Horizontal Scroll --- */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((cat) => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.categoryTab, activeCategory === cat && styles.activeCategoryTab]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.categoryText, activeCategory === cat && styles.activeCategoryText]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* --- Featured Section --- */}
        <Text style={styles.sectionTitle}>🔥 FEATURED</Text>
        {vendors.filter(v => v.isFeatured).map((featuredVendor) => (
          <TouchableOpacity 
            key={featuredVendor.id} 
            style={styles.featuredCard}
            onPress={() => handleVendorPress(featuredVendor)}
          >
            <View style={styles.featuredImagePlaceholder}>
              {/* Optional: Replace with <Image source={...}/> when assets are ready */}
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredBadgeText}>⭐ Featured</Text>
              </View>
              <View style={styles.featuredTextOverlay}>
                <Text style={styles.featuredName}>{featuredVendor.name}</Text>
                <Text style={styles.featuredSub}>{featuredVendor.category}</Text>
              </View>
            </View>
            <View style={styles.featuredDetails}>
              <Text style={styles.detailsText}>⭐ {featuredVendor.rating}   🕒 {featuredVendor.time}   Min ₵{featuredVendor.minOrder}</Text>
              <Text style={styles.seeMenuText}>See Menu &gt;</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* --- All Vendors Section --- */}
        <Text style={styles.sectionTitle}>🍀 ALL VENDORS</Text>
        {vendors.map((vendor) => (
          <TouchableOpacity 
            key={vendor.id} 
            style={styles.vendorRow} 
            onPress={() => handleVendorPress(vendor)}
          >
            <View style={styles.vendorImageFallback} />
            <View style={styles.vendorInfo}>
              <Text style={styles.vendorNameText}>{vendor.name}</Text>
              <Text style={styles.vendorCategoryText}>{vendor.category}</Text>
              <Text style={styles.vendorStatsText}>⭐ {vendor.rating}    {vendor.time}</Text>
            </View>
            <Text style={styles.arrowRight}>&gt;</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* --- Floating Bottom Cart Bar --- */}
      <View style={styles.floatingCartBar}>
        <Text style={styles.cartBarText}>🛒 Cart</Text>
        <Text style={styles.cartBarPrice}>₵0.00</Text>
      </View>

      {/* --- Menu Overlay Modal --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.modalHeader}>
              <Text style={styles.modalVendorTitle}>{selectedVendor?.name}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {menuItems.map((item) => {
                const currentTotal = item.basePrice * item.quantity;
                return (
                  <View key={item.id} style={styles.menuItemRow}>
                    <View>
                      <Text style={styles.menuItemName}>{item.name}(1=₵{item.basePrice})</Text>
                      <Text style={styles.menuItemPrice}>₵{currentTotal.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.plusButton}
                      onPress={() => handleIncrement(item.id)}
                    >
                      <Text style={styles.plusButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>

            <TouchableOpacity style={styles.payButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.payButtonText}>Pay ₵{totalCartAmount.toFixed(2)}</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
}

// --- Stylesheet UI Config ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingTop: 60,
    paddingHorizontal: 16
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111'
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 15
  },
  
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
    height: 45,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 15
  },
  searchIcon: {
    marginRight: 8,
    fontSize: 16
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333'
  },

  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    maxHeight: 40
  },
  categoryTab: {
    paddingHorizontal: 16,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
    marginRight: 8
  },
  activeCategoryTab: {
    backgroundColor: '#E57C00'
  },
  categoryText: {
    color: '#555',
    fontWeight: '500'
  },
  activeCategoryText: {
    color: '#FFF',
    fontWeight: 'bold'
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginVertical: 12
  },
  
  // Featured Layout
  featuredCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 2
  },
  featuredImagePlaceholder: {
    height: 160,
    backgroundColor: '#444',
    justifyContent: 'space-between',
    padding: 12
  },
  featuredBadge: {
    backgroundColor: '#FF9F00',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start'
  },
  featuredBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold'
  },
  featuredTextOverlay: {
    bottom: 0
  },
  featuredName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  featuredSub: {
    color: '#DDD',
    fontSize: 12
  },
  featuredDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    alignItems: 'center'
  },
  detailsText: {
    fontSize: 12,
    color: '#555'
  },
  seeMenuText: {
    fontSize: 12,
    color: '#E57C00',
    fontWeight: 'bold'
  },

  // List View Layout
  vendorRow: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 12, borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 1 
  },
  vendorImageFallback: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#DDD',
    marginRight: 12
  },
  vendorInfo: {flex: 1 

  },
  vendorNameText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222' 
  },
  vendorCategoryText: {
    fontSize: 12,
    color: '#777',
    marginVertical: 2
  },
  vendorStatsText: {
    fontSize: 12,
    color: '#444'
  },
  arrowRight: {
    fontSize: 18,
    color: '#CCC',
    paddingHorizontal: 4
  },

  // Floating Bar
  floatingCartBar: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#B3B3B3',
    height: 50, borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  cartBarText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  },
  cartBarPrice: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  },

  // Modal Setup
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center', padding: 20
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    maxHeight: '80%'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  modalVendorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222'
  },
  closeButton: {
    fontSize: 18,
    color: '#888',
    fontWeight: 'bold'
  },
  
  menuItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  menuItemName: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500'
  },
  menuItemPrice: {
    fontSize: 15,
    color: '#E57C00',
    fontWeight: 'bold',
    marginTop: 2 
  },
  plusButton: {
    backgroundColor: '#E57C00',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  plusButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  
  payButton: {
    backgroundColor: '#E57C00',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20
  },
  payButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});