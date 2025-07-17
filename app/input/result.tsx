import React, { useEffect } from 'react';
import { Image, View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { calcLoad } from '../../backend/calcLoad';
import { useTranslation } from 'react-i18next';
import { useForm } from '@/backend/context/_formData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import dayjs from 'dayjs';
import { Canvas, Line, Text as SkiaText, useFont } from '@shopify/react-native-skia';
import { itemJendela, itemPintu } from './step4';
import { itemLampu, itemPeralatan } from './step5';

export type ResultEntry = {
  id: string;
  timestamp: string;
  data: any;
};

const Result = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { formData } = useForm();
  const screenWidth = Dimensions.get('window').width;
  
  const font = useFont(require('../../assets/fonts/Rubik-Regular.ttf'), 10);

  const bulanList = [
    t('jan'), t('feb'), t('mar'), t('apr'), t('mei'), t('jun'),
    t('jul'), t('ags'), t('sep'), t('okt'), t('nov'), t('des'),
  ];

  const calcLoadPerMonth: number[][] = bulanList.map((_, bulanIdx) =>
    calcLoad.map(row => row[bulanIdx])
  );

  const handleNext = async () => {
    await saveResult();
    router.push('/tabs/archive');
  };

  const saveResult = async () => {
    try {
      const existingData = await AsyncStorage.getItem('archives');
      const archives: ResultEntry[] = existingData ? JSON.parse(existingData) : [];

      const newEntry: ResultEntry = {
        id: uuid.v4(),
        timestamp: dayjs().format('DD-MM-YYYY HH:mm:ss'),
        data: {
          formData,
          calcLoad,
        },
      };

      const updated = [...archives, newEntry];
      await AsyncStorage.setItem('archives', JSON.stringify(updated));
      console.log('Hasil berhasil disimpan ke arsip');
    } catch (error) {
      console.error('Gagal menyimpan ke arsip:', error);
    }
  };

  useEffect(() => {
    console.log('Isi calcLoad[][]:');
    calcLoad.forEach((row, jam) => {
      console.log(`Jam ${jam + 1}:`, row.map(val => val.toFixed(2)).join(', '));
    });
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

      <View className='mt-3 mb-3 items-center'>
        <Text className="text-2xl font-rubik-bold mb-4 text-secondary-300">{t('result')}</Text>
      </View>

      <FlatList
        ListHeaderComponent={() => (
          <View className='mb-4 p-4 bg-gray-100 rounded-lg'>
            <View className='items-center'>
              <Text className='text-lg font-bold text-secondary-300 mb-2'>{t('roomdetail')}</Text>
            </View>
            <View className="flex-row">
              <Text className='w-32 text-sm'>{t('city')}</Text>
              <Text className='text-sm'>: {formData.kota}</Text>
            </View>
            <View className="flex-row">
              <Text className='w-32 text-sm'>{t('roomtype')}</Text>
              <Text className='text-sm'>: {formData.jenisRuang}</Text>
            </View>
            <View className="flex-row">
              <Text className='w-32 text-sm'>{t('roomsize')}</Text>
              <Text className='text-sm'>: {formData.panjang}m x {formData.lebar}m x {formData.tinggi}m</Text>
            </View>
            <View className="flex-row">
              <Text className='w-32 text-sm'>{t('occupantnum')}</Text>
              <Text className='text-sm'>: {formData.jumlahPenghuni}</Text>
            </View>

            <Text className='mt-2 text-sm font-bold'>{t('material')}</Text>
            <View className="flex-row">
              <Text className='w-32 text-sm'>{t('matwall')}</Text>
              <Text className='text-sm'>: {formData.dinding}</Text>
            </View>
            <View className="flex-row">
              <Text className='w-32 text-sm'>{t('matroof')}</Text>
              <Text className='text-sm'>: {formData.atap}</Text>
            </View>
            <View className="flex-row">
              <Text className='w-32 text-sm'>{t('matstruc')}</Text>
              <Text className='text-sm'>: {formData.strukturAtap}</Text>
            </View>
            <View className="flex-row">
              <Text className='w-32 text-sm'>{t('matceil')}</Text>
              <Text className='text-sm'>: {formData.langit}</Text>
            </View>
            <View className="flex-row">
              <Text className='w-32 text-sm'>{t('matfloor')}</Text>
              <Text className='text-sm'>: {formData.lantai}</Text>
            </View>

            {(formData.jendelaList ?? []).length > 0 && (
              <View className='mt-2'>
                <Text className='text-sm font-bold'>{t('window')}</Text>
                <View className="flex-row">
                  <Text className='w-32 text-sm'>{t('windownum')}</Text>
                  <Text className='text-sm'>: {formData.jendela}</Text>
                </View>
                {formData.jendelaList?.map((item: itemJendela, index: number) => (
                  <Text key={`jendela-${index}`} className='text-sm'>- {t('direction')}: {item.arah}, {t('size')}: {item.panjang}m x {item.lebar}m</Text>
                ))}
              </View>
            )}

            {(formData.pintuList ?? []).length > 0 && (
              <View className='mt-2'>
                <Text className='text-sm font-bold'>{t('door')}</Text>
                <View className="flex-row">
                  <Text className='w-32 text-sm'>{t('doornum')}</Text>
                  <Text className='text-sm'>: {formData.pintu}</Text>
                </View>
                {formData.pintuList?.map((item: itemPintu, index: number) => (
                  <Text key={`pintu-${index}`} className='text-sm'>- {item.jenis}, {t('direction')}: {item.arah}, {t('size')}: {item.panjang}m x {item.lebar}m</Text>
                ))}
              </View>
            )}

            {(formData.lampuList ?? []).length > 0 && (
              <View className='mt-2'>
                <Text className='text-sm font-bold'>{t('lamp')}</Text>
                <View className="flex-row">
                  <Text className='w-32 text-sm'>{t('lampnum')}</Text>
                  <Text className='text-sm'>: {formData.jumlahLampu}</Text>
                </View>
                {formData.lampuList?.map((item: itemLampu, index: number) => (
                  <Text key={`lampu-${index}`} className='text-sm'>- {t('type')}: {item.jenis}, {t('num')}: {item.jumlah}</Text>
                ))}
              </View>
            )}

            {(formData.peralatanList ?? []).length > 0 && (
              <View className='mt-2'>
                <Text className='text-sm font-bold'>{t('equip')}</Text>
                <View className="flex-row">
                  <Text className='w-32 text-sm'>{t('equipnum')}</Text>
                  <Text className='text-sm'>: {formData.jumlahPeralatan}</Text>
                </View>
                {formData.peralatanList?.map((item: itemPeralatan, index: number) => (
                  <Text key={`peralatan-${index}`} className='text-sm'>- {item.jenis}, {t('num')}: {item.jumlah}</Text>
                ))}
              </View>
            )}
          </View>
        )}

        data={calcLoadPerMonth}
        keyExtractor={(_, index) => `grafik-bulan-${index}`}
        renderItem={({ item: dataPerBulan, index: bulanIdx }) => {
          const isValid = dataPerBulan && dataPerBulan.every(val => typeof val === 'number' && !isNaN(val));
          if (!isValid) {
            return (
              <View className='mb-8'>
                <Text className='text-base font-bold mb-2 text-secondary-300'>{bulanList[bulanIdx]}</Text>
                <Text className='text-red-500'>Data Invalid.</Text>
              </View>
            );
          }

          const max = Math.max(...dataPerBulan);
          const min = Math.min(...dataPerBulan);
          const chartData = dataPerBulan.map((val, i) => ({ x: i + 1, y: val }));

          const height = 240;
          const width = screenWidth - 40;
          const padding = 20;

          const yScale = (val: number) =>
            height - padding - ((val - min) / (max - min)) * (height - 2 * padding);
          const xScale = (i: number) =>
            padding + (i/23) * (width - 2 * padding);

          return (
            <View className='mb-8 px-4'>
              <Text className='text-base font-bold mb-2 text-secondary-300'>{bulanList[bulanIdx]}</Text>

              <Canvas style={{ width, height }}>
                {/* Garis Chart */}
                {chartData.map((point, idx) => {
                  if (idx === 0) return null;
                  const prev = chartData[idx - 1];
                  return (
                    <Line
                      key={`line-${idx}`}
                      p1={{ x: xScale(prev.x), y: yScale(prev.y) }}
                      p2={{ x: xScale(point.x), y: yScale(point.y) }}
                      color="#0066cc"
                      strokeWidth={2}
                    />
                  );
                })}

                {/* Y Axis Lines */}
                {[...Array(5)].map((_, i) => {
                  const yValue = min + ((max - min)/4) * i;
                  const yPos = yScale(yValue);
                  return (
                    <React.Fragment key={`yaxis-${i}`}>
                      <Line
                        p1={{ x: padding, y: yPos }}
                        p2={{ x: width - padding, y: yPos }}
                        color="#ccc"
                        strokeWidth={1}
                      />
                      <SkiaText
                        x={4}
                        y={yPos}
                        text={`${yValue.toFixed(0)} W`}
                        color="black"
                        font={font}
                      />
                    </React.Fragment>
                  );
                })}

                {/* X Axis Lines */}
                {[1, 4, 8, 12, 16, 20, 23].map((hour) => {
                  const xPos = xScale(hour);
                  return (
                    <React.Fragment key={`xaxis-${hour}`}>
                      <Line
                        p1={{ x: xPos, y: padding }}
                        p2={{ x: xPos, y: height - padding }}
                        color="#ccc"
                        strokeWidth={1}
                      />
                      <SkiaText
                        x={xPos - 8}
                        y={height - 4}
                        text={`${hour}`}
                        color="black"
                        font={font}
                      />
                    </React.Fragment>
                  );
                })}
              </Canvas>

              <View className="mt-2 p-3 bg-gray-100 rounded-lg">
                <Text className="text-sm">{t('max')}: {max.toFixed(2)} W</Text>
                <Text className="text-sm">{t('min')}: {min.toFixed(2)} W</Text>
              </View>
            </View>
          );
        }}
      />
      <View className='mb-32'></View>

      {/* Footer */}
      <View className="mb-30 absolute bottom-20 left-0 right-0 px-6 py-2">
        <TouchableOpacity
          onPress={handleNext}
          className="bg-secondary-300 px-6 py-3 rounded-lg items-center"
        >
          <Text className="text-white font-rubik-bold text-base">{t('done')}</Text>
        </TouchableOpacity>
      </View>

      <View className="h-20 bg-primary-300 rounded-t-xl absolute bottom-0 left-0 right-0" />
    </View>
  );
};

export default Result;
