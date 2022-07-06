import { Image } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import Logo from '../../assets/img/avatar.png';

const Avatar = ({ ...props }) => {
  const { authUser } = useSelector((state) => state.auth);
  const profilePicPath = process.env.REACT_APP_STUDENTS_PHOTO_URL;

  return (
    <>
      <Image
        src={`${profilePicPath}/${authUser.avatar}`}
        fallback={Logo}
        shape=""
        height={64}
        width={64}
        className="mx-auto rounded border bg-white"
        {...props}
      />
    </>
  );
};

export default Avatar;
