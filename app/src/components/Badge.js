import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, typography } from '../theme';

const VARIANTS = {
  credit: { bg: colors.dangerLight, fg: colors.danger, label: 'Udhaar' },
  debit: { bg: colors.successLight, fg: colors.success, label: 'Sale' },
  payment: { bg: colors.successLight, fg: colors.success, label: 'Payment' },
  clear: { bg: colors.successLight, fg: colors.success, label: 'Clear' },
  due: { bg: colors.dangerLight, fg: colors.danger, label: 'Due' },
};

export default function Badge({ type = 'credit', label }) {
  const variant = VARIANTS[type] || VARIANTS.credit;
  return (
    <View style={[styles.pill, { backgroundColor: variant.bg }]}>
      <Text style={[styles.text, { color: variant.fg }]}>{label || variant.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  text: {
    ...typography.caption,
    fontWeight: '700',
  },
});
