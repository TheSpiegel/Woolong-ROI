import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// @ts-ignore - Bypassing strict TS for the local JS engine
import { calculateProfit } from '../../engine/calculator';

export default function WoolongCalculator() {
  const [salePrice, setSalePrice] = useState<string>('');
  const [shippingCharged, setShippingCharged] = useState<string>('');
  const [itemCost, setItemCost] = useState<string>('');
  const [actualShippingCost, setActualShippingCost] = useState<string>('');
  const [category, setCategory] = useState<string>('standard');
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    try {
      const price = parseFloat(salePrice) || 0;
      const shipCharge = parseFloat(shippingCharged) || 0;
      const cost = parseFloat(itemCost) || 0;
      const shipCost = parseFloat(actualShippingCost) || 0;

      const profitData = calculateProfit(price, shipCharge, cost, shipCost, category);
      setResults(profitData);
    } catch (error: any) {
      console.error("Calculation Error:", error);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      className="flex-1 bg-slate-900"
    >
      <ScrollView className="flex-1 px-6 pt-12">
        <Text className="text-3xl font-bold text-white mb-2">Woolong ROI</Text>
        <Text className="text-slate-400 mb-8">Profit Engine • Milestone 1</Text>

        <View className="space-y-4 mb-8">
          <View>
            <Text className="text-slate-300 font-semibold mb-1">Sale Price ($)</Text>
            <TextInput 
              className="bg-slate-800 text-white p-4 rounded-lg text-lg border border-slate-700"
              keyboardType="decimal-pad"
              value={salePrice}
              onChangeText={setSalePrice}
              placeholder="0.00"
              placeholderTextColor="#64748b"
            />
          </View>

          <View className="flex-row space-x-4">
            <View className="flex-1">
              <Text className="text-slate-300 font-semibold mb-1">Item Cost ($)</Text>
              <TextInput 
                className="bg-slate-800 text-white p-4 rounded-lg text-lg border border-slate-700"
                keyboardType="decimal-pad"
                value={itemCost}
                onChangeText={setItemCost}
                placeholder="0.00"
                placeholderTextColor="#64748b"
              />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-slate-300 font-semibold mb-1">Shipping Cost ($)</Text>
              <TextInput 
                className="bg-slate-800 text-white p-4 rounded-lg text-lg border border-slate-700"
                keyboardType="decimal-pad"
                value={actualShippingCost}
                onChangeText={setActualShippingCost}
                placeholder="0.00"
                placeholderTextColor="#64748b"
              />
            </View>
          </View>

          <Text className="text-slate-300 font-semibold mt-4 mb-1">Category</Text>
          <View className="flex-row space-x-2">
            <TouchableOpacity 
              onPress={() => setCategory('standard')}
              className={`p-3 rounded-lg border flex-1 ${category === 'standard' ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-800 border-slate-700'}`}
            >
              <Text className="text-white text-center font-semibold">Standard</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => setCategory('sneakers_over_150')}
              className={`p-3 rounded-lg border flex-1 ml-2 ${category === 'sneakers_over_150' ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-800 border-slate-700'}`}
            >
              <Text className="text-white text-center font-semibold">Sneakers $150+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          onPress={handleCalculate}
          className="bg-emerald-500 p-4 rounded-xl shadow-lg mb-8"
        >
          <Text className="text-center text-white font-bold text-xl">Calculate Net Profit</Text>
        </TouchableOpacity>

        {results && (
          <View className="bg-slate-800 p-6 rounded-2xl border border-slate-700 mb-12">
            <Text className="text-slate-400 font-semibold uppercase tracking-wider mb-4">Transaction Breakdown</Text>
            
            <View className="flex-row justify-between mb-2">
              <Text className="text-slate-300 text-lg">Gross Revenue</Text>
              <Text className="text-white text-lg">${results.totalRevenue}</Text>
            </View>
            
            <View className="flex-row justify-between mb-4 pb-4 border-b border-slate-700">
              <Text className="text-rose-400 text-lg">Total eBay Fees</Text>
              <Text className="text-rose-400 text-lg">-${results.totalFees}</Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-white font-bold text-2xl">Net Profit</Text>
              <Text className="text-emerald-400 font-bold text-3xl">${results.netProfit}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}