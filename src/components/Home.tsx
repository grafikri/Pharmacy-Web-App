import React from "react"
import { distance } from "../helpers"
import axios from "axios"
import _ from "lodash"
import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core"
import RPharmacyCard from "../components/organisms/RPharmacyCard"
import { Pharmacy, Coordinate } from "../appInterfaces"
import { maxWidth } from "@material-ui/system"

const styles = (theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 400,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      margin: "auto"
    },
    listItem: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  })

export interface StyleProps extends WithStyles<typeof styles> {}

class Home extends React.Component<StyleProps, { list: Pharmacy[] }> {
  state = {
    list: []
  }

  google: any
  inputSearchBox: any

  constructor(props: StyleProps) {
    super(props)
    this.google = (window as any).google
    this.inputSearchBox = React.createRef()
    this.calculatesLocations = this.calculatesLocations.bind(this)
    this.setupInput = this.setupInput.bind(this)
  }

  /**
   * It builds input for realtime location search
   */
  setupInput() {
    const map = new this.google.maps.Map(document.createElement("div"))
    const searchBox = new this.google.maps.places.SearchBox(
      this.inputSearchBox.current
    )
    searchBox.addListener("places_changed", () => {
      const list = searchBox.getPlaces()

      list.length === 0
        ? this.calculatesLocations(0, 0)
        : this.calculatesLocations(
            list[0].geometry.location.lat(),
            list[0].geometry.location.lng()
          )
    })
  }

