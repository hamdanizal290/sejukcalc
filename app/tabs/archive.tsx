import React, { useCallback, useEffect, useState } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { Image, View, Text, ScrollView, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormData } from '@/backend/context/_formData';

export type ArchiveEntry = {
  id: string;
  timestamp: string;
  data: {
    formData: FormData;
    calcLoad: number[][];
  };
};

const Archive = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [archiveList, setArchiveList] = useState<ArchiveEntry[]>([]);

  const loadArchives = async () => {
    const stored = await AsyncStorage.getItem('archives');
    if (stored) {
      setArchiveList(JSON.parse(stored));
    }
  };

  const deleteEntry = async (id: string) => {
    Alert.alert(t('confirm'), t('askdel'), [
      { text: t('cancel'), style: 'cancel' },
      {
        text: t('del'),
        style: 'destructive',
        onPress: async () => {
          const filtered = archiveList.filter(entry => entry.id !== id);
          await AsyncStorage.setItem('archives', JSON.stringify(filtered));
          setArchiveList(filtered);
        }
      }
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.replace('/'); // Go directly to index.tsx
        return true; // Prevent default back action
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      loadArchives();

      return () => {
        subscription.remove();
      };
    }, [])
  );

  useEffect(() => {
    loadArchives();
  }, []);

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

      <ScrollView className='p-6 pt-3'>
        {archiveList.length === 0 ? (
          <Text className='text-center text-gray-500'>{t('archivezero')}</Text>
        ) : (
          archiveList.map((entry, index) => (
            <TouchableOpacity
              key={entry.id}
              className='mb-4 p-4 bg-gray-100 rounded-lg'
              onPress={() => {
                //ke halaman result
                router.push({
                  pathname: '/input/resultView',
                  params: {entryId: entry.id}
                })
                console.log('Detail:', entry);
              }}
            >
              <Text className='text-sm font-bold'>{t('calc')} #{index+1}</Text>
              <View className='flex-row'>
                <Text className='w-32 text-sm'>{t('time')}</Text>
                <Text className='text-sm'>: {entry.timestamp}</Text>
              </View>
              <View className='flex-row'>
                <Text className='w-32 text-sm'>{t('city')}</Text>
                <Text className='text-sm'>: {entry.data.formData.kota}</Text>
              </View>
              <View className='flex-row'>
                <Text className='w-32 text-sm'>{t('roomtype')}</Text>
                <Text className='text-sm'>: {entry.data.formData.jenisRuang}</Text>
              </View>

              <View className="absolute bottom-2 right-2 flex-row space-x-2">
                <TouchableOpacity
                  onPress={() => deleteEntry(entry.id)}
                  className="bg-primary-300 p-1 rounded"
                >
                  <Text className="text-secondary-300 text-xs">{t('delete')}</Text>
                </TouchableOpacity>
              </View>

            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <View className='mb-28'></View>

      <View className='items-center justify-center'>
        <Text>{t('archive')}</Text>
      </View>
    </View>
  );
};

export default Archive;