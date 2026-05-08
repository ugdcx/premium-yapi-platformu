export const processSteps = [
  {
    title: "Ön Başvuru",
    description: "Müşteri formu doldurur, fotoğraf ekler ve yapılacak işi kısaca anlatır.",
    customer: "İhtiyacı, lokasyonu, bütçe aralığını ve varsa fotoğrafları paylaşır.",
    studio: "Başvuruyu inceler, eksik bilgi varsa iletişime geçer.",
    output: "İncelenmeye hazır başvuru kaydı."
  },
  {
    title: "Keşif / Uzaktan İnceleme",
    description: "Projenin mevcut durumu yerinde veya fotoğraflar üzerinden değerlendirilir.",
    customer: "Uygun zaman veya ek görsel bilgileri paylaşır.",
    studio: "Alanı, riskleri ve ilk kapsam ihtiyacını okur.",
    output: "Ön değerlendirme ve netleşmesi gereken başlıklar."
  },
  {
    title: "Kapsam Belirleme",
    description: "Yapılacak işler sade ve anlaşılır kalemlere ayrılır.",
    customer: "Önceliklerini ve beklentisini netleştirir.",
    studio: "İş kalemlerini, sıralamayı ve sorumlulukları belirler.",
    output: "Kapsam listesi ve uygulama yaklaşımı."
  },
  {
    title: "Malzeme Alternatifleri",
    description: "Malzeme, marka ve kalite seçenekleri işin hedefine göre değerlendirilir.",
    customer: "Bütçe ve kalite beklentisini seçer.",
    studio: "Uygun alternatifleri ve farklarını sade şekilde açıklar.",
    output: "Malzeme kararları ve kayıtlı seçim listesi."
  },
  {
    title: "Anahtar Teslim Teklif",
    description: "Kapsam, takvim ve ödeme planı anlaşılır teklif haline getirilir.",
    customer: "Teklifi inceler ve sorularını iletir.",
    studio: "Teklif kalemlerini, hariç/dahil işleri ve ödeme planını sunar.",
    output: "Onaya hazır teklif."
  },
  {
    title: "Onay ve Başlangıç",
    description: "Teklif onaylandıktan sonra saha hazırlığı ve ekip planı yapılır.",
    customer: "Onay verir ve başlangıç için uygun zamanı netleştirir.",
    studio: "Proje kaydını açar, ekip ve takip linklerini hazırlar.",
    output: "Başlatılmış proje ve erişim linkleri."
  },
  {
    title: "Fotoğraflı İlerleme Takibi",
    description: "Sahadaki önemli adımlar fotoğraf ve açıklamayla kayıt altına alınır.",
    customer: "Özel takip linkinden onaylı gelişmeleri izler.",
    studio: "Usta fotoğraflarını kontrol eder ve müşteriye anlaşılır şekilde yayınlar.",
    output: "Tarihli fotoğraflı ilerleme kaydı."
  },
  {
    title: "Ödeme ve Belge Takibi",
    description: "Ödeme planı, belgeler ve faturalar tek ekranda takip edilir.",
    customer: "Ödeme durumunu ve paylaşılan belgeleri görür.",
    studio: "Ödeme ve belge kayıtlarını düzenli tutar.",
    output: "Şeffaf ödeme ve belge görünümü."
  },
  {
    title: "Teslim Öncesi Kontrol",
    description: "Boya, seramik, kapı, pencere, elektrik, tesisat ve temizlik gibi kalemler kontrol edilir.",
    customer: "Varsa son gözlemlerini paylaşır.",
    studio: "Teslim kontrol listesini tamamlar ve fotoğraflar.",
    output: "Fotoğraflı teslim kontrol kaydı."
  },
  {
    title: "Teslim ve Kapanış",
    description: "İş tamamlandığında kapsam, belgeler ve son kontroller kapatılır.",
    customer: "Teslimi inceler ve sonucu onaylar.",
    studio: "Teslim notlarını, belgeleri ve garanti süreci bilgisini paylaşır.",
    output: "Kapanmış proje ve teslim kaydı."
  }
];

export const trackingSystemPoints = [
  "Onay sonrası müşteri takip linki oluşturulur.",
  "Usta için ayrı fotoğraf yükleme linki oluşturulur.",
  "Fotoğraflar, ödeme planı, malzeme listesi ve belgeler müşteri ekranında görünür."
];

