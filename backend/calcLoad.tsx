import { useForm } from './context/_formData';
import { getCLTD } from './getCLTD';
import { hitungLuasDinding } from './getLuas';
import { getRValueAtap, getRValueStrukturAtap, getRValueLangit, getRValueDinding, rvalueSemen, rvalueUdara, rvalueOutSurface, rvalueInVercSurface, rvalueInHorcSurface, uvalueKaca, getUValuePintu } from './getMaterial';
import { getRoofType, getRoomType, getWallType } from './getType';
import { getCLFPeople, getCLFLights, getCLFHooded, getSchedule, getSCL } from './getSCL_CLF';
import { dataCuaca } from './dataCuaca';
import { itemJendela, itemPintu } from '../app/input/step4';
import { itemLampu, itemPeralatan } from '../app/input/step5';
import { getLampuSpec, getPeralatanSpec } from './getComp';
import { clfPeople, clfLight, clfEquipment, cltdRoof, sclUsage } from './getSCL_CLF';

export const getWeather = (kota: string, bulanIndex: number, jamIndex: number) => {
    const bulanList = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    return dataCuaca.find((entry) => 
        entry.kota === kota &&
        entry.bulan === bulanList[bulanIndex] &&
        entry.jam === jamIndex + 1
    );
};

// Baris: jam 1–24, Kolom: bulan
export const calcLoad: number[][] = Array.from({ length: 24 }, () =>
  Array.from({ length: 12 }, () => 0)
);

export const handleRoofLoad = (formData: ReturnType<typeof useForm>['formData']) => {
    const {kota, arah, panjang, lebar, tinggi, atap, strukturAtap, dinding, langit} = formData;
    // Pastikan data lengkap dan tipe sesuai
    if (
        !kota || !arah ||
        panjang === undefined || lebar === undefined || tinggi === undefined ||
        !atap || !strukturAtap || !dinding || !langit
    ) {
        console.warn('Data tidak lengkap untuk perhitungan');
        return;
    }

    const { luasA } = hitungLuasDinding(formData, panjang, lebar, tinggi, arah);
    const cltdArray = getCLTD(kota, getRoofType(strukturAtap, langit)?.toString(), Number(getWallType(dinding)));
    const rvalueAtap = Number(getRValueAtap(atap));
    const rvalueStrukturAtap = Number(getRValueStrukturAtap(strukturAtap));
    const rvalueLangit = Number(getRValueLangit(langit));

    //console.log(cltdArray);

    const totalR = rvalueAtap + rvalueLangit + rvalueStrukturAtap + rvalueUdara + rvalueOutSurface + rvalueInHorcSurface;
    if (totalR === 0) {
        console.warn('R total tidak boleh nol');
        return;
    }

    //kalkulasi roof
    for (let jam = 0; jam < 24; jam++) {
        for (let bulan = 0; bulan < 12; bulan++) {
            let cltdRoofConst = 32;

            //console.log(cltdRoof);
            if (cltdRoof) {
                const qRoof = (1/totalR) * luasA * cltdRoofConst;
                calcLoad[jam][bulan] += qRoof;

                //console.log('Roof Load[', jam, '][', bulan, ']:', qRoof);
            } else {
                const cltd = cltdArray[jam][0][bulan];
                const qRoof = (1/totalR) * luasA * cltd;
                calcLoad[jam][bulan] += qRoof;

                //console.log('Roof Load[', jam, '][', bulan, ']:', qRoof);
            }
        }
    }
};

