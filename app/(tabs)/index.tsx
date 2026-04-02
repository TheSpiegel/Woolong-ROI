import React, { useState } from 'react';
import { Alert, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// @ts-ignore
import { calculateProfit } from '../../engine/calculator';
import { supabase } from '../../lib/supabase';

export default function WoolongCalculator() {
  const [salePrice, setSalePrice] = useState('');
  const [itemCost, setItemCost] = useState('');
  const [shipCost, setShipCost] = useState('');
  const [category, setCategory] = useState('standard');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  /* OBSERVATION 
  * onCalculate handles the math locally using the "engine"
  * onSaveFlip sends that math to the cloud (Supabase)
  * We use Alert.alert to give the user immediate feedback
  */

  const onCalculate = () => {
    const price = parseFloat(salePrice) || 0;
    const cost = parseFloat(itemCost) || 0;
    const shipping = parseFloat(shipCost) || 0;
    
    const data = calculateProfit(price, 0, cost, shipping, category);
    setResults(data);
  };

  const onSaveFlip = async () => {
    if (!results) {
      Alert.alert("Wait!", "Calculate the profit before saving.");
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase
        .from('inventory')
        .insert([
          {
            item_name: "New Flip", 
            sale_price: parseFloat(salePrice),
            item_cost: parseFloat(itemCost),
            shipping_cost: parseFloat(shipCost),
            net_profit: results.netProfit,
            user_id: user?.id
          }
        ]);

      if (error) throw error;
      Alert.alert("Success ✅", "Flip saved to your history!");
    } catch (error: any) {
      Alert.alert("Save Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Woolong ROI</Text>
          <Text style={styles.subtitle}>Bebop Profit Engine v2.0</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Sale Price ($)</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            placeholderTextColor="#64748b"
            keyboardType="decimal-pad"
            value={salePrice}
            onChangeText={setSalePrice}
          />

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={styles.label}>Item Cost</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                placeholderTextColor="#64748b"
                keyboardType="decimal-pad"
                value={itemCost}
                onChangeText={setItemCost}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.label}>Shipping</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                placeholderTextColor="#64748b"
                keyboardType="decimal-pad"
                value={shipCost}
                onChangeText={setShipCost}
              />
            </View>
          </View>

          <Text style={styles.label}>eBay Category</Text>
          <View style={styles.row}>
            <TouchableOpacity 
              style={[styles.tabBtn, category === 'standard' && styles.activeTab]} 
              onPress={() => setCategory('standard')}
            >
              <Text style={styles.tabText}>Standard</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabBtn, category === 'sneakers_over_150' && styles.activeTab, { marginLeft: 10 }]} 
              onPress={() => setCategory('sneakers_over_150')}
            >
              <Text style={styles.tabText}>Sneakers $150+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.calcBtn} onPress={onCalculate}>
          <Text style={styles.calcBtnText}>Calculate Profit</Text>
        </TouchableOpacity>

        {results && (
          <View style={styles.resultCard}>
            <Text style={styles.resultHeader}>Calculation Summary</Text>
            <View style={styles.resRow}>
              <Text style={styles.resLabel}>Fees</Text>
              <Text style={[styles.resVal, { color: '#fb7185' }]}>-${results.totalFees}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.resRow}>
              <Text style={styles.netLabel}>Net Profit</Text>
              <Text style={styles.netVal}>${results.netProfit}</Text>
            </View>

            <TouchableOpacity 
              style={[styles.calcBtn, { backgroundColor: '#6366f1', marginTop: 20 }]} 
              onPress={onSaveFlip}
              disabled={loading}
            >
              <Text style={styles.calcBtnText}>{loading ? "Saving..." : "Save to History"}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0f172a' },
  container: { padding: 20 },
  header: { marginBottom: 25, marginTop: Platform.OS === 'ios' ? 0 : 40 },
  title: { fontSize: 34, fontWeight: '900', color: '#f8fafc', letterSpacing: -1 },
  subtitle: { fontSize: 16, color: '#94a3b8', fontWeight: '500' },
  card: { backgroundColor: '#1e293b', padding: 20, borderRadius: 18, borderWidth: 1, borderColor: '#334155' },
  label: { color: '#94a3b8', fontSize: 13, fontWeight: '700', marginBottom: 6, textTransform: 'uppercase' },
  input: { backgroundColor: '#0f172a', color: '#f8fafc', padding: 16, borderRadius: 12, fontSize: 18, marginBottom: 16, borderWidth: 1, borderColor: '#475569' },
  row: { flexDirection: 'row', marginBottom: 16 },
  tabBtn: { flex: 1, padding: 12, backgroundColor: '#334155', borderRadius: 10, alignItems: 'center' },
  activeTab: { backgroundColor: '#6366f1' },
  tabText: { color: 'white', fontWeight: 'bold' },
  calcBtn: { backgroundColor: '#10b981', padding: 20, borderRadius: 15, alignItems: 'center', marginTop: 10, shadowColor: '#10b981', shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  calcBtnText: { color: 'white', fontSize: 20, fontWeight: '800' },
  resultCard: { marginTop: 25, backgroundColor: '#1e293b', padding: 25, borderRadius: 22, borderLeftWidth: 6, borderLeftColor: '#10b981' },
  resultHeader: { color: '#94a3b8', fontSize: 14, fontWeight: '700', marginBottom: 15, textTransform: 'uppercase' },
  resRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' },
  resLabel: { color: '#cbd5e1', fontSize: 16 },
  resVal: { color: '#f8fafc', fontSize: 16, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#334155', marginVertical: 12 },
  netLabel: { color: 'white', fontSize: 20, fontWeight: '800' },
  netVal: { color: '#4ade80', fontSize: 32, fontWeight: '900' },
});