import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Dimensions, ActivityIndicator, Image, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Canvas, Line, Text as SkiaText, useFont } from '@shopify/react-native-skia';
import { useTranslation } from 'react-i18next';
import { ArchiveEntry } from '@/app/tabs/archive';
import { itemJendela, itemPintu } from './step4';
import { itemLampu, itemPeralatan } from './step5';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const ResultView = () => {
  const fullViewRef = useRef(null);
  const { t } = useTranslation();
  const { entryId } = useLocalSearchParams();
  const [entry, setEntry] = useState<ArchiveEntry | null>(null);
  const screenWidth = Dimensions.get('window').width;
  const [loading, setLoading] = useState(true);

  const font = useFont(require('../../assets/fonts/Rubik-Regular.ttf'), 10);

  const bulanList = [
    t('jan'), t('feb'), t('mar'), t('apr'), t('mei'), t('jun'),
    t('jul'), t('ags'), t('sep'), t('okt'), t('nov'), t('des'),
  ];

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const stored = await AsyncStorage.getItem('archives');
        if (stored) {
          const archives: ArchiveEntry[] = JSON.parse(stored);
          const found = archives.find(a => a.id === entryId);
          if (found) {
            setEntry(found);
          }
        }
      } catch (e) {
        console.error('Gagal memuat arsip,', e);
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [entryId]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  if (!entry) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>{t('archivenotfound')}.</Text>
      </View>
    );
  }

  const { formData, calcLoad } = entry.data;

  const calcLoadPerMonth: number[][] = Array.from({ length: 12 }, (_, bulanIdx) =>
    calcLoad.map(row => row[bulanIdx])
  );

  const generateHTML = (entry: ArchiveEntry) => {
    const { formData, calcLoad } = entry.data;
    const bulanList = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
    ];

    const calcLoadPerMonth: number[][] = Array.from({ length: 12 }, (_, bulanIdx) =>
      calcLoad.map(row => row[bulanIdx])
    );

    const style = `
      <style>
        body { font-family: sans-serif; padding: 24px; }
        .section { margin-bottom: 24px; }
        .page-break { page-break-before: always; }
        h2, h3 { color: #E9762B; }
        table { width: 100%; border-collapse: collapse; margin-top: 12px; }
        td, th { border: 1px solid #ccc; padding: 6px; font-size: 12px; }
      </style>
    `;

    const detailRuanganHTML = `
      <div class="section">
        <h2 style="text-align: center;">Detail Ruangan</h2>
        <p><strong>Kota:</strong> ${formData.kota}</p>
        <p><strong>Jenis Ruang:</strong> ${formData.jenisRuang}</p>
        <p><strong>Ukuran:</strong> ${formData.panjang}m x ${formData.lebar}m x ${formData.tinggi}m</p>
        <p><strong>Jumlah Penghuni:</strong> ${formData.jumlahPenghuni}</p>
        <p><strong>Material Dinding:</strong> ${formData.dinding}</p>
        <p><strong>Material Atap:</strong> ${formData.atap}</p>
        <p><strong>Struktur Atap:</strong> ${formData.strukturAtap}</p>
        <p><strong>Langit-langit:</strong> ${formData.langit}</p>
        <p><strong>Lantai:</strong> ${formData.lantai}</p>
      </div>
    `;

    const grafikSection = calcLoadPerMonth.map((dataPerBulan, bulanIdx) => {
      const max = Math.max(...dataPerBulan).toFixed(2);
      const min = Math.min(...dataPerBulan).toFixed(2);

      const tableRows = dataPerBulan.map((val, jam) => `
        <tr><td>${jam + 1}:00</td><td>${val.toFixed(2)} W</td></tr>
      `).join('');

      return `
        <div>
          <h3>${bulanList[bulanIdx]}</h3>
          <p>Max Load: ${max} W<br/>Min Load: ${min} W</p>
          <table>
            <thead>
              <tr><th>Jam</th><th>Beban Panas</th></tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </div>
        <div class="page-break"></div>
      `;
    }).join('');

    return `
      <html>
        <head>
          ${style}
        </head>
        <body>
          ${detailRuanganHTML}
          <div class="page-break">
            <h2 style="text-align: center;">Beban Panas per Bulan</h2>
          </div>
          ${grafikSection}
        </body>
      </html>
    `;
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
                <View className='mt-2'>\
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
                    )
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
        <View className="absolute bottom-20 left-0 right-0 px-6 py-2">
          <TouchableOpacity
            onPress={async () => {
              try {
                const html = generateHTML(entry);
                const { uri } = await Print.printToFileAsync({ html });
                
                if (await Sharing.isAvailableAsync()) {
                  await Sharing.shareAsync(uri);
                } else {
                  Alert.alert('Gagal', 'Fitur berbagi tidak tersedia');
                }
              } catch (error) {
                console.error('PDF Error:', error);
                Alert.alert('Gagal', 'Gagal membuat PDF');
              }
            }}
            className="bg-secondary-300 p-2 rounded mt-4"
          >
            <Text className="text-white text-center font-rubik-bold">{t('downloadpdf')}</Text>
          </TouchableOpacity>
        </View>

        <View className="h-20 bg-primary-300 rounded-t-xl absolute bottom-0 left-0 right-0" />
      </View>

  );
};

export default ResultView;
