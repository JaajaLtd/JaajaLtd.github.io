
import Scholarships from '../../containers/Scholarships';
import NewUser from '../../containers/NewUser';
import UserList from '../../containers/NewUser/UserList';
import AdvertForm from '../../containers/Scholarships/AdvertForm';
/*import AcademicCalendar from '../../containers/AcademicCalender';
import EnrollmentHistory from '../../containers/EnrollmentHistory';
import CurrentEvents from '../../containers/Events/CurrentEvents';
import Institutions from '../../containers/Institutions';
import MyProfile from '../../containers/MyProfile';
import PaymentReferences from '../../containers/PaymentReferences';
import MyInvoices from '../../containers/Payments/MyInvoices';
//import CreateInvoice from '../../containers/Invoice';
import MyTransactions from '../../containers/Payments/MyTransactions';
import SearchPayment from '../../containers/Payments/SearchPayment';
import RegistrationHistory from '../../containers/RegistrationHistory';
import Result from '../../containers/Results';
import ScholarshipList from '../../containers/Scholarships/ScholarshipList';
import Services from '../../containers/Services';
*/

const MenuList = {

  Scholarships: {
    title: 'Scholarships',
    action: 'scholarships-main',
    key: 'scholarships-main',
    Component: Scholarships
  },
  Advert: {
    title: 'Advert Form',
    action: 'advert-form',
    key: 'advert-form',
    Component: AdvertForm
  },
  UserRegister: {
    title: 'Create Account',
    action: 'create-account',
    key: 'create-account',
    Component: NewUser,
  },
  UserList: {
    title: 'Registered Users',
    action: 'registered-users-list',
    key: 'registered-users-list',
    Component: UserList,
  },
 /* ProfileData: {
    title: 'Profile Data',
    action: 'bio-data',
    key: 'bio-data',
    Component: MyProfile,
  },
  PaymentReference: {
    title: 'Get Payment REF',
    action: 'payment-references',
    key: 'payment-references',
    Component: PaymentReferences,
  },
  SelfEnrollment: {
    title: 'Enroll or Register',
    action: 'self-enrollment',
    key: 'self-enrollment',
    Component: CurrentEvents,
  },
  EnrollmentHistory: {
    title: 'Enrollment History',
    action: 'enrollment-history',
    key: 'enrollment-history',
    Component: EnrollmentHistory,
  },
  RegistrationHistory: {
    title: 'Registration History',
    action: 'registration-history',
    key: 'registration-history',
    Component: RegistrationHistory,
  },
  MyInvoice: {
    title: 'My Bills/Invoices',
    action: 'my-invoices',
    key: 'my-invoices',
    Component: MyInvoices,
  },
  MyTransaction: {
    title: 'My Transactions',
    action: 'my-transactions',
    key: 'my-transactions',
    Component: MyTransactions,
  },
  AcademicCalendar: {
    title: 'Academic Calendar',
    action: 'academic-calendar',
    key: 'academic-calendar',
    Component: AcademicCalendar,
  },
  Services: {
    title: 'Apply For Services',
    action: 'apply-for-services',
    key: 'apply-for-services',
    Component: Services,
  },
  Institutions: {
    title: 'Institutions',
    action: 'institutions',
    key: 'institutions',
    Component: Institutions,
  },
  MyResults: {
    title: 'My Results',
    action: 'my-results',
    key: 'my-results',
    Component: Result,
  },
  SearchPayment: {
    title: 'Check PRN Status',
    action: 'search-payment',
    key: 'search-payment',
    Component: SearchPayment,
  },
  */
};

export default MenuList;
