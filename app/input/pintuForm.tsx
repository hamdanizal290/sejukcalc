import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';

const PintuForm = ({
  index,
  panjang,
  lebar,
  arah,
  jenis,
  onChangePanjang,
  onChangeLebar,
  onChangeArah,
  onChangeJenis,
}: {
  index: number;
  panjang: string;
  lebar: string;
  arah: string;
  jenis: string;
  onChangePanjang: (text: string) => void;
  onChangeLebar: (text: string) => void;
  onChangeArah: (text: string) => void;
  onChangeJenis: (text: string) => void;
}) => {
  const { t } = useTranslation();
  const arahOptions = [t('north'), t('south'), t('west'), t('east')];
  const pintuOptions = [t('door1'), t('door2'), t('door3'), t('door4'), t('door5')];
  
  return (
    <View className="border border-secondary-200 rounded-lg p-4 mb-4">
      <Text className="text-base font-rubik-bold mb-2 text-secondary-300">
        {t('doornumbering')} {index + 1}
      </Text>

      <View className="mb-2 flex-row items-center justify-between">
        <Text className="w-20 text-secondary-200 font-rubik">{t('length')}</Text>
        <TextInput
          value={panjang}
          onChangeText={onChangePanjang}
          placeholder="0"
          keyboardType="numeric"
          className="border border-gray-400 rounded px-2 py-1 w-24 text-secondary-200"
        />
        <Text className="ml-2 text-secondary-200 font-rubik">m</Text>
      </View>

      <View className="mb-2 flex-row items-center justify-between">
        <Text className="w-20 text-secondary-200 font-rubik">{t('width')}</Text>
        <TextInput
          value={lebar}
          onChangeText={onChangeLebar}
          placeholder="0"
          keyboardType="numeric"
          className="border border-gray-400 rounded px-2 py-1 w-24 text-secondary-200"
        />
        <Text className="ml-2 text-secondary-200 font-rubik">m</Text>
      </View>

      <View className="mb-2 flex-row items-center">
        <Text className="w-32 text-secondary-200 font-rubik">{t('direct')}</Text>
        <View className="ml-12 flex-1 border border-gray-400 rounded px-1 justify-center">
          <Picker
            selectedValue={arah}
            onValueChange={onChangeArah}
            style={{ height: 50, color: 'rgba(13, 71, 21, 0.7)' }}
          >
            <Picker.Item label={t('directchoose')} value="" />
            {arahOptions.map((item) => (
              <Picker.Item label={item} value={item} key={item} />
            ))}
          </Picker>
        </View>
      </View>

      <View className="mb-2 flex-row items-center">
        <Text className="w-32 text-secondary-200 font-rubik">{t('material')}</Text>
        <View className="ml-12 flex-1 border border-gray-400 rounded px-1 justify-center">
          <Picker
            selectedValue={jenis}
            onValueChange={onChangeJenis}
            style={{ height: 50, color: 'rgba(13, 71, 21, 0.7)' }}
          >
            <Picker.Item label={t('materialchoose')} value="" />
            {pintuOptions.map((item) => (
              <Picker.Item label={item} value={item} key={item} />
            ))}
          </Picker>
        </View>
      </View>

    </View>
  );
};

export default PintuForm;