export const handleWallLoad = (formData: ReturnType<typeof useForm>['formData']) => {
    const {kota, arah, panjang, lebar, tinggi, strukturAtap, dinding, langit} = formData;
    // Pastikan data lengkap dan tipe sesuai
    if (
        !kota || !arah ||
        panjang === undefined || lebar === undefined || tinggi === undefined ||
        !strukturAtap || !dinding || !langit
    ) {
        console.warn('Data tidak lengkap untuk perhitungan');
        return;
    }

    const { luasU, luasS, luasB, luasT } = hitungLuasDinding(formData, panjang, lebar, tinggi, arah);
    const cltdArray = getCLTD(kota, getRoofType(strukturAtap, langit)?.toString(), Number(getWallType(dinding)));
    const rvalueDinding = Number(getRValueDinding(dinding));

    const totalR = rvalueDinding + 2*rvalueSemen + rvalueOutSurface + rvalueInVercSurface;
    if (totalR === 0) {
        console.warn('R total tidak boleh nol');
        return;
    }

    //kalkulasi dinding utara
    for (let jam = 0; jam < 24; jam++) {
        for (let bulan = 0; bulan < 12; bulan++) {
            const cltd = cltdArray[jam][1][bulan];
            const qWallU = (1/totalR) * luasU * cltd;
            calcLoad[jam][bulan] += qWallU;

            console.log('North Wall Load[', jam, '][', bulan, ']:', qWallU);
        }
    }
    //kalkulasi dinding selatan
    for (let jam = 0; jam < 24; jam++) {
        for (let bulan = 0; bulan < 12; bulan++) {
            const cltd = cltdArray[jam][2][bulan];
            const qWallS = (1/totalR) * luasS * cltd;
            calcLoad[jam][bulan] += qWallS;

            console.log('South Wall Load[', jam, '][', bulan, ']:', qWallS);
        }
    }
    //kalkulasi dinding barat
    for (let jam = 0; jam < 24; jam++) {
        for (let bulan = 0; bulan < 12; bulan++) {
            const cltd = cltdArray[jam][3][bulan];
            const qWallB = (1/totalR) * luasB * cltd;
            calcLoad[jam][bulan] += qWallB;

            console.log('West Wall Load[', jam, '][', bulan, ']:', qWallB);
        }
    }
    //kalkulasi dinding timur
    for (let jam = 0; jam < 24; jam++) {
        for (let bulan = 0; bulan < 12; bulan++) {
            const cltd = cltdArray[jam][4][bulan];
            const qWallT = (1/totalR) * luasT * cltd;
            calcLoad[jam][bulan] += qWallT;

            console.log('East Wall Load[', jam, '][', bulan, ']:', qWallT);
        }
    }
};

export const handlePeopleLoad = (formData: ReturnType<typeof useForm>['formData']) => {
    const {strukturAtap, dinding, langit, jenisRuang, jumlahPenghuni} = formData;
    // Pastikan data lengkap dan tipe sesuai
    if (
        jumlahPenghuni === undefined ||
        !jenisRuang || !strukturAtap || !dinding || !langit
    ) {
        console.warn('Data tidak lengkap untuk perhitungan');
        return;
    }

    //kalkulasi people
    for (let jam = 0; jam < 24; jam++) {
        for (let bulan = 0; bulan < 12; bulan++) {
            let clfConst = 0.5;

            const sensibel = Number(getRoomType(jenisRuang, 'sensibel'));
            const laten = Number(getRoomType(jenisRuang, 'laten'));

            const schedule = Number(getSchedule(jenisRuang, jam+1));
            const equipHour = Number(getRoomType(jenisRuang, 'equipHour'));
            const clfpeople = Number(getCLFPeople(equipHour, jam+1));

            //console.log(clfPeople);
            if (clfPeople) {
                const qSensibelPeople = jumlahPenghuni * sensibel * clfConst;
                const qLatenPeople = jumlahPenghuni * laten;
                calcLoad[jam][bulan] += qSensibelPeople + qLatenPeople;

                //console.log('People Load[', jam, '][', bulan, ']:', qSensibelPeople + qLatenPeople);
            } else {
                const qSensibelPeople = jumlahPenghuni * sensibel * schedule * clfpeople;
                const qLatenPeople = jumlahPenghuni * laten * schedule;
                calcLoad[jam][bulan] += qSensibelPeople + qLatenPeople;

                //console.log('People Load[', jam, '][', bulan, ']:', qSensibelPeople + qLatenPeople);
            }
        }
    }
};

