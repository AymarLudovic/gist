// components/IconButton.tsx
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { GlobalStyles } from '@/constants/Styles';
import { LucideIcon } from 'lucide-react-native'; // Assuming Lucide is used

interface IconButtonProps {
  icon: LucideIcon;
  label?: string | number;
  onPress: () => void;
  color?: string;
  size?: number;
  containerStyle?: object;
  labelStyle?: object;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  label,
  onPress,
  color = Colors.dark.text,
  size = 24,
  containerStyle,
  labelStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, containerStyle]}>
      <Icon color={color} size={size} />
      {label !== undefined && (
        <Text style={[styles.label, { color: color }, labelStyle]}>
          {typeof label === 'number' ? label.toLocaleString() : label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.alignCenter,
    ...GlobalStyles.mb2,
  },
  label: {
    ...GlobalStyles.textBase,
    marginTop: 4,
  },
});

export default IconButton;