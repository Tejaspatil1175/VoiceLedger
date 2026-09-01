// Shared design tokens for VoiceLedger — clean white/cream theme
export const colors = {
  background: '#FBF8F3',
  surface: '#FFFFFF',
  card: '#F5EFE4',
  cardAlt: '#F0E9DA',
  primary: '#C77B3C',
  primaryDark: '#A8622A',
  primaryLight: '#F1DCC4',
  text: '#2B2620',
  textMuted: '#8A8072',
  border: '#EDE4D3',
  success: '#4C8B5F',
  successLight: '#E4F0E7',
  danger: '#C1523F',
  dangerLight: '#F5E3DF',
  placeholder: '#B3A896',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  pill: 999,
};

export const typography = {
  h1: { fontSize: 28, fontWeight: '700' },
  h2: { fontSize: 22, fontWeight: '700' },
  h3: { fontSize: 17, fontWeight: '600' },
  body: { fontSize: 15, fontWeight: '400' },
  label: { fontSize: 13, fontWeight: '500' },
  caption: { fontSize: 12, fontWeight: '400' },
};

export const shadow = {
  card: {
    shadowColor: '#3A2E1F',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  floating: {
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
};
