# Pryde TV Web

แพลตฟอร์มถ่ายทอดสดมวยไทยระดับพรีเมียม (Frontend Web Application) สร้างด้วย Next.js App Router, TypeScript, และ Tailwind CSS

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui
- **State Management**: Zustand (Global state, Auth, Locale), TanStack Query (Server state)
- **Forms**: React Hook Form, Zod
- **API Client**: Axios
- **Video Player**: hls.js

## Getting Started

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. ตั้งค่า Environment Variables
สร้างไฟล์ `.env.local` ในโฟลเดอร์ root และคัดลอกเนื้อหาจากด้านล่าง:
```env
# เลือกระบบ API (mock | real)
NEXT_PUBLIC_API_MODE=mock

# Base URL สำหรับ API จริง (เมื่อเปิดใช้ real mode)
NEXT_PUBLIC_API_BASE_URL=https://api.prydetv.com
```

### 3. รันโปรเจกต์ (Development Mode)
```bash
npm run dev
```
เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

## วิธีเปลี่ยนจาก Mock API เป็น Real API
โปรเจกต์นี้ใช้สถาปัตยกรรม Adapter Pattern ซึ่งแยก Service Logic ของ Mock Data ออกจาก Components หน้าเว็บ

1. เปิดไฟล์ `.env.local`
2. เปลี่ยนค่า `NEXT_PUBLIC_API_MODE=real`
3. ไปที่โฟลเดอร์ `src/services/adapters/` จะเห็นไฟล์เช่น `authService.ts`, `contentService.ts` เป็นต้น
4. ภายในไฟล์ Adapter ให้เพิ่ม/แก้ไข logic การ import `realService` ให้ไปเรียก API จริงผ่าน `apiClient.ts`

ตัวอย่างใน `src/services/adapters/contentService.ts`:
```typescript
import { isMockMode } from '../config';
import { mockContentService } from '../mock/mockContentService';
// TODO: สร้าง realContentService.ts และ import เข้ามาที่นี่
// import { realContentService } from '../real/realContentService';

export function getContentService() {
  if (isMockMode()) {
    return mockContentService; // เรียก Mock Data
  }
  
  // เมื่อเป็นโหมด real ให้คืนค่า realContentService
  // return realContentService;
  
  // (ชั่วคราว) คืนค่า mock หากยังไม่ได้ทำ real service
  return mockContentService; 
}
```

## สคริปต์อื่นๆ ที่ควรรู้
- `npm run build`: บิลด์โปรเจกต์สำหรับ Production
- `npm run start`: รัน Production Server (ต้อง run build ก่อน)
- `npm run lint`: ตรวจสอบความถูกต้องของโค้ดด้วย ESLint
