# Task Manager — Full-Featured React App

Mock autentifikasiya (login/logout), qorunan marşrutlar (protected routes), qlobal state idarəetməsi (Context API + useReducer) və forma validasiyası ilə qurulmuş tam funksional React tapşırıq meneceri.

## 🔗 Linklər

- **Canlı demo:** [w4-react-app.vercel.app](https://w4-react-app.vercel.app)
- **GitHub repo:** [github.com/alys27/w4-react-app](https://github.com/alys27/w4-react-app)

> ⚠️ **Qeyd:** Canlı demoda login, routing və UI tam işləkdir. Task-ların əlavə/redaktə/silinməsi (CRUD) yalnız **local** mühitdə işləyir, çünki mock API (`json-server`) production üçün nəzərdə tutulmayıb və Vercel-də deploy olunmayıb. CRUD-u test etmək üçün aşağıdakı "Quraşdırma" bölməsinə baxın.

## 🛠 İstifadə olunan texnologiyalar

- React 18 (Vite)
- React Router DOM — marşrutlaşdırma və qorunan səhifələr
- Context API + useReducer — həm task, həm də auth state-inin mərkəzləşdirilmiş idarəetməsi
- json-server — mock REST API
- Vanilla CSS — özəl dizayn

## 📁 Layihə strukturu

```
src/
├── features/
│ ├── auth/
│ │ ├── AuthContext.jsx # autentifikasiya state-i (useReducer: LOGIN/LOGOUT, token expiration)
│ │ └── Login.jsx # login forması
│ └── tasks/
│ ├── TaskContext.jsx # task-ların reducer məntiqi və optimistic UI orkestrasiyası
│ ├── taskApi.js # mock API ilə bütün fetch sorğuları (CRUD)
│ ├── TaskForm.jsx # yeni task əlavə etmə forması
│ └── Dashboard.jsx # qorunan əsas səhifə
├── components/
│ ├── ProtectedRoute.jsx # qorunan marşrut wrapper-i
│ └── ErrorBoundary.jsx # React error boundary
├── App.jsx
└── main.jsx
```

## ⚙️ Quraşdırma və işə salma

```
# 1. Repo-nu klonla
git clone https://github.com/alys27/w4-react-app.git
cd w4-react-app

# 2. Asılılıqları quraşdır
npm install

# 3. Mock API-ni işə sal (ayrı terminalda)
npm run server

# 4. React dev server-i işə sal (başqa terminalda)
npm run dev
```

Tətbiq `http://localhost:5173` ünvanında açılacaq, mock API isə `http://localhost:3001` üzərində işləyəcək.

## ✅ Əsas funksionallıq və development qeydləri

Layihə checkpoint-lər üzrə addım-addım, ardıcıl commit-lərlə qurulub: əvvəlcə React Router ilə qorunan marşrutlar quruldu — login olmadan `/dashboard`-a giriş cəhdi avtomatik `/login`-ə yönləndirilir. Ardından autentifikasiya axını əlavə olundu: login/logout, token `localStorage`-da saxlanılır ki, səhifə yenilənəndə istifadəçi sessiyadan çıxarılmasın, logout-dan sonra isə "Geri" düyməsi ilə qorunan səhifəyə qayıtmaq mümkün deyil. AuthContext daxilində mock token expiration (2 dəqiqə) taymeri quruldu — vaxt bitdikdə istifadəçi avtomatik logout edilir və `/login`-ə yönləndirilir; guest guard isə giriş etmiş istifadəçinin `/login`-ə təkrar keçməsinin qarşısını alır.

Növbəti mərhələdə `useReducer` ilə qlobal state idarəetməsi quruldu, üzərinə forma validasiyası (boş və ya çox qısa başlıqların qəbul edilməməsi) əlavə olundu. CRUD əməliyyatları (əlavə/yenilə/sil) **optimistic UI** məntiqi ilə `json-server` mock API-yə bağlandı — hər əməliyyat serverə sorğu tamamlanmadan UI-da dərhal əks olunur, sorğu uğursuz olduqda isə avtomatik geri qaytarılır (rollback). Mentor rəyinə əsasən, API sorğuları (`fetch`) `TaskContext`-dən ayrılaraq ayrıca `taskApi.js` faylına