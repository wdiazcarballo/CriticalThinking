# คู่มือการติดตั้งและเริ่มต้นใช้งาน Gibbs' Reflective Cycle Dashboard

การติดตั้งและเริ่มต้นใช้งาน Dashboard นี้บน localhost ทั้ง Windows และ Mac มีขั้นตอนเหมือนกัน เพียงแต่ต่างกันที่คำสั่งในการใช้ Terminal 

## ขั้นตอนการติดตั้งและเริ่มต้นใช้งาน

### 1. ติดตั้ง Node.js และ npm

**สำหรับ Windows:**
1. เข้าไปที่เว็บไซต์ https://nodejs.org/
2. ดาวน์โหลด LTS version (แนะนำให้ใช้เวอร์ชันล่าสุด)
3. ติดตั้งโดยการดับเบิลคลิกที่ไฟล์ดาวน์โหลดและทำตามขั้นตอนการติดตั้ง
4. ตรวจสอบการติดตั้งโดยเปิด Command Prompt (cmd) แล้วพิมพ์:
   ```
   node -v
   npm -v
   ```

**สำหรับ Mac:**
1. เปิด Terminal
2. ติดตั้ง Homebrew (ถ้ายังไม่มี) โดยพิมพ์:
   ```
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. ติดตั้ง Node.js และ npm ด้วย Homebrew:
   ```
   brew install node
   ```
4. ตรวจสอบการติดตั้ง:
   ```
   node -v
   npm -v
   ```

### 2. สร้างโปรเจค React ใหม่

1. เปิด Terminal หรือ Command Prompt
2. สร้างโปรเจค React ใหม่ด้วยคำสั่ง:

```bash
npm create vite@latest gibbs-dashboard -- --template react
```
```bash
cd gibbs-dashboard
```
```bash
npm install
```
```bash
npm run dev
```

### 3. ติดตั้ง Dependencies ที่จำเป็น

โปรเจคนี้ต้องใช้ไลบรารีเพิ่มเติม ได้แก่ Recharts สำหรับการสร้างกราฟและ Tailwind CSS สำหรับการจัดรูปแบบ:

```bash
npm install recharts tailwindcss postcss autoprefixer
```

### 4. ตั้งค่า Tailwind CSS

1. สร้างไฟล์ config ของ Tailwind:

```bash
npx tailwindcss init -p
```

2. แก้ไขไฟล์ `tailwind.config.js` เพื่อกำหนดเส้นทางที่ต้องการให้ Tailwind ทำงาน:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3. เพิ่ม Tailwind directives ในไฟล์ `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. สร้างไฟล์คอมโพเนนต์ Dashboard

1. ในโฟลเดอร์ `src` สร้างไฟล์ใหม่ชื่อ `GibbsReflectiveCycleDashboard.jsx`
2. คัดลอกโค้ดทั้งหมดที่ได้รับมาลงในไฟล์นี้

### 6. แก้ไขไฟล์ App.js เพื่อใช้งานคอมโพเนนต์

เปิดไฟล์ `src/App.js` และแก้ไขเป็น:

```javascript
import React from 'react';
import GibbsReflectiveCycleDashboard from './GibbsReflectiveCycleDashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <GibbsReflectiveCycleDashboard />
    </div>
  );
}

export default App;
```

### 7. รันโปรเจค

รันโปรเจคด้วยคำสั่ง:

```bash
npm start
```

เว็บเบราว์เซอร์จะเปิดขึ้นโดยอัตโนมัติที่ URL: `http://localhost:3000`

## การแก้ไขปัญหาที่อาจเกิดขึ้น

### ปัญหา: ไม่พบไลบรารี Recharts

หากไม่สามารถใช้ Recharts ได้ให้ลองติดตั้งใหม่โดยระบุเวอร์ชันตรงๆ:

```bash
npm install recharts@2.5.0
```

### ปัญหา: ไม่สามารถโหลด Tailwind ได้

ถ้าเกิดปัญหากับ Tailwind CSS ให้ลองติดตั้งใหม่และรันคำสั่งเพื่อสร้างไฟล์ CSS:

```bash
npm uninstall tailwindcss postcss autoprefixer
npm install tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p
```

### ปัญหา: เว็บเพจแสดงไม่ถูกต้อง

หากเว็บเพจแสดงผลไม่ถูกต้อง ตรวจสอบ Tailwind directives ในไฟล์ CSS แล้ว และตรวจสอบการตั้งค่าไฟล์ `tailwind.config.js` อีกครั้งว่ากำหนดถูกต้อง

## วิธีใช้งาน Dashboard

ให้นักศึกษาใช้ Dashboard ดังนี้:

1. เลือกสไตล์การคิดของตนเอง (Thinking Style) จากที่เคยทำแบบทดสอบในห้อง
2. เลือกประเภท Enneagram ของตนเอง หากยังไม่รู้ว่าตนเองเป็น Enneagram ประเภทใดให้ค้นหาแบบทดสอบในอินเตอร์เน็ตเพื่อระบุ Enneagram หลักที่สะท้อนตัวเองมากที่สุด
3. เลือกดูขั้นตอนในวงจรสะท้อนคิดของ Gibbs ทีละขั้นเพื่อดูว่าตัวเองน่าจะทำขั้นตอนไหนได้ดีและขั้นตอนไหนไม่ดีนัก
4. Dashboard จะแสดงกราฟเรดาร์แบบสไปเดอร์แสดงจุดแข็งและจุดอ่อนของนักศึกษา
5. อ่านคำแนะนำเฉพาะบุคคลตามบุคลิกที่เลือก

ให้นักศึกษาใช้งาน Gibbs' Reflective Cycle Dashboard บน localhost ศึกษาตนเองก่อน แล้วจึงทำแบบทดสอบ Task 6 การฝึกสะท้อนความคิด (reflection practice)
