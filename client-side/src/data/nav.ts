import { 
  dashboard, 
  logout, 
  profile, 
  courses,
  addCourse,
  favorite,
  later,
} from '../assets/img';

export const navlinks = [
  {
    id: 1,
    name: 'Dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    id: 2,
    name: 'My courses',
    imgUrl: courses,
    link: '/my-courses',
  },
  {
    id: 3,
    name: 'Add Course',
    imgUrl: addCourse,
    link: '/add-course',
    // disabled: true,
  },
  {
    id: 4,
    name: 'Favorite',
    imgUrl: favorite,
    link: '/favorite',
    // disabled: true,
  },
  {
    id: 5,
    name: 'Watch Later',
    imgUrl: later,
    link: '/watch-later',
    // disabled: true,
  },
  {
    id: 6,
    name: 'Profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    id: 7,
    name: 'Logout',
    imgUrl: logout,
    link: '/',
    disabled: true,
  },
];