  /**
   * It brings new locations depend on coordinate
   *
   * @param lat latitue
   * @param lng longitude
   */
  calculatesLocations(lat: number, lng: number) {
    const datas = {
      data: [
        {
          kayit_turu: "NORMAL",
          id: 8465,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "AKSU",
          nobet_tipi: 1,
          phone: "0224-3681277",
          konum: "40.17706632,29.11416985,10",
          eczane_adres: "ERTUĞRULGAZİ MAH. ÜLKÜ SOK. NO:2",
          eczane_sehir: "Bursa",
          eczane_ilce: "Yıldırım",
          eczane_ilce_sira: 4,
          eczane_mahalle: null,
          adres_tarifi: "(GÖĞÜS HASTANESİ A-BLOK YANI)",
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: "D11E05F37G29H23J17",
          grup_sira: 9,
          bolge_adi: "Yıldırım",
          normal_baslama: "18:30:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "17:00:00",
          cumartesi_bitis: "10:00:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 8492,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "AY",
          nobet_tipi: 1,
          phone: "0224-2475187",
          konum: "40.22712226,28.92051771,10",
          eczane_adres:
            "ALTINŞEHİR MAH. ABDİ İPEKÇİ CAD. NO:30/A (ŞAHİNKAYA OKULLARI ARKASI)",
          eczane_sehir: "Bursa",
          eczane_ilce: "Nilüfer",
          eczane_ilce_sira: 1,
          eczane_mahalle: null,
          adres_tarifi: null,
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: "D11E05F37G29H23J17",
          grup_sira: 10,
          bolge_adi: "Nilüfer",
          normal_baslama: "18:30:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "17:00:00",
          cumartesi_bitis: "10:00:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 8542,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "CANSIN",
          nobet_tipi: 1,
          phone: "0224-3665037",
          konum: "40.19626144,29.12848748,10",
          eczane_adres: "ARABAYATAĞI MAH. BEYDERE SOK. NO:8",
          eczane_sehir: "Bursa",
          eczane_ilce: "Yıldırım",
          eczane_ilce_sira: 4,
          eczane_mahalle: null,
          adres_tarifi: "(DEVLET MALZEME OFİSİ ALTI)",
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: "D11E05F37G29H23J17",
          grup_sira: 3,
          bolge_adi: "Yıldırım",
          normal_baslama: "18:30:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "17:00:00",
          cumartesi_bitis: "10:00:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 8599,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "EMEK PAK",
          nobet_tipi: 1,
          phone: "0224-2425658",
          konum: "40.25924014,28.96174192,10",
          eczane_adres:
            "EMEK F.S.M. MAH. BAŞAK. SOK. NO:81/1 (EMEK POLİS KARAKOLU YUKARISI)",
          eczane_sehir: "Bursa",
          eczane_ilce: "Osmangazi",
          eczane_ilce_sira: 2,
          eczane_mahalle: null,
          adres_tarifi: null,
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: "D11E05F37G29H23J17",
          grup_sira: 11,
          bolge_adi: "Osmangazi",
          normal_baslama: "18:30:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "17:00:00",
          cumartesi_bitis: "10:00:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 8679,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "LİMON",
          nobet_tipi: 1,
          phone: "0224-4521912",
          konum: "40.2317491943602, 28.980583101511,20",
          eczane_adres:
            "FETHİYE MH. DR.M.OKTAY SK. (Y.İHTİSAS EĞT.ARŞ.HST. NİLÜFER EK BİNA KARŞISI)",
          eczane_sehir: "Bursa",
          eczane_ilce: "Nilüfer",
          eczane_ilce_sira: 1,
          eczane_mahalle: null,
          adres_tarifi: null,
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: "D11E05F37G29H23J17",
          grup_sira: 7,
          bolge_adi: "Nilüfer",
          normal_baslama: "18:30:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "17:00:00",
          cumartesi_bitis: "10:00:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 8734,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "MİNERAL",
          nobet_tipi: 1,
          phone: "0224-4525355",
          konum: "40.26626045649685, 28.9385167027408,20",
          eczane_adres:
            "A.YESEVİ MH. BEY SK. (BAKGÖR CİTY-1 ALTI - TURKUAZ PLUS MİGROS KARŞISI)",
          eczane_sehir: "Bursa",
          eczane_ilce: "Nilüfer",
          eczane_ilce_sira: 1,
          eczane_mahalle: null,
          adres_tarifi: null,
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: "D11E05F37G29H23J17",
          grup_sira: 13,
          bolge_adi: "Nilüfer",
          normal_baslama: "18:30:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "17:00:00",
          cumartesi_bitis: "10:00:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 8795,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "SAFA",
          nobet_tipi: 1,
          phone: "0224-2561161",
          konum: "40.20072352,29.0699771,10",
          eczane_adres: "SELAMET MAH. SEZGİN CAD. NO:14",
          eczane_sehir: "Bursa",
          eczane_ilce: "Osmangazi",
          eczane_ilce_sira: 2,
          eczane_mahalle: null,
          adres_tarifi: "(SELAMET SAĞLIK OCAĞI KARŞISI)",
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: "D11E05F37G29H23J17",
          grup_sira: 5,
          bolge_adi: "Osmangazi",
          normal_baslama: "18:30:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "17:00:00",
          cumartesi_bitis: "10:00:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 8815,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "SEZER",
          nobet_tipi: 1,
          phone: "0224-3275994",
          konum: "40.1868815014832, 29.07822087407112,19",
          eczane_adres: "YILDIRIM MAH. BEYAZIT CAD. NO:1/B",
          eczane_sehir: "Bursa",
          eczane_ilce: "Yıldırım",
          eczane_ilce_sira: 4,
          eczane_mahalle: null,
          adres_tarifi: "(GÖKDERE MEYDANI YANI)",
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: "D11E05F37G29H23J17",
          grup_sira: 6,
          bolge_adi: "Yıldırım",
          normal_baslama: "18:30:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "17:00:00",
          cumartesi_bitis: "10:00:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 8830,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "ŞEN",
          nobet_tipi: 1,
          phone: "0224-2460006",
          konum: "40.21366558,28.99850428,10",
          eczane_adres:
            "KARAMAN MAH. GÜRBÜZLER CAD. NO:22 İZMİR YOLU DURAK MUHALLEBİCİSİ ARK.",
          eczane_sehir: "Bursa",
          eczane_ilce: "Nilüfer",
          eczane_ilce_sira: 1,
          eczane_mahalle: null,
          adres_tarifi: null,
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: "D11E05F37G29H23J17",
          grup_sira: 4,
          bolge_adi: "Nilüfer",
          normal_baslama: "18:30:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "17:00:00",
          cumartesi_bitis: "10:00:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 8904,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "BÜYÜKORHAN",
          nobet_tipi: 1,
          phone: "0224-8412370",
          konum: "39.773187817429196, 28.885376751422882,21",
          eczane_adres: "ORHAN MAH. DR.İBRAHİM ÖKTEM CAD. NO:14",
          eczane_sehir: "Bursa",
          eczane_ilce: "Büyükorhan",
          eczane_ilce_sira: 5,
          eczane_mahalle: null,
          adres_tarifi: null,
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: null,
          grup_sira: null,
          bolge_adi: "Büyükorhan",
          normal_baslama: "20:00:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "20:00:00",
          cumartesi_bitis: "08:30:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 8907,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "BAYER",
          nobet_tipi: 1,
          phone: "0224-5130143",
          konum: "40.430487, 29.155665999999997,21",
          eczane_adres: "DR.ZİYA KAYA MAH. İSTİKLAL CAD. NO:121/A",
          eczane_sehir: "Bursa",
          eczane_ilce: "Gemlik",
          eczane_ilce_sira: 6,
          eczane_mahalle: null,
          adres_tarifi: null,
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: null,
          grup_sira: null,
          bolge_adi: "Gemlik",
          normal_baslama: "18:30:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "15:00:00",
          cumartesi_bitis: "09:30:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 8955,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "ULAŞ",
          nobet_tipi: 1,
          phone: "0224-8812272",
          konum: "39.679027, 29.154901999999993,19",
          eczane_adres: "MERKEZ MAH. FEVZİ PAŞA CAD. NO:9/A",
          eczane_sehir: "Bursa",
          eczane_ilce: "Harmancık",
          eczane_ilce_sira: 8,
          eczane_mahalle: null,
          adres_tarifi: null,
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: null,
          grup_sira: null,
          bolge_adi: "Harmancık",
          normal_baslama: "18:00:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "08:30:00",
          cumartesi_bitis: "08:30:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 8964,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "CEREN",
          nobet_tipi: 1,
          phone: "0224-7154460",
          konum: "40.089642, 29.495619,17",
          eczane_adres: "SÜLEYMANİYE MAH. İSTİKLAL CAD. NO:187/2",
          eczane_sehir: "Bursa",
          eczane_ilce: "İnegöl",
          eczane_ilce_sira: 9,
          eczane_mahalle: null,
          adres_tarifi: "Aritmi (Medice) Özel Hastanesi Yanı",
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: null,
          grup_sira: null,
          bolge_adi: "İnegöl",
          normal_baslama: "18:00:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "17:00:00",
          cumartesi_bitis: "10:30:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 8998,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "TÜRKER",
          nobet_tipi: 1,
          phone: "0224-7193310",
          konum: "40.107319, 29.51644399999998,19",
          eczane_adres: "YENİ MAH. KENT CAD. NO:7/A",
          eczane_sehir: "Bursa",
          eczane_ilce: "İnegöl/Alanyurt",
          eczane_ilce_sira: 10,
          eczane_mahalle: null,
          adres_tarifi: "(İCAPÇI USULÜ NÖBETÇİDİR.)",
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: null,
          grup_sira: null,
          bolge_adi: "Alanyurt",
          normal_baslama: "00:00:00",
          normal_bitis: "00:00:00",
          pazar_bayram_baslama: "00:00:00",
          pazar_bayram_bitis: "00:00:00",
          cumartesi_baslama: "00:00:00",
          cumartesi_bitis: "00:00:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 9030,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "GÜNGÖRMÜŞ",
          nobet_tipi: 1,
          phone: "0224-6762907",
          konum: "40.21586126730154, 28.358377665281296,20",
          eczane_adres: "TABAKLAR MAH. BANDIRMA CAD. BELEDİYE İŞHANI NO:4",
          eczane_sehir: "Bursa",
          eczane_ilce: "Karacabey",
          eczane_ilce_sira: 16,
          eczane_mahalle: null,
          adres_tarifi: null,
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: null,
          grup_sira: null,
          bolge_adi: "Karacabey",
          normal_baslama: "18:30:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "15:00:00",
          cumartesi_bitis: "09:30:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 9042,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "ŞİFA",
          nobet_tipi: 1,
          phone: "0224-8612164",
          konum: "39.912742, 29.233168999999975,21",
          eczane_adres: "CUMA MAH. ATATÜRK CAD. NO:3/C",
          eczane_sehir: "Bursa",
          eczane_ilce: "Keles",
          eczane_ilce_sira: 17,
          eczane_mahalle: null,
          adres_tarifi: null,
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: null,
          grup_sira: null,
          bolge_adi: "Keles",
          normal_baslama: "18:00:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "08:30:00",
          cumartesi_bitis: "08:30:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 9045,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "BİZİM",
          nobet_tipi: 1,
          phone: "0224-3723274",
          konum: "40.191771, 29.20847100000003,21",
          eczane_adres: "AHMET VEFİK PAŞA MAH. HAL CAD. NO:2/B",
          eczane_sehir: "Bursa",
          eczane_ilce: "Kestel",
          eczane_ilce_sira: 18,
          eczane_mahalle: null,
          adres_tarifi: null,
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: null,
          grup_sira: null,
          bolge_adi: "Kestel",
          normal_baslama: "18:00:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "12:30:00",
          cumartesi_bitis: "08:30:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 9106,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "MUDANYA",
          nobet_tipi: 1,
          phone: "0224-5441307",
          konum: "40.378557, 28.88146299999994,21",
          eczane_adres: "MUSTAFAKEMALPAŞA CAD. NO:67 16940",
          eczane_sehir: "Bursa",
          eczane_ilce: "Mudanya",
          eczane_ilce_sira: 19,
          eczane_mahalle: null,
          adres_tarifi: null,
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: null,
          grup_sira: null,
          bolge_adi: "Mudanya",
          normal_baslama: "18:00:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "08:30:00",
          cumartesi_bitis: "08:30:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 9109,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "PAMUKÇU",
          nobet_tipi: 1,
          phone: "0224-5543603",
          konum: "40.351445, 28.928418999999963,19",
          eczane_adres: "GÜZELYALI EĞİTİM MAH. ANAFARTALAR CAD. NO:15/C",
          eczane_sehir: "Bursa",
          eczane_ilce: "Mudanya/Güzelyalı",
          eczane_ilce_sira: 20,
          eczane_mahalle: null,
          adres_tarifi: null,
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: null,
          grup_sira: null,
          bolge_adi: "Güzelyalı",
          normal_baslama: "18:00:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "08:30:00",
          cumartesi_bitis: "08:30:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 9147,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "GÜLTEKİN",
          nobet_tipi: 1,
          phone: "0224-5732463",
          konum: "40.490551, 29.310224000000062,21",
          eczane_adres: "MURADİYE MAH. GARAJ SOK. DOĞAN GÜLLÜ İŞ MRK. NO:28",
          eczane_sehir: "Bursa",
          eczane_ilce: "Orhangazi",
          eczane_ilce_sira: 23,
          eczane_mahalle: null,
          adres_tarifi: null,
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: null,
          grup_sira: null,
          bolge_adi: "Orhangazi",
          normal_baslama: "18:30:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "15:00:00",
          cumartesi_bitis: "09:30:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 9179,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "KENT MEYDANI",
          nobet_tipi: 1,
          phone: "0224-2513344",
          konum: "40.19611392360839, 29.06493991613388,19",
          eczane_adres:
            "ULU MH. U.HASAN BULV. ANKARA YOLU (ÖZEL OSMANGAZİ HAST. ACİL YANI)",
          eczane_sehir: "Bursa",
          eczane_ilce: "Osmangazi",
          eczane_ilce_sira: 2,
          eczane_mahalle: null,
          adres_tarifi: null,
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: "D11E05F37G29H23J17",
          grup_sira: 8,
          bolge_adi: "Osmangazi",
          normal_baslama: "18:30:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "17:00:00",
          cumartesi_bitis: "10:00:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 9181,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "DUYGU",
          nobet_tipi: 1,
          phone: "0224-2223522",
          konum: "40.19072132547913, 29.047717452049255,18",
          eczane_adres: "MURADİYE MAH. II.MURAT CAD. NO:14/A",
          eczane_sehir: "Bursa",
          eczane_ilce: "Osmangazi",
          eczane_ilce_sira: 2,
          eczane_mahalle: null,
          adres_tarifi: null,
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: "D11E05F37G29H23J17",
          grup_sira: 2,
          bolge_adi: "Osmangazi",
          normal_baslama: "18:30:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "17:00:00",
          cumartesi_bitis: "10:00:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 9245,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "UYSAL",
          nobet_tipi: 1,
          phone: "0224-7730355",
          konum: "40.262624, 29.649992999999995,21",
          eczane_adres: "ÇAYIR MAH. CUMHURİYET CAD. NO:38 16900",
          eczane_sehir: "Bursa",
          eczane_ilce: "Yenişehir",
          eczane_ilce_sira: 24,
          eczane_mahalle: null,
          adres_tarifi: null,
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: null,
          grup_sira: null,
          bolge_adi: "Yenişehir",
          normal_baslama: "18:00:00",
          normal_bitis: "08:00:00",
          pazar_bayram_baslama: "08:00:00",
          pazar_bayram_bitis: "08:00:00",
          cumartesi_baslama: "08:00:00",
          cumartesi_bitis: "08:00:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 11044,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "ATMACA",
          nobet_tipi: 1,
          phone: "0224-7110424",
          konum: "40.08124837589111, 29.53299880027771,19",
          eczane_adres: "MESUDİYE MAH. SEVGİ SOK. NO:4",
          eczane_sehir: "Bursa",
          eczane_ilce: "İnegöl/Mesudiye",
          eczane_ilce_sira: 11,
          eczane_mahalle: null,
          adres_tarifi: "(İCAPÇI USULÜ NÖBETÇİDİR.)",
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: null,
          grup_sira: null,
          bolge_adi: "Mesudiye",
          normal_baslama: "00:00:00",
          normal_bitis: "00:00:00",
          pazar_bayram_baslama: "00:00:00",
          pazar_bayram_bitis: "00:00:00",
          cumartesi_baslama: "00:00:00",
          cumartesi_bitis: "00:00:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 13664,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "HANIMELİ",
          nobet_tipi: 1,
          phone: "0224-4500021",
          konum: "40.20535378901576,28.981840812419364,22",
          eczane_adres: "KONAK MAH. MUTLU SOK. NO:11",
          eczane_sehir: "Bursa",
          eczane_ilce: "Nilüfer",
          eczane_ilce_sira: 1,
          eczane_mahalle: null,
          adres_tarifi: "(BEŞEVLER PAZAR YERİ ALTI - ASM YANI)",
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: "D11E05F37G29H23J17",
          grup_sira: 1,
          bolge_adi: "Nilüfer",
          normal_baslama: "18:30:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "17:00:00",
          cumartesi_bitis: "10:00:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 14587,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "YENİCE",
          nobet_tipi: 1,
          phone: "0224-7380111",
          konum: "40.088952065477294, 29.42074030637741,19",
          eczane_adres: "YENİCEKÖY MAH. 725.SOK. NO:17",
          eczane_sehir: "Bursa",
          eczane_ilce: "İnegöl/Yenice",
          eczane_ilce_sira: 12,
          eczane_mahalle: null,
          adres_tarifi: "(İCAPÇI USULÜ NÖBETÇİDİR.)",
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: null,
          grup_sira: null,
          bolge_adi: "Yenice",
          normal_baslama: "00:00:00",
          normal_bitis: "00:00:00",
          pazar_bayram_baslama: "00:00:00",
          pazar_bayram_bitis: "00:00:00",
          cumartesi_baslama: "00:00:00",
          cumartesi_bitis: "00:00:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 14724,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "DEMİRTAŞ SAĞLIK",
          nobet_tipi: 1,
          phone: "0224-3299596",
          konum: "40.27040489217964, 29.080067574977875,19",
          eczane_adres: "DEMİRTAŞ DUMLUPINAR MAH. 47.CAD. NO:70",
          eczane_sehir: "Bursa",
          eczane_ilce: "Osmangazi/Demirtaş",
          eczane_ilce_sira: 3,
          eczane_mahalle: null,
          adres_tarifi: "(DOSAB SEMT POLİKLİNİĞİ YANI)",
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: null,
          grup_sira: null,
          bolge_adi: "Demirtaş",
          normal_baslama: "18:30:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "17:00:00",
          cumartesi_bitis: "10:00:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 14773,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "AYŞE",
          nobet_tipi: 1,
          phone: "0224-3606086",
          konum: "40.2099812, 29.09778879999999,21",
          eczane_adres: "MİLLET MH. CENGİZHAN CD. NO:26/D",
          eczane_sehir: "Bursa",
          eczane_ilce: "Yıldırım",
          eczane_ilce_sira: 4,
          eczane_mahalle: null,
          adres_tarifi: "(MUHTARLIK-SAĞLIK OCAĞI VE PTT YANI)",
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: "D11E05F37G29H23J17",
          grup_sira: 12,
          bolge_adi: "Yıldırım",
          normal_baslama: "18:30:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "17:00:00",
          cumartesi_bitis: "10:00:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 14791,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "SAVAŞ",
          nobet_tipi: 1,
          phone: "0224-6139594",
          konum: "40.040522753730215, 28.406660109758377,20",
          eczane_adres: "HAMZABEY MAH. DEĞİRMEN SOK. NO:16/B",
          eczane_sehir: "Bursa",
          eczane_ilce: "Mustafakemalpaşa",
          eczane_ilce_sira: 21,
          eczane_mahalle: null,
          adres_tarifi: null,
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: null,
          grup_sira: null,
          bolge_adi: "Mustafakemalpaşa",
          normal_baslama: "18:30:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "17:00:00",
          cumartesi_bitis: "10:00:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 14799,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "ÜMİT",
          nobet_tipi: 1,
          phone: "0224-8171999",
          konum: "39.90137947427627, 28.987212725210384,19",
          eczane_adres: "İSMETPAŞA MAH. HASTANE CAD. NO:11/A",
          eczane_sehir: "Bursa",
          eczane_ilce: "Orhaneli",
          eczane_ilce_sira: 22,
          eczane_mahalle: null,
          adres_tarifi: null,
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: null,
          grup_sira: null,
          bolge_adi: "Orhaneli",
          normal_baslama: "18:00:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "08:30:00",
          cumartesi_bitis: "08:30:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 14812,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "ZENCEFİL",
          nobet_tipi: 1,
          phone: "0224-3770017",
          konum: "40.22004679132541, 29.18975482252199,19",
          eczane_adres: "ZAFER MAH. ZAFER CAD. NO:55/A",
          eczane_sehir: "Bursa",
          eczane_ilce: "Gürsu",
          eczane_ilce_sira: 7,
          eczane_mahalle: null,
          adres_tarifi: null,
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: null,
          grup_sira: null,
          bolge_adi: "Gürsu",
          normal_baslama: "18:30:00",
          normal_bitis: "09:00:00",
          pazar_bayram_baslama: "09:00:00",
          pazar_bayram_bitis: "09:00:00",
          cumartesi_baslama: "15:00:00",
          cumartesi_bitis: "09:30:00"
        },
        {
          kayit_turu: "NORMAL",
          id: 14855,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "UĞUR",
          nobet_tipi: 1,
          phone: "0224-7571656",
          konum: null,
          eczane_adres: "MUSTAFAKEMALPAŞA MAH. ORHANGAZİ CAD. NO:26/B",
          eczane_sehir: "Bursa",
          eczane_ilce: "İznik",
          eczane_ilce_sira: 15,
          eczane_mahalle: null,
          adres_tarifi: null,
          baslangic_saati: null,
          bitis_saati: null,
          grup_adi: null,
          grup_sira: null,
          bolge_adi: "İznik",
          normal_baslama: "18:30:00",
          normal_bitis: "08:30:00",
          pazar_bayram_baslama: "08:30:00",
          pazar_bayram_bitis: "08:30:00",
          cumartesi_baslama: "08:30:00",
          cumartesi_bitis: "08:30:00"
        },
        {
          kayit_turu: "EK NOBET",
          id: 9001,
          nobet_tarihi: "2019-08-26",
          eczane_adi: "UZUN SOKAK",
          nobet_tipi: 1,
          phone: "0224-7159101",
          konum: "40.079057, 29.50966500000004,21",
          eczane_adres: "CUMA MAH. BELEDİYE CAD. NO:13",
          eczane_sehir: "Bursa",
          eczane_ilce: "İnegöl",
          eczane_ilce_sira: 9,
          eczane_mahalle: null,
          adres_tarifi: null,
          baslangic_saati: "18:00:00",
          bitis_saati: "01:00:00",
          grup_adi: null,
          grup_sira: null,
          bolge_adi: null,
          normal_baslama: null,
          normal_bitis: null,
          pazar_bayram_baslama: null,
          pazar_bayram_bitis: null,
          cumartesi_baslama: null,
          cumartesi_bitis: null
        }
      ],
      today: "26-08-2019",
      yesterday: "25-08-2019",
      tomorrow: "27-08-2019"
    }

    const pharmacies: Pharmacy[] = datas.data.map(item => {
      const location: Coordinate =
        item.konum == null
          ? {}
          : { lat: +item.konum.split(",")[0], long: +item.konum!.split(",")[1] }
      return {
        name: item.eczane_adi,
        location,
        address: item.eczane_ilce + " - " + item.eczane_adres,
        phone: item.phone
      }
    })

    let radius = 15
    let locations = pharmacies.map(item => ({
      ...item,
      distance: distance(
        lat,
        lng,
        item.location == null ? 0 : item.location.lat!,
        item.location == null ? 0 : item.location.long!,
        "K"
      )
    }))

    const myLocations = locations.filter(item => item.distance < radius)
    const orderedMyLocations = _.orderBy(myLocations, ["distance"], ["asc"])

    const myLocationsWithDistance: Pharmacy[] = orderedMyLocations.map(
      item => ({
        ...item,
        distance: item.distance
          .toString()
          .substr(0, 4)
          .concat(" km")
      })
    )

    this.setState({
      list: myLocationsWithDistance
    })
  }

  componentDidMount() {
    this.setupInput()
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <input
          type="text"
          style={{ width: "100%" }}
          ref={this.inputSearchBox}
        />

        {this.state.list.map((item: Pharmacy, index) => (
          <div key={index} className={this.props.classes.listItem}>
            <RPharmacyCard
              key={index}
              name={item.name}
              phone={item.phone}
              address={item.address}
              distance={item.distance}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default withStyles(styles)(Home)
