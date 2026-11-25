# RoadResQ - الباك إند والذكاء الاصطناعي

## 1. شو بيعمل النظام

بتعطيه فيديو من كاميرا شارع، وبيرجعلك: في حادث؟ وين؟ متى؟ شو نوعه؟ قديش خطير؟ وشو الوحدات المقترحة؟

```
فيديو
  → YOLO26 + ByteTrack      (العين: كل سيارة بكل فريم)
  → القاعدة الفيزيائية       (لحظات مشبوهة: تلامس + تغيير فجائي، أو سيارة وقفت فجأة)
  → Qwen3-VL-8B              (العقل: بيشوف صور مكبّرة ويقرر، وبيذكر الدليل)
  → الخطورة + الوحدات + بيانات الكروكا
```

**مستويين للتنبيه:**

| level | المعنى | شو بيعمل الموقع |
|---|---|---|
| `confirmed` | Qwen شاف دليل (ضرر، قطع، انقلاب، دخان...) | تنبيه فوري + الوحدات المقترحة |
| `review` | القاعدة شكّت بس ما في دليل واضح | بيطلع للموظف مقطع قصير يأكّد أو يرفض |

---

## 2. الملفات

```
roadresq_backend/
  ai/
    roadresq_system.py   ← النظام كامل: analyze_video(video)   ← هاد اللي بتستعمليه
    roadresq_ai.py       ← يولو + التتبّع + القاعدة (لا تعدّلي)
    preprocess.py        ← تنظيف التتبّع (لا تعدّلي)
    tracker.yaml         ← إعدادات التتبّع
    yolo26s.pt           ← أوزان يولو
  app_example.py         ← مثال Flask جاهز (API)
  schema.sql             ← جداول قاعدة البيانات
  sample_result.json     ← مثال على شكل النتيجة (للفرونت)
  requirements.txt
```

---

## 3. التشغيل خطوة خطوة

**الخطوة 1:** نزّلي المكتبات
```
pip install -r requirements.txt
```

**الخطوة 2:** شغّلي السيرفر

إذا **ما في كرت شاشة NVIDIA** (لابتوب عادي) ← وضع الديمو:
```
set ROADRESQ_NO_VLM=1
python app_example.py
```
(على Mac/Linux: `ROADRESQ_NO_VLM=1 python app_example.py`)

إذا في كرت **NVIDIA بذاكرة 17 جيجا أو أكثر**:
```
python app_example.py
```

**الخطوة 3:** جرّبي
```
curl -F video=@test.mp4 -F camera_id=CAM-01 http://localhost:5000/api/analyze
```
بيرجع `{"job_id": 1, "status": "processing"}`. التحليل بياخد دقيقة لكم دقيقة. بعدها:
```
http://localhost:5000/api/incidents
```

> وضع الديمو: بيشتغل كلشي (يولو + القاعدة + الكروكا)، بس بدون Qwen، فكل الحوادث بتطلع `review`.

---

## 4. الـ API

| الطلب | شو بيعمل |
|---|---|
| `POST /api/analyze` | form-data: `video` + `camera_id` ← بيرجع `job_id` |
| `GET /api/jobs/<id>` | حالة التحليل: `processing` / `done` / `error` |
| `GET /api/incidents` | كل الحوادث (الأحدث أول). فلتر: `?status=confirmed` أو `?status=review` |
| `GET /api/incidents/<id>` | حادث واحد مع بيانات الكروكا |
| `POST /api/incidents/<id>/verdict` | قرار الموظف: `{"verdict": "accident"}` أو `{"verdict": "not_accident"}` مع `staff_id` |
| `GET /media/...` | صورة الحادث والفيديو |

**الفرونت لازم يسأل `GET /api/jobs/<id>` كل 3–5 ثواني لحد ما يصير `done`.**

---

## 5. شكل الحادث (من `/api/incidents`)

```json
{
  "id": 1,
  "level": "confirmed",
  "time_s": 2.55,
  "crash_type": "rear-end",
  "severity": "high",
  "ambulance": 2, "civil_defense": 1, "police": 1,
  "fire": 1, "overturned": 0, "pedestrian_hit": 0,
  "vehicles": 2,
  "evidence": ["debris", "smoke_or_fire"],
  "reason": "car hits truck",
  "x_px": 469.7, "y_px": 166.4,
  "crash_image_url": "/media/jobs/1/....jpg",
  "video_url": "/media/jobs/1/..._result.mp4",
  "clip_start_s": 1.05, "clip_end_s": 4.05,
  "kroki": {"impact_px": [469.7, 166.4], "picture_size": [800, 600],
            "vehicles": [{"vehicle": 1, "path_px": [[372, 279], [391, 248]]}]},
  "operator_verdict": null,
  "status": "open"
}
```

- `x_px / y_px`: مكان الحادث بالصورة (800×600).
- `kroki.vehicles[].path_px`: مسار كل سيارة من ثانيتين قبل الحادث لثانيتين بعده. ارسميه كخطوط وأسهم.
- `path_m`: إحداثيات بالمتر، **بتزبط بس لكاميرا كارلا**. للكاميرات الحقيقية استعملي `path_px`.
- `clip_start_s / clip_end_s`: المقطع اللي بيشوفه الموظف بحادث `review`.

---

## 6. قاعدة البيانات (`schema.sql`)

| الجدول | شو فيه |
|---|---|
| `jobs` | كل فيديو انبعث للتحليل |
| `incidents` | كل حادث (فيه `operator_verdict` = قرار الموظف) |
| `cameras` | الكاميرات ومكانها على الخريطة |
| `staff` | الموظفين وتسجيل الدخول (**شغلك**؛ لا تخزني كلمة السر كنص، استعملي `password_hash`) |
| `citizen_reports` | بلاغات المواطنين (**شغلك**) |

**قرار الموظف مهم:** كل "تأكيد/رفض" بيتخزن، ومنه بنقدر بعدين نحسّن النظام (Human-in-the-loop).

---

## 7. الخطورة والوحدات (قواعد، بتنعدل بسهولة)

الدالة `suggest_response` بملف `roadresq_system.py`:

| الحالة | الخطورة | الوحدات |
|---|---|---|
| دخان/حريق أو انقلاب | high | 2 إسعاف + دفاع مدني + شرطة |
| مشاة انضربوا أو 3 سيارات فأكثر | high | 2 إسعاف + شرطة |
| ضرر أو سيارة انزاحت/لفّت أو طلعت عن الشارع | medium | إسعاف + شرطة |
| `review` | unknown | شرطة، لحد ما الموظف يأكّد |

---

## 8. تغيير "العقل" لموديل أكبر (لاحقاً)

بسطر واحد بأول `roadresq_system.py`:
```python
VLM_MODEL = "Qwen/Qwen3-VL-32B-Instruct"
```
أو بدون تعديل الكود:
```
set ROADRESQ_VLM=Qwen/Qwen3-VL-32B-Instruct
```
**شكل النتيجة والـ API وقاعدة البيانات بيضلوا نفسهم.** الـ 32B بده كرت أقوى (زي A100 بذاكرة 80 جيجا).

---

## 9. ملاحظات

- كل الموديلات **مفتوحة وبتشتغل محلياً**. ولا صورة بتطلع برا السيرفر.
- فيديو واحد كل مرة (`ai_lock`)، لأنه الموديل كبير.
- على CPU بس: يولو أبطأ (دقيقة أو أكثر لفيديو 30 ثانية).
