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
import { Button, ButtonGroup, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { FaBell, FaCog, FaTh } from 'react-icons/fa';
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
      title: 'VIEW OPEN SCHALORSHIPS',
      action: MenuList.Scholarships,
      id: 1,
    }
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
            key={MenuList.Scholarships.action}
            mode="horizontal"
          >
            <SubMenu
              key="profile33"
              className="px-0"
              icon={<FaTh size="20px" />}
            >
              <Menu.Item
                key="my-profile2"
                icon={<FaTh />}
                onClick={() => setSelectedMenu(MenuList.Scholarships)}
              >
                My Profile2
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="Notifications"
              icon={<FaBell size="20px" />}
              className="px-2"
            >
              <Card.Header>Notifications</Card.Header>
              <Menu.Item
                key="my-profile24"
                icon={<Avatar
                  src={process.env.PUBLIC_URL + "/assets/img/userDefault.png"}
                  width={30}
                  height={30}
                  className="my-auto d-inline rounded-circle"
                  preview={false}
                />}
                onClick={() => setSelectedMenu(MenuList.Scholarships.action)}
              >
                Scotish Government Scholarships
              </Menu.Item>
              <Menu.Item
                key="my-profile25"
                icon={<Avatar
                  src={process.env.PUBLIC_URL + "/assets/img/userDefault.png"}
                  width={30}
                  height={30}
                  className="my-auto d-inline rounded-circle"
                  preview={false}
                />}
                onClick={() => setSelectedMenu(MenuList.Scholarships.action)}
              >
                Scotish Government Scholarships
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="profile"
              className="mx-0 px-0"
              icon={<Avatar
                src={process.env.PUBLIC_URL + "/assets/img/userDefault.png"}
                width={30}
                height={30}
                className="my-auto d-inline rounded-circle"
                preview={false}
              />}
            >
              <Menu.Item
                key="my-profile"
                icon={<UserOutlined />}
                onClick={() => setSelectedMenu(MenuList.ProfileData.action)}
              >
                My Profile & Account
              </Menu.Item>
              <Menu.Item
                key="feedback"
                icon={<FaTh />}
                onClick={() => setSelectedMenu(MenuList.Scholarships)}
              >
                Feedback
              </Menu.Item>
              <Menu.Item
                key="Settings"
                icon={<FaCog />}
                //onClick={}
                className="font600"
              > Settings
              </Menu.Item>
              <hr className='px-0 mx-0' />
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
          </Menu>
        </div>
      </Header>
    </>
  );
};

export default MainHeader;
