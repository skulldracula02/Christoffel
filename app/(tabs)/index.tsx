import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type MenuItem = {
  id: number;
  name: string;
  description: string;
  course: string;
  price: string;
};

const initialForm = {
  name: '',
  description: '',
  course: '',
  price: '',
};

export default function HomeScreen() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [statusMessage, setStatusMessage] = useState('');

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleAddMenuItem = () => {
    const cleanName = form.name.trim();
    const cleanDescription = form.description.trim();
    const cleanCourse = form.course.trim();
    const cleanPrice = form.price.trim();

    if (!cleanName || !cleanDescription || !cleanCourse || !cleanPrice) {
      Alert.alert('Missing required fields', 'Please complete all menu details before adding an item.');
      return;
    }

    const numericPrice = Number(cleanPrice);
    if (Number.isNaN(numericPrice) || numericPrice <= 0) {
      Alert.alert('Invalid price', 'Please enter a valid price greater than 0.');
      return;
    }

    const newItem: MenuItem = {
      id: Date.now(),
      name: cleanName,
      description: cleanDescription,
      course: cleanCourse,
      price: `R ${numericPrice.toFixed(2)}`,
    };

    setForm(initialForm);
    setStatusMessage(`${newItem.name} was added successfully.`);
    Alert.alert('Menu item added', `${newItem.name} has been added to the menu.`);

    router.push({
      pathname: '/(tabs)/menu-list',
      params: { dish: JSON.stringify(newItem) },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.sectionTitle}>Add a new menu item</Text>

          <Text style={styles.label}>Dish Name</Text>
          <TextInput
            value={form.name}
            onChangeText={(value) => updateField('name', value)}
            placeholder="Enter dish name"
            style={styles.input}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            value={form.description}
            onChangeText={(value) => updateField('description', value)}
            placeholder="Describe the dish"
            multiline
            numberOfLines={4}
            style={[styles.input, styles.textArea]}
          />

          <Text style={styles.label}>Course</Text>
          <TextInput
            value={form.course}
            onChangeText={(value) => updateField('course', value)}
            placeholder="Starter, Main, Dessert..."
            style={styles.input}
          />

          <Text style={styles.label}>Price</Text>
          <TextInput
            value={form.price}
            onChangeText={(value) => updateField('price', value)}
            placeholder="00.00"
            keyboardType="decimal-pad"
            style={styles.input}
          />

          <Pressable onPress={handleAddMenuItem} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Add Menu Item</Text>
          </Pressable>

          <Pressable onPress={() => router.push('/(tabs)/menu-list')} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>View List</Text>
          </Pressable>

          {statusMessage ? <Text style={styles.statusText}>{statusMessage}</Text> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    padding: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f453d',
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f453d',
    marginBottom: 8,
    marginTop: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dfe0e5',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 15,
    color: '#2b2e33',
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  primaryButton: {
    backgroundColor: '#6c5dd3',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#e8e8e8',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  secondaryButtonText: {
    color: '#1f453d',
    fontSize: 16,
    fontWeight: '700',
  },
  statusText: {
    marginTop: 12,
    color: '#1f453d',
    fontWeight: '600',
    fontSize: 14,
  },
});
