import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';

const ParameterInputDropdown = ({
  label,
  selectedValue,
  onValueChange,
  options,
}: {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: string[];
}) => {
  const { t } = useTranslation();

  return (
    <View className="mb-6 overflow-visible pt-3">

      <View className="relative overflow-visible">
        {/* Picker dengan border */}
        <View className="border border-secondary-200 rounded px-2 py-1">
          <Picker
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            style={{
              height: 50,
              color: selectedValue ? 'rgba(13, 71, 21, 1)' : 'rgba(13, 71, 21, 0.7)',
            }}
          >
            <Picker.Item label={t('optionchoose')} value="" />
            {options.map((item) => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>
        </View>

        {/* Floating label */}
        <Text className="absolute -top-3 left-3 px-1 text-m text-secondary-200 font-rubik bg-white z-10">
          {label}
        </Text>
      </View>
    </View>
  );
};

export default ParameterInputDropdown;
