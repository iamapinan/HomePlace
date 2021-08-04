import {Colors} from '../styles/base';

const profileMenu = [
  {
    title: 'แก้ไขโปรไฟล์',
    icon: 'pencil',
    slug: 'EditProfile',
    style: {color: Colors.black},
  },
  {
    title: 'จัดการร้าน',
    icon: 'home',
    slug: 'MyStore',
    style: {color: Colors.primary},
  },
  // {
  //   title: 'จัดการสินค้า',
  //   icon: 'cube',
  //   slug: 'MyProduct',
  //   style: {color: Colors.black},
  // },
  {
    title: 'เงื่อนไขการให้บริการ',
    icon: 'file-text',
    slug: 'Term',
    style: {color: Colors.black},
  },
  {
    title: 'นโยบายความเป็นส่วนตัว',
    icon: 'lock',
    slug: 'Privacy',
    style: {color: Colors.black},
  },
  {
    title: 'แนะนำเรา',
    icon: 'support',
    slug: 'Support',
    style: {color: Colors.black},
  },
  {
    title: 'เกี่ยวกับ Home Place',
    icon: 'info-circle',
    slug: 'About',
    bottomDivider: true,
    style: {color: Colors.black},
  },
  {
    title: 'ออกจากระบบ',
    icon: 'sign-out',
    slug: 'logout',
    style: {color: Colors.red},
  },
];

export {profileMenu};
