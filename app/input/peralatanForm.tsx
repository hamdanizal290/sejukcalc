import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';

const PeralatanForm = ({
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
  const peralatanOptions = [t('equip1'), t('equip2'), t('equip3'), t('equip4'), t('equip5'), t('equip6'), t('equip7'), t('equip8'), t('equip9'), t('equip10'), t('equip11'), t('equip12'), t('equip13'), t('equip14'), t('equip15'), t('equip16'), t('equip17'), t('equip18'), t('equip19')];

  return (
    <View className="border border-secondary-200 rounded-lg p-4 mb-4">
      <Text className="text-base font-rubik-bold mb-2 text-secondary-300">
        {t('equipnumbering')} {index + 1}
      </Text>

      <View className="mb-2 flex-row items-center">
        <Text className="w-30 text-secondary-200 font-rubik">{t('equiptype')}</Text>
        <View className="ml-14 flex-1 border border-gray-400 rounded px-1 justify-center">
          <Picker
            selectedValue={jenis}
            onValueChange={onChangeJenis}
            style={{ height: 50, color: 'rgba(13, 71, 21, 0.7)' }}
          >
            <Picker.Item label={t('equipchoose')} value="" />
            {peralatanOptions.map((item) => (
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

export default PeralatanForm;
