//Fungsi Roof Type
export type MaterialRoof = {
  strukAtap: string;
  langit: string;
  tipe: number;
};
export const materialRoof: MaterialRoof[] = [
  { strukAtap: 'Kayu', langit: 'Tanpa Langit-langit', tipe: 1 },
  { strukAtap: 'Kayu', langit: 'Gipsum', tipe: 4 },
  { strukAtap: 'Kayu', langit: 'PVC', tipe: 4 },
  { strukAtap: 'Kayu', langit: 'Triplek', tipe: 4 },

  { strukAtap: 'Batako', langit: 'Tanpa Langit-langit', tipe: 2 },
  { strukAtap: 'Batako', langit: 'Gipsum', tipe: 3 },
  { strukAtap: 'Batako', langit: 'PVC', tipe: 3 },
  { strukAtap: 'Batako', langit: 'Triplek', tipe: 3 },

  { strukAtap: 'Dek Besi', langit: 'Tanpa Langit-langit', tipe: 1 },
  { strukAtap: 'Dek Besi', langit: 'Gipsum', tipe: 1 },
  { strukAtap: 'Dek Besi', langit: 'PVC', tipe: 1 },
  { strukAtap: 'Dek Besi', langit: 'Triplek', tipe: 1 },
];
export const getRoofType = (
  strukAtap: string = '',
  langit: string = '',
): number | null => {
  const found = materialRoof.find(
    (item) => item.strukAtap === strukAtap && item.langit === langit
  );
  return found ? found.tipe : null;
};

//Fungsi Wall Type
export type MaterialWall = {
  wall: string;
  tipe: number;
};
export const materialWall: MaterialWall[] = [
  { wall: 'Bata Merah', tipe: 10 },
  { wall: 'Bata Ringan', tipe: 10 },
  { wall: 'Batako', tipe: 10 },
  { wall: 'Kayu', tipe: 5 },
  { wall: 'Anyaman Bambu 20mm', tipe: 5 }
];
export const getWallType = (wall: string = ''): number | null => {
  const found = materialWall.find((item) => item.wall === wall);
  return found ? found.tipe : null;
};

export type RoomTypeKey =
  | 'sensibel'
  | 'laten'
  | 'equipHour'
  | 'lightHour'
  | 'lsPerPerson'
  | 'lsPerM2';

export type RoomData = {
  jenis: string;
  sensibel: number;
  laten: number;
  equipHour: number;
  lightHour: number;
  lsPerPerson: number;
  lsPerM2: number;
};

export const roomData: RoomData[] = [
  {
    jenis: 'Ruang Keluarga',
    sensibel: 70,
    laten: 90,
    equipHour: 12,
    lightHour: 12,
    lsPerPerson: 2.5,
    lsPerM2: 0.3,
  },
  {
    jenis: 'Kamar Tidur',
    sensibel: 70,
    laten: 90,
    equipHour: 8,
    lightHour: 8,
    lsPerPerson: 2.5,
    lsPerM2: 0.3,
  },
  {
    jenis: 'Ruang Tamu',
    sensibel: 70,
    laten: 90,
    equipHour: 4,
    lightHour: 8,
    lsPerPerson: 2.5,
    lsPerM2: 0.3,
  },
  {
    jenis: 'Ruang Makan',
    sensibel: 70,
    laten: 90,
    equipHour: 3,
    lightHour: 4,
    lsPerPerson: 2.5,
    lsPerM2: 0.3,
  },
  {
    jenis: 'Kamar Ibadah',
    sensibel: 70,
    laten: 90,
    equipHour: 2,
    lightHour: 2,
    lsPerPerson: 2.5,
    lsPerM2: 0.3,
  },
  {
    jenis: 'Kamar Mandi',
    sensibel: 70,
    laten: 90,
    equipHour: 2,
    lightHour: 2,
    lsPerPerson: 2.5,
    lsPerM2: 0.3,
  },
  {
    jenis: 'Dapur',
    sensibel: 75,
    laten: 95,
    equipHour: 5,
    lightHour: 6,
    lsPerPerson: 3.8,
    lsPerM2: 0.6,
  },
  {
    jenis: 'Garasi',
    sensibel: 75,
    laten: 95,
    equipHour: 2,
    lightHour: 2,
    lsPerPerson: 2.5,
    lsPerM2: 0.3,
  },
];
export const getRoomType = (
  jenis: string = '',
  key: RoomTypeKey
): number | null => {
  const found = roomData.find((room) => room.jenis === jenis);
  return found ? found[key] : null;
};
