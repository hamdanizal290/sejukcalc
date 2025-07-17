import React, { useCallback } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { BackHandler, TouchableOpacity, Image, Text, View } from "react-native";
import { useTranslation } from 'react-i18next';

const IndexScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp(); // langsung keluar aplikasi
        return true;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [])
  );

  return (
    <View className="flex-1 bg-accent-100">
      {/* Header */}
      <View className="bg-primary-300 py-10 items-center justify-center rounded-b-xl">
        <View className="bg-secondary-300 p-3 rounded-b-xl rounded-t-xl">
          <Image
            source={require('@/assets/images/logo.png')}
            className="w-16 h-16 justify-center rounded-lg"
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Tombol */}
      <View className="flex-1 flex-row justify-center items-center space-x-6">
        <TouchableOpacity
          onPress={() => router.push('/tabs/setting')}
          className="bg-secondary-300 w-28 h-32 rounded-lg items-center justify-center mr-8"
        >
          <Image source={require('@/assets/icons/settings.png')} className="w-16 h-16" resizeMode="contain"/>
          <Text className="text-white font-rubik-bold">{t('setting')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/tabs/calculate')}
          className="bg-secondary-300 w-28 h-32 rounded-lg items-center justify-center mr-8"
        >
          <Image source={require('@/assets/icons/addCircle.png')} className="w-16 h-16" resizeMode="contain"/>
          <Text className="text-white font-rubik-bold">{t('calculation')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/tabs/archive')}
          className="bg-secondary-300 w-28 h-32 rounded-lg items-center justify-center"
        >
          <Image source={require('@/assets/icons/archive.png')} className="w-16 h-16" resizeMode="contain"/>
          <Text className="text-white font-rubik-bold">{t('archive')}</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View className="h-20 bg-primary-300 rounded-t-xl items-center justify-center">
        <Text className="text-white font-rubik-bold">Easily Estimate Your Room's Cooling Needs.</Text>
      </View>
    </View>
  );
};

export default IndexScreen;
