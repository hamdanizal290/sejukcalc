// LIGHT
export type LampuSpec = {
  jenis: string;
  watt: number;
  fsa: number;
};
export const jenisLampu: LampuSpec[] = [
  { jenis: 'Lampu LED Bohlam', watt: 10, fsa: 1.18 },
  { jenis: 'Lampu Bohlam Pijar', watt: 60, fsa: 1.18 },
  { jenis: 'Lampu CFL / Spiral', watt: 15, fsa: 1.18 },
  { jenis: 'Lampu Downlight LED', watt: 10, fsa: 1.18 },
  { jenis: 'Lampu Panel LED', watt: 40, fsa: 1.1 },
  { jenis: 'Lampu TL LED', watt: 20, fsa: 1.04 },
  { jenis: 'Lampu Neon TL', watt: 36, fsa: 1.04 },
  { jenis: 'Highbay LED (Lampu Industri)', watt: 100, fsa: 1.37 },
  { jenis: 'Tracklight LED (Lampu Sorot)', watt: 35, fsa: 1.04 },
  { jenis: 'Floodlight LED', watt: 100, fsa: 1.37 },
];
export const getLampuSpec = (jenis: string): { watt: number; fsa: number } | null => {
  const found = jenisLampu.find((item) => item.jenis === jenis);
  return found ? { watt: found.watt, fsa: found.fsa } : null;
};

// EQUIPMENT
export type PeralatanSpec = {
  jenis: string;
  watt: number;
  fl: number;
  type: number;  // type 0 = unhooded, type 1 = hooded
};
export const jenisPeralatan: PeralatanSpec[] = [
  { jenis: 'Oven Listrik', watt: 2000, fl: 0.0714, type: 0 },
  { jenis: 'Microwave', watt: 1000, fl: 0.0714, type: 0 },
  { jenis: 'Oven Gas', watt: 5000, fl: 0.084, type: 0 },
  { jenis: 'Kompor Listrik', watt: 1500, fl: 0.1564, type: 0 },
  { jenis: 'Kompor Gas', watt: 1000, fl: 0.0578, type: 0 },
  { jenis: 'Air Fryer', watt: 1000, fl: 0.0258, type: 0 },
  { jenis: 'Rice Cooker', watt: 500, fl: 0.039, type: 0 },
  { jenis: 'Toaster Oven', watt: 1000, fl: 0.0714, type: 0 },
  { jenis: 'Alat Panggang Listrik', watt: 1500, fl: 0.072, type: 0 },
  { jenis: 'TV LED kecil (32")', watt: 30, fl: 0.25, type: 1 },
  { jenis: 'TV LED besar (55")', watt: 90, fl: 0.25, type: 1 },
  { jenis: 'Kulkas 1 pintu', watt: 100, fl: 1, type: 1 },
  { jenis: 'Kulkas 2 pintu', watt: 150, fl: 1, type: 1 },
  { jenis: 'Freezer', watt: 100, fl: 1, type: 1 },
  { jenis: 'Komputer desktop', watt: 250, fl: 0.25, type: 1 },
  { jenis: 'Laptop', watt: 30, fl: 0.25, type: 1 },
  { jenis: 'Printer', watt: 30, fl: 0.0208, type: 1 },
  { jenis: 'Mesin Cuci', watt: 400, fl: 0.0417, type: 1 },
  { jenis: 'Dispenser Air', watt: 100, fl: 1, type: 1 },
];
export const getPeralatanSpec = (jenis: string): { watt: number; fl: number; type: number } | null => {
  const found = jenisPeralatan.find((item) => item.jenis === jenis);
  return found ? { watt: found.watt, fl: found.fl, type: found.type } : null;
};