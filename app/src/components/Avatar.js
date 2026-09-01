import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

const PALETTE = ['#C77B3C', '#4C8B5F', '#3C7BC7', '#B0563E', '#8A6FB5', '#C79A3C'];

function colorForName(name) {
  const code = (name || '?').charCodeAt(0) || 0;
  return PALETTE[code % PALETTE.length];
}

function initialsForName(name) {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  const first = parts[0]?.[0] || '';
  const second = parts[1]?.[0] || '';
  return (first + second).toUpperCase();
}

export default function Avatar({ name, size = 44 }) {
  const bg = colorForName(name);
  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: bg },
      ]}
    >
      <Text style={[styles.text, { fontSize: size * 0.38 }]}>{initialsForName(name)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.surface,
    fontWeight: '700',
  },
});
