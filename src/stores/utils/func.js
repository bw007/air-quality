export const aqDegree = (aqi) => {
  return aqi < 51
    ? {
        clr: "#009965",
        rate: "Yaxshi",
        desc: `Havo sifati qoniqarli deb hisoblanadi. Havoning 
              ifloslanishi kam yoki umuman xavf tug'dirmaydi`,
      }
    : aqi < 101
    ? {
        clr: "#ffde33",
        rate: "O'rtacha",
        desc: `Havo sifati qabul qilinadi; Nozik 
              insonlarning sog'lig'iga ta'sir qilishi mumkin.`,
      }
    : aqi < 151
    ? {
        clr: "#f93",
        rate: "Nozik guruhlar uchun salbiy",
        desc: `Nozik insonlarning sog'lig'iga ta'sir qilishi 
              mumkin. Keng jamoatchilikka ta'sir qilish ehtimoli yo'q`,
      }
    : aqi < 201
    ? {
        clr: "#c03",
        rate: "Nosog'lom",
        desc: `Barchaga ta'sir qilishi mumkin; nozik guruhlar 
              sog'lig'iga jiddiy ta'sir ko'rsatishi mumkin`
      }
    : aqi < 301
    ? {
        clr: "#609",
        rate: "Xavfli",
        desc: `Nafas olish yo'llari kasalliklari bor 
              odamlar ochiq havoda harakat qilishdan qochishlari kerak`
      }
    : aqi == "-"
    ? {
        clr: '',
        rate: "Ma'lumot yo'q",
        desc: `Ammo xotirjamlikka berilmang. Tabiatni 
              asrashga barchamiz mas'ulmiz`
    }
    : { 
        clr: "#871333",
        rate: 'Juda xavfli',
        desc: `Barchaga jiddiy ta'sir ko'rsatishi mumkin. Har 
              bir inson ochiq havoda harakat qilishdan qochishi kerak`
    }
};

const mn = [
  'yanvar',
  'fevral',
  'mart',
  'aprel',
  'may',
  'iyun',
  'iyul',
  'avgust',
  'sentabr',
  'oktabr',
  'noyabr',
  'dekabr'
]

const addZero = v => v < 10 ? "0" + v : v

export const convertDate = (d, type = 'date') => {
  let date = new Date(d);

  return type == 'date' ? `
    ${addZero(date.getDate())}-${mn[date.getMonth()]}` 
    : type == 'full' ? `${addZero(date.getDate())}/${addZero(date.getMonth() + 1)}/${date.getFullYear()}`
    : ''
}