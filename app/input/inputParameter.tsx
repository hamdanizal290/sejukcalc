import React from 'react';
import { View, Text, TextInput } from 'react-native';

const ParameterInput = ({
  label,
  value,
  onChangeText,
  unit,
  placeholder = '',
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  unit?: string;
  placeholder?: string;
}) => {
  return (
    <View className="mb-6 overflow-visible pt-3">
      
      {/* Relative untuk position absolute anak */}
      <View className="relative overflow-visible">

        {/* Input box */}
        <View className="border border-secondary-200 rounded px-3 py-3 pr-14">
          <TextInput
            value={value}
            onChangeText={(text) => {
              const sanitized = text.replace(/,/g, '.');
              onChangeText(sanitized);
            }}
            placeholder={placeholder}
            keyboardType="numeric"
            className="text-base font-rubik text-secondary-300"
          />
        </View>

        {/* Label */}
        <Text className="absolute -top-3 left-3 px-1 text-m text-secondary-200 font-rubik bg-white z-10">
          {label}
        </Text>

        {/* Unit */}
        {unit && (
          <View className="absolute inset-y-0 right-3 flex justify-center">
            <Text className="text-base text-secondary-300 font-rubik">
              {unit}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ParameterInput;
