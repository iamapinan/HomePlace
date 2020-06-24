import {Colors} from '../styles/base';

const profileMenu = [
  {
    title: 'แก้ไขโปรไฟล์',
    icon: 'pencil',
    slug: 'EditProfile',
  },
  {
    title: 'จัดการร้าน',
    icon: 'home',
    slug: 'MyStore',
  },
  // {
  //   title: 'จัดการสินค้า',
  //   icon: 'cube',
  //   slug: 'MyProduct',
  // },
  {
    title: 'เงื่อนไขการให้บริการ',
    icon: 'file-text',
    slug: 'Term',
  },
  {
    title: 'นโยบายความเป็นส่วนตัว',
    icon: 'lock',
    slug: 'Privacy',
  },
  {
    title: 'แนะนำเรา',
    icon: 'support',
    slug: 'Support',
  },
  {
    title: 'เกี่ยวกับ Home Place',
    icon: 'info-circle',
    slug: 'About',
    bottomDivider: true,
  },
  {
    title: 'ออกจากระบบ',
    icon: 'sign-out',
    slug: 'Login',
    style: {color: Colors.red},
  },
];

export {profileMenu};
