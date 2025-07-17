import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';

const LampuForm = ({
  index,
  jenis,
  jumlah,
  onChangeJenis,
  onChangeJumlah,
}: {
  index: number;
  jenis: string;
  jumlah: string;
  onChangeJenis: (text: string) => void;
  onChangeJumlah: (text: string) => void;
}) => {
  const { t } = useTranslation();
  const lampuOptions = [t('lamp1'), t('lamp2'), t('lamp3'), t('lamp4'), t('lamp5'), t('lamp6'), t('lamp7'), t('lamp8'), t('lamp9'), t('lamp10')];

  return (
    <View className="border border-secondary-200 rounded-lg p-4 mb-4">
      <Text className="text-base font-rubik-bold mb-2 text-secondary-300">
        {t('lampnumbering')} {index + 1}
      </Text>

      <View className="mb-2 flex-row items-center">
        <Text className="w-28 text-secondary-200 font-rubik">{t('lamptype')}</Text>
        <View className="ml-14 flex-1 border border-gray-400 rounded px-1 justify-center">
          <Picker
            selectedValue={jenis}
            onValueChange={onChangeJenis}
            style={{ height: 50, color: 'rgba(13, 71, 21, 0.7)' }}
          >
            <Picker.Item label={t('lampchoose')} value="" />
            {lampuOptions.map((item) => (
              <Picker.Item label={item} value={item} key={item} />
            ))}
          </Picker>
        </View>
      </View>
      
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="w-30 text-secondary-200 font-rubik">{t('num')}</Text>
        <TextInput
          value={jumlah}
          onChangeText={onChangeJumlah}
          placeholder="0"
          keyboardType="numeric"
          className="border border-gray-400 rounded px-2 py-1 w-24 text-secondary-300"
        />
        <Text className="ml-2 text-secondary-200 font-rubik"></Text>
      </View>
    </View>
  );
};

export default LampuForm;
