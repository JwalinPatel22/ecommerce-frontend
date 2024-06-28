import { Outlet } from 'react-router-dom';
import AdminNavbar from '../admin/components/AdminNavbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <Outlet />
      <ToastContainer />
    </>
  )
}

export default AdminLayout