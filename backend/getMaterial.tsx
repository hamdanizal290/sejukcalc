export type MaterialRValue = {
  jenis: string;
  rValue: number;
};
export type MaterialUValue = {
  jenis: string;
  uValue: number;
};

// ROOF
export const materialAtap: MaterialRValue[] = [
  { jenis: 'Asbes Papan', rValue: 0.037 },
  { jenis: 'Aspal Roll', rValue: 0.027 },
  { jenis: 'Aspal Papan', rValue: 0.078 },
  { jenis: 'Batu Sabak', rValue: 0.009 },
  { jenis: 'Sirap Kayu', rValue: 0.166 },
  { jenis: 'Tanah Liat', rValue: 0.167 },
  { jenis: 'Ilalang 300mm', rValue: 4.5454 },
];
export const getRValueAtap = (jenis: string): number | null => {
  const found = materialAtap.find((item) => item.jenis === jenis);
  return found ? found.rValue : null;
};

// ROOF STRUCTURE
export const materialStrukturAtap: MaterialRValue[] = [
  { jenis: 'Kayu', rValue: 0.125 },
  { jenis: 'Batako', rValue: 0.075 },
  { jenis: 'Dek Besi', rValue: 0.005 },
];
export const getRValueStrukturAtap = (jenis: string): number | null => {
  const found = materialStrukturAtap.find((item) => item.jenis === jenis);
  return found ? found.rValue : null;
};

// WALL
export const materialDinding: MaterialRValue[] = [
  { jenis: 'Bata Merah', rValue: 0.12579 },
  { jenis: 'Bata Ringan', rValue: 0.375 },
  { jenis: 'Batako', rValue: 0.185 },
  { jenis: 'Kayu', rValue: 0.17857 },
  { jenis: 'Anyaman Bambu 20mm', rValue: 0.16667 },
];
export const getRValueDinding = (jenis: string): number | null => {
  const found = materialDinding.find((item) => item.jenis === jenis);
  return found ? found.rValue : null;
};

// CEILING
export const materialLangit: MaterialRValue[] = [
  { jenis: 'Tanpa Langit-langit', rValue: 0 },
  { jenis: 'Gipsum', rValue: 0.05625 },
  { jenis: 'PVC', rValue: 0.06667 },
  { jenis: 'Papan Kayu Lapis (Triplek)', rValue: 0.06 },
];
export const getRValueLangit = (jenis: string): number | null => {
  const found = materialLangit.find((item) => item.jenis === jenis);
  return found ? found.rValue : null;
};

// FLOOR
export const materialLantai: MaterialRValue[] = [
  { jenis: 'Karpet', rValue: 0.3 },
  { jenis: 'Keramik', rValue: 0.014 },
  { jenis: 'Karet', rValue: 0.06 },
];
export const getRValueLantai = (jenis: string): number | null => {
  const found = materialLantai.find((item) => item.jenis === jenis);
  return found ? found.rValue : null;
};

// DOOR
export const materialPintu: MaterialUValue[] = [
  { jenis: 'Pintu Kayu Rangka Kayu', uValue: 2.61 },
  { jenis: 'Pintu Besi Rangka Kayu', uValue: 0.91 },
  { jenis: 'Pintu Besi Rangka Besi', uValue: 2.1 },
  { jenis: 'Pintu Geser Kaca', uValue: 5.91 },
  { jenis: 'Pintu Gulung Atas (Garasi)', uValue: 6.53 },
];
export const getUValuePintu = (jenis: string): number | null => {
  const found = materialPintu.find((item) => item.jenis === jenis);
  return found ? found.uValue : null;
};

// OTHERS
export const rvalueSemen = 0.04;
export const rvalueUdara = 0.18;            // roof
export const rvalueOutSurface = 0.04;      // wall n roof
export const rvalueInVercSurface = 0.12;   // wall
export const rvalueInHorcSurface = 0.16;   // roof (floor / ceil)
export const uvalueKaca = 5.91;