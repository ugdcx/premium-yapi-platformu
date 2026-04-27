# BLAAG Construction and Architecture - Final Audit and Redesign Specification

## 1. Executive Summary

### What is working
- Marka artık net biçimde BLAAG Construction and Architecture olarak konumlanıyor.
- Public yüzey yazılım satışı gibi durmuyor; ana mesaj hizmet, şeffaflık ve profesyonel uygulama üzerine kurulu.
- Login, admin, müşteri paneli ve saha paneli public navigasyondan kaldırılmış durumda.
- Özel müşteri takip bağlantısı ve usta fotoğraf yükleme bağlantısı modeli doğru yönde kurgulanmış.
- Admin tarafında fotoğraf onayı, müşteri açıklaması yazımı ve yayınlama akışı artık gerçek operasyon mantığını gösteriyor.

### What is still wrong
- Görsel alanlar hâlâ gerçek proje fotoğrafları yerine mimari frame hissi veriyor. Bu üretim öncesi kabul edilebilir, ama yüksek bütçeli müşteri için yeterli değil.
- Ana sayfadaki hizmet blokları doğru yönde, ancak gerçek vaka kanıtı olmadığı için güven sınırlı kalıyor.
- İletişim bilgileri bilinmediği için footer güven üretmiyor. “Yakında güncellenecektir” güvenli ama satış için zayıf.
- Admin ekranı işlevsel demo olarak güçlü, fakat yoğun veri ve tablo yapısı mobilde operasyon ekibi için daha fazla sadeleştirilebilir.

### What must be fixed first
- Gerçek proje fotoğrafları, önce/sonra görselleri ve en az 2 vaka örneği eklenmeli.
- Footer’a gerçek telefon, WhatsApp, e-posta ve lokasyon eklenmeli.
- Ana CTA dili tüm public yüzeyde “Projemi Başlat” olarak korunmalı; “Ön Başvuru” yalnızca iç/form bağlamında kullanılmalı.
- Müşteri takip sayfasında gerçek proje güncellemesi formatı, ödeme ve belge örnekleri canlı dile daha yakın hale getirilmeli.

## 2. Page-by-page Audit

### Homepage

Strengths:
- Hero koyu, net ve artık SaaS dashboard hissi vermiyor.
- Mini proje kartı fiyat, yüzde ve finansal metrik içermiyor.
- Takip ayrıcalığı “hizmetin premium parçası” olarak anlatılıyor.
- Public nav temiz: Hizmetler, Süreç, Projemi Başlat.

Weaknesses:
- İlk 10 saniyede BLAAG’in gerçek saha gücünü kanıtlayan somut fotoğraf yok.
- Trust strip artık açıklamalı, fakat sosyal kanıt veya kalite standardı hâlâ zayıf.
- Hizmet görsel frame’leri profesyonel ama gerçek değil.

Critical fixes:
- Hero sağındaki mini proje kartına gerçek bir şantiye/uygulama fotoğrafı arka planı eklenmeli.
- Proof bölümüne gerçek önce/süreç/sonrası görselleri yerleştirilmeli.
- Final CTA’da tek buton kalmalı: Projemi Başlat.

UX improvements:
- Hero CTA hover: 2px lift + hafif koyulaşma yeterli.
- Service split blokları scroll’da çok hafif opacity/translate ile gelebilir; hareket dikkat dağıtmamalı.
- Mobile hero’da mini proje kartı başlıktan hemen sonra gelmeli, CTA’dan çok uzaklaşmamalı.

Copy improvements:
- Hero subtitle mevcut yön doğru: işi BLAAG’in yönettiğini ve müşterinin takip ettiğini söylüyor.
- “Ön Başvuru” yerine public CTA’da “Projemi Başlat” kullanılmalı.

Visual improvements:
- Gold yalnızca çizgi, ikon ve küçük vurgu olarak kalmalı.
- Geniş image frame alanları gerçek projelerle değiştirilmeli.

### Services Page

Strengths:
- Üç hizmet net ayrışıyor.
- Kopya artık mekanik değil; değer, belirsizlik azaltma ve kontrollü ilerleme üzerine kurulu.
- Her hizmette büyük görsel alan var.

Weaknesses:
- Hizmetler hâlâ gerçek iş örneği veya referans taşımıyor.
- CTA her blokta aynı ve yeterince danışmanlık hissi vermiyor.

