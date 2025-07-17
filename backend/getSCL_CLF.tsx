// fungsi get SCL
export const SCLTable: number[][] = [
  [0, 0, 0, 0, 3, 79, 85, 88, 101, 110, 120, 126, 126, 123, 113, 98, 98, 113, 38, 19, 9, 3, 3, 0], // Utara
  [0, 0, 0, 0, 0, 28, 54, 79, 129, 202, 268, 306, 302, 265, 198, 132, 98, 63, 25, 13, 6, 3, 0, 0], // Selatan
  [3, 0, 0, 0, 0, 28, 54, 76, 95, 110, 120, 126, 205, 359, 498, 589, 605, 491, 180, 85, 41, 19, 9, 6], // Barat
  [0, 0, 0, 0, 6, 293, 495, 583, 576, 485, 334, 211, 167, 142, 123, 104, 82, 57, 22, 9, 6, 3, 0, 0], // Timur
];
export const getSCL = (arah: 'U' | 'S' | 'B' | 'T', jam: number): number | null => {
  const arahIndexMap: Record<string, number> = {
    U: 0,
    S: 1,
    B: 2,
    T: 3,
  };

  const rowIndex = arahIndexMap[arah];
  if (rowIndex === undefined || jam < 1 || jam > 24) {
    console.warn('Arah tidak valid atau jam di luar rentang 1–24');
    return null;
  }

  return SCLTable[rowIndex][jam - 1]; // indeks jam dimulai dari 0
};

// fungsi get CLF unhooded/people
// Baris = hoursInSpace: [2, 4, 6, 8, 10, 12, 14, 16, 18]
export const CLFPeopleTable: number[][] = [
  [0.75, 0.88, 0.18, 0.08, 0.04, 0.02, 0.01, 0.01, 0.01, 0.01, 0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0   ],
  [0.75, 0.88, 0.93, 0.95, 0.22, 0.10, 0.05, 0.03, 0.02, 0.02, 0.01, 0.01, 0.01, 0.01, 0,    0,    0,    0,    0,    0,    0,    0,    0,    0   ],
  [0.75, 0.88, 0.93, 0.95, 0.97, 0.97, 0.23, 0.11, 0.06, 0.04, 0.03, 0.02, 0.02, 0.01, 0.01, 0.01, 0.01, 0,    0,    0,    0,    0,    0,    0   ],
  [0.75, 0.88, 0.93, 0.95, 0.97, 0.97, 0.98, 0.98, 0.24, 0.11, 0.06, 0.04, 0.03, 0.02, 0.02, 0.01, 0.01, 0.01, 0.01, 0.01, 0,    0,    0,    0   ],
  [0.75, 0.88, 0.93, 0.95, 0.97, 0.97, 0.98, 0.98, 0.99, 0.99, 0.24, 0.12, 0.07, 0.04, 0.03, 0.02, 0.02, 0.01, 0.01, 0.01, 0.01, 0.01, 0,    0   ],
  [0.75, 0.88, 0.93, 0.96, 0.97, 0.98, 0.98, 0.98, 0.99, 0.99, 0.99, 0.99, 0.25, 0.12, 0.07, 0.04, 0.03, 0.02, 0.02, 0.02, 0.01, 0.01, 0.01, 0.01],
  [0.76, 0.88, 0.93, 0.96, 0.97, 0.98, 0.98, 0.99, 0.99, 0.99, 0.99, 0.99, 1,    1,    0.25, 0.12, 0.07, 0.05, 0.03, 0.03, 0.02, 0.02, 0.01, 0.01],
  [0.76, 0.89, 0.94, 0.96, 0.97, 0.98, 0.98, 0.99, 0.99, 0.99, 0.99, 0.99, 1,    1,    1,    1,    0.25, 0.12, 0.07, 0.05, 0.03, 0.03, 0.02, 0.02],
  [0.77, 0.89, 0.94, 0.96, 0.97, 0.98, 0.98, 0.99, 0.99, 0.99, 0.99, 1,    1,    1,    1,    1,    1,    1,    0.25, 0.12, 0.07, 0.05, 0.03, 0.03],
];
export const getCLFPeople = (hoursInSpace: number, jam: number): number | null => {
  const jamIndex = jam - 1;

  const hoursIndexMap: Record<number, number> = {
    1: 0, 2: 0,
    3: 1, 4: 1,
    5: 2, 6: 2,
    7: 3, 8: 3,
    9: 4, 10: 4,
    11: 5, 12: 5,
    13: 6, 14: 6,
    15: 7, 16: 7,
    17: 8, 18: 8,
    19: 8, 20: 8, 21: 8, 22: 8, 23: 8, 24: 8,
  };

  const rowIndex = hoursIndexMap[hoursInSpace];
  if (rowIndex === undefined || jamIndex < 0 || jamIndex > 23) {
    console.warn('Hours in space atau jam tidak valid.');
    return null;
  }

  return CLFPeopleTable[rowIndex][jamIndex];
};

