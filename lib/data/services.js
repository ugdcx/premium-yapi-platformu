export const services = [
  {
    id: "service-turnkey",
    slug: "anahtar-teslim-insaat",
    title: "Anahtar Teslim İnşaat",
    shortDescription: "Arsa, bütçe, proje ve teslim hedefini tek akışta yöneten yapı hizmeti.",
    description: "Planlamadan teslim aşamasına kadar kontrollü yapı süreci kurarız.",
    suitableFor: ["Arsa sahibi olanlar", "Villa veya müstakil konut yaptırmak isteyenler", "Süreci tek ekiple yürütmek isteyen yatırımcılar"],
    scope: ["Kapsam ve bütçe planı", "Saha koordinasyonu", "Malzeme ve ekip yönetimi", "Teslim öncesi kontrol"],
    process: ["Ön görüşme", "Keşif ve kapsam", "Teklif", "Uygulama", "Teslim kontrolü"],
    quality: "Malzeme seçimi ve saha uygulaması aşama aşama kayıt altına alınır.",
    tracking: "Müşteri, özel linkten fotoğraf, iş kalemi, ödeme ve belge durumunu takip eder.",
    faq: [
      ["Süre neye göre belirlenir?", "Kapsam, metraj, ruhsat ve malzeme kararlarına göre belirlenir."],
      ["Teklif tek kalem mi olur?", "Kapsam netleştikçe ana kalemler görünür şekilde paylaşılır."]
    ]
  },
  {
    id: "service-villa",
    slug: "villa-renovasyonu",
    title: "Villa Renovasyonu",
    shortDescription: "Villa yaşam alanlarında konfor, estetik ve değer odaklı yenileme.",
    description: "Mutfak, banyo, cephe, zemin ve yaşam alanlarını birlikte planlarız.",
    suitableFor: ["Villasını yenilemek isteyenler", "Satış veya kiralama öncesi değer artırmak isteyenler", "Uzaktan süreç takip etmek isteyen ev sahipleri"],
    scope: ["Mutfak ve banyo", "Zemin ve boya", "Dış cephe", "Peyzaj ön hazırlığı"],
    process: ["Mevcut durum kaydı", "Öncelik planı", "Malzeme seçimi", "Uygulama", "Son kontrol"],
    quality: "Kritik alanlarda öncesi/süreç/sonrası fotoğrafları düzenli tutulur.",
    tracking: "Villa renovasyonunda sahadan gelen fotoğraflar admin onayından sonra müşteriye açılır.",
    faq: [
      ["Evde yaşam devam ederken yapılabilir mi?", "Kapsama göre etaplama yapılabilir."],
      ["Dış cephe dahil mi?", "İhtiyaca göre cephe, boya ve yalıtım kapsama alınabilir."]
    ]
  },
  {
    id: "service-home-renovation",
    slug: "konut-tadilati",
    title: "Konut Tadilatı",
    shortDescription: "Daire veya ev tadilatında kapsam, takvim ve ekip koordinasyonu.",
    description: "Mevcut konutu daha konforlu, temiz ve kullanışlı hale getiririz.",
    suitableFor: ["Evini yenilemek isteyenler", "Kiraya hazırlık yapanlar", "Taşınmadan önce tadilat isteyenler"],
    scope: ["Boya", "Zemin", "Elektrik", "Tesisat", "Kapı ve küçük onarımlar"],
    process: ["İhtiyaç listesi", "Önceliklendirme", "Teklif", "Uygulama", "Teslim"],
    quality: "Görünmeyen altyapı işleri ayrıca kontrol edilir.",
    tracking: "Müşteri, tamamlanan iş kalemlerini ve kalan işleri tek ekrandan görür.",
    faq: [
      ["Küçük tadilat alıyor musunuz?", "Kapsama ve lokasyona göre değerlendiriyoruz."],
      ["Malzemeyi ben alabilir miyim?", "Evet, işçilik ve koordinasyon ayrı planlanabilir."]
    ]
  },
  {
    id: "service-kitchen-bath",
    slug: "banyo-mutfak-yenileme",
    title: "Banyo & Mutfak Yenileme",
    shortDescription: "Islak hacim ve mutfakta doğru altyapı, doğru malzeme, temiz uygulama.",
    description: "Banyo ve mutfakta tesisat, seramik, dolap ve yüzeyleri birlikte ele alırız.",
    suitableFor: ["Eski banyo veya mutfağını yenilemek isteyenler", "Su yalıtımı ve tesisat riski yaşayanlar", "Satış öncesi hızlı değer artışı isteyenler"],
    scope: ["Söküm", "Tesisat", "Su yalıtımı", "Seramik", "Dolap ve armatür hazırlığı"],
    process: ["Mevcut durum fotoğrafı", "Malzeme seçimi", "Altyapı kontrolü", "Uygulama", "Sızdırmazlık kontrolü"],
    quality: "Yalıtım, tesisat ve derz kontrolleri teslim öncesi ayrıca yapılır.",
    tracking: "Müşteri özellikle görünmeyen altyapı adımlarını fotoğraflı takip eder.",
    faq: [
      ["Kaç gün sürer?", "Kapsama göre genelde birkaç hafta içinde planlanır."],
      ["Su yalıtımı kontrol edilir mi?", "Evet, kritik kontrol listesine dahildir."]
    ]
  },
  {
    id: "service-facade",
    slug: "dis-cephe-yalitim",
    title: "Dış Cephe & Yalıtım",
    shortDescription: "Cephe görünümü, dayanım ve yalıtım için kontrollü dış uygulama.",
    description: "Dış cephe boya, kaplama ve yalıtım işlerini kayıtlı süreçle yürütürüz.",
    suitableFor: ["Cephe yenilemek isteyen bina sahipleri", "Yalıtım ihtiyacı olan konutlar", "Satış öncesi dış görünümünü güçlendirmek isteyenler"],
    scope: ["Cephe keşfi", "Yüzey hazırlığı", "Yalıtım", "Dış cephe boya", "İskele kontrolü"],
    process: ["Keşif", "Malzeme kararı", "Saha hazırlığı", "Uygulama", "Teslim fotoğrafları"],
    quality: "İskele, yüzey ve son kat uygulama kontrolleri kayıt altına alınır.",
    tracking: "Cephe aşamaları tarih bazlı fotoğraflarla görünür hale gelir.",
    faq: [
      ["Hava şartları etkiler mi?", "Evet, uygulama takvimi hava durumuna göre planlanır."],
      ["Yalıtım belgesi paylaşılır mı?", "Malzeme belgeleri takip alanına eklenebilir."]
    ]
  },
  {
    id: "service-value",
    slug: "deger-artirma",
    title: "Satış Öncesi Değer Artırma",
    shortDescription: "Düşük maliyetli ama yüksek algı yaratan tadilatlarla satışa hazırlık.",
    description: "Satılacak konutlarda düşük maliyetli ama yüksek algı yaratan tadilatlarla mülkün satış değerini ve pazarlanabilirliğini artırıyoruz.",
    suitableFor: ["Evini satmadan önce hazırlamak isteyenler", "Emlak portföyünü güçlendirmek isteyenler", "Küçük dokunuşlarla yüksek algı isteyenler"],
    scope: ["Boya", "Zemin", "Banyo", "Mutfak", "Dış cephe", "Işıklandırma", "Temizlik", "Fotoğraf öncesi hazırlık", "Emlak satışına hazırlık"],
    process: ["Eksik tespiti", "Öncelik planı", "Hızlı uygulama", "Fotoğraf öncesi kontrol", "Satışa hazır teslim"],
    quality: "Amaç gereksiz masraf değil, görünür değeri artıran doğru müdahaleleri seçmektir.",
    tracking: "Satışa hazırlık adımları müşteri ve danışman için fotoğraflı görünür olur.",
    faq: [
      ["Her tadilat satış değerini artırır mı?", "Hayır. Bu yüzden önce doğru öncelikleri belirliyoruz."],
      ["Fotoğraf öncesi hazırlık dahil mi?", "Kapsama göre temizlik, ışık ve küçük düzenlemeler dahil edilebilir."]
    ],
    featured: true
  },
  {
    id: "service-expat",
    slug: "gurbetci-ev-takip",
    title: "Gurbetçi Ev Takip Sistemi",
    shortDescription: "Türkiye’deki evinizin tadilatını uzaktan, fotoğraflı ve belgeli takip edin.",
    description: "Türkiye’deki evinizin tadilat sürecini uzaktan, fotoğraflı ve belgeli şekilde takip edin.",
    suitableFor: ["Yurt dışında yaşayan ev sahipleri", "Türkiye’deki tadilatını uzaktan takip etmek isteyenler", "Aileden bağımsız profesyonel takip isteyenler"],
    scope: ["Kayıt olmadan özel link", "Fotoğraflı güncelleme", "Ödeme takibi", "Malzeme takibi", "Belge/fatura alanı", "WhatsApp desteği"],
    process: ["Özel link oluşturma", "Usta fotoğraf yükleme", "Admin onayı", "Müşteriye yayın", "Teslim raporu"],
    quality: "Ham saha bilgisi admin tarafından düzenlenir, müşteriye temiz bilgi gösterilir.",
    tracking: "Bu hizmetin merkezinde müşteri takip sistemi vardır.",
    faq: [
      ["Kayıt olmak gerekiyor mu?", "Hayır, size özel bağlantı yeterlidir."],
      ["Ham usta notlarını görür müyüm?", "Hayır, BLAAG ekibi onaylı ve anlaşılır bilgileri paylaşır."]
    ],
    featured: true
  },
  {
    id: "service-material-labor",
    slug: "malzeme-iscilik-yonetimi",
    title: "Malzeme + İşçilik Yönetimi",
    shortDescription: "Malzeme seçimi, işçilik takibi ve saha koordinasyonunu tek yerde tutar.",
    description: "Malzeme kararlarını ve ekip işlerini görünür, düzenli ve takip edilebilir hale getiririz.",
    suitableFor: ["Malzeme karmaşası yaşamak istemeyenler", "Birden fazla usta ile uğraşmak istemeyenler", "İşçilik kalitesini kayıtlı takip etmek isteyenler"],
    scope: ["Malzeme listesi", "Marka/model kaydı", "İşçilik takibi", "Fatura/belge düzeni"],
    process: ["Listeleme", "Alternatif sunma", "Onay", "Saha uygulaması", "Belge kapama"],
    quality: "Malzeme ve işçilik kayıtları proje tesliminde geriye dönük izlenebilir olur.",
    tracking: "Müşteri malzeme durumunu ve belge alanlarını takip linkinden görebilir.",
    faq: [
      ["Malzeme markası paylaşılır mı?", "Evet, marka ve model takip alanında yer alabilir."],
      ["Sadece işçilik olur mu?", "Kapsama göre değerlendirilebilir."]
    ]
  },
  {
    id: "service-real-estate",
    slug: "gayrimenkul-satisa-hazirlik",
    title: "Gayrimenkul Satışa Hazırlık / Danışmanlık",
    shortDescription: "Portföyü doğru sunum, doğru fiyat ve doğru hazırlıkla pazara çıkarır.",
    description: "Satış, kiralama ve yatırım kararlarında mülkü daha doğru konumlandırırız.",
    suitableFor: ["Mülkünü satmak isteyenler", "Kiraya hazırlık yapanlar", "Portföy sunumunu güçlendirmek isteyenler"],
    scope: ["Değer analizi", "Hazırlık önerileri", "İlan öncesi düzen", "Görsel sunum yönlendirmesi"],
    process: ["Ön değerlendirme", "Eksik tespiti", "Hazırlık planı", "Sunum", "Satış süreci desteği"],
    quality: "Amaç mülkün gerçek potansiyelini sade ve güven veren şekilde göstermek.",
    tracking: "Hazırlık adımları ve görsel kayıtlar proje takip yapısına bağlanabilir.",
    faq: [
      ["Ekspertiz yapıyor musunuz?", "Resmi ekspertiz yerine satışa hazırlık ve saha değerlendirmesi sunarız."],
      ["Tadilat önerisi de verir misiniz?", "Evet, düşük maliyetli ve etkili müdahaleleri belirleriz."]
    ]
  }
];

export const intakeServices = services.slice(0, 3);
