import { dataCuaca } from './dataCuaca'
import { cltdCorr } from './getSCL_CLF';

//struktur CLTD WALL
export type ArahMataAngin = 'U' | 'S' | 'B' | 'T'; // Utara, Selatan, Barat, Timur
export type CLTDWallPerHour = {
  hour: number;
  values: {
    [key in ArahMataAngin]: number;
  };
};
export type CLTDWallData = {
  wallType: number;
  data: CLTDWallPerHour[];
};
//CLTD WALL
export const CLTDwall: CLTDWallData[] = [
  {
    wallType: 1,
    data: [
      { hour: 1, values: { U: 1, S: 1, B: 8, T: 1 } },
      { hour: 2, values: { U: 0, S: 0, B: 7, T: 0 } },
      { hour: 3, values: { U: -1, S: -1, B: 6, T: -1 } },
      { hour: 4, values: { U: -1, S: -1, B: 5, T: -1 } },
      { hour: 5, values: { U: -2, S: -1, B: 4, T: -1 } },
      { hour: 6, values: { U: -1, S: -1, B: 3, T: 0 } },
      { hour: 7, values: { U: 4, S: 5, B: 4, T: 8 } },
      { hour: 8, values: { U: 6, S: 10, B: 6, T: 18 } },
      { hour: 9, values: { U: 6, S: 15, B: 9, T: 26 } },
      { hour: 10, values: { U: 7, S: 18, B: 12, T: 31 } },
      { hour: 11, values: { U: 9, S: 20, B: 16, T: 32 } },
      { hour: 12, values: { U: 12, S: 20, B: 18, T: 31 } },
      { hour: 13, values: { U: 14, S: 18, B: 19, T: 27 } },
      { hour: 14, values: { U: 15, S: 16, B: 19, T: 20 } },
      { hour: 15, values: { U: 16, S: 15, B: 19, T: 17 } },
      { hour: 16, values: { U: 16, S: 14, B: 18, T: 15 } },
      { hour: 17, values: { U: 16, S: 12, B: 17, T: 13 } },
      { hour: 18, values: { U: 16, S: 10, B: 15, T: 12 } },
      { hour: 19, values: { U: 15, S: 9, B: 14, T: 10 } },
      { hour: 20, values: { U: 9, S: 8, B: 13, T: 9 } },
      { hour: 21, values: { U: 6, S: 6, B: 12, T: 7 } },
      { hour: 22, values: { U: 4, S: 4, B: 10, T: 5 } },
      { hour: 23, values: { U: 3, S: 3, B: 8, T: 3 } },
      { hour: 24, values: { U: 2, S: 2, B: 7, T: 2 } },
    ],
  },
  {
    wallType: 2,
    data: [
      { hour: 1, values: { U: 2, S: 2, B: 9, T: 2 } },
      { hour: 2, values: { U: 1, S: 1, B: 8, T: 1 } },
      { hour: 3, values: { U: 0, S: 0, B: 7, T: 0 } },
      { hour: 4, values: { U: 0, S: 0, B: 6, T: 0 } },
      { hour: 5, values: { U: -1, S: 0, B: 5, T: 0 } },
      { hour: 6, values: { U: 0, S: 0, B: 4, T: 1 } },
      { hour: 7, values: { U: 6, S: 6, B: 5, T: 10 } },
      { hour: 8, values: { U: 8, S: 12, B: 7, T: 20 } },
      { hour: 9, values: { U: 9, S: 17, B: 10, T: 28 } },
      { hour: 10, values: { U: 10, S: 20, B: 13, T: 33 } },
      { hour: 11, values: { U: 11, S: 22, B: 17, T: 35 } },
      { hour: 12, values: { U: 14, S: 22, B: 19, T: 34 } },
      { hour: 13, values: { U: 16, S: 20, B: 20, T: 30 } },
      { hour: 14, values: { U: 17, S: 18, B: 20, T: 22 } },
      { hour: 15, values: { U: 18, S: 17, B: 20, T: 19 } },
      { hour: 16, values: { U: 18, S: 16, B: 19, T: 17 } },
      { hour: 17, values: { U: 18, S: 14, B: 18, T: 15 } },
      { hour: 18, values: { U: 18, S: 12, B: 16, T: 14 } },
      { hour: 19, values: { U: 17, S: 11, B: 15, T: 12 } },
      { hour: 20, values: { U: 12, S: 9, B: 13, T: 10 } },
      { hour: 21, values: { U: 9, S: 8, B: 12, T: 9 } },
      { hour: 22, values: { U: 7, S: 6, B: 10, T: 7 } },
      { hour: 23, values: { U: 6, S: 5, B: 9, T: 6 } },
      { hour: 24, values: { U: 4, S: 4, B: 7, T: 4 } },
    ],
  },
  {
    wallType: 3,
    data: [
      { hour: 1, values: { U: 4, S: 4, B: 11, T: 4 } },
      { hour: 2, values: { U: 3, S: 3, B: 9, T: 3 } },
      { hour: 3, values: { U: 1, S: 1, B: 8, T: 1 } },
      { hour: 4, values: { U: 1, S: 1, B: 6, T: 1 } },
      { hour: 5, values: { U: 0, S: 1, B: 5, T: 1 } },
      { hour: 6, values: { U: 0, S: 1, B: 5, T: 2 } },
      { hour: 7, values: { U: 6, S: 7, B: 6, T: 10 } },
      { hour: 8, values: { U: 9, S: 13, B: 8, T: 20 } },
      { hour: 9, values: { U: 10, S: 18, B: 11, T: 28 } },
      { hour: 10, values: { U: 11, S: 21, B: 14, T: 34 } },
      { hour: 11, values: { U: 12, S: 23, B: 18, T: 36 } },
      { hour: 12, values: { U: 15, S: 23, B: 20, T: 35 } },
      { hour: 13, values: { U: 17, S: 21, B: 21, T: 31 } },
      { hour: 14, values: { U: 18, S: 19, B: 21, T: 23 } },
      { hour: 15, values: { U: 19, S: 18, B: 21, T: 20 } },
      { hour: 16, values: { U: 19, S: 17, B: 20, T: 18 } },
      { hour: 17, values: { U: 19, S: 15, B: 19, T: 16 } },
      { hour: 18, values: { U: 19, S: 13, B: 17, T: 15 } },
      { hour: 19, values: { U: 18, S: 12, B: 16, T: 13 } },
      { hour: 20, values: { U: 13, S: 10, B: 14, T: 11 } },
      { hour: 21, values: { U: 10, S: 9, B: 13, T: 10 } },
      { hour: 22, values: { U: 8, S: 8, B: 11, T: 8 } },
      { hour: 23, values: { U: 7, S: 6, B: 10, T: 7 } },
      { hour: 24, values: { U: 5, S: 5, B: 8, T: 5 } },
    ],
  },
  {
    wallType: 4,
    data: [
      { hour: 1, values: { U: 6, S: 6, B: 12, T: 6 } },
      { hour: 2, values: { U: 4, S: 4, B: 8, T: 4 } },
      { hour: 3, values: { U: 3, S: 3, B: 6, T: 3 } },
      { hour: 4, values: { U: 2, S: 2, B: 4, T: 2 } },
      { hour: 5, values: { U: 1, S: 1, B: 2, T: 1 } },
      { hour: 6, values: { U: 0, S: 1, B: 1, T: 1 } },
      { hour: 7, values: { U: 0, S: 0, B: 1, T: 1 } },
      { hour: 8, values: { U: 1, S: 1, B: 0, T: 3 } },
      { hour: 9, values: { U: 2, S: 0, B: 1, T: 8 } },
      { hour: 10, values: { U: 3, S: 1, B: 1, T: 15 } },
      { hour: 11, values: { U: 4, S: 3, B: 3, T: 21 } },
      { hour: 12, values: { U: 6, S: 7, B: 4, T: 25 } },
      { hour: 13, values: { U: 7, S: 11, B: 6, T: 27 } },
      { hour: 14, values: { U: 9, S: 16, B: 8, T: 26 } },
      { hour: 15, values: { U: 11, S: 19, B: 12, T: 24 } },
      { hour: 16, values: { U: 12, S: 23, B: 17, T: 22 } },
      { hour: 17, values: { U: 13, S: 24, B: 22, T: 21 } },
      { hour: 18, values: { U: 14, S: 23, B: 28, T: 19 } },
      { hour: 19, values: { U: 15, S: 22, B: 33, T: 18 } },
      { hour: 20, values: { U: 15, S: 19, B: 36, T: 16 } },
      { hour: 21, values: { U: 14, S: 17, B: 33, T: 14 } },
      { hour: 22, values: { U: 12, S: 13, B: 28, T: 12 } },
      { hour: 23, values: { U: 11, S: 11, B: 22, T: 9 } },
      { hour: 24, values: { U: 8, S: 8, B: 17, T: 8 } },
    ],
  },
  {
    wallType: 5,
    data: [
      { hour: 1, values: { U: 7, S: 8, B: 14, T: 8 } },
      { hour: 2, values: { U: 6, S: 7, B: 11, T: 6 } },
      { hour: 3, values: { U: 4, S: 5, B: 9, T: 5 } },
      { hour: 4, values: { U: 3, S: 4, B: 7, T: 4 } },
      { hour: 5, values: { U: 3, S: 3, B: 6, T: 3 } },
      { hour: 6, values: { U: 2, S: 2, B: 4, T: 2 } },
      { hour: 7, values: { U: 1, S: 2, B: 3, T: 2 } },
      { hour: 8, values: { U: 2, S: 1, B: 2, T: 4 } },
      { hour: 9, values: { U: 3, S: 2, B: 2, T: 9 } },
      { hour: 10, values: { U: 3, S: 2, B: 3, T: 14 } },
      { hour: 11, values: { U: 4, S: 4, B: 4, T: 18 } },
      { hour: 12, values: { U: 5, S: 7, B: 5, T: 22 } },
      { hour: 13, values: { U: 7, S: 11, B: 6, T: 22 } },
      { hour: 14, values: { U: 8, S: 14, B: 8, T: 22 } },
      { hour: 15, values: { U: 9, S: 17, B: 11, T: 21 } },
      { hour: 16, values: { U: 11, S: 19, B: 16, T: 21 } },
      { hour: 17, values: { U: 12, S: 20, B: 21, T: 19 } },
      { hour: 18, values: { U: 13, S: 20, B: 25, T: 19 } },
      { hour: 19, values: { U: 13, S: 19, B: 29, T: 18 } },
      { hour: 20, values: { U: 13, S: 18, B: 30, T: 16 } },
      { hour: 21, values: { U: 13, S: 16, B: 28, T: 14 } },
      { hour: 22, values: { U: 12, S: 13, B: 24, T: 13 } },
      { hour: 23, values: { U: 10, S: 12, B: 21, T: 11 } },
      { hour: 24, values: { U: 8, S: 10, B: 17, T: 9 } },
    ],
  },
  {
    wallType: 10,
    data: [
      { hour: 1, values: { U: 9, T: 11, S: 12, B: 19 } },
      { hour: 2, values: { U: 8, T: 9, S: 10, B: 17 } },
      { hour: 3, values: { U: 7, T: 8, S: 8, B: 14 } },
      { hour: 4, values: { U: 6, T: 7, S: 7, B: 12 } },
      { hour: 5, values: { U: 5, T: 6, S: 6, B: 10 } },
      { hour: 6, values: { U: 4, T: 4, S: 5, B: 8 } },
      { hour: 7, values: { U: 3, T: 4, S: 4, B: 7 } },
      { hour: 8, values: { U: 3, T: 4, S: 3, B: 5 } },
      { hour: 9, values: { U: 3, T: 6, S: 2, B: 4 } },
      { hour: 10, values: { U: 3, T: 8, S: 2, B: 4 } },
      { hour: 11, values: { U: 3, T: 11, S: 3, B: 4 } },
      { hour: 12, values: { U: 4, T: 14, S: 4, B: 4 } },
      { hour: 13, values: { U: 4, T: 17, S: 6, B: 4 } },
      { hour: 14, values: { U: 6, T: 19, S: 8, B: 6 } },
      { hour: 15, values: { U: 7, T: 19, S: 11, B: 7 } },
      { hour: 16, values: { U: 8, T: 20, S: 13, B: 9 } },
      { hour: 17, values: { U: 9, T: 20, S: 16, B: 13 } },
      { hour: 18, values: { U: 10, T: 19, S: 17, B: 17 } },
      { hour: 19, values: { U: 11, T: 19, S: 18, B: 21 } },
      { hour: 20, values: { U: 12, T: 18, S: 18, B: 23 } },
      { hour: 21, values: { U: 12, T: 17, S: 17, B: 25 } },
      { hour: 22, values: { U: 12, T: 16, S: 16, B: 25 } },
      { hour: 23, values: { U: 12, T: 14, S: 14, B: 23 } },
      { hour: 24, values: { U: 11, T: 13, S: 13, B: 22 } },
    ],
  }
];

