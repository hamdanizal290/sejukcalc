import { FormProvider } from '@/backend/context/_formData'; // path sesuai kamu
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <FormProvider>
      <Stack screenOptions={{headerShown: false}}/>
    </FormProvider>
  );
}
