import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../lib/supabase';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error }: any = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error }: any = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    else Alert.alert('Check your inbox for verification!');
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Woolong ROI</Text>
          <Text style={styles.subtitle}>Log in to save your flips</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            placeholderTextColor="#64748b"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="#64748b"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, styles.signInButton]} 
          onPress={signInWithEmail} 
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Sign In'}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.signUpButton]} 
          onPress={signUpWithEmail} 
          disabled={loading}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContent: {
    padding: 24,
    justifyContent: 'center',
    flexGrow: 1,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#cbd5e1',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#1e293b',
    color: 'white',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  signInButton: {
    backgroundColor: '#10b981',
    marginTop: 12,
  },
  signUpButton: {
    backgroundColor: '#6366f1',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});