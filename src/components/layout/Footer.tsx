'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { ROUTES } from '@/lib/constants';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';

export function Footer() {
  const { t } = useLanguage();

  const footerLinks = [
    { labelTh: 'เกี่ยวกับเรา', labelEn: 'About Us', href: '#' },
    { labelTh: 'ติดต่อเรา', labelEn: 'Contact', href: ROUTES.CONTACT },
    { labelTh: 'เงื่อนไขการใช้งาน', labelEn: 'Terms of Service', href: ROUTES.TERMS },
    { labelTh: 'นโยบายความเป็นส่วนตัว', labelEn: 'Privacy Policy', href: ROUTES.POLICY },
  ];

  return (
    <footer className="bg-pryde-dark border-t border-border/50 mt-16">
      <ResponsiveContainer className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-gradient-gold text-2xl font-bold mb-4">PRYDE TV</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(
                'แพลตฟอร์มถ่ายทอดสดมวยไทยระดับพรีเมียม ดูมวยไทย มวยสากล และกีฬาต่อสู้ได้ทุกที่ทุกเวลา',
                'Premium Muay Thai live streaming platform. Watch Muay Thai, Boxing, and combat sports anytime, anywhere.'
              )}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('ลิงก์', 'Links')}</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-gold transition-colors">
                    {t(link.labelTh, link.labelEn)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('ติดต่อ', 'Contact')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: support@prydetv.com</li>
              <li>LINE: @prydetv</li>
              <li className="flex items-center gap-2 pt-2">
                <span className="text-lg">📱</span>
                <span>{t('ดาวน์โหลดแอป', 'Download App')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Pryde TV. All rights reserved.
          </p>
        </div>
      </ResponsiveContainer>
    </footer>
  );
}
