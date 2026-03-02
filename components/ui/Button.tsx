import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
};

export function Button({ label, onPress, variant = 'primary', loading, disabled, style }: Props) {
  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], (disabled || loading) && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading
        ? <ActivityIndicator color={variant === 'secondary' ? '#4A90E2' : '#fff'} />
        : <Text style={[styles.label, variant === 'secondary' && styles.labelSecondary]}>{label}</Text>
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base:            { paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  primary:         { backgroundColor: '#4A90E2' },
  secondary:       { backgroundColor: '#EEF4FD', borderWidth: 1, borderColor: '#4A90E2' },
  danger:          { backgroundColor: '#E74C3C' },
  disabled:        { opacity: 0.5 },
  label:           { fontSize: 15, fontWeight: '700', color: '#fff' },
  labelSecondary:  { color: '#4A90E2' },
});
