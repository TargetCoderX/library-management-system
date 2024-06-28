
import './assets/vendors/feather/feather.css'
import './assets/vendors/mdi/css/materialdesignicons.min.css'
import './assets/vendors/ti-icons/css/themify-icons.css'
import './assets/vendors/font-awesome/css/font-awesome.min.css'
import './assets/vendors/typicons/typicons.css'
import './assets/vendors/simple-line-icons/css/simple-line-icons.css'
import './assets/vendors/css/vendor.bundle.base.css'
import './assets/vendors/bootstrap-datepicker/bootstrap-datepicker.min.css'
import './assets/css/style.css'
import './assets/css/custom.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { connect } from './api/database/connection/mongoconnection'
import { seedSuperAdmin } from './api/database/seeders/admin.seeder'
import Script from 'next/script'

export const metadata = {
  title: "LMS - Library Management System",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  connect();
  seedSuperAdmin();
  return (
    <html lang="en">
      <body className='with-welcome-text'>{children}</body>
      <Script src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js' />
    </html>
  );
}