// fungsi get CLF light
// Baris = lightsOnFor: [8, 10, 12, 14, 16]
export const CLFLightsTable: number[][] = [
  [0.85, 0.92, 0.95, 0.96, 0.97, 0.97, 0.97, 0.98, 0.13, 0.06, 0.04, 0.03, 0.02, 0.02, 0.02, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01],
  [0.85, 0.93, 0.95, 0.97, 0.97, 0.97, 0.98, 0.98, 0.98, 0.98, 0.14, 0.07, 0.04, 0.03, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.01, 0.01, 0.01, 0.01],
  [0.86, 0.93, 0.96, 0.97, 0.97, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.14, 0.07, 0.04, 0.03, 0.03, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02],
  [0.86, 0.93, 0.96, 0.97, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.99, 0.99, 0.99, 0.99, 0.15, 0.07, 0.05, 0.03, 0.03, 0.03, 0.02, 0.02, 0.02, 0.02],
  [0.87, 0.94, 0.96, 0.97, 0.98, 0.98, 0.98, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.15, 0.08, 0.05, 0.04, 0.03, 0.03, 0.03, 0.02],
];
export const getCLFLights = (lightsOnFor: number, jam: number): number | null => {
  const jamIndex = jam - 1;

  const hoursIndexMap: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0,
    9: 1, 10: 1,
    11: 2, 12: 2,
    13: 3, 14: 3,
    15: 4, 16: 4,
    17: 4, 18: 4, 19: 4, 20: 4, 21: 4, 22: 4, 23: 4, 24: 4,
  };

  const rowIndex = hoursIndexMap[lightsOnFor];
  if (rowIndex === undefined || jamIndex < 0 || jamIndex > 23) {
    console.warn('Durasi lights on atau jam tidak valid.');
    return null;
  }

  return CLFLightsTable[rowIndex][jamIndex];
};

// fungsi get CLF hooded
// Baris = hoursInOperation: [2, 4, 6, 8, 10, 12, 14, 16, 18]
export const CLFHoodedTable: number[][] = [
  [0.64, 0.83, 0.26, 0.11, 0.06, 0.03, 0.01, 0.01, 0.01, 0.01, 0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0],
  [0.64, 0.83, 0.90, 0.93, 0.31, 0.14, 0.07, 0.04, 0.03, 0.03, 0.01, 0.01, 0.01, 0.01, 0,    0,    0,    0,    0,    0,    0,    0,    0,    0],
  [0.64, 0.83, 0.90, 0.93, 0.96, 0.96, 0.33, 0.16, 0.09, 0.06, 0.04, 0.03, 0.03, 0.01, 0.01, 0.01, 0.01, 0,    0,    0,    0,    0,    0,    0],
  [0.64, 0.83, 0.90, 0.93, 0.96, 0.96, 0.97, 0.97, 0.34, 0.16, 0.09, 0.06, 0.04, 0.03, 0.03, 0.01, 0.01, 0.01, 0.01, 0.01, 0,    0,    0,    0],
  [0.64, 0.83, 0.90, 0.93, 0.96, 0.96, 0.97, 0.97, 0.99, 0.99, 0.34, 0.17, 0.10, 0.06, 0.04, 0.03, 0.03, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0],
  [0.64, 0.83, 0.90, 0.94, 0.96, 0.97, 0.97, 0.97, 0.99, 0.99, 0.99, 0.99, 0.36, 0.17, 0.10, 0.06, 0.04, 0.03, 0.03, 0.03, 0.01, 0.01, 0.01, 0.01],
  [0.66, 0.83, 0.90, 0.94, 0.96, 0.97, 0.97, 0.99, 0.99, 0.99, 0.99, 0.99, 1.00, 1.00, 0.36, 0.17, 0.10, 0.07, 0.04, 0.04, 0.03, 0.03, 0.03, 0.01],
  [0.66, 0.84, 0.91, 0.94, 0.96, 0.97, 0.97, 0.99, 0.99, 0.99, 0.99, 0.99, 1.00, 1.00, 1.00, 1.00, 0.36, 0.17, 0.10, 0.07, 0.04, 0.04, 0.04, 0.03],
  [0.67, 0.84, 0.91, 0.94, 0.96, 0.97, 0.97, 0.99, 0.99, 0.99, 0.99, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 0.36, 0.17, 0.10, 0.08, 0.07, 0.04],
];
export const getCLFHooded = (hoursOn: number, jam: number): number | null => {
  const jamIndex = jam - 1;

  const hoursIndexMap: Record<number, number> = {
    1: 0, 2: 0,
    3: 1, 4: 1,
    5: 2, 6: 2,
    7: 3, 8: 3,
    9: 4, 10: 4,
    11: 5, 12: 5,
    13: 6, 14: 6,
    15: 7, 16: 7,
    17: 8, 18: 8,
    19: 8, 20: 8, 21: 8, 22: 8, 23: 8, 24: 8,
  };

  const rowIndex = hoursIndexMap[hoursOn];
  if (rowIndex === undefined || jamIndex < 0 || jamIndex > 23) {
    console.warn('Durasi hooded lighting atau jam tidak valid.');
    return null;
  }

  return CLFHoodedTable[rowIndex][jamIndex];
};

