import { Suspense } from 'react';
import { StaffToolbar } from './staff_toolbar';

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