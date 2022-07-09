/* eslint-disable react/react-in-jsx-scope */
import {
  CalendarOutlined,
  FieldBinaryOutlined,
  EditOutlined,
  FileDoneOutlined,
  ReconciliationOutlined,
  DollarCircleOutlined,
  UserOutlined,
  FileProtectOutlined,
} from '@ant-design/icons';
import {
  FaClipboardList,
  FaPaperclip,
  FaRegCopy,
  FaRegEdit,
  FaSearchDollar,
  FaTasks,
  FaUserEdit,
  FaUserGraduate,
  FaUser,
} from 'react-icons/fa';
import MenuList from '../../config/routes/MenuList';

const sideBarMenu = [
  {
    title: 'Scholarships',
    key: 'scholarships',
    icon: <ReconciliationOutlined />,
    routes: [
      {
        ...MenuList.Scholarships,
        icon: <FaRegEdit />,
      },
    ],
  },
  {
    title: 'Institutions',
    key: 'institution',
    icon: <ReconciliationOutlined />,
    routes: [
      {
        ...MenuList.Institutions,
        icon: <FaRegEdit />,
      }
    ],
  },
  {
    title: 'Payments & Invoices',
    key: 'payments',
    icon: <DollarCircleOutlined />,
    routes: [
      {
        ...MenuList.MyInvoice,
        icon: <FaPaperclip />,
      },
      {
        ...MenuList.MyTransaction,
        icon: <FileProtectOutlined />,
      },
    ],
  },
  {
    ...MenuList.SearchPayment,
    icon: <FaSearchDollar />,
  },
  {
    ...MenuList.PaymentReference,
    icon: <FieldBinaryOutlined />,
  },
  {
    title: 'Enrollment & Registration',
    key: 'registration-and-enrollment',
    icon: <EditOutlined />,
    routes: [
      {
        ...MenuList.SelfEnrollment,
        icon: <FaUserEdit />,
      },
      {
        ...MenuList.EnrollmentHistory,
        icon: <FileDoneOutlined />,
      },
      {
        ...MenuList.RegistrationHistory,
        icon: <FileDoneOutlined />,
      },
    ],
  },
  {
    title: 'My Programme',
    key: 'my-programmes',
    icon: <FaUserGraduate />,
    routes: [
      {
        ...MenuList.MyResults,
        icon: <FaTasks />,
      },
    ],
  },
  {
    title: 'Services',
    key: 'services',
    icon: <ReconciliationOutlined />,
    routes: [
      {
        ...MenuList.Services,
        icon: <FaRegEdit />,
      },
      {
        title: 'Service History',
        action: 'service-history',
        icon: <FaClipboardList />,
      },
      {
        title: 'Complaints',
        action: 'complaints',
        icon: <FaRegCopy />,
      },
    ],
  },
  {
    ...MenuList.ProfileData,
    icon: <UserOutlined />,
  },
  {
    ...MenuList.UserRegister,
    icon: <UserOutlined />,
  },
  {
    ...MenuList.AcademicCalendar,
    icon: <CalendarOutlined />,
  },
];

export default sideBarMenu;
