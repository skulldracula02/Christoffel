import { useLocalSearchParams, useRouter } from 'expo-router';
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
  const params = useLocalSearchParams();
  const [menuItems, setMenuItems] = React.useState<MenuItem[]>(initialMenuItems);

  React.useEffect(() => {
    const dishParam = params.dish;
    if (!dishParam) return;

    try {
      const newDish = JSON.parse(Array.isArray(dishParam) ? dishParam[0] : dishParam) as MenuItem;
      setMenuItems((current) => [newDish, ...current]);
    } catch {
      // ignore invalid JSON
    }
  }, [params.dish]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
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

          <Pressable onPress={() => router.push('/(tabs)')} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Go Back</Text>
          </Pressable>
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
  backButton: {
    backgroundColor: '#e8e8e8',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  backButtonText: {
    color: '#1f453d',
    fontSize: 16,
    fontWeight: '700',
  },
});
