import React, { useState } from 'react';
import { Image, View, Text, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import ParameterInputDropdown from './inputDropdown';
import { useTranslation } from 'react-i18next';
import { formatAtap, formatStrukturAtap, formatLangit, formatDinding, formatLantai } from '../../backend/formatted';
import { useForm } from '@/backend/context/_formData';
import { setBool } from '@/backend/getSCL_CLF';

const Step2Screen = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { formData, setFormData } = useForm();

  const [atap, setAtap] = useState('');
  const [strukturAtap, setStrukturAtap] = useState('');
  const [langit, setLangit] = useState('');
  const [dinding, setDinding] = useState('');
  const [lantai, setLantai] = useState('');
  const [useCLTDRoof, setUseCLTDRoof] = useState(false);
  const [useCLTDCorr, setUseCLTDCorr] = useState(false);

  const handleNext = async () => {
    if (!atap || !strukturAtap || !langit || !dinding || !lantai) {
      Alert.alert(t('incomplete'), t('plsfill'));
      return;
    }

    try {
      //simpan ke form context
      const updatedFormData = {
        ...formData,
        atap: formatAtap(atap),
        strukturAtap: formatStrukturAtap(strukturAtap),
        langit: formatLangit(langit),
        dinding: formatDinding(dinding),
        lantai: formatLantai(lantai),
      }
      setFormData(updatedFormData);

      console.log("UPDATED FORM DATA", updatedFormData);
      
      router.push('/input/step3');
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
        <Text className="text-2xl font-rubik-bold mb-4 text-secondary-300">{t('step2')}</Text>
      </View>

      <ScrollView className="px-6" contentContainerStyle={{ paddingBottom: 120 }}>
        <ParameterInputDropdown
          label={t('roof')}
          selectedValue={atap}
          onValueChange={setAtap}
          options={[t('roof1'), t('roof2'), t('roof3'), t('roof4'), t('roof5'), t('roof6'), t('roof7')]}
        />
        <ParameterInputDropdown
          label={t('roofstruc')}
          selectedValue={strukturAtap}
          onValueChange={setStrukturAtap}
          options={[t('roofstruc1'), t('roofstruc2'), t('roofstruc3')]}
        />
        <ParameterInputDropdown
          label={t('ceil')}
          selectedValue={langit}
          onValueChange={setLangit}
          options={[t('ceil1'), t('ceil2'), t('ceil3'), t('ceil4')]}
        />
        <ParameterInputDropdown
          label={t('wall')}
          selectedValue={dinding}
          onValueChange={setDinding}
          options={[t('wall1'), t('wall2'), t('wall3'), t('wall4'), t('wall5')]}
        />
        <ParameterInputDropdown
          label={t('floor')}
          selectedValue={lantai}
          onValueChange={setLantai}
          options={[t('floor1'), t('floor2'), t('floor3')]}
        />
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-base font-rubik-bold text-secondary-300">{t('constcltdroof')}</Text>
          <Switch
            value={useCLTDRoof}
            onValueChange={(val) => {
              setUseCLTDRoof(val);
              setBool({ cltdRoof: val });
            }}
            thumbColor={useCLTDRoof ? '#e9762b' : '#ccc'}
            trackColor={{ false: 'rgba(206, 196, 189, 0.4)', true: 'rgba(233, 118, 43, 0.4)' }}
          />
        </View>
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-base font-rubik-bold text-secondary-300">{t('corrcltd')}</Text>
          <Switch
            value={useCLTDCorr}
            onValueChange={(val) => {
              setUseCLTDCorr(val);
              setBool({ cltdCorr: val });
            }}
            thumbColor={useCLTDCorr ? '#e9762b' : '#ccc'}
            trackColor={{ false: 'rgba(206, 196, 189, 0.4)', true: 'rgba(233, 118, 43, 0.4)' }}
          />
        </View>
      </ScrollView>
      
      {/* Footer */}
      <View className="absolute bottom-20 left-0 right-0 px-6 py-2">
        <TouchableOpacity 
          onPress = {handleNext} 
          className='bg-secondary-300 px-6 py-3 rounded-lg items-center'
        >
          <Text className="text-white font-rubik-bold text-base" >{t('next')}</Text>
        </TouchableOpacity>
      </View>
      
      <View className="h-20 bg-primary-300 rounded-t-xl" />
    </View>
  );
};

export default Step2Screen;
