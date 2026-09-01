import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BarChart from '../components/BarChart';
import { colors, spacing, radius, typography, shadow } from '../theme';
import { weeklyTrend, monthSummary } from '../data/mockData';

const METRICS = [
  { id: 'sales', label: 'Sales', color: colors.success },
  { id: 'credit', label: 'Credit Given', color: colors.danger },
  { id: 'payments', label: 'Payments Received', color: colors.primary },
];

export default function ReportsScreen({ navigation }) {
  const [metric, setMetric] = useState('sales');
  const active = METRICS.find((m) => m.id === metric);

  const chartData = weeklyTrend.map((d) => ({ label: d.day, value: d[metric] }));

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Reports</Text>
        <View style={{ width: 38 }} />
      </View>

      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, shadow.card]}>
          <Text style={styles.summaryLabel}>This Month Sales</Text>
          <Text style={[styles.summaryValue, { color: colors.success }]}>
            {'\u20B9'}{monthSummary.totalSales}
          </Text>
        </View>
        <View style={[styles.summaryCard, shadow.card]}>
          <Text style={styles.summaryLabel}>Credit Given</Text>
          <Text style={[styles.summaryValue, { color: colors.danger }]}>
            {'\u20B9'}{monthSummary.totalCredit}
          </Text>
        </View>
      </View>
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, shadow.card, { flex: 1 }]}>
          <Text style={styles.summaryLabel}>Payments Received</Text>
          <Text style={[styles.summaryValue, { color: colors.primaryDark }]}>
            {'\u20B9'}{monthSummary.totalPayments}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>Weekly Trend</Text>

      <View style={styles.tabRow}>
        {METRICS.map((m) => {
          const isActive = m.id === metric;
          return (
            <TouchableOpacity
              key={m.id}
              style={[
                styles.tab,
                isActive && { backgroundColor: m.color },
              ]}
              onPress={() => setMetric(m.id)}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {m.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={[styles.chartCard, shadow.card]}>
        <BarChart
          data={chartData}
          color={active.color}
          formatValue={(v) => `${'\u20B9'}${v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}`}
        />
      </View>

      <Text style={styles.sectionHeader}>Insights</Text>
      <View style={[styles.insightCard, shadow.card]}>
        <Ionicons name="trending-up-outline" size={20} color={colors.success} />
        <Text style={styles.insightText}>
          Sales were highest on Saturday this week, {'\u20B9'}{Math.max(...weeklyTrend.map((d) => d.sales))} total.
        </Text>
      </View>
      <View style={[styles.insightCard, shadow.card]}>
        <Ionicons name="alert-circle-outline" size={20} color={colors.danger} />
        <Text style={styles.insightText}>
          Credit given this week: {'\u20B9'}{weeklyTrend.reduce((s, d) => s + d.credit, 0)}, keep an eye on pending dues.
        </Text>
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
  title: {
    ...typography.h2,
    color: colors.text,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
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
    marginBottom: 4,
  },
  summaryValue: {
    ...typography.h3,
  },
  sectionHeader: {
    ...typography.h3,
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  tabRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  tabText: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '600',
  },
  tabTextActive: {
    color: colors.surface,
  },
  chartCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  insightText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
});
