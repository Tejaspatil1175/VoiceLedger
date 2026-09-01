import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../components/Avatar';
import { colors, spacing, radius, typography, shadow } from '../theme';
import { reminderQueue } from '../data/mockData';

function urgencyMeta(days) {
  if (days >= 21) return { label: `${days} days overdue`, color: colors.danger };
  if (days >= 7) return { label: `${days} days overdue`, color: colors.primaryDark };
  return { label: `${days} days ago`, color: colors.textMuted };
}

function draftMessage(customer) {
  return `Namaste ${customer.name.split(' ')[0]}, aapka \u20B9${customer.pendingDue} udhaar pending hai. Kripya jaldi clear kar dijiye. Dhanyavaad — Ramesh General Store`;
}

export default function RemindersScreen({ navigation }) {
  const totalPending = reminderQueue.reduce((sum, c) => sum + c.pendingDue, 0);

  const handleSend = (customer) => {
    Alert.alert(
      'Reminder ready',
      draftMessage(customer),
      [{ text: 'OK' }]
    );
    // TODO: wire to SMS/WhatsApp share intent
  };

  return (
    <View style={styles.flex}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Reminders</Text>
        <View style={{ width: 38 }} />
      </View>

      <View style={[styles.summaryCard, shadow.card]}>
        <View>
          <Text style={styles.summaryLabel}>Customers to remind</Text>
          <Text style={styles.summaryValue}>{reminderQueue.length}</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View>
          <Text style={styles.summaryLabel}>Total outstanding</Text>
          <Text style={[styles.summaryValue, { color: colors.danger }]}>
            {'\u20B9'}{totalPending}
          </Text>
        </View>
      </View>

      <FlatList
        data={reminderQueue}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        renderItem={({ item }) => {
          const meta = urgencyMeta(item.daysOverdue);
          return (
            <TouchableOpacity
              style={[styles.card, shadow.card]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('CustomerDetail', { customerId: item.id })}
            >
              <Avatar name={item.name} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={[styles.overdue, { color: meta.color }]}>{meta.label}</Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.due}>{'\u20B9'}{item.pendingDue}</Text>
                <TouchableOpacity
                  style={styles.remindButton}
                  onPress={() => handleSend(item)}
                >
                  <Ionicons name="paper-plane-outline" size={14} color={colors.surface} />
                  <Text style={styles.remindText}>Remind</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Ionicons name="checkmark-done-circle-outline" size={36} color={colors.success} />
            <Text style={styles.emptyText}>No pending dues. All settled.</Text>
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
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.lg,
  },
  summaryDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
  },
  summaryLabel: {
    ...typography.caption,
    color: colors.textMuted,
  },
  summaryValue: {
    ...typography.h3,
    color: colors.text,
    marginTop: 2,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.md,
  },
  info: {
    flex: 1,
  },
  name: {
    ...typography.h3,
    color: colors.text,
  },
  overdue: {
    ...typography.caption,
    marginTop: 2,
    fontWeight: '600',
  },
  right: {
    alignItems: 'flex-end',
    gap: 6,
  },
  due: {
    ...typography.h3,
    color: colors.text,
  },
  remindButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  remindText: {
    ...typography.caption,
    color: colors.surface,
    fontWeight: '700',
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