Critical fixes:
- Her hizmete 1 kısa “hangi müşteri için” cümlesi eklenmeli.
- Görsel alanlar gerçek proje kategorileriyle eşleşmeli: villa dış cephe, iç mekan yenileme, portföy hazırlığı.

UX improvements:
- Service CTA metni dönüşümlü kullanılabilir: “Bu hizmet için görüşelim”, “Projenizi anlatın”.
- Mobilde görsel alan metni çok uzunsa iki satırla sınırlandırılmalı.

Copy improvements:
- Anahtar teslim: huzur ve tek sorumluluk daha belirgin.
- Tadilat: yaşam kalitesi + satış/kiralama değeri daha görünür.
- Gayrimenkul: doğru değerleme ve konumlandırma vurgusu korunmalı.

Visual improvements:
- Her service block içinde materyal hissi veren gerçek doku/fotoğraf olmalı.

### Process Page

Strengths:
- Süreç artık yazılım akışı değil hizmet akışı gibi anlatılıyor.
- Hesap gerektirmeyen özel bağlantı modeli açıklanıyor.
- Worker upload -> admin review -> customer update mantığı doğru.

Weaknesses:
- Süreç sayfası biraz kısa; premium müşteri “bu işi kim yönetecek?” sorusuna daha fazla cevap isteyebilir.
- Admin kalite kontrol akışı daha görünür bir diyagramla anlatılabilir.

Critical fixes:
- “Kim ne yapar?” bölümü eklenmeli: BLAAG, müşteri, saha ekibi.
- Özel bağlantı modeli tek cümleden öte minik bir akış grafiğiyle gösterilmeli.

UX improvements:
- 5 step kartları tek cümleli kalmalı.
- Mobilde adımlar arası dikey çizgi kullanılabilir.

Copy improvements:
- “İlk Görüşme ve Talep” doğru; “Ön Başvuru” bu sayfada kullanılmamalı.

Visual improvements:
- Takip akışı için üç kutu: Usta fotoğraf yükler, BLAAG düzenler, müşteri görür.

### Intake / Project Request Page

Strengths:
- Signup değil, ilk değerlendirme talebi gibi hissettiriyor.
- Konum, hizmet tipi, kapsam, zamanlama, ölçek ve dosya alanları mevcut.
- Success mesajı hesap/panel vaadi vermiyor.

Weaknesses:
- İlk adımda hizmet kartları biraz uzun; premium müşteri hızlı taramak isteyebilir.
- Dosya ekleme gerçek upload olmadığı için canlıda net beklenti yönetimi gerekir.

Critical fixes:
- “Talebiniz alındı” dili korunmalı.
- Dosya ekleme canlıya çıkmadan gerçek upload veya net yönlendirme ile çözülmeli.

UX improvements:
- Stepper mobilde daha kompakt olabilir.
- Geri/Devam butonları sticky alt aksiyon olarak düşünülebilir.

Copy improvements:
- “Proje ölçeği / planlanan yatırım aralığı” iyi; agresif bütçe hissi yok.

Visual improvements:
- Form arka planı sakin; iyi. Input odak durumları korunmalı.

### Customer Tracking Link

Strengths:
- Login yok.
- Admin/worker kontrolü yok.
- Sadece onaylı güncellemeler gösteriliyor.
- Belge, ödeme, talep ve teslim/garanti alanları mevcut.

Weaknesses:
- “Bu alanda yalnızca BLAAG ekibi tarafından kontrol edilen ve yayınlanan bilgiler görünür” cümlesi daha açık şekilde üst bölümde yer almalı.
- Fotoğraf önizlemeleri gerçek görsel yerine soyut blok.

Critical fixes:
- Hero açıklamasına net güven cümlesi eklenmeli.
- Fotoğraflar aşama/alan bazlı gruplandırılmalı.

UX improvements:
- Ödeme özeti ödeme planı gibi okunmalı, liste daha hiyerarşik olabilir.
- Talepler için “Yeni talep ilet” canlıda eklenecekse WhatsApp/form netleşmeli.

Copy improvements:
- Müşteri adı maskesi iyi; gizlilik hissi veriyor.

Visual improvements:
- Fotoğraf grid gerçek görsellerle güçlendirilmeli.

### Worker Upload Link

Strengths:
- Mobil-first.
- Alan seçimi hızlı.
- Fotoğraf ekleme büyük butonla net.
- Not opsiyonel.
- Müşteriye dönük açıklama yazdırmıyor.

