// app/order.tsx
import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';

export default function OrderScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Title */}
        <Text style={styles.title}>Order Food 🍴</Text>
        <Text style={styles.subtitle}>Find your favourite local vendors</Text>

        {/* Search Input */}
        <TextInput 
          style={styles.searchBar} 
          placeholder="Search for Waakye or Jollof..." 
          placeholderTextColor="#888"
        />

        {/* Categories (Horizontal Scroll) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
          {['All', 'Local', 'Grills', 'Healthy', 'Street Food'].map((cat, idx) => (
            <TouchableOpacity key={idx} style={[styles.catButton, idx === 0 && styles.activeCat]}>
              <Text style={[styles.catText, idx === 0 && styles.activeCatText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>🔥 FEATURED</Text>
        
        {/* Featured Vendor Card */}
        <View style={styles.featuredCard}>
          <View style={styles.badge}><Text style={styles.badgeText}>⭐ Featured</Text></View>
          <Text style={styles.vendorNameLarge}>Auntie Monicas Kitchen</Text>
          <Text style={styles.vendorDetails}>Ghanaian • Local</Text>
        </View>

        {/* Rest of your vendors list goes here... */}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFF', 
    paddingTop: 50 
},
  scrollContent: { 
    paddingHorizontal: 20 

  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold'
   },
  subtitle: { 
    color: '#666',
     marginTop: 4, 
     marginBottom: 20 },
  searchBar: { 
    backgroundColor: '#F4F4F5', 
    padding: 14, 
    borderRadius: 12, 
    fontSize: 16 },
  categoryRow: { flexDirection: 'row',
     marginVertical: 20 
    },
  catButton: {
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 20, 
    marginRight: 8, 
    backgroundColor: '#F4F4F5' 
},
  activeCat: { 
    backgroundColor: '#FF7A00' 

  },
  catText: { 
    color: '#666',
    fontWeight: '600' },
  activeCatText: { 
    color: '#FFF' },
  sectionTitle: { 
    fontSize: 14, 
    fontWeight: 'bold',
     color: '#333', 
    letterSpacing: 1, 
    marginVertical: 10 
},
  featuredCard: { 
    height: 180, 
    backgroundColor: '#E4E4E7', 
    borderRadius: 16, padding: 16, 
    justifyContent: 'flex-end' },
  badge: { 
    position: 'absolute', 
    top: 12, left: 12, 
    backgroundColor: '#FF7A00', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 12 },
  badgeText: { 
    color: '#FFF', 
    fontSize: 11, 
    fontWeight: 'bold' },
  vendorNameLarge: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#111' },
  vendorDetails: { 
    color: '#666', 
    fontSize: 13, 
    marginTop: 2 }
});