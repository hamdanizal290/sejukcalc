import React, { useState } from 'react';
import { Image, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import ParameterInput from './inputParameter';
import ParameterInputDropdown from './inputDropdown';
import { useTranslation } from 'react-i18next';
import { formatArah, formatKota } from '../../backend/formatted';
import { useForm } from '@/backend/context/_formData';

const Step1Screen = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const arahList = [t('north'), t('south'), t('west'), t('east')];
  const { setFormData } = useForm();

  const [kota, setKota] = useState('')
  const [panjang, setPanjang] = useState('');
  const [arah, setArah] = useState('');
  const [lebar, setLebar] = useState('');
  const [tinggi, setTinggi] = useState('');

  const handleNext = async () => {
    if (!kota || !panjang || !lebar || !tinggi || !arah) {
      Alert.alert(t('incomplete'), t('plsfill'));
      return;
    }

    try {
      //simpan ke form context
      setFormData({
        kota: formatKota(kota),
        panjang: Number(panjang),
        lebar: Number(lebar),
        tinggi: Number(tinggi),
        arah: formatArah(arah),
      })
      
      router.push('/input/step2');
    } catch (err) {
      console.error("Gagal: ", err);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-primary-300 w-full px-6 py-10 items-center justify-center rounded-b-xl">
        <View className="bg-secondary-300 p-3 rounded-b-xl rounded-t-xl">
          <Image
            source={require('@/assets/images/logo.png')}
            className="w-16 h-16 justify-center rounded-lg"
            resizeMode="contain"
          />
        </View>
      </View>

      <View className="mt-3 mb-3 items-center">
        <Text className="text-2xl font-rubik-bold mb-4 text-secondary-300">{t('step1')}</Text>
      </View>
      
      <ScrollView className="px-6" contentContainerStyle={{ paddingBottom: 120 }}>
        <ParameterInputDropdown
          label={t('city')}
          selectedValue={kota}
          onValueChange={setKota}
          options={[ 'Jakarta, Indonesia', 'Medan, Indonesia' , 'Surabaya, Indonesia' ]}
        />

        <ParameterInput label={t('length')} value={panjang} onChangeText={setPanjang} unit="m" />
        <View className="-mt-3">
          <Text className="text-base font-rubik text-secondary-300 mb-3">{t('sidedirect')}</Text>

          <View className="flex-row flex-wrap gap-2 mb-4">
            {arahList.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setArah(item)}
                className={`border px-4 py-2 rounded-full ${
                  arah === item ? 'bg-secondary-300 border-secondary-300' : 'border-secondary-100'
                }`}
              >
                <Text className={`font-rubik ${arah === item ? 'text-white' : 'text-secondary-100'}`}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <ParameterInput label={t('width')} value={lebar} onChangeText={setLebar} unit="m" />
        <ParameterInput label={t('height')} value={tinggi} onChangeText={setTinggi} unit="m" />

      </ScrollView>

      {/* Footer */}
      <View className="absolute bottom-20 left-0 right-0 px-6 py-2">
        <TouchableOpacity
          onPress={handleNext}
          className="bg-secondary-300 px-6 py-3 rounded-lg items-center"
        >
          <Text className="text-white font-rubik-bold text-base">{t('next')}</Text>
        </TouchableOpacity>
      </View>

      <View className="h-20 bg-primary-300 rounded-t-xl absolute bottom-0 left-0 right-0" />
    </View>
  );
};

export default Step1Screen;
