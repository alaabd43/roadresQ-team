# تشغيل RoadGuard أونلاين (Supabase + GitHub)

## الملفات الجديدة
```
supabase/schema.sql            جداول قاعدة البيانات + الحماية + التخزين (بتنلصق مرة وحدة)
js/config.js                   رابط القاعدة ومفتاحها العام (بينرفع على GitHub عادي)
roadresq_backend/app.py        سيرفر الذكاء الاصطناعي، بيحفظ النتائج بالقاعدة الأونلاين
roadresq_backend/.env.example  نموذج للمفتاح السري (انسخيه لـ .env)
.gitignore                     بيمنع رفع المفتاح السري على GitHub
```

## 1. قاعدة البيانات (مرة وحدة)
1. supabase.com ← New project ← اسمه roadresq.
2. SQL Editor ← New query ← الصقي كل محتوى `supabase/schema.sql` ← Run.
3. Authentication ← Sign In / Providers ← فعّلي **Allow anonymous sign-ins** (عشان المواطنين يبلّغوا).

## 2. حسابات الموظفين
1. Authentication ← Users ← Add user ← Create new user: إيميل + كلمة سر ← فعّلي Auto Confirm.
2. SQL Editor، وغيّري الإيميل:
```sql
insert into staff (id, full_name, role)
select id, 'اسم الموظف', 'operator' from auth.users where email = 'employee@example.com';
```
كلمات السر بتنحفظ مشفّرة عند Supabase، وما حدا بيشوفها.

## 3. ربط الموقع
Project Settings ← API (Data API): انسخي
- **Project URL** و **anon public key** ← جوّا `js/config.js`.
- **service_role key** ← بملف `roadresq_backend/.env` بس (انسخي `.env.example` وسمّيه `.env`).

⚠️ مفتاح service_role سري: لا تحطيه بالموقع ولا ترفعيه على GitHub.

## 4. الموقع على GitHub
ارفعي المجلد كامل (ملف .gitignore بيمنع رفع .env).
Settings ← Pages ← Deploy from a branch ← main ← Save. بيطلع رابط للموقع لكل الفريق.

## 5. سيرفر الذكاء الاصطناعي (على اللابتوب)
```
cd roadresq_backend
pip install -r requirements.txt
set ROADRESQ_NO_VLM=1
python app.py
```
لازم يكون شغّال بس وقت "تحليل تسجيل". النتائج بتنحفظ بالقاعدة، والكل بيشوفها من الموقع حتى لو اللابتوب مسكّر.

## شو صار حقيقي
- دخول الموظفين بإيميل وكلمة سر.
- غرفة العمليات: آخر حادث مفتوح، الكاميرات، إرسال الفرق، إنذار غلط، وبتتحدّث لحالها لما يجي حادث.
- سجل الحوادث: حوادث الموديل + بلاغات المواطنين، مع الفيديو والصورة والكروكا، وتأكيد أو رفض الموظف.
- بلاغ المواطن: نوع الحادث، صورة، الموقع من التلفون، وبيتابع حالة بلاغه.

## لسا تجريبي
- رمز SMS للمواطن (بده خدمة مدفوعة).
- الخريطة وأسرع طريق (موقع الحادث عليها ثابت).
- البث المباشر من كاميرات حقيقية.
