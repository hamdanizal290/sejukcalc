import React, { useState, useEffect } from 'react';
import { Image, View, Text, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import ParameterInput from './inputParameter';
import JendelaForm from './jendelaForm';
import PintuForm from './pintuForm';
import { useTranslation } from 'react-i18next';
import { formatArah, formatPintu } from '../../backend/formatted';
import { useForm } from '@/backend/context/_formData';
import { handleWallLoad, handleRoofLoad, handleJendelaLoad, handlePintuLoad } from '../../backend/calcLoad';
import { setBool } from '@/backend/getSCL_CLF';

export type itemPintu = {
  panjang: string;
  lebar: string;
  arah: string;
  jenis: string;
};

export type itemJendela = {
  panjang: string;
  lebar: string;
  arah: string;
};

//START
const Step4Screen = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { formData, setFormData } = useForm();

  const [pintu, setPintu] = useState('');
  const [pintuList, setPintuList] = useState< itemPintu []>([]);
  const [jendela, setJendela] = useState('');
  const [jendelaList, setJendelaList] = useState< itemJendela []>([]);
  const [useSCLUsage, setUseSCLUsage] = useState(false);
  
  {/* FORM JENDELA */}
  useEffect(() => {
    const jumlah = parseInt(jendela);
    if (!isNaN(jumlah) && jumlah > 0) {
      setJendelaList((prev) => {
        const newList = [...prev];
        while (newList.length < jumlah) {
          newList.push({ panjang: '', lebar: '', arah: '' });
        }
        return newList.slice(0, jumlah); // Crop jika jumlah dikurangi
      });
    } else {
      setJendelaList([]);
    }
  }, [jendela]);

  const handleJendelaChange = (
    index: number,
    key: 'panjang' | 'lebar' | 'arah',
    value: string
  ) => {
    const updatedList = [...jendelaList];
    updatedList[index][key] = value;
    setJendelaList(updatedList);
  };

  {/* FORM PINTU */}
  useEffect(() => {
    const jumlah = parseInt(pintu);
    if (!isNaN(jumlah) && jumlah > 0) {
      setPintuList((prev) => {
        const newList = [...prev];
        while (newList.length < jumlah) {
          newList.push({ panjang: '', lebar: '', arah: '', jenis: '' });
        }
        return newList.slice(0, jumlah);
      });
    } else {
      setPintuList([]);
    }
  }, [pintu]);

  const handlePintuChange = (
    index: number,
    key: 'panjang' | 'lebar' | 'arah' | 'jenis',
    value: string
  ) => {
    const updatedList = [...pintuList];
    updatedList[index][key] = value;
    setPintuList(updatedList);
  };

  const handleNext = async () => {
    if (!pintu || !jendela) {
      Alert.alert(t('incomplete'), t('plsfill'));
      return;
    }

    try {
      const formattedPintuList = pintuList.map((item) => ({
        ...item,
        arah: formatArah(item.arah),
        jenis: formatPintu(item.jenis),
      }));
      const formattedJendelaList = jendelaList.map((item) => ({
        ...item,
        arah: formatArah(item.arah),
      }));

      const updatedFormData = {
        ...formData,
        pintu: Number(pintu),
        pintuList: formattedPintuList,
        jendela: Number(jendela),
        jendelaList: formattedJendelaList,
      }
      setFormData(updatedFormData);

      await handleRoofLoad(updatedFormData);
      await handleWallLoad(updatedFormData);

      await handleJendelaLoad(updatedFormData);
      await handlePintuLoad(updatedFormData);
      router.push('/input/step5');
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
        <Text className="text-2xl font-rubik-bold mb-4 text-secondary-300">{t('step4')}</Text>
      </View>
      
      {/* Scrollable content */}
      <ScrollView className="px-6" contentContainerStyle={{ paddingBottom: 120 }}>
        
        <ParameterInput label={t('windownum')} value={jendela} onChangeText={setJendela} />
        {/* Form Jendela */}
        {jendelaList.map((item, index) => (
          <JendelaForm
            key={index}
            index={index}
            panjang={item.panjang}
            lebar={item.lebar}
            arah={item.arah}
            onChangePanjang={(text) => handleJendelaChange(index, 'panjang', text)}
            onChangeLebar={(text) => handleJendelaChange(index, 'lebar', text)}
            onChangeArah={(text) => handleJendelaChange(index, 'arah', text)}
          />
        ))}

        <ParameterInput label={t('doornum')} value={pintu} onChangeText={setPintu} />
        {/* Form Pintu */}
        {pintuList.map((item, index) => (
          <PintuForm
            key={index}
            index={index}
            panjang={item.panjang}
            lebar={item.lebar}
            arah={item.arah}
            jenis={item.jenis}
            onChangePanjang={(text) => handlePintuChange(index, 'panjang', text)}
            onChangeLebar={(text) => handlePintuChange(index, 'lebar', text)}
            onChangeArah={(text) => handlePintuChange(index, 'arah', text)}
            onChangeJenis={(text) => handlePintuChange(index, 'jenis', text)}
          />
        ))}
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

export default Step4Screen;
