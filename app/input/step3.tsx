import React, { useState } from 'react';
import { Image, View, Text, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import ParameterInput from './inputParameter';
import ParameterInputDropdown from './inputDropdown';
import { useTranslation } from 'react-i18next';
import { formatRuang } from '../../backend/formatted';
import { useForm } from '@/backend/context/_formData';
import { handlePeopleLoad, handleVentilationLoad } from '../../backend/calcLoad';
import { setBool } from '@/backend/getSCL_CLF';

const Step3Screen = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { formData, setFormData } = useForm();

  const [jenisRuang, setJenisRuang] = useState('');
  const [jumlahPenghuni, setJumlahPenghuni] = useState('');
  const [useCLFPeople, setUseCLFPeople] = useState(false);

  const handleNext = async () => {
    if (!jenisRuang || !jumlahPenghuni) {
      Alert.alert(t('incomplete'), t('plsfill'));
      return;
    }

    try {
      //simpan ke form context
      const updatedFormData = {
        ...formData,
        jenisRuang: formatRuang(jenisRuang),
        jumlahPenghuni: Number(jumlahPenghuni),
      }
      setFormData(updatedFormData);

      console.log("UPDATED FORM DATA", updatedFormData);

      await handlePeopleLoad(updatedFormData);
      await handleVentilationLoad(updatedFormData);
      router.push('/input/step4');
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

      <View className='mt-3 mb-3 items-center'>
        <Text className="text-2xl font-rubik-bold mb-4 text-secondary-300">{t('step3')}</Text>
      </View>

      <ScrollView className="px-6" contentContainerStyle={{ paddingBottom: 120 }}>
        <ParameterInputDropdown
          label={t('roomtype')}
          selectedValue={jenisRuang}
          onValueChange={setJenisRuang}
          options={[t('room1'), t('room2'), t('room3'), t('room4'), t('room5'), t('room6'), t('room7'), t('room8')]}
        />
        <ParameterInput label={t('occupantnum')} value={jumlahPenghuni} onChangeText={setJumlahPenghuni} unit={t('occupant')} />

        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-base font-rubik-bold text-secondary-300">{t('constclf')}</Text>
          <Switch
            value={useCLFPeople}
            onValueChange={(val) => {
              setUseCLFPeople(val);
              setBool({ clfPeople: val });
            }}
            thumbColor={useCLFPeople ? '#e9762b' : '#ccc'}
            trackColor={{ false: 'rgba(206, 196, 189, 0.4)', true: 'rgba(233, 118, 43, 0.4)' }}
          />
        </View>
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

export default Step3Screen;