Weaknesses:
- Gerçek upload olmadığı için canlıya geçmeden dosya seçimi deneyimi tamamlanmalı.
- Başarı sonrası bir sonraki aksiyon daha net olabilir: “Yeni fotoğraf ekle”.

Critical fixes:
- Worker ekranında müşteri bilgisi göstermeme kararı doğru; korunmalı.
- Saha personeli 10 saniye içinde fotoğraf gönderebilmeli.

UX improvements:
- Fotoğraf ekle butonu sayfanın ana aksiyonu olarak kalmalı.
- Alan seçimi tek dokunuşlu kalmalı.

Copy improvements:
- “Açıklamalar BLAAG ekibi tarafından hazırlanır” net ve doğru.

Visual improvements:
- Tap target boyutları iyi; mobilde korunmalı.

### Admin

Strengths:
- İç operasyon modülleri kapsamlı.
- Proje linkleri, müşteri takip bağlantısı ve usta fotoğraf yükleme bağlantısı mevcut.
- Fotoğraf onay kuyruğu kritik iş akışını doğru gösteriyor.
- İç not ve müşteri açıklaması ayrılmış durumda.

Weaknesses:
- Admin yoğun; gerçek kullanımda rol bazlı sadeleştirme gerekebilir.
- Finans, belge, talep, teslim ve fotoğraf onay süreçleri tek demo dosyada fazla büyüyor.

Critical fixes:
- Fotoğraf kuyruğunda Reddet aksiyonu eklendi; korunmalı.
- Yayına alma öncesi açıklama boşsa yayın engellenmeli.
- Copy butonları gerçek ortamda toast feedback vermeli.

UX improvements:
- Filtreler sticky yapılabilir.
- Fotoğraf kayıtları status bazlı gruplanabilir.
- Mobil admin için liste öncelikli görünüm gerekir.

Copy improvements:
- “Müşteri ham usta notunu görmez” ilkesi net anlatılıyor.

Visual improvements:
- Önizlemeler gerçek thumbnail olduğunda operasyon değeri artacak.

## 3. Role-based Audit

### Customer
- Güçlü: Hesap oluşturmadan takip modeli güven veriyor.
- Zayıf: Gerçek fotoğraf/vaka yoksa yüksek bütçeli karar için kanıt eksik kalır.
- Gereken: Net iletişim bilgisi, gerçek proje kanıtı, garanti/teslim güveni.

### Worker
- Güçlü: Sadece fotoğraf, alan ve opsiyonel not. Doğru.
- Zayıf: Gerçek file picker ve upload feedback eksik.
- Gereken: Çok hızlı mobil upload, düşük metin yükü, net başarı mesajı.

### Admin
- Güçlü: Operasyon kapsamı doğru.
- Zayıf: Modüller tek ekranda büyümeye açık.
- Gereken: Onay kuyruğu, açıklama şablonları, yayın kontrolü, link kopyalama.

### Marketing
- Güçlü: Hizmet şirketi konumu artık net.
- Zayıf: Sosyal kanıt yok.
- Gereken: Gerçek referans, proje görselleri, lokasyon, hizmet bölgesi.

### CEO
- Güçlü: Marka artık ucuz yüklenici değil, premium koordinasyon şirketi gibi duruyor.
- Zayıf: Kanıt eksikliği satış değerini sınırlar.
- Gereken: Fotoğraf, referans, kalite standardı, net iletişim.

### COO
- Güçlü: Worker -> admin -> customer yayın akışı operasyonel olarak doğru.
- Zayıf: Canlıda rol/izin ve veri bütünlüğü gerekecek.
- Gereken: Yayın öncesi kontrol, revize akışı, belge/ödeme kapanış sistemi.

## 4. Exact Replacement Copy

### Hero headline
Kusursuz yapı, şeffaf süreç.

### Hero subtitle
Tadilat, yapı ve gayrimenkul süreçlerini profesyonel ekibimizle yürütür; önemli aşamaları size özel takip alanında görünür hale getiririz.

### CTA labels
- Projemi Başlat
- Süreci İncele
- Projenizi Anlatın
- Uzmanla Görüş
- Bu hizmet için görüşelim

### Services
Anahtar Teslim Yapı Geliştirme:
Arsa veya yatırım fikrinizi dağınık kararlar içinde bırakmayız. Planlama, saha koordinasyonu, uygulama ve teslim sürecini tek profesyonel akışta yönetiriz.

