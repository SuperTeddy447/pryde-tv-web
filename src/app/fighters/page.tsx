'use client';

import { useQuery } from '@tanstack/react-query';
import { FighterCardDetailed } from '@/components/cards/FighterCardDetailed';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { LoadingCardGrid } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import { contentService } from '@/services';
import { ROUTES } from '@/lib/constants';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function FightersPage() {
  const [filterType, setFilterType] = useState('champion'); // 'champion' | 'all'
  
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['fighters'], 
    queryFn: () => contentService.getFighters(),
  });

  return (
    <div className="pt-24 pb-12 bg-[#F8F9FA] min-h-screen font-kanit">
      <ResponsiveContainer>
        {/* Header and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <h1 className="text-xl md:text-2xl font-bold text-black whitespace-nowrap">
                ประวัตินักกีฬามวยไทย
              </h1>
              
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative min-w-[180px]">
                  <button className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-500 flex items-center justify-between hover:bg-gray-100 transition-colors">
                    ค้นหาประเภทการแข่ง
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </button>
                </div>
                <div className="relative min-w-[180px]">
                  <button className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-500 flex items-center justify-between hover:bg-gray-100 transition-colors">
                    ค้นหารุ่นการแข่งขัน
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>

            {/* Category Toggles */}
            <div className="flex items-center bg-gray-50 p-1 rounded-lg self-end lg:self-center">
              <button 
                onClick={() => setFilterType('champion')}
                className={cn(
                  "px-6 py-2 rounded-md text-sm font-bold transition-all",
                  filterType === 'champion' 
                    ? "bg-[#C2A437] text-white shadow-sm" 
                    : "text-gray-500 hover:text-black"
                )}
              >
                แชมป์เปี้ยน
              </button>
              <button 
                onClick={() => setFilterType('all')}
                className={cn(
                  "px-6 py-2 rounded-md text-sm font-bold transition-all",
                  filterType === 'all' 
                    ? "bg-[#C2A437] text-white shadow-sm" 
                    : "text-gray-500 hover:text-black"
                )}
              >
                นักกีฬาทั้งหมด
              </button>
            </div>
          </div>
        </div>

        {/* Fighters Grid */}
        {isLoading && <LoadingCardGrid count={6} />}
        {isError && <ErrorState onRetry={refetch} />}
        
        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.items.map((fighter) => (
              <FighterCardDetailed key={fighter.id} fighter={fighter} href={ROUTES.FIGHTER_DETAIL(fighter.id)} />
            ))}
          </div>
        )}

        {/* No results state if needed */}
        {data && data.items.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
            <p className="text-gray-500">ไม่พบข้อมูลนักกีฬาในขณะนี้</p>
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
}
