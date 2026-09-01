import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../components/Avatar';
import Badge from '../components/Badge';
import { colors, spacing, radius, typography, shadow } from '../theme';
import { customers } from '../data/mockData';

function typeMeta(type) {
  if (type === 'credit') return { label: 'Udhaar Given', color: colors.danger, sign: '-', icon: 'arrow-up-circle-outline' };
  if (type === 'payment') return { label: 'Payment Received', color: colors.success, sign: '+', icon: 'arrow-down-circle-outline' };
  return { label: 'Cash Sale', color: colors.success, sign: '+', icon: 'cash-outline' };
}

export default function CustomerDetailScreen({ route, navigation }) {
  const { customerId } = route.params || {};
  const customer = useMemo(
    () => customers.find((c) => c.id === customerId) || customers[0],
    [customerId]
  );

  const totalCredit = customer.entries
    .filter((e) => e.type === 'credit')
    .reduce((sum, e) => sum + e.amount, 0);
  const totalPaid = customer.entries
    .filter((e) => e.type === 'payment')
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Customer Details</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileCard}>
        <Avatar name={customer.name} size={72} />
        <Text style={styles.customerName}>{customer.name}</Text>
        <Text style={styles.customerPhone}>{customer.phone}</Text>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="call-outline" size={18} color={colors.primary} />
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={18} color={colors.primary} />
            <Text style={styles.actionText}>Remind</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="mic-outline" size={18} color={colors.primary} />
            <Text style={styles.actionText}>Add Entry</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.dueCard, shadow.card]}>
        <Text style={styles.dueLabel}>Pending Due</Text>
        <Text style={styles.dueValue}>{'\u20B9'}{customer.pendingDue}</Text>
        {customer.pendingDue > 0 ? (
          <Badge type="due" label="Payment Pending" />
        ) : (
          <Badge type="clear" label="All Settled" />
        )}
      </View>

      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, shadow.card]}>
          <Text style={styles.summaryLabel}>Total Udhaar</Text>
          <Text style={[styles.summaryValue, { color: colors.danger }]}>
            {'\u20B9'}{totalCredit}
          </Text>
        </View>
        <View style={[styles.summaryCard, shadow.card]}>
          <Text style={styles.summaryLabel}>Total Paid</Text>
          <Text style={[styles.summaryValue, { color: colors.success }]}>
            {'\u20B9'}{totalPaid}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>Transaction History</Text>

      <View style={[styles.historyCard, shadow.card]}>
        {customer.entries.map((entry, index) => {
          const meta = typeMeta(entry.type);
          return (
            <View key={entry.id}>
              <View style={styles.historyRow}>
                <Ionicons name={meta.icon} size={22} color={meta.color} style={styles.historyIcon} />
                <View style={styles.historyInfo}>
                  <Text style={styles.historyLabel}>{meta.label}</Text>
                  <Text style={styles.historyMeta}>
                    {entry.item ? `${entry.item} • ` : ''}{entry.date}
                  </Text>
                </View>
                <Text style={[styles.historyAmount, { color: meta.color }]}>
                  {meta.sign}{'\u20B9'}{entry.amount}
                </Text>
              </View>
              {index < customer.entries.length - 1 && <View style={styles.divider} />}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
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
  moreButton: {
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
    ...typography.h3,
    color: colors.text,
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  customerName: {
    ...typography.h2,
    color: colors.text,
    marginTop: spacing.sm,
  },
  customerPhone: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    gap: 4,
    minWidth: 80,
  },
  actionText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  dueCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: 6,
  },
  dueLabel: {
    ...typography.label,
    color: colors.textMuted,
  },
  dueValue: {
    ...typography.h1,
    color: colors.primaryDark,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  summaryLabel: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: 4,
  },
  summaryValue: {
    ...typography.h3,
  },
  sectionHeader: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  historyCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  historyIcon: {
    marginRight: 2,
  },
  historyInfo: {
    flex: 1,
  },
  historyLabel: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  historyMeta: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  historyAmount: {
    ...typography.h3,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
});
