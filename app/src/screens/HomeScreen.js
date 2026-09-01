import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../components/Avatar';
import { colors, spacing, radius, typography, shadow } from '../theme';
import { summary, recentEntries } from '../data/mockData';

const features = [
  { id: 'customers', label: 'Customers', icon: 'people-outline', route: 'Customers' },
  { id: 'reports', label: 'Reports', icon: 'bar-chart-outline' },
  { id: 'reminders', label: 'Reminders', icon: 'notifications-outline' },
  { id: 'history', label: 'History', icon: 'time-outline' },
];

function typeMeta(type) {
  if (type === 'credit') return { label: 'Udhaar Given', color: colors.danger, sign: '-' };
  if (type === 'payment') return { label: 'Payment Received', color: colors.success, sign: '+' };
  return { label: 'Cash Sale', color: colors.success, sign: '+' };
}

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Namaste, Ramesh</Text>
            <Text style={styles.shopName}>Ramesh General Store</Text>
          </View>
          <TouchableOpacity style={styles.avatarButton}>
            <Ionicons name="person" size={20} color={colors.surface} />
          </TouchableOpacity>
        </View>

        <View style={[styles.dueCard, shadow.card]}>
          <View style={styles.dueCardTop}>
            <Text style={styles.dueLabel}>Total Pending Dues</Text>
            <Ionicons name="wallet-outline" size={20} color={colors.primaryDark} />
          </View>
          <Text style={styles.dueValue}>{'\u20B9'}{summary.pendingDues}</Text>
          <Text style={styles.dueCaption}>Across all customers</Text>
        </View>

        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, shadow.card]}>
            <Text style={styles.summaryLabel}>Today's Sales</Text>
            <Text style={styles.summaryValue}>{'\u20B9'}{summary.todaySales}</Text>
          </View>
          <View style={[styles.summaryCard, shadow.card]}>
            <Text style={styles.summaryLabel}>Credit Given</Text>
            <Text style={styles.summaryValue}>{'\u20B9'}{summary.creditGiven}</Text>
          </View>
        </View>

        <View style={styles.featuresGrid}>
          {features.map((f) => (
            <TouchableOpacity
              key={f.id}
              style={styles.featureItem}
              activeOpacity={0.75}
              onPress={() => f.route && navigation.navigate(f.route)}
            >
              <View style={[styles.featureIconWrap, shadow.card]}>
                <Ionicons name={f.icon} size={20} color={colors.primary} />
              </View>
              <Text style={styles.featureLabel}>{f.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeader}>Recent Entries</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Customers')}>
            <Text style={styles.sectionLink}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.entriesCard, shadow.card]}>
          <FlatList
            data={recentEntries}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => {
              const meta = typeMeta(item.type);
              return (
                <View style={styles.entryRow}>
                  <Avatar name={item.name} size={38} />
                  <View style={styles.entryLeft}>
                    <Text style={styles.entryName}>{item.name}</Text>
                    <Text style={styles.entryMeta}>{meta.label} • {item.time}</Text>
                  </View>
                  <Text style={[styles.entryAmount, { color: meta.color }]}>
                    {meta.sign}{'\u20B9'}{item.amount}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>

      <TouchableOpacity style={[styles.micButton, shadow.floating]} activeOpacity={0.85}>
        <Ionicons name="mic" size={28} color={colors.surface} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl + 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  greeting: {
    ...typography.caption,
    color: colors.textMuted,
  },
  shopName: {
    ...typography.h2,
    color: colors.text,
  },
  avatarButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dueCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  dueCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  dueLabel: {
    ...typography.label,
    color: colors.textMuted,
  },
  dueValue: {
    ...typography.h1,
    color: colors.primaryDark,
  },
  dueCaption: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  summaryLabel: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  summaryValue: {
    ...typography.h3,
    color: colors.text,
  },
  featuresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  featureItem: {
    alignItems: 'center',
    width: '23%',
  },
  featureIconWrap: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  featureLabel: {
    ...typography.caption,
    color: colors.text,
    textAlign: 'center',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionHeader: {
    ...typography.h3,
    color: colors.text,
  },
  sectionLink: {
    ...typography.label,
    color: colors.primary,
  },
  entriesCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
  },
  entryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  entryLeft: {
    flex: 1,
  },
  entryName: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  entryMeta: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  entryAmount: {
    ...typography.h3,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
  },
  micButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: spacing.xl,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
