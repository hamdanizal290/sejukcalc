import React, { useState, useEffect } from 'react';
import { Image, View, Text, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import ParameterInput from './inputParameter';
import PeralatanForm from './peralatanForm';
import LampuForm from './lampuForm';
import { useTranslation } from 'react-i18next';
import { formatLampu, formatPeralatan } from '../../backend/formatted';
import { handleLampuLoad, handlePeralatanLoad } from '../../backend/calcLoad';
import { useForm } from '@/backend/context/_formData';
import { setBool } from '@/backend/getSCL_CLF';

export type itemLampu = {
  jenis: string;
  jumlah: string;
};

export type itemPeralatan = {
  jenis: string;
  jumlah: string;
};

const Step5Screen = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { formData, setFormData } = useForm();

  const [jumlahPeralatan, setJumlahPeralatan] = useState('');
  const [peralatanList, setPeralatanList] = useState< itemPeralatan []>([]);
  const [jumlahLampu, setJumlahLampu] = useState('');
  const [lampuList, setLampuList] = useState< itemLampu []>([]);
  const [useCLFLight, setUseCLFLight] = useState(false);
  const [useCLFEquipment, setUseCLFEquipment] = useState(false);
  
  {/* FORM PERALATAN */}
  useEffect(() => {
    const jumlah = parseInt(jumlahPeralatan);
    if (!isNaN(jumlah) && jumlah > 0) {
      setPeralatanList((prev) => {
        const newList = [...prev];
        while (newList.length < jumlah) {
          newList.push({ jenis: '', jumlah: '' });
        }
        return newList.slice(0, jumlah);
      });
    } else {
      setPeralatanList([]);
    }
  }, [jumlahPeralatan]);

  const handlePeralatanChange = (
    index: number,
    key: 'jenis' | 'jumlah',
    value: string
  ) => {
    const updatedList = [...peralatanList];
    updatedList[index][key] = value;
    setPeralatanList(updatedList);
  };

  {/* FORM LAMPU */}
  useEffect(() => {
    const jumlah = parseInt(jumlahLampu);
    if (!isNaN(jumlah) && jumlah > 0) {
      setLampuList((prev) => {
        const newList = [...prev];
        while (newList.length < jumlah) {
          newList.push({ jenis: '', jumlah: '' });
        }
        return newList.slice(0, jumlah);
      });
    } else {
      setLampuList([]);
    }
  }, [jumlahLampu]);
  
  const handleLampuChange = (
    index: number,
    key: 'jenis' | 'jumlah',
    value: string
  ) => {
    const updatedList = [...lampuList];
    updatedList[index][key] = value;
    setLampuList(updatedList);
  };

  const handleNext = async () => {
    if (!jumlahLampu || !jumlahPeralatan) {
      Alert.alert(t('incomplete'), t('plsfill'));
      return;
    }

    try {
      const formattedPeralatanList = peralatanList.map((item) => ({
        ...item,
        jenis: formatPeralatan(item.jenis),
      }));
      const formattedLampuList = lampuList.map((item) => ({
        ...item,
        jenis: formatLampu(item.jenis),
      }));

      const updatedFormData = {
        ...formData,
        jumlahPeralatan: Number(jumlahPeralatan),
        peralatanList: formattedPeralatanList,
        jumlahLampu: Number(jumlahLampu),
        lampuList: formattedLampuList,
      }
      setFormData(updatedFormData);

      await handleLampuLoad(updatedFormData);
      await handlePeralatanLoad(updatedFormData);

      setTimeout(() => {
        router.push('/input/result');
      }, 200);
    } catch (err) {
      console.error("Gagal menyimpan data ke Excel:", err);
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
        <Text className="text-2xl font-rubik-bold mb-4 text-secondary-300">{t('step5')}</Text>
      </View>

      <ScrollView className="px-6" contentContainerStyle={{ paddingBottom: 120 }}>
        <ParameterInput label={t('lampnum')} value={jumlahLampu} onChangeText={setJumlahLampu} />
        {/* Form Lampu */}
        {lampuList.map((item, index) => (
          <LampuForm
            key={index}
            index={index}
            jenis={item.jenis}
            jumlah={item.jumlah}
            onChangeJenis={(text) => handleLampuChange(index, 'jenis', text)}
            onChangeJumlah={(text) => handleLampuChange(index, 'jumlah', text)}
          />
        ))}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-base font-rubik-bold text-secondary-300">{t('constclf')}</Text>
          <Switch
            value={useCLFLight}
            onValueChange={(val) => {
              setUseCLFLight(val);
              setBool({ clfLight: val });
            }}
            thumbColor={useCLFLight ? '#e9762b' : '#ccc'}
            trackColor={{ false: 'rgba(206, 196, 189, 0.4)', true: 'rgba(233, 118, 43, 0.4)' }}
          />
        </View>

        <ParameterInput label={t('equipnum')} value={jumlahPeralatan} onChangeText={setJumlahPeralatan} />
        {/* Form Peralatan */}
        {peralatanList.map((item, index) => (
          <PeralatanForm
            key={index}
            index={index}
            jenis={item.jenis}
            jumlah={item.jumlah}
            onChangeJenis={(text) => handlePeralatanChange(index, 'jenis', text)}
            onChangeJumlah={(text) => handlePeralatanChange(index, 'jumlah', text)}
          />
        ))}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-base font-rubik-bold text-secondary-300">{t('constclf')}</Text>
          <Switch
            value={useCLFEquipment}
            onValueChange={(val) => {
              setUseCLFEquipment(val);
              setBool({ clfEquipment: val });
            }}
            thumbColor={useCLFEquipment ? '#e9762b' : '#ccc'}
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

export default Step5Screen;
