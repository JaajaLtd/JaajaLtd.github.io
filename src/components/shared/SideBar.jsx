import { Menu } from 'antd';
import { isEmpty } from 'lodash';
import React, { Fragment } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { settingActions } from '../../config/actions';
import MenuList from '../../config/routes/MenuList';
import Avatar from '../../containers/MyProfile/Avatar';
import sideBarMenu from './SidebarMenu';

const { SubMenu } = Menu;

const SideBar = () => {
  const dispatch = useDispatch();
  const { authUser, gettingAuthUser } = useSelector((state) => state.auth);
  const isMobileDevice = useMediaQuery({ maxWidth: 767 });

  const setSelectedMenu = (content) => {
    dispatch(settingActions.setSelectedMenu(content));
    if (isMobileDevice) dispatch(settingActions.setIsToggled(false));
  };

  return (
    <>
      <div
        className={`student-profile mx-auto text-sm text-center ${
          isMobileDevice ? 'py-2' : 'py-3'
        } border-bottom`}
      >
        <Avatar src={process.env.PUBLIC_URL + "/assets/img/userDefault.png"} shape="square" size={76} draggable={false} />

        {gettingAuthUser && isEmpty(authUser) ? (
          <div className="d-block text-center">
            <Spinner
              variant="primary"
              size="sm"
              animation="border"
              className="d-block"
            />
          </div>
        ) : (
          <>
            <div className="font500 mt-2 text-uppercase text-light">
              {`${authUser.firstname} ${authUser.lastname}`}
            </div>
          </>
        )}
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={[MenuList.Scholarships.action]}
        defaultOpenKeys={['scholarships']}
        theme="light"
      >
        {sideBarMenu.map((menuItem) => (
          <Fragment key={menuItem.key}>
            {isEmpty(menuItem.routes) ? (
              <Menu.Item
                key={menuItem.action}
                onClick={() => setSelectedMenu({ ...menuItem })}
                className="px-3 m-0 font500"
                icon={menuItem.icon}
              >
                {menuItem.title}
              </Menu.Item>
            ) : (
              <SubMenu
                key={menuItem.key}
                title={menuItem.title}
                icon={menuItem.icon}
                className="p-0 font500"
              >
                {menuItem.routes.map((route) => (
                  <Menu.Item
                    key={route.action}
                    onClick={() => setSelectedMenu({ ...route })}
                    icon={route.icon}
                  >
                    {route.title}
                  </Menu.Item>
                ))}
              </SubMenu>
            )}
            <Menu.Divider className="m-0 p-0" />
          </Fragment>
        ))}
      </Menu>
    </>
  );
};

export default SideBar;