export const handleVentilationLoad = (formData: ReturnType<typeof useForm>['formData']) => {
    const {kota, arah, panjang, lebar, jenisRuang, jumlahPenghuni} = formData;
    // Pastikan data lengkap dan tipe sesuai
    if (
        !kota || !arah ||
        panjang === undefined || lebar === undefined || jumlahPenghuni === undefined ||
        !jenisRuang
    ) {
        console.warn('Data tidak lengkap untuk perhitungan');
        return;
    }

    const lsPerPerson = Number(getRoomType(jenisRuang, 'lsPerPerson'));
    const lsPerM2 = Number(getRoomType(jenisRuang, 'lsPerM2'));
    const Rp = lsPerPerson * jumlahPenghuni;
    const Ra = lsPerM2 * panjang * lebar;
    const Rtotal = Rp + Ra;
    const temp = (22.8 + 25.8)/2;
    const humid = 0.0102; // untuk humid 50 - 60%

    //kalkulasi ventilation
    for (let jam = 0; jam < 24; jam++) {
        for (let bulan = 0; bulan < 12; bulan++) {
            const cuaca = getWeather(kota, bulan, jam);
            
            if (cuaca) {
                const drybulb = cuaca.drybulb;
                const humidityratio = cuaca.humidityratio / 7000;

                const qSensibelVenti = 1.206 * Rtotal * (drybulb - temp);
                const qLatenVenti = 3000 * Rtotal * (humidityratio - humid);

                calcLoad[jam][bulan] += qSensibelVenti + qLatenVenti;

                //console.log('Ventilation Load[', jam, '][', bulan, ']:', qSensibelVenti + qLatenVenti);
            }
        }
    }
};

export const handleJendelaLoad = (formData: ReturnType<typeof useForm>['formData']) => {
    const {kota, strukturAtap, langit, dinding, jendela, jendelaList} = formData;
    // Pastikan data lengkap dan tipe sesuai
    if (
        !kota || !strukturAtap || !langit || !dinding ||
        jendela === undefined ||
        !jendelaList || jendelaList.length === 0 ||
        jendelaList.some((j: itemJendela) => !j.panjang || !j.lebar || !j.arah)
    ) {
        console.warn('Data tidak lengkap untuk perhitungan');
        return;
    }

    const SC = 0.97;
    const cltdArray = getCLTD(kota, getRoofType(strukturAtap, langit)?.toString(), Number(getWallType(dinding)));

    //kalkulasi kaca
    for (let jam = 0; jam < 24; jam++) {
        for (let bulan = 0; bulan < 12; bulan++) {
            let qTotalWindow = 0;

            jendelaList.forEach((j: itemJendela) => {
                const luas = Number(j.panjang) * Number(j.lebar);
                const cltd = cltdArray[jam][5][bulan];
                const qWindow = uvalueKaca * luas * cltd + luas * SC * Number(getSCL(j.arah as 'U' | 'S' | 'B' | 'T', jam+1));
                qTotalWindow += qWindow;
            });
            
            calcLoad[jam][bulan] += qTotalWindow;

            //console.log('Glass Load[', jam, '][', bulan, ']:', qTotalWindow);
        }
    }
};

export const arahIndexMap: Record<string, number> = {
    U: 1, S: 2, B: 3, T: 4,
}
export const handlePintuLoad = (formData: ReturnType<typeof useForm>['formData']) => {
    const {kota, strukturAtap, langit, dinding, pintu, pintuList} = formData;
    // Pastikan data lengkap dan tipe sesuai
    if (
        !kota || !strukturAtap || !langit || !dinding ||
        pintu === undefined ||
        !pintuList || pintuList.length === 0 ||
        pintuList.some((p: itemPintu) => !p.panjang || !p.lebar || !p.arah || !p.jenis)
    ) {
        console.warn('Data tidak lengkap untuk perhitungan');
        return;
    }

    const cltdArray = getCLTD(kota, getRoofType(strukturAtap, langit)?.toString(), Number(getWallType(dinding)));

    //kalkulasi pintu
    for (let jam = 0; jam < 24; jam++) {
        for (let bulan = 0; bulan < 12; bulan++) {
            let qTotalDoor = 0;

            pintuList.forEach((p: itemPintu) => {
                const luas = Number(p.panjang) * Number(p.lebar);
                const uvaluePintu = Number(getUValuePintu(p.jenis));
                const arahIndex = arahIndexMap[p.arah];
                const cltd = cltdArray[jam][arahIndex][bulan];
                const qDoor = luas * uvaluePintu * cltd;
                qTotalDoor += qDoor;
            });

            calcLoad[jam][bulan] += qTotalDoor;

            //console.log('Door Load[', jam, '][', bulan, ']:', qTotalDoor);
        }
    }
};

