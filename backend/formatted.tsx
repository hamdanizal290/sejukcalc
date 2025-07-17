export const formatKota = (label: string): string => {
  const directionMap: Record<string, string> = {
    'Jakarta, Indonesia': 'Jakarta',
    'Medan, Indonesia': 'Medan',
    'Surabaya, Indonesia': 'Surabaya',  
  }
  return directionMap[label] || label;
};

export const formatArah = (label: string): string => {
  const directionMap: Record<string, string> = {
    // Indonesian
    'Utara': 'U',
    'Selatan': 'S',
    'Barat': 'B',
    'Timur': 'T',
    // English
    'North': 'U',
    'South': 'S',
    'West': 'B',
    'East': 'T',
  };
  return directionMap[label] || label; // fallback jika tidak ketemu
};

export const formatPintu = (label: string): string => {
  const directionMap: Record<string, string> = {
    // English
    'Wood Slab Door in Wood Frame': 'Pintu Kayu Rangka Kayu',
    'Steel Slab Door in Wood Frame': 'Pintu Besi Rangka Kayu',
    'Steel Slab Door in Steel Frame': 'Pintu Besi Rangka Besi',
    'Sliding Glass Door': 'Pintu Geser Kaca',
    'Overhead Door (Garage Door)': 'Pintu Gulung Atas (Garasi)',
  };
  return directionMap[label] || label; // fallback jika tidak ketemu
};

export const formatAtap = (label: string): string => {
  const directionMap: Record<string, string> = {
    // English
    'Asbestos Board': 'Asbes Papan',
    'Rolled Asphalt': 'Aspal Roll',
    'Asphalt Board': 'Aspal Papan',
    'Slate': 'Batu Sabak',
    'Wood Shingles': 'Sirap Kayu',
    'Clay Roof Tiles': 'Tanah Liat',
    'Reed Thatch 300mm': 'Ilalang 300mm',
  };
  return directionMap[label] || label; // fallback jika tidak ketemu
};

export const formatStrukturAtap = (label: string): string => {
  const directionMap: Record<string, string> = {
    // English
    'Wood': 'Kayu',
    'Concrete Tile': 'Batako',
    'Steel Deck': 'Dek Besi',
  };
  return directionMap[label] || label; // fallback jika tidak ketemu
};

export const formatLangit = (label: string): string => {
  const directionMap: Record<string, string> = {
    // English
    'No Ceiling': 'Tanpa Langit-langit',
    'Gypsum': 'Gipsum',
    'PVC': 'PVC',
    'Plywood' : 'Papan Kayu Lapis (Triplek)',
  };
  return directionMap[label] || label; // fallback jika tidak ketemu
};

export const formatDinding = (label: string): string => {
  const directionMap: Record<string, string> = {
    // English
    'Fired Clay Brick': 'Bata Merah',
    'Lightweight Concrete Block (AAC)': 'Bata Ringan',
    'Concrete Block': 'Batako',
    'Wood': 'Kayu',
    'Woven Bamboo 20mm': 'Anyaman Bambu 20mm',
  };
  return directionMap[label] || label; // fallback jika tidak ketemu
};

export const formatLantai = (label: string): string => {
  const directionMap: Record<string, string> = {
    // English
    'Carpet': 'Karpet',
    'Ceramic': 'Keramik',
    'Rubber Pad': 'Karet',
  };
  return directionMap[label] || label; // fallback jika tidak ketemu
};

export const formatRuang = (label: string): string => {
  const directionMap: Record<string, string> = {
    // English
    'Living Room': 'Ruang Keluarga',
    'Bedroom': 'Kamar Tidur',
    'Guest Room': 'Ruang Tamu',
    'Dining Room': 'Ruang Makan',
    'Prayer Room': 'Kamar Ibadah',
    'Bathroom': 'Kamar Mandi',
    'Kitchen': 'Dapur',
    'Garage': 'Garasi',
  };
  return directionMap[label] || label; // fallback jika tidak ketemu
};

export const formatLampu = (label: string): string => {
  const directionMap: Record<string, string> = {
    // English
    'LED Bulb Lamp': 'Lampu LED Bohlam',
    'Incandescent Bulb Lamp': 'Lampu Bohlam Pijar',
    'CFL (Compact Fluorescent Lamp) / Spiral CFL': 'Lampu CFL / Spiral',
    'LED Downlight': 'Lampu Downlight LED',
    'LED Panel Light': 'Lampu Panel LED',
    'LED Tube Light': 'Lampu TL LED',
    'Fluorescent Tube Light': 'Lampu Neon TL',
    'LED Highbay Light (Industrial Lamp)': 'Highbay LED (Lampu Industri)',
    'LED Track Light (Spotlight)': 'Tracklight LED (Lampu Sorot)',
    'LED Floodlight': 'Floodlight LED',
  };
  return directionMap[label] || label; // fallback jika tidak ketemu
};

export const formatPeralatan = (label: string): string => {
  const directionMap: Record<string, string> = {
    // English
    'Electric Convection Oven': 'Oven Listrik',
    'Microwave': 'Microwave',
    'Gas Convection Oven': 'Oven Gas',
    'Electric Stove': 'Kompor Listrik',
    'Gas Stove': 'Kompor Gas',
    'Air Fryer': 'Air Fryer',
    'Rice Cooker': 'Rice Cooker',
    'Toaster Oven': 'Toaster Oven',
    'Electric Grill (Griddle)': 'Alat Panggang Listrik',
    'Small LED TV (32")': 'TV LED kecil (32")',
    'Large LED TV (55")': 'TV LED besar (55")',
    'Single Door Refrigerator': 'Kulkas 1 pintu',
    'Double Door Refrigerator': 'Kulkas 2 pintu',
    'Freezer': 'Freezer',
    'Desktop Computer': 'Komputer Desktop',
    'Laptop': 'Laptop',
    'Printer': 'Printer',
    'Washing Machine': 'Mesin Cuci',
    'Water Dispenser': 'Dispenser Air'
  };
  return directionMap[label] || label; // fallback jika tidak ketemu
};