//struktur CLTD Roof Glass
export type CLTDRoofGlassData = {
  hour: number;
  values: {
    [roofType: string]: number; // e.g. "1", "2", "3", ..., "Glass"
  };
};
//CLTD Roof Glass
export const CLTDRoofGlass: CLTDRoofGlassData[] = [
  { hour: 1, values: { "1": 0, "2": 1, "3": 7, "4": 9, "5": 12, Glass: 1 } },
  { hour: 2, values: { "1": -1, "2": 0, "3": 4, "4": 6, "5": 12, Glass: 0 } },
  { hour: 3, values: { "1": -2, "2": -1, "3": 3, "4": 4, "5": 9, Glass: -1 } },
  { hour: 4, values: { "1": -3, "2": -2, "3": 1, "4": 2, "5": 7, Glass: -1 } },
  { hour: 5, values: { "1": -3, "2": -3, "3": 0, "4": 1, "5": 4, Glass: -1 } },
  { hour: 6, values: { "1": -3, "2": -3, "3": -1, "4": -1, "5": 2, Glass: -1 } },
  { hour: 7, values: { "1": 0, "2": -2, "3": 0, "4": -2, "5": 1, Glass: -1 } },
  { hour: 8, values: { "1": 7, "2": 2, "3": 3, "4": -2, "5": 1, Glass: 0 } },
  { hour: 9, values: { "1": 16, "2": 9, "3": 7, "4": 0, "5": 2, Glass: 1 } },
  { hour: 10, values: { "1": 25, "2": 18, "3": 13, "4": 4, "5": 7, Glass: 2 } },
  { hour: 11, values: { "1": 33, "2": 27, "3": 19, "4": 9, "5": 12, Glass: 4 } },
  { hour: 12, values: { "1": 41, "2": 34, "3": 26, "4": 16, "5": 17, Glass: 5 } },
  { hour: 13, values: { "1": 46, "2": 41, "3": 32, "4": 23, "5": 22, Glass: 7 } },
  { hour: 14, values: { "1": 49, "2": 46, "3": 37, "4": 30, "5": 27, Glass: 7 } },
  { hour: 15, values: { "1": 49, "2": 48, "3": 40, "4": 36, "5": 33, Glass: 8 } },
  { hour: 16, values: { "1": 46, "2": 47, "3": 41, "4": 41, "5": 37, Glass: 8 } },
  { hour: 17, values: { "1": 41, "2": 44, "3": 41, "4": 43, "5": 38, Glass: 7 } },
  { hour: 18, values: { "1": 33, "2": 39, "3": 37, "4": 43, "5": 36, Glass: 7 } },
  { hour: 19, values: { "1": 24, "2": 31, "3": 33, "4": 41, "5": 33, Glass: 6 } },
  { hour: 20, values: { "1": 14, "2": 22, "3": 27, "4": 37, "5": 29, Glass: 4 } },
  { hour: 21, values: { "1": 8, "2": 14, "3": 21, "4": 31, "5": 27, Glass: 3 } },
  { hour: 22, values: { "1": 5, "2": 8, "3": 17, "4": 25, "5": 25, Glass: 2 } },
  { hour: 23, values: { "1": 3, "2": 5, "3": 13, "4": 19, "5": 23, Glass: 2 } },
  { hour: 24, values: { "1": 1, "2": 3, "3": 9, "4": 13, "5": 21, Glass: 1 } },
];

