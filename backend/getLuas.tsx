import { itemJendela, itemPintu } from "@/app/input/step4";
import { useForm } from "./context/_formData";

export const hitungLuasDinding = (
  formData: ReturnType<typeof useForm>['formData'],
  panjang: number,
  lebar: number,
  tinggi: number,
  arah: string,
) => {
  let luasU = 0;
  let luasS = 0;
  let luasB = 0;
  let luasT = 0;
  let luasA = panjang * lebar; // luas atas
  const { jendela, jendelaList } = formData;
  const { pintu, pintuList } = formData;

  if (arah === 'U' || arah === 'S') {
    luasU = panjang * tinggi;
    luasS = luasU;
    luasB = lebar * tinggi;
    luasT = luasB;
  } else if (arah === 'B' || arah === 'T') {
    luasB = panjang * tinggi;
    luasT = luasB;
    luasU = lebar * tinggi;
    luasS = luasU;
  }

  jendelaList.forEach((j: itemJendela) => {
    const luas = Number(j.panjang) * Number(j.lebar);
    const arah = j.arah;

    if (arah === 'Utara') {
      luasU -= luas;
    } else if (arah === 'Selatan') {
      luasS -= luas;
    } else if (arah === 'Barat') {
      luasB -= luas;
    } else if (arah === 'Timur') {
      luasT -= luas;
    }
  });

  pintuList.forEach((p: itemPintu) => {
    const luas = Number(p.panjang) * Number(p.lebar);
    const arah = p.arah;

    if (arah === 'Utara') {
      luasU -= luas;
    } else if (arah === 'Selatan') {
      luasS -= luas;
    } else if (arah === 'Barat') {
      luasB -= luas;
    } else if (arah === 'Timur') {
      luasT -= luas;
    }
  })

  return { luasU, luasS, luasB, luasT, luasA };
};