// fungsi get schedule
const scheduleTable: Record<string, number[]> = {
  "Ruang Keluarga": [
    0.1, 0.1, 0.05, 0.05, 0.05, 0.1,  // 1–6
    0.5, 0.8, 1, 1, 0.8, 0.7,         // 7–12
    0.7, 0.6, 0.6, 0.7, 0.8, 0.8,     // 13–18
    1, 1, 1, 0.8, 0.4, 0.2            // 19–24
  ],
  "Kamar Tidur": [
    1, 1, 1, 1, 1, 1,                 // 1–6
    0.8, 0.5, 0.2, 0.1, 0.1, 0.1,     // 7–12
    0.1, 0.1, 0.1, 0.1, 0.2, 0.5,     // 13–18
    0.7, 0.9, 1, 1, 1, 1              // 19–24
  ],
  "Ruang Tamu": [
    0, 0, 0, 0, 0, 0.1,
    0.2, 0.3, 0.4, 0.5, 0.5, 0.5,
    0.4, 0.3, 0.3, 0.5, 0.7, 0.8,
    1, 1, 1, 0.8, 0.4, 0.1
  ],
  "Ruang Makan": [
    0, 0, 0, 0.1, 0.1, 0.3,
    0.8, 1, 0.8, 0.2, 0, 0,
    0, 0.1, 0.1, 0.4, 0.8, 1,
    0.6, 0.3, 0.1, 0, 0, 0
  ],
  "Kamar Ibadah": [
    0.1, 0.1, 0.1, 0.1, 0.1, 0.3,
    0.4, 0.2, 0.1, 0.1, 0.1, 0.1,
    0.1, 0.1, 0.2, 0.3, 0.2, 0.1,
    0.1, 0.3, 0.2, 0.1, 0.1, 0.1
  ],
  "Kamar Mandi": [
    0.1, 0.2, 0.3, 0.3, 0.2, 0.2,
    0.2, 0.1, 0.1, 0.05, 0.05, 0.05,
    0.05, 0.05, 0.05, 0.1, 0.2, 0.3,
    0.3, 0.3, 0.2, 0.1, 0.05, 0.05
  ],
  "Dapur": [
    0, 0, 0, 0.1, 0.3, 0.6,
    0.8, 1, 0.8, 0.4, 0.2, 0.1,
    0.1, 0.2, 0.3, 0.4, 0.7, 1,
    0.9, 0.6, 0.4, 0.2, 0.1, 0.1
  ],
  "Garasi": [
    0, 0, 0, 0, 0, 0,
    0.2, 0.6, 1, 1, 0.8, 0.6,
    0.4, 0.3, 0.2, 0.1, 0.1, 0.1,
    0.1, 0.1, 0.1, 0, 0, 0
  ]
};
export function getSchedule(roomType: string, hour: number): number {
  const schedule = scheduleTable[roomType];
  if (!schedule) {
    console.warn(`Room type '${roomType}' tidak ditemukan dalam schedule.`);
    return 0;
  }
  const index = hour - 1; // Jam 1 → index 0
  return schedule[index] ?? 0;
}

export let clfPeople = false;
export let clfLight = false;
export let clfEquipment = false;
export let cltdRoof = false;
export let cltdCorr = true;
export let sclUsage = false;

export const setBool = (values: {
  clfPeople?: boolean;
  clfLight?: boolean;
  clfEquipment?: boolean;
  cltdRoof?: boolean;
  cltdCorr?: boolean;
  sclUsage?: boolean;
}) => {
  if (values.clfPeople !== undefined) clfPeople = values.clfPeople;
  if (values.clfLight !== undefined) clfLight = values.clfLight;
  if (values.clfEquipment !== undefined) clfEquipment = values.clfEquipment;
  if (values.cltdRoof !== undefined) cltdRoof = values.cltdRoof;
  if (values.cltdCorr !== undefined) cltdCorr = values.cltdCorr;
  if (values.sclUsage !== undefined) sclUsage = values.sclUsage;
};

export const resetBool = () => {
  clfPeople = false;
  clfLight = false;
  clfEquipment = false;
  cltdRoof = false;
  cltdCorr = true;
  sclUsage = false;
};
