'use client';

import { MainLayout } from '@/components/ui/MainLayout';
import { Dashboard } from '@/components/dashboard/Dashboard';

export default function Home() {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
      <Dashboard />
    </MainLayout>
  );
}