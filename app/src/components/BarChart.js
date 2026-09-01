import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';

// Simple grouped bar chart, no chart library needed.
// data: [{ label: 'Mon', value: 1800 }, ...]
export default function BarChart({ data, color = colors.primary, height = 140, formatValue }) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <View style={[styles.wrap, { height }]}>
      {data.map((d) => {
        const barHeight = Math.max((d.value / max) * (height - 32), 4);
        return (
          <View key={d.label} style={styles.col}>
            <Text style={styles.value}>
              {formatValue ? formatValue(d.value) : d.value}
            </Text>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.bar,
                  { height: barHeight, backgroundColor: color },
                ]}
              />
            </View>
            <Text style={styles.label}>{d.label}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  col: {
    flex: 1,
    alignItems: 'center',
  },
  value: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: 4,
  },
  barTrack: {
    width: '55%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: radius.sm,
  },
  label: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
});