//Fungsi Get
export const getCLTDWall = (
  wallType: number,
  hour: number,
  arah: ArahMataAngin
): number | null => {
  const wall = CLTDwall.find((item) => item.wallType === wallType);
  if (!wall) return null;

  const hourData = wall.data.find((d) => d.hour === hour);
  if (!hourData) return null;

  return hourData.values[arah] ?? null;
};

export const getCLTDRoofGlass = (hour: number, roofType: string): number | null => {
  const found = CLTDRoofGlass.find((item) => item.hour === hour);
  return found ? found.values[roofType] ?? null : null;
};

//Fungsi getCLTD
export const getCLTD = (
  kota: string = '',
  roofType: string = '',
  wallType: number = 0,
): number[][][] => {
  const bulanList = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const arahList: ("U" | "S" | "B" | "T")[] = ["U", "S", "B", "T"];
  const temp = (22.8 + 25.8)/2;

  const result: number[][][] = []; // [jam][tipe][bulan]

  for (let jam = 1; jam <= 24; jam++) {
    const jamData: number[][] = [];
    
    // roof
    const rowRoof: number[] = bulanList.map((bulan) => {
      const cuaca = dataCuaca.find((d) => d.kota === kota && d.bulan === bulan && d.jam === jam);
      const koreksi = cuaca ? (cuaca.drybulb - 29.4) + (25.5 - temp) : 0;
      const cltd = getCLTDRoofGlass(jam, roofType) ?? 0;
      
      if (cltdCorr) {
        return +(cltd + koreksi).toFixed(6);
      } else {
        return cltd;
      }
      
    });
    jamData.push(rowRoof);

    // U, S, B, T
    for (const arah of arahList) {
      const row: number[] = bulanList.map((bulan) => {
        const cuaca = dataCuaca.find((d) => d.kota === kota && d.bulan === bulan && d.jam === jam);
        const koreksi = cuaca ? (cuaca.drybulb - 29.4) + (25.5 - temp) : 0;
        const cltd = getCLTDWall(wallType, jam, arah) ?? 0;
        
        if (cltdCorr) {
          return +(cltd + koreksi).toFixed(6);
        } else {
          return cltd;
        }
      });
      jamData.push(row);
    }

    // glass
    const rowGlass: number[] = bulanList.map((bulan) => {
      const cuaca = dataCuaca.find((d) => d.kota === kota && d.bulan === bulan && d.jam === jam);
      const koreksi = cuaca ? (cuaca.drybulb - 29.4) + (25.5 - temp) : 0;
      const cltd = getCLTDRoofGlass(jam, "Glass") ?? 0;
      
      if (cltdCorr) {
        return +(cltd + koreksi).toFixed(6);
      } else {
        return cltd;
      }
    });
    jamData.push(rowGlass);

    result.push(jamData); // hasil untuk 1 jam
  }

  return result;
};

