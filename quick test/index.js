const fs = require('fs');

let dataCutiStaff = fs.readFileSync('cuti.json');
let dataMasterStaff = fs.readFileSync('master_staff.json');
let dataCuti = JSON.parse(dataCutiStaff);
let dataStaff = JSON.parse(dataMasterStaff);

// [
//     {
//       "nama": "",
//       "umur": "0 tahun",
//       "lama_bekerja": "0 bulan | tahun",
//       "cuti_terpakai": 0,
//       "sisah_cuti": 0
//     }
// ]

// misal cuti per tahun yang diberikan: 2 minggu

const getWeek = (diffDays) => {
    let week = Math.floor(diffDays / 7)
    diffDays = diffDays - (week * 7) > 0 ? `${diffDays - (week * 7)} hari` : "0 hari"

    return `${week} minggu ${diffDays}`
}

const getMonth = (diffDays) => {
    let months = Math.floor(diffDays / 30)
    diffDays = diffDays - (months * 30) >= 7 ? getWeek(diffDays - (months * 30)) : `${diffDays - (months * 30)} hari`

    return `${months} bulan ${diffDays}`
}

const getYear = (diffDays) => {
    let year = Math.floor(diffDays / 365)
    diffDays = diffDays - (year * 365) >= 30 ? getMonth(diffDays - (year * 365)) : `${diffDays - (year * 30)} hari`

    return `${year} tahun ${diffDays}`
}

const laporanCuti = (mergeDataList) => {
    let result = []

    for (let i = 0; i < mergeDataList.length; i++) {
        //HITUNG UMUR DAN LAMA BEKERJA
        const beginDate = new Date(mergeDataList[i].mulai_bekerja)
        const birthDate = new Date(mergeDataList[i].tanggal_lahir)
        const todayDate = new Date()

        const birthDiff = Math.abs(todayDate - birthDate)
        const workDiff = Math.abs(todayDate - beginDate)
        let birthDayDiff = Math.ceil(birthDiff / (1000 * 60 * 60 * 24))
        let workDayDiff = Math.ceil(workDiff / (1000 * 60 * 60 * 24))

        let lama_bekerja
        let umur

        if (birthDayDiff >= 365 || workDayDiff >= 365) {
            lama_bekerja = getYear(workDayDiff)
            umur = getYear(birthDayDiff)
        } else if (birthDayDiff >= 30 || workDayDiff >= 30) {
            lama_bekerja = getMonth(workDayDiff)
            umur = getMonth(birthDayDiff)
        } else if (birthDayDiff >= 7 || workDayDiff >= 7) {
            lama_bekerja = getWeek(workDayDiff)
            umur = getMonth(birthDayDiff)
        } else {
            lama_bekerja = workDayDiff
            umur = birthDayDiff
        }

        //HITUNG JUMLAH CUTI TERPAKAI
        let jumlahCuti = 0
        let jumlahCutiTahunIni = 0
        for (let j = 0; j < mergeDataList[i].listCuti.length; j++) {
            jumlahCuti += 1
            if(new Date(mergeDataList[i].listCuti[j].tanggal_cuti).getFullYear() == new Date().getFullYear()){
                jumlahCutiTahunIni += 1
            }
        }

        //HITUNG SISA CUTI
        let sisaCutiTahunan = 14 //misal di inisialisasikan 2 minggu
        sisaCutiTahunan = (sisaCutiTahunan - jumlahCutiTahunIni) > 0 ? (sisaCutiTahunan - jumlahCutiTahunIni) : 0

        result.push({
            nama: mergeDataList[i].nama,
            umur: umur,
            lama_bekerja: lama_bekerja,
            cuti_terpakai: jumlahCuti,
            sisah_cuti: sisaCutiTahunan
        })

    }
    console.log(result)
}

const mergeData = (dataCuti, dataStaff) => {
    let newData = []
    for (let i = 0; i < dataStaff.length; i++) {
        newData.push({ ...dataStaff[i], listCuti: [] })
        dataCuti.filter((item, index) => {
            if (newData[i].id === item.staff_id) {
                newData[i].listCuti.push(item)
            }
        })
    }
    // console.log(newData)
    laporanCuti(newData)
}

mergeData(dataCuti, dataStaff)

