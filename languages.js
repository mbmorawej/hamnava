(()=>{
const translations={"Deine Bibliothek": ["کتابخانه شما", "Your library", "مكتبتك"], "Startseite": ["خانه", "Home", "الرئيسية"], "Suche & Songs": ["جستجو و آهنگ‌ها", "Search & songs", "البحث والأغاني"], "Favoriten": ["علاقه‌مندی‌ها", "Favorites", "المفضلة"], "Playlists": ["پلی‌لیست‌ها", "Playlists", "قوائم التشغيل"], "Song hinzufügen": ["افزودن آهنگ", "Add song", "إضافة أغنية"], "Musik, Freunde, Erinnerungen": ["موسیقی، دوستی، خاطره", "Music, friends, memories", "الموسيقى والأصدقاء والذكريات"], "HamNava": ["هم‌نوا", "HamNava", "هام نوا"], "Gute Songs, gute Freunde, gemeinsame Erinnerungen": ["آهنگ‌های خوب، دوستان خوب، خاطره‌های مشترک", "Great songs, great friends, shared memories", "أغانٍ جميلة وأصدقاء وذكريات مشتركة"], "Unsere Musik. Unsere Stimmung.": ["موسیقی ما، حال خوب ما.", "Our music. Our vibe.", "موسيقانا، مزاجنا."], "Entdecke Songs, teile sie mit Freunden und erstelle gemeinsame Playlists.": ["آهنگ‌های موردعلاقه‌ات را کشف کن، با دوستانت به اشتراک بگذار و پلی‌لیست‌های مشترک بساز.", "Discover songs, share with friends and create collaborative playlists.", "اكتشف الأغاني وشاركها مع الأصدقاء وأنشئ قوائم تشغيل مشتركة."], "Songs entdecken →": ["کاوش در آهنگ‌ها ←", "Explore songs →", "اكتشف الأغاني ←"], "Mit Supabase verbinden": ["اتصال به Supabase", "Connect to Supabase", "الاتصال بـ Supabase"], "Projekt-URL und öffentlichen Publishable/anon-Key eingeben. Niemals Secret oder service_role verwenden.": ["نشانی پروژه و کلید عمومی Publishable/anon را وارد کنید. از Secret یا service_role استفاده نکنید.", "Enter the project URL and public publishable/anon key. Never use secret or service_role.", "أدخل رابط المشروع والمفتاح العام فقط. لا تستخدم المفتاح السري."], "Verbinden": ["اتصال", "Connect", "اتصال"], "Anmelden oder registrieren": ["ورود یا ثبت‌نام", "Sign in or sign up", "تسجيل الدخول أو إنشاء حساب"], "E-Mail": ["ایمیل", "Email", "البريد الإلكتروني"], "Passwort": ["رمز عبور", "Password", "كلمة المرور"], "Anmelden": ["ورود", "Sign in", "دخول"], "Registrieren": ["ثبت‌نام", "Sign up", "إنشاء حساب"], "Verbindung ändern": ["تغییر اتصال", "Change connection", "تغيير الاتصال"], "Einen neuen Song?": ["آهنگ تازه‌ای داری؟", "Got a new song?", "هل لديك أغنية جديدة؟"], "Füge einen Song oder eine MP3 auf einer eigenen Seite hinzu.": ["در صفحه اختصاصی، آهنگ یا فایل MP3 را اضافه کن.", "Add a song or MP3 on a separate page.", "أضف أغنية أو ملف MP3 في صفحة منفصلة."], "＋ Neuen Song hinzufügen ↗": ["＋ افزودن آهنگ جدید ↗", "＋ Add a new song ↗", "＋ إضافة أغنية جديدة ↗"], "🎶 Musikbibliothek": ["🎶 کتابخانه", "🎶 Music library", "🎶 مكتبة الموسيقى"], "Suche": ["جستجو", "Search", "بحث"], "Interpret": ["خواننده", "Artist", "الفنان"], "Ansicht": ["نمایش", "View", "عرض"], "Alle Interpreten": ["همه خوانندگان", "All artists", "كل الفنانين"], "Alle Songs": ["همه آهنگ‌ها", "All songs", "كل الأغاني"], "Meine Favoriten": ["علاقه‌مندی‌های من", "My favorites", "مفضلتي"], "Aktualisieren": ["به‌روزرسانی", "Refresh", "تحديث"], "📀 Gemeinsame Playlists": ["📀 پلی‌لیست‌های مشترک", "📀 Shared playlists", "📀 قوائم التشغيل المشتركة"], "Playlist erstellen": ["ایجاد پلی‌لیست", "Create playlist", "إنشاء قائمة تشغيل"], "Playlist": ["پلی‌لیست", "Playlist", "قائمة التشغيل"], "Song zum Hinzufügen": ["آهنگ برای افزودن", "Song to add", "أغنية للإضافة"], "Zur Playlist hinzufügen": ["افزودن آهنگ به پلی‌لیست", "Add to playlist", "إضافة إلى قائمة التشغيل"], "Playlist löschen (Besitzer/Admin)": ["حذف پلی‌لیست (مالک/مدیر)", "Delete playlist (owner/admin)", "حذف القائمة (المالك/المشرف)"], "🛡 Verwaltung": ["🛡 مدیریت", "🛡 Administration", "🛡 الإدارة"], "Als Admin kannst du Songs und Playlists anderer Mitglieder löschen.": ["شما مدیر هستید و می‌توانید آهنگ‌ها و پلی‌لیست‌های دیگران را حذف کنید. دکمه‌های حذف در کارت‌ها نمایش داده می‌شوند.", "As admin, you can delete other members’ songs and playlists.", "بصفتك مشرفاً يمكنك حذف أغاني وقوائم تشغيل الأعضاء."], "Song oder Interpret": ["نام آهنگ یا خواننده", "Song or artist", "الأغنية أو الفنان"], "Name der neuen Playlist": ["نام پلی‌لیست جدید", "New playlist name", "اسم قائمة التشغيل الجديدة"], "Abmelden": ["خروج", "Sign out", "تسجيل الخروج"], "Löschen": ["حذف", "Delete", "حذف"], "Aus Playlist entfernen": ["حذف از لیست", "Remove from playlist", "إزالة من القائمة"], "Diese Playlist enthält noch keine Lieder": ["این پلی‌لیست هنوز آهنگی ندارد", "This playlist has no songs yet", "لا توجد أغانٍ في هذه القائمة"], "Erfolgreich angemeldet": ["ورود موفق", "Signed in successfully", "تم تسجيل الدخول"], "Neuen Song hinzufügen": ["افزودن آهنگ جدید", "Add new song", "إضافة أغنية جديدة"], "← Startseite": ["← صفحه اصلی", "← Home", "← الرئيسية"], "← Zur Bibliothek": ["بازگشت به کتابخانه ←", "← Back to library", "← العودة إلى المكتبة"], "Teile deinen Lieblingssong mit Freunden. Danach geht es zurück zur Bibliothek.": ["آهنگ موردعلاقه‌ات را با دوستانت به اشتراک بگذار. پس از ثبت به کتابخانه برمی‌گردی.", "Share your favorite song with friends. You will return to the library afterward.", "شارك أغنيتك المفضلة مع الأصدقاء ثم عد إلى المكتبة."], "Songtitel *": ["نام آهنگ *", "Song title *", "عنوان الأغنية *"], "Interpret *": ["نام خواننده *", "Artist *", "اسم الفنان *"], "Song-Link (HTTPS)": ["لینک آهنگ (HTTPS)", "Song link (HTTPS)", "رابط الأغنية (HTTPS)"], "Geteilt von": ["نام معرفی‌کننده", "Shared by", "شاركها"], "Albumcover-URL": ["لینک تصویر کاور", "Cover image URL", "رابط صورة الغلاف"], "Künstlerfoto-URL": ["لینک عکس خواننده", "Artist image URL", "رابط صورة الفنان"], "Oder MP3-Datei (bis 20 MB)": ["یا فایل MP3 (تا ۲۰ مگابایت)", "Or MP3 file (up to 20 MB)", "أو ملف MP3 (حتى 20 ميغابايت)"], "Ein Link oder eine MP3 ist erforderlich. Teile nur Musik, für die du die Rechte besitzt.": ["یک لینک یا فایل MP3 لازم است. فقط موسیقی‌ای را منتشر کن که مجوز اشتراک‌گذاری آن را داری.", "A link or MP3 is required. Only share music you have permission to distribute.", "يلزم رابط أو ملف MP3. شارك الموسيقى التي تملك حق نشرها فقط."], "＋ Song speichern": ["＋ ثبت آهنگ", "＋ Save song", "＋ حفظ الأغنية"], "Song gespeichert! Zurück zur Bibliothek …": ["آهنگ ثبت شد! در حال بازگشت...", "Song saved! Returning to library…", "تم حفظ الأغنية! جارٍ العودة…"], "Links müssen mit https beginnen": ["لینک‌ها باید با https شروع شوند", "Links must start with https", "يجب أن تبدأ الروابط بـ https"], "Link oder MP3-Datei erforderlich": ["لینک یا فایل MP3 لازم است", "Link or MP3 file required", "يلزم رابط أو ملف MP3"], "Nur MP3 bis 20 MB erlaubt": ["فقط فایل MP3 تا ۲۰ مگابایت پذیرفته می‌شود", "Only MP3 files up to 20 MB allowed", "ملفات MP3 حتى 20 ميغابايت فقط"], "Fehler: ": ["خطا: ", "Error: ", "خطأ: "], "Angemeldet als: ": ["وارد شده با: ", "Signed in as: ", "تم تسجيل الدخول باسم: "], "▶ Abspielen": ["▶ پخش", "▶ Play", "▶ تشغيل"], "♥ Favorit": ["♥ علاقه‌مندی", "♥ Favorite", "♥ المفضلة"], "♡ Favorit": ["♡ علاقه‌مندی", "♡ Favorite", "♡ المفضلة"], "↗ Link öffnen": ["↗ لینک", "↗ Open link", "↗ فتح الرابط"], "Playlist auswählen": ["یک پلی‌لیست انتخاب کنید", "Select playlist", "اختر قائمة تشغيل"], "Lied auswählen": ["یک آهنگ انتخاب کنید", "Select song", "اختر أغنية"], "Lieder und Playlists wurden aktualisiert": ["آهنگ‌ها و پلی‌لیست‌ها به‌روزرسانی شدند", "Songs and playlists updated", "تم تحديث الأغاني والقوائم"], "🎧 Musikplayer": ["🎧 پخش‌کننده موسیقی", "🎧 Music player", "🎧 مشغل الموسيقى"], "Version 4": ["نسخه ۴", "Version 4", "الإصدار 4"], "Hinzugefügt von:": ["معرفی:", "Shared by:", "أضافه:"], "Keine Lieder gefunden": ["آهنگی پیدا نشد", "No songs found", "لم يتم العثور على أغانٍ"], "Bitte Playlist und Lied auswählen": ["پلی‌لیست و آهنگ را انتخاب کنید", "Choose playlist and song", "اختر القائمة والأغنية"], "Nur Eigentümer oder Administrator dürfen Playlists löschen": ["فقط مالک یا مدیر می‌تواند پلی‌لیست را حذف کند", "Only owner or admin can delete playlists", "يمكن للمالك أو المدير فقط حذف القائمة"], "Playlist wirklich löschen?": ["پلی‌لیست حذف شود؟", "Delete playlist?", "هل تريد حذف القائمة؟"], "Lied wirklich löschen?": ["آهنگ حذف شود؟", "Delete song?", "هل تريد حذف الأغنية؟"], "Für dieses Lied ist kein Audiolink vorhanden": ["لینک صوتی برای این آهنگ وجود ندارد", "No audio link available", "لا يوجد رابط صوتي"], "Zum Abspielen auf Play klicken": ["برای شروع پخش روی دکمه Play بزنید", "Click Play to start", "اضغط تشغيل للبدء"], "Dieser Link wird auf der Originalseite geöffnet": ["این لینک پخش مستقیم نیست و در صفحه اصلی باز شد", "Link opened on original site", "تم فتح الرابط في الموقع الأصلي"], "Projekt-URL oder Schlüssel ungültig": ["نشانی یا کلید معتبر نیست", "Invalid URL or key", "الرابط أو المفتاح غير صالح"], "Registriert – bitte Bestätigungs-E-Mail prüfen": ["ثبت‌نام انجام شد؛ ایمیل تأیید را بررسی کنید", "Registered – check confirmation email", "تم التسجيل، تحقق من البريد"], "Cover: ": ["کاور ", "Cover: ", "الغلاف: "], "Hinzugefügt von: ": ["معرفی: ", "Shared by: ", "أضافه: "], "ungültig": ["نامعتبر", "ungültig", "ungültig"], "Lied gelöscht, aber die MP3-Datei konnte nicht entfernt werden: ": ["آهنگ حذف شد، اما فایل MP3 پاک نشد: ", "Lied gelöscht, aber die MP3-Datei konnte nicht entfernt werden: ", "Lied gelöscht, aber die MP3-Datei konnte nicht entfernt werden: "], "Um ein Lied hinzuzufügen, melde dich zuerst auf der ": ["برای افزودن آهنگ، ابتدا در ", "Um ein Lied hinzuzufügen, melde dich zuerst auf der ", "Um ein Lied hinzuzufügen, melde dich zuerst auf der "], "Bitte richte zuerst auf der ": ["ابتدا در ", "Bitte richte zuerst auf der ", "Bitte richte zuerst auf der "], " die Supabase-Verbindung ein.": [" اتصال Supabase را تنظیم کن.", " die Supabase-Verbindung ein.", " die Supabase-Verbindung ein."], " an.": [" وارد شو.", " an.", " an."], "Direkte Wiedergabe funktioniert nur mit hochgeladenen MP3-Dateien oder zulässigen direkten Audiolinks. YouTube- und Spotify-Links werden auf der jeweiligen Website geöffnet.": ["پخش مستقیم فقط برای فایل MP3 آپلودشده یا لینک صوتی مستقیمِ مجاز کار می‌کند. لینک‌های YouTube/Spotify در سایت خودشان باز می‌شوند.", "Direkte Wiedergabe funktioniert nur mit hochgeladenen MP3-Dateien oder zulässigen direkten Audiolinks. YouTube- und Spotify-Links werden auf der jeweiligen Website geöffnet.", "Direkte Wiedergabe funktioniert nur mit hochgeladenen MP3-Dateien oder zulässigen direkten Audiolinks. YouTube- und Spotify-Links werden auf der jeweiligen Website geöffnet."]};
const languages={de:'Deutsch',fa:'فارسی',en:'English',ar:'العربية'};
// Version 6.1 starts in German once, clearing an old Persian preference from prior releases.
if(localStorage.getItem('hamnava_i18n_v61')!=='1'){
 localStorage.setItem('hamnava_language','de');
 localStorage.setItem('hamnava_i18n_v61','1');
}
let lang=languages[localStorage.getItem('hamnava_language')]?localStorage.getItem('hamnava_language'):'de';
const savedText=new WeakMap(),savedAttributes=new WeakMap();
let applying=false;
const dictionary=new Map(Object.entries(translations));
const langIndex={fa:0,en:1,ar:2};
// Additional labels introduced in HamNava 6.0.
Object.entries({
 'Meine Playlists':['پلی‌لیست‌های من','My playlists','قوائم التشغيل الخاصة بي'],
 'Suche & Lieder':['جستجو و آهنگ‌ها','Search & songs','البحث والأغاني'],
 'Lied hinzufügen':['افزودن آهنگ','Add song','إضافة أغنية'],
 'Sprache':['زبان','Language','اللغة'],
 'Lied auswählen':['یک آهنگ انتخاب کنید','Select song','اختر أغنية'],
 'Lied hinzufügen':['افزودن آهنگ','Add song','إضافة أغنية'],
 'KI-DJ':['دی‌جی هوشمند','AI DJ','دي جي ذكي'],
 'Meine Musik':['موسیقی من','My music','موسيقاي'],
 'Zu meiner Playlist':['به پلی‌لیست من','To my playlist','إلى قائمتي'],
 'Erstelle zuerst unter Meine Playlists eine Playlist.':['ابتدا یک پلی‌لیست بسازید.','Create a playlist first.','أنشئ قائمة تشغيل أولاً.'],
 'Playlist auswählen (Nummer eingeben):':['پلی‌لیست را انتخاب کنید (شماره):','Choose playlist (number):','اختر القائمة (رقم):'],
 'Ungültige Playlist-Auswahl':['انتخاب پلی‌لیست نامعتبر','Invalid playlist selection','اختيار قائمة غير صالح'],
 'Lied zu deiner Playlist hinzugefügt':['آهنگ به پلی‌لیست اضافه شد','Song added to your playlist','تمت إضافة الأغنية'],
 'Bitte zuerst anmelden':['ابتدا وارد شوید','Please sign in first','يرجى تسجيل الدخول أولاً'],
 'Keine passenden Lieder gefunden. Wähle „Alle Sprachen“ und „Alle Stimmungen“ oder ergänze später Metadaten.':['آهنگ مناسبی پیدا نشد.','No matching songs found. Choose all languages and moods.','لم يتم العثور على أغانٍ مطابقة.'],
 'Playlist erstellt, aber Lieder konnten nicht hinzugefügt werden: ':['پلی‌لیست ساخته شد اما آهنگ‌ها اضافه نشدند: ','Playlist created but songs could not be added: ','تم إنشاء القائمة لكن لم تتم إضافة الأغاني: '],
 'Playlist mit ':['پلی‌لیست با ','Playlist with ','قائمة مع '],
 ' Liedern erstellt.':[' آهنگ ساخته شد.',' songs created.',' أغنيات تم إنشاؤها.'],
 'Lieder und Playlists wurden aktualisiert':['آهنگ‌ها و پلی‌لیست‌ها به‌روزرسانی شدند','Songs and playlists updated','تم تحديث الأغاني والقوائم'],
 'Musikplayer':['پخش‌کننده موسیقی','Music player','مشغل الموسيقى'],
 'Version 6':['نسخه ۶','Version 6','الإصدار ٦']
}).forEach(([k,v])=>dictionary.set(k,v));
// Reverse mapping lets us recover original German from stale Persian/Arabic DOM content.
const reverse=new Map();
for(const [de,variants] of dictionary)for(const translated of variants){
 if(translated && !reverse.has(translated))reverse.set(translated,de);
}
function translate(value){
 const base=reverse.get(value) || value;
 if(lang==='de')return base;
 const entry=dictionary.get(base);
 if(entry)return entry[langIndex[lang]] || base;
 for(const prefix of ['Hinzugefügt von: ','Fehler: ','Angemeldet als: ']){
  if(base.startsWith(prefix)){
   const translatedPrefix=dictionary.get(prefix.trimEnd());
   if(translatedPrefix)return translatedPrefix[langIndex[lang]]+' '+base.slice(prefix.length);
  }
 }
 return base;
}
function apply(){
 if(applying)return;
 applying=true;
 try{
  document.documentElement.lang=lang;
  document.documentElement.dir=['fa','ar'].includes(lang)?'rtl':'ltr';
  document.body.classList.toggle('ltr',!['fa','ar'].includes(lang));
  document.querySelectorAll('.sidebar').forEach(el=>el.dir=['fa','ar'].includes(lang)?'rtl':'ltr');
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  let node;
  while((node=walker.nextNode())){
   if(node.parentElement?.closest('script,style,textarea,#languageControl'))continue;
   const current=node.nodeValue;
   let saved=savedText.get(node);
   if(!saved || current!==saved.last){
    const trimmed=current.trim();
    saved={base:reverse.get(trimmed)||trimmed,leading:current.match(/^\s*/)[0],trailing:current.match(/\s*$/)[0],last:current};
   }
   const output=saved.leading+translate(saved.base)+saved.trailing;
   if(current!==output)node.nodeValue=output;
   saved.last=output;
   savedText.set(node,saved);
  }
  for(const element of document.querySelectorAll('[placeholder],[title],[aria-label]')){
   let entries=savedAttributes.get(element)||{};
   for(const attr of ['placeholder','title','aria-label']){
    if(!element.hasAttribute(attr))continue;
    const current=element.getAttribute(attr);
    let state=entries[attr];
    if(!state || current!==state.last)state={base:reverse.get(current)||current,last:current};
    const output=translate(state.base);
    if(current!==output)element.setAttribute(attr,output);
    state.last=output;entries[attr]=state;
   }
   savedAttributes.set(element,entries);
  }
  // Browser native <option> labels can be updated through the text walker above.
  const sel=document.getElementById('languageSelect');if(sel)sel.value=lang;
 }finally{applying=false}
}
function init(){
 if(document.getElementById('languageControl'))return;
 const box=document.createElement('div');box.id='languageControl';
 box.innerHTML='<label for="languageSelect">🌐 Sprache</label><select id="languageSelect" aria-label="Sprache wählen"><option value="de">🇩🇪 Deutsch</option><option value="fa">🇮🇷 فارسی</option><option value="en">🇬🇧 English</option><option value="ar">🇸🇦 العربية</option></select>';
 document.body.append(box);
 box.querySelector('select').addEventListener('change',e=>{
  lang=e.target.value;localStorage.setItem('hamnava_language',lang);apply();
 });
 apply();
 const observer=new MutationObserver(()=>{if(!applying)apply()});
 observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['placeholder','title','aria-label']});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
