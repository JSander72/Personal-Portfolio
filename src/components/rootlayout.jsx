import { Suspense } from 'react';
import { StaffToolbar } from '@components/staff-toolbar';

export default function RootLayout({ children }) {
  return (
    <>
      {children}
      <Suspense>
        <StaffToolbar />
      </Suspense>
    </>
  );
}