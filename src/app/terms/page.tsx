'use client';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { SectionHeader } from '@/components/shared/SectionHeader';

export default function TermsPage() {
  return (
    <div className="pt-20 pb-12">
      <ResponsiveContainer className="max-w-3xl">
        <SectionHeader titleTh="📜 เงื่อนไขการใช้งาน" titleEn="📜 Terms of Service" />
        <div className="prose prose-invert max-w-none bg-card rounded-2xl p-8 border border-border/50 text-white/80">
          <h3>1. การยอมรับเงื่อนไข</h3>
          <p>เมื่อท่านเข้าใช้บริการ Pryde TV ถือว่าท่านตกลงและยอมรับเงื่อนไขการใช้งานเหล่านี้ทั้งหมด หากท่านไม่เห็นด้วยกับเงื่อนไขใด ๆ กรุณางดใช้บริการของเรา</p>
          
          <h3>2. บริการของเรา</h3>
          <p>Pryde TV ให้บริการแพลตฟอร์มสำหรับรับชมการถ่ายทอดสดและวิดีโอเทปการแข่งขันมวยไทยและกีฬาต่อสู้อื่น ๆ ทั้งแบบรับชมฟรีและแบบมีค่าใช้จ่าย (Pay-Per-View)</p>
          
          <h3>3. บัญชีผู้ใช้</h3>
          <p>ท่านต้องสมัครสมาชิกเพื่อเข้าถึงบางส่วนของบริการ ท่านตกลงที่จะให้ข้อมูลที่ถูกต้องและเป็นปัจจุบัน และรับผิดชอบในการรักษาความปลอดภัยของบัญชีและรหัสผ่านของท่าน</p>
          
          <h3>4. เหรียญและการชำระเงิน</h3>
          <p>ระบบเหรียญ (Coins) ใช้สำหรับซื้อสิทธิ์รับชมเนื้อหาแบบมีค่าใช้จ่ายและบริการอื่น ๆ เหรียญที่ซื้อแล้วไม่สามารถขอคืนเป็นเงินสดได้ในทุกกรณี ยกเว้นตามที่กฎหมายกำหนด</p>
          
          <h3>5. ลิขสิทธิ์</h3>
          <p>เนื้อหาทั้งหมดบน Pryde TV ถือเป็นลิขสิทธิ์ของ Pryde TV หรือพันธมิตร ห้ามมิให้ทำซ้ำ ดัดแปลง หรือเผยแพร่โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร</p>
        </div>
      </ResponsiveContainer>
    </div>
  );
}
