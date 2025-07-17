import React, { useState } from 'react';
import { Image, View, Text, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';

const Setting = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Bahasa Indonesia', value: 'id' },
  ];
  const onLanguageChange = (value: string) => {
    setLanguage(value);
    i18n.changeLanguage(value);
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

      <ScrollView className="px-6" contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="mb-6 overflow-visible pt-3">
          <View className="relative overflow-visible">
            <View className="border border-secondary-200 rounded px-3 py-3 pr-3">
              <Text className='absolute -top-3 left-3 px-1 text-m text-secondary-200 font-rubik bg-white z-10'>{t('lang')}</Text>
              <Picker
                selectedValue={language}
                onValueChange={onLanguageChange}
                style={{ height: 50, color: 'rgba(13, 71, 21, 1)' }}
              >
                {languageOptions.map(({ label, value }) => (
                  <Picker.Item key={value} label={label} value={value} />
                ))}
              </Picker>
              
            </View>
          </View>
        </View>
        
      </ScrollView>
    </View>
  );
};

export default Setting;