export const handleLampuLoad = (formData: ReturnType<typeof useForm>['formData']) => {
    const {jumlahLampu, lampuList, jenisRuang} = formData;
    // Pastikan data lengkap dan tipe sesuai
    if (
        jumlahLampu === undefined ||
        !jenisRuang ||
        !lampuList || lampuList.length === 0 ||
        lampuList.some((l: itemLampu) => !l.jenis || !l.jumlah)
    ) {
        console.warn('Data tidak lengkap untuk perhitungan');
        return;
    }

    //kalkulasi lampu
    for (let jam = 0; jam < 24; jam++) {
        for (let bulan = 0; bulan < 12; bulan++) {
            let qTotalLamp = 0;

            lampuList.forEach((l: itemLampu) => {
                let clfConst = 0.78;

                const jumlah = Number(l.jumlah);
                const lampuSpec = getLampuSpec(l.jenis);
                const watt = lampuSpec ? lampuSpec.watt : 0;
                const fsa = lampuSpec ? lampuSpec.fsa : 0;
                const clflight = Number(getCLFLights(Number(getRoomType(jenisRuang, 'lightHour')), jam+1));
                
                //console.log(clfLight);
                if (clfLight) {
                    const qLamp = jumlah * watt * fsa *clfConst;
                    qTotalLamp += qLamp;
                } else {
                    const qLamp = jumlah * watt * fsa *clflight;
                    qTotalLamp += qLamp;
                }
            });

            calcLoad[jam][bulan] += qTotalLamp;

            //console.log('Lamp Load[', jam, '][', bulan, ']:', qTotalLamp);
        }
    }
};

export const handlePeralatanLoad = (formData: ReturnType<typeof useForm>['formData']) => {
    const {jumlahPeralatan, peralatanList, jenisRuang} = formData;
    // Pastikan data lengkap dan tipe sesuai
    if (
        jumlahPeralatan === undefined ||
        !jenisRuang ||
        !peralatanList || peralatanList.length === 0 ||
        peralatanList.some((pr: itemPeralatan) => !pr.jumlah || !pr.jenis)
    ) {
        console.warn('Data tidak lengkap untuk perhitungan');
        return;
    }

    //kalkulasi kaca
    for (let jam = 0; jam < 24; jam++) {
        for (let bulan = 0; bulan < 12; bulan++) {
            let qTotalEquip = 0;

            peralatanList.forEach((pr: itemPeralatan) => {
                let clfConst = 0.78;

                const jumlah = Number(pr.jumlah);
                const peralatanSpec = getPeralatanSpec(pr.jenis);
                const watt = peralatanSpec ? peralatanSpec.watt : 0;
                const fl = peralatanSpec ? peralatanSpec.fl : 0;
                const type = peralatanSpec ? peralatanSpec.type : 2;

                let clfequip = 0;
                if (type === 0) {
                    clfequip = Number(getCLFPeople(Number(getRoomType(jenisRuang, 'equipHour')), jam+1));
                } else if (type === 1) {
                    clfequip = Number(getCLFHooded(Number(getRoomType(jenisRuang, 'equipHour')), jam+1));
                } else {
                    console.warn('Tipe CLF tidak dikenali')
                }
                
                //console.log(clfEquipment);
                if (clfEquipment) {
                    const qEquip = jumlah * watt * fl * clfConst;
                    qTotalEquip += qEquip;
                } else {
                    const qEquip = jumlah * watt * fl * clfequip;
                    qTotalEquip += qEquip;
                }
            });

            calcLoad[jam][bulan] += qTotalEquip;

            //console.log('Equipment Load[', jam, '][', bulan, ']:', qTotalEquip);
        }
    }
};
