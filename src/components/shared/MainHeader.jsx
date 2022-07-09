import {
  LoadingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { isEmpty } from 'lodash';
import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { authActions, settingActions } from '../../config/actions';
import MenuList from '../../config/routes/MenuList';
import Avatar from '../../containers/MyProfile/Avatar';

const { Header } = Layout;
const { SubMenu } = Menu;

const MainHeader = () => {
  const dispatch = useDispatch();
  const { authUser, loggingOut, gettingAuthUser } = useSelector(
    (state) => state.auth
  );
  const { selectedMenu, isToggled } = useSelector((state) => state.setting);
  const isMobileDevice = useMediaQuery({ maxWidth: 767 });

  const setSelectedMenu = (menu) => {
    dispatch(settingActions.setSelectedMenu(menu));
  };

  const actionButtons = [
    {
      title: 'ACADEMIC CALENDAR',
      action: MenuList.AcademicCalendar,
      id: 1,
    },
    {
      title: 'GET PAYMENT REF',
      action: MenuList.PaymentReference,
      id: 2,
    },
  ];

  return (
    <>
      <Header theme="light" className="bg-white border-bottom ps-0 pe-3">
        <Button
          className="d-inline button"
          variant="link"
          onClick={() => dispatch(settingActions.setIsToggled(!isToggled))}
        >
          {isToggled ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        {!isMobileDevice && (
          <ButtonGroup>
            {actionButtons.map((button) => (
              <Button
                size="sm"
                variant={
                  selectedMenu.action === button.action.action
                    ? 'primary'
                    : 'outline-primary'
                }
                className="me-1 text-sm font500"
                onClick={() => setSelectedMenu(button.action)}
                key={button.id}
              >
                {button.title}
              </Button>
            ))}
          </ButtonGroup>
        )}

        <div className="rightContainer d-inline">
          <Menu
            key={MenuList.ProfileData.action}
            mode="horizontal"
          >
            <SubMenu
              title={
                <>
                  {loggingOut || (gettingAuthUser && isEmpty(authUser)) ? (
                    <LoadingOutlined />
                  ) : (
                    <span className="my-auto">
                      <span style={{ color: '#999', marginRight: 4 }}>Hi,</span>
                      <span className="text-uppercase text-primary text-sm font600 me-2">
                        {authUser.lastname}
                      </span>
                      <Avatar
                        width={24}
                        height={24}
                        className="my-auto d-inline rounded-circle"
                        preview={false}
                      />
                    </span>
                  )}
                </>
              }
              key="profile"
              className="px-0"
              icon={<UserOutlined />}
            >
              <Menu.Item
                key="my-profile"
                icon={<UserOutlined />}
                onClick={() => setSelectedMenu(MenuList.ProfileData)}
              >
                My Profile
              </Menu.Item>
              <Menu.Item
                key="SignOut"
                icon={loggingOut ? <LoadingOutlined /> : <LogoutOutlined />}
                onClick={() => dispatch(authActions.logoutUser())}
                className="font600"
                danger
              >
                Log out
              </Menu.Item>
            </SubMenu>
            <Menu.Item
              key="SignOut2"
              icon={loggingOut ? <LoadingOutlined /> : <LogoutOutlined />}
              onClick={() => dispatch(authActions.logoutUser())}
              className="font600 px-2"
              danger
            >
              Log out
            </Menu.Item>
          </Menu>
        </div>
      </Header>
    </>
  );
};

export default MainHeader;
