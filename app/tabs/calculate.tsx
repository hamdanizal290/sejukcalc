import React, { useCallback } from 'react';
import { Image, View, Text, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { calcLoad } from '@/backend/calcLoad';
import { resetBool } from '@/backend/getSCL_CLF';

const CalculateScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const resetCalcLoad = () => {
    for (let jam = 0; jam < 24; jam++) {
      for (let bulan = 0; bulan < 12; bulan++) {
        calcLoad[jam][bulan] = 0;
      }
    }
  };

  const handleStart = async () => {
    try {
      // Pindah ke halaman input pertama
      resetBool();
      resetCalcLoad();
      
      router.push('/input/step1');
    } catch (error) {
      console.error('Gagal menyalin file Excel:', error);
      Alert.alert('Terjadi kesalahan saat mempersiapkan kalkulasi');
    }
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.replace('/'); // Go directly to home
        return true; // Prevent default back action
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );

  return (
    
    <View className="flex-1 items-center justify-center bg-white">
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

      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-secondary-300 text-2xl font-rubik-bold mb-6">{t('newcalc')}</Text>
        <Text className="text-secondary-300 text-center font-rubik text-gray-600 mb-8">
          {t('instructcalc')}
        </Text>
        <TouchableOpacity
          onPress = {handleStart}
          className='bg-secondary-300 px-6 py-3 rounded-lg items-center'
        >
          <Text className="text-white font-rubik-bold text-base" >{t('start')}</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

export default CalculateScreen;