Tadilat & Değer Artırma:
Mevcut yapınızı daha yaşanabilir, daha estetik ve daha değerli hale getirirken sürprizleri azaltan kontrollü bir yenileme planı kurarız.

Gayrimenkul Danışmanlığı:
Satış, kiralama, satın alma veya yatırım kararınızı doğru değerleme, doğru sunum ve kullanım amacına uygun stratejiyle güçlendiririz.

### Process steps
1. İlk Görüşme ve Talep: İhtiyacınızı ve hedefinizi paylaşırsınız.
2. Değerlendirme: Ekibimiz kapsamı, öncelikleri ve riskleri netleştirir.
3. Teklif ve Plan: Uygulama yolu anlaşılır şekilde hazırlanır.
4. Uygulama: BLAAG işi sahada profesyonelce yönetir.
5. Takip ve Sonuç: Onaylı gelişmeleri özel bağlantınızdan izlersiniz.

### Tracking section
Süreci sadece yaptırmazsınız, şeffaf şekilde takip edersiniz.

BLAAG ile yürütülen projelerde önemli aşamalar, fotoğraflar ve gelişmeler size özel takip bağlantısı üzerinden düzenli olarak sunulur. İşi biz yönetiriz, siz süreci şeffaf şekilde takip edersiniz.

### Intake success message
Talebiniz alındı. Ekibimiz bilgilerinizi inceleyerek sizinle iletişime geçecek. Onaylanan işler için size özel takip bağlantısı oluşturulur.

### Footer
BLAAG Construction and Architecture

Anahtar teslim yapı, tadilat ve gayrimenkul danışmanlığında profesyonel uygulama, şeffaf iletişim ve müşteriye özel süreç takibi sunan premium hizmet şirketi.

## 5. Interaction Recommendations

### Hover
- Header links: hafif arka plan veya renk koyulaşması.
- Primary CTA: 2px lift + opacity değil, daha kontrollü gölge.
- Image frames: hafif scale değil, ince border/gold line vurgusu.

### Scroll
- Sticky header doğru; blur abartılmamalı.
- Section reveal çok hafif olmalı, hero sonrası dikkat dağıtmamalı.

### Mobile
- Header CTA görünür kalmalı.
- Hero kartı CTA’dan çok aşağı düşmemeli.
- Worker upload ekranında Fotoğraf Ekle birincil aksiyon olarak kalmalı.
- Admin mobilde kart-liste yaklaşımı korunmalı.

### Forms
- Step form iyi; alan sayısı kontrollü.
- Bütçe yerine proje ölçeği/yatırım aralığı dili korunmalı.
- Başarı ekranı tek net mesaj vermeli.

### Private links
- Customer link: sadece onaylı içerik.
- Worker link: sadece fotoğraf yükleme.
- Admin: ham içerik ile müşteri açıklaması kesin ayrılmalı.

## 6. Priority Action Plan

### Fix today
- Public CTA dilini Projemi Başlat olarak tutarlı yap.
- Süreçte Ön Başvuru yerine İlk Görüşme ve Talep kullan.
- Homepage trust strip açıklamalarını kısa tut.
- Admin fotoğraf akışında Reddet aksiyonunu koru.
- “Demo”, “placeholder”, fake iletişim ve eski marka izlerini public yüzeyde sıfırla.

### Fix this week
- Gerçek proje görselleri ekle.
- Footer iletişim bilgilerini netleştir.
- Customer tracking sayfasına gerçek görsel gruplama mantığı ekle.
- Admin kopyala butonlarına toast feedback ekle.
- Intake dosya yükleme deneyimini gerçek file picker ile tamamla.

### Structural improvements
- Admin modüllerini ayrı bileşenlere böl.
- Canlı backend/rol modeli tasarla.
- Customer tracking ve worker upload linklerini token bazlı güvenli hale getir.
- Belge/ödeme/talep süreçleri için veri modeli çıkar.
- Proje vaka sayfaları ve referans sistemi oluştur.

## 7. Scores

- Product Score: 8/10
- Trust Score: 7/10
- Conversion Score: 7.5/10
- UX Clarity Score: 8/10
- Premium Brand Score: 7.5/10
- Operational Readiness Score: 8/10

Net değerlendirme:
Yön doğru. Site artık yazılım ürünü değil, premium yapı ve tadilat hizmeti gibi konumlanıyor. En büyük açık teknoloji değil, kanıt. Gerçek görseller, gerçek iletişim ve proje vaka örnekleri eklenmeden yüksek bütçeli müşteride tam güven oluşmaz.
