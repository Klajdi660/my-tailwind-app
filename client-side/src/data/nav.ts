import { 
  createCampaign, 
  dashboard, 
  logout, 
  payment, 
  profile, 
  withdraw,
  courses,
  addCourse,
  favorite,
  later,
} from '../assets/img';

export const navlinks = [
  {
    name: 'Dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'My courses',
    imgUrl: courses,
    link: '/',
  },
  {
    name: 'Add Course',
    imgUrl: addCourse,
    link: '/',
    // disabled: true,
  },
  {
    name: 'Favorite',
    imgUrl: favorite,
    link: '/',
    // disabled: true,
  },
  {
    name: 'Watch Later',
    imgUrl: later,
    link: '/',
    // disabled: true,
  },
  {
    name: 'Profile',
    imgUrl: profile,
    link: '/',
  },
  {
    name: 'Logout',
    imgUrl: logout,
    link: '/',
    disabled: true,
  },
];