import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../components/Avatar';
import { colors, spacing, radius, typography, shadow } from '../theme';
import { fullHistory } from '../data/mockData';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'credit', label: 'Udhaar' },
  { id: 'debit', label: 'Sales' },
  { id: 'payment', label: 'Payments' },
];

function typeMeta(type) {
  if (type === 'credit') return { label: 'Udhaar Given', color: colors.danger, sign: '-', icon: 'arrow-up-circle-outline' };
  if (type === 'payment') return { label: 'Payment Received', color: colors.success, sign: '+', icon: 'arrow-down-circle-outline' };
  return { label: 'Cash Sale', color: colors.success, sign: '+', icon: 'cash-outline' };
}

export default function HistoryScreen({ navigation }) {
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return fullHistory;
    return fullHistory.filter((e) => e.type === filter);
  }, [filter]);

  return (
    <View style={styles.flex}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>History</Text>
        <View style={{ width: 38 }} />
      </View>

      <View style={styles.filterRow}>
        {FILTERS.map((f) => {
          const isActive = f.id === filter;
          return (
            <TouchableOpacity
              key={f.id}
              style={[styles.filterChip, isActive && styles.filterChipActive]}
              onPress={() => setFilter(f.id)}
            >
              <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const meta = typeMeta(item.type);
          return (
            <TouchableOpacity
              style={styles.row}
              activeOpacity={item.customerId ? 0.7 : 1}
              onPress={() =>
                item.customerId &&
                navigation.navigate('CustomerDetail', { customerId: item.customerId })
              }
            >
              <Avatar name={item.customerName} size={40} />
              <View style={styles.rowInfo}>
                <Text style={styles.rowName}>{item.customerName}</Text>
                <Text style={styles.rowMeta}>
                  {meta.label}{item.item ? ` • ${item.item}` : ''} • {item.date}
                </Text>
              </View>
              <Text style={[styles.rowAmount, { color: meta.color }]}>
                {meta.sign}{'\u20B9'}{item.amount}
              </Text>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Ionicons name="file-tray-outline" size={36} color={colors.textMuted} />
            <Text style={styles.emptyText}>No entries in this filter yet</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.h2,
    color: colors.text,
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '600',
  },
  filterTextActive: {
    color: colors.surface,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadow.card,
  },
  rowInfo: {
    flex: 1,
  },
  rowName: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  rowMeta: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  rowAmount: {
    ...typography.h3,
  },
  separator: {
    height: spacing.sm,
  },
  emptyWrap: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    gap: spacing.sm,
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
  },
});
