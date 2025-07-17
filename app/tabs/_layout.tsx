import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import icons from '@/backend/icons'
import { useTranslation } from 'react-i18next';

const TabIcon = ({ focused, icon, title }: {focused: boolean; icon: any; title: string}) => (
    <View className='flex-1 mt-3 flex flex-col items-center'>
        <Image source={icon} tintColor={focused ? '#0D4715' : '#0D47154D'} resizeMode='contain' className='size-6'/>
        <Text className={`${focused ? 'text-secondary-300 font-rubik-medium' : 'text-secondary-100 font-rubik'} text-xs w-full text-center mt-1`}>{title}</Text>
    </View>
)

const TabsLayout = () => {
    const { t } = useTranslation();

    return (
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: '#E9762B',
                position: 'absolute',
                borderTopColor: '#0D4715',
                borderTopWidth: 1,
                minHeight: 70,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                overflow: 'hidden',
            }
          }}
        >

            <Tabs.Screen
                name="setting"
                options={{
                    title: "setting",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon={icons.settingsOn} focused={focused} title={t('setting')}/>
                    )
                }}
            />
            <Tabs.Screen
                name="calculate"
                options={{
                    title: "calculate",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon={icons.addCircleOn} focused={focused} title={t('calculation')}/>
                    )
                }}
            />
            <Tabs.Screen
                name="archive"
                options={{
                    title: "archive",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon icon={icons.archiveOn} focused={focused} title={t('archive')}/>
                    )
                }}
            />
        </Tabs>
    )
}

export default TabsLayout