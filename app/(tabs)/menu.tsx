import { useRouter } from 'expo-router';
import React from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type MenuItem = {
  id: number;
  name: string;
  description: string;
  course: string;
  price: string;
};

const initialMenuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Milk Tart',
    description: 'Traditional South African dessert',
    course: 'Dessert',
    price: 'R75.00',
  },
  {
    id: 2,
    name: 'Grilled Chicken',
    description: 'Served with roasted vegetables',
    course: 'Main',
    price: 'R160.00',
  },
  {
    id: 3,
    name: 'Chicken Burger',
    description: 'Crispy chicken with salad',
    course: 'Main',
    price: 'R135.00',
  },
];

export default function MenuScreen() {
  const router = useRouter();
  const [menuItems] = React.useState<MenuItem[]>(initialMenuItems);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.push('/(tabs)/add-item')} style={styles.backButton}>
          <Text style={styles.backButtonText}>← GO BACK</Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Chef&apos;s Menu</Text>
          <Text style={styles.subtitle}>Manage your restaurant dishes</Text>

          {menuItems.map((item) => (
            <View key={item.id} style={styles.menuItemRow}>
              <View style={styles.menuTextWrap}>
                <Text style={styles.menuName}>{item.name}</Text>
                <Text style={styles.menuMeta}>{item.course} • {item.description}</Text>
              </View>
              <Text style={styles.menuPrice}>{item.price}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e1eb',
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#1f453d',
    fontSize: 14,
    fontWeight: '600',
  },
  container: {
    padding: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: '#1f453d',
    borderRadius: 24,
    padding: 18,
    width: '100%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 0,
  },
  title: {
    color: '#1f453d',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: '#58636a',
    fontSize: 15,
    marginBottom: 20,
  },
  menuItemRow: {
    borderWidth: 1,
    borderColor: '#e6e1eb',
    borderRadius: 12,
    backgroundColor: '#fbfbfc',
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  menuTextWrap: {
    flex: 1,
    marginRight: 10,
  },
  menuName: {
    color: '#1f453d',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  menuMeta: {
    color: '#58636a',
    fontSize: 12,
  },
  menuPrice: {
    color: '#6c5dd3',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 2,
  },
});
