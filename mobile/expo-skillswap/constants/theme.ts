export const COLORS = {
  // Primary brand colors
  primary: '#1E3A8A', // Deep blue
  primaryLight: '#3B5998',
  primaryDark: '#152A66',
  
  // Secondary colors
  secondary: '#D4A84B', // Gold/amber accent
  secondaryLight: '#E5C878',
  
  // Neutrals
  white: '#FFFFFF',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  
  // Grays
  gray: '#6B7280',
  grayLight: '#9CA3AF',
  grayLighter: '#E5E7EB',
  grayDark: '#374151',
  
  // Borders
  border: '#E2E8F0',
  borderDark: '#CBD5E1',
  
  // Text
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  textWhite: '#FFFFFF',
  
  // Status colors
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  info: '#3B82F6',
  infoLight: '#DBEAFE',
  
  // Chart colors
  chartBlue: '#3B82F6',
  chartPurple: '#8B5CF6',
  chartGreen: '#10B981',
  chartOrange: '#F97316',
  chartPink: '#EC4899',
  
  // Overlays
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
};

export const FONTS = {
  regular: {
    fontFamily: 'System',
    fontWeight: '400' as const,
  },
  medium: {
    fontFamily: 'System',
    fontWeight: '500' as const,
  },
  semibold: {
    fontFamily: 'System',
    fontWeight: '600' as const,
  },
  bold: {
    fontFamily: 'System',
    fontWeight: '700' as const,
  },
};

export const SIZES = {
  // Font sizes
  xs: 10,
  sm: 12,
  md: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  
  // Spacing
  padding: 16,
  paddingSm: 8,
  paddingLg: 24,
  paddingXl: 32,
  
  margin: 16,
  marginSm: 8,
  marginLg: 24,
  marginXl: 32,
  
  // Border radius
  radius: 8,
  radiusSm: 4,
  radiusMd: 12,
  radiusLg: 16,
  radiusXl: 24,
  radiusFull: 9999,
  
  // Component sizes
  buttonHeight: 48,
  inputHeight: 48,
  iconSm: 16,
  iconMd: 24,
  iconLg: 32,
  
  // Avatar sizes
  avatarSm: 32,
  avatarMd: 48,
  avatarLg: 64,
  avatarXl: 96,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};
