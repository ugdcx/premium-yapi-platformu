export const services = [
  {
    id: "service-villa",
    slug: "villa-renovasyonu",
    title: "Villa Renovasyonu",
    shortDescription: "Villa yaşam alanlarında tasarım, uygulama ve takip tek akışta yönetilir.",
    description: "Cephe, zemin, ıslak hacim ve yaşam alanları kontrollü bir renovasyon planına alınır.",
    suitableFor: ["Villasını yenilemek isteyenler", "Satış veya yaşam kalitesi için değer arayanlar", "Süreci uzaktan izlemek isteyen ev sahipleri"],
    scope: ["Mevcut durum kaydı", "Malzeme seçimi", "Saha uygulaması", "Fotoğraflı ilerleme"],
    process: ["Planla", "Uygula", "Takip Et"],
    quality: "Kritik kararlar malzeme, fotoğraf ve teslim notlarıyla kayıt altında tutulur.",
    tracking: "Onaylanan saha fotoğrafları BLAGG Remote alanında müşteriye açılır.",
    faq: [
      ["Evde yaşam devam ederken yapılabilir mi?", "Kapsama göre etaplama yapılabilir."],
      ["Malzeme kararları nasıl takip edilir?", "Seçilen ürünler proje kaydında belge ve notlarla tutulur."]
    ],
    featured: true
  },
  {
    id: "service-home-renovation",
    slug: "tadilat",
    aliases: ["konut-tadilati"],
    title: "Konut Yenileme",
    shortDescription: "Daire ve konut tadilatında kapsam, takvim ve saha koordinasyonu.",
    description: "Mevcut konutu daha sade, temiz ve kullanışlı hale getiren kontrollü tadilat akışı kurulur.",
    suitableFor: ["Evini yenilemek isteyenler", "Kiraya veya satışa hazırlık yapanlar", "Taşınmadan önce tadilat isteyenler"],
    scope: ["Boya", "Zemin", "Elektrik", "Tesisat", "Kapı ve küçük onarımlar"],
    process: ["Planla", "Uygula", "Takip Et"],
    quality: "Görünmeyen altyapı işleri ayrıca kontrol edilir.",
    tracking: "Müşteri tamamlanan iş kalemlerini ve kalan işleri tek ekrandan görür.",
    faq: [
      ["Küçük tadilat alıyor musunuz?", "Kapsama ve lokasyona göre değerlendiriyoruz."],
      ["Malzemeyi ben alabilir miyim?", "Evet, işçilik ve koordinasyon ayrı planlanabilir."]
    ]
  },
  {
    id: "service-turnkey",
    slug: "anahtar-teslim-insaat",
    title: "Anahtar Teslim İnşaat",
    shortDescription: "Arsa, bütçe, proje ve teslim hedefini tek kontrollü akışta yöneten yapı hizmeti.",
    description: "Planlamadan teslim aşamasına kadar sade, kayıtlı ve yönetilebilir yapı süreci kurarız.",
    suitableFor: ["Arsa sahibi olanlar", "Villa veya müstakil konut yaptırmak isteyenler", "Süreci tek ekiple yürütmek isteyen yatırımcılar"],
    scope: ["Kapsam ve bütçe planı", "Saha koordinasyonu", "Malzeme ve ekip yönetimi", "Teslim kontrolü"],
    process: ["Planla", "Uygula", "Takip Et"],
    quality: "Malzeme seçimi ve saha uygulaması aşama aşama kayıt altına alınır.",
    tracking: "Müşteri özel linkten fotoğraf, iş kalemi, ödeme ve belge durumunu takip eder.",
    faq: [
      ["Süre neye göre belirlenir?", "Kapsam, metraj, izinler ve malzeme kararlarına göre belirlenir."],
      ["Teklif tek kalem mi olur?", "Kapsam netleştikçe ana kalemler görünür şekilde paylaşılır."]
    ]
  },
  {
    id: "service-value",
    slug: "deger-artirma",
    title: "Satış Öncesi Değer Artırma",
    shortDescription: "Düşük gürültülü, yüksek algı yaratan yenilemelerle mülkü satışa hazırlar.",
    description: "Satılacak konutlarda gereksiz masrafı azaltan, görünür değeri artıran müdahaleler seçilir.",
    suitableFor: ["Evini satmadan önce hazırlamak isteyenler", "Portföy sunumunu güçlendirmek isteyenler", "Küçük dokunuşlarla yüksek algı isteyenler"],
    scope: ["Boya", "Zemin", "Banyo", "Mutfak", "Fotoğraf öncesi hazırlık"],
    process: ["Planla", "Uygula", "Takip Et"],
    quality: "Amaç gereksiz masraf değil, doğru alanları sakin ve güçlü biçimde iyileştirmektir.",
    tracking: "Hazırlık adımları fotoğraf ve kontrol notlarıyla görünür olur.",
    faq: [
      ["Her tadilat satış değerini artırır mı?", "Hayır. Önce doğru öncelikler belirlenir."],
      ["Fotoğraf öncesi hazırlık dahil mi?", "Kapsama göre temizlik, ışık ve küçük düzenlemeler dahil edilebilir."]
    ],
    featured: true
  },
  {
    id: "service-remote",
    slug: "blagg-remote",
    title: "BLAGG Remote",
    shortDescription: "Şehir dışında veya yurtdışında olan müşteriler için özel proje takip alanı.",
    description: "Projenize özel bağlantı ile fotoğrafları, ödeme planını, belgeleri ve ilerleme notlarını izleyin.",
    suitableFor: ["Şehir dışında olan ev sahipleri", "Yurtdışından proje izlemek isteyenler", "Aileden bağımsız profesyonel takip isteyenler"],
    scope: ["Kayıt olmadan özel link", "Onaylı fotoğraflar", "Ödeme planı", "Belge alanı"],
    process: ["Özel link", "Saha yüklemesi", "Admin onayı", "Müşteriye yayın"],
    quality: "Ham saha bilgisi BLAGG Control içinde incelenir, müşteriye temiz kayıt gösterilir.",
    tracking: "Müşteri sadece onaylanmış ve görünür yapılmış fotoğrafları görür.",
    faq: [
      ["Kayıt olmak gerekiyor mu?", "Hayır, size özel bağlantı yeterlidir."],
      ["Ham saha notlarını görür müyüm?", "Hayır, yalnızca onaylı ve anlaşılır bilgiler paylaşılır."]
    ],
    featured: true
  },
  {
    id: "service-material-labor",
    slug: "malzeme-uygulama-yonetimi",
    aliases: ["malzeme-iscilik-yonetimi"],
    title: "Malzeme & Uygulama Yönetimi",
    shortDescription: "Malzeme kararları, uygulama kalemi ve belge düzenini aynı projede tutar.",
    description: "Malzeme seçimi ve ekip işlerini görünür, düzenli ve takip edilebilir hale getiririz.",
    suitableFor: ["Malzeme karmaşası yaşamak istemeyenler", "Birden fazla ekibi koordine etmek istemeyenler", "Kayıtlı uygulama isteyenler"],
    scope: ["Malzeme listesi", "Marka/model kaydı", "Uygulama takibi", "Belge düzeni"],
    process: ["Planla", "Uygula", "Takip Et"],
    quality: "Malzeme ve uygulama kayıtları proje tesliminde geriye dönük izlenebilir olur.",
    tracking: "Müşteri malzeme durumunu ve belge alanlarını takip linkinden görebilir.",
    faq: [
      ["Malzeme markası paylaşılır mı?", "Evet, marka ve model takip alanında yer alabilir."],
      ["Sadece koordinasyon olur mu?", "Kapsama göre değerlendirilebilir."]
    ]
  },
  {
    id: "service-signature",
    slug: "blagg-signature",
    title: "BLAGG Signature",
    shortDescription: "Seçilmiş projeler için tasarım, uygulama kontrolü ve özel takip modeli.",
    description: "Tasarım dili, malzeme seçimi, uygulama kontrolü ve özel proje takibi tek çatı altında toplanır.",
    suitableFor: ["Rafine renovasyon isteyenler", "Tasarım ve uygulamayı birlikte yönetmek isteyenler", "Özel takip modeli arayanlar"],
    scope: ["Tasarım yönü", "Malzeme seçimi", "Uygulama kontrolü", "Özel takip"],
    process: ["Seçim", "Plan", "Uygulama", "Teslim"],
    quality: "Az proje, yüksek kontrol ve görünür ilerleme prensibiyle yürütülür.",
    tracking: "Signature projelerde BLAGG Remote daha detaylı teslim ve belge yapısıyla kullanılır.",
    faq: [
      ["Her proje Signature olabilir mi?", "Hayır, kapsam ve beklentiye göre seçilir."],
      ["Tasarım hizmeti dahil mi?", "Proje modeline göre dahil edilebilir."]
    ]
  }
];

export const intakeServices = services.slice(0, 5);

export function findServiceBySlug(slug) {
  return services.find((service) => service.slug === slug || service.aliases?.includes(slug));
}
