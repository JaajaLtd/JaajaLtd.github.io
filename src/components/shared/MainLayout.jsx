import { Drawer, Layout } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { appActions, authActions, settingActions } from '../../config/actions';
import MenuList from '../../config/routes/MenuList';
import HeaderComponent from '../../containers/Dashboard/Header';
import ComingSoon from '../../containers/Pages/ComingSoon';
import MainHeader from './MainHeader';
import SideBar from './SideBar';
import SideTitle from './SideTitle';

const { Sider, Content, Footer } = Layout;

const MainLayout = () => {
  const dispatch = useDispatch();
  const { selectedMenu, isToggled } = useSelector((state) => state.setting);
  const { authUser, currentStudentProgramme } = useSelector(
    (state) => state.auth
  );
 // const { institutionStructure } = useSelector((state) => state.app);
  const isMobileDevice = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (isEmpty(authUser)) {
      dispatch(authActions.getAuthUser());
    }
   /* if (isEmpty(institutionStructure))
      dispatch(appActions.getInstitutionStructure());*/
  }, []);

  useEffect(() => {
    if (isEmpty(selectedMenu)) {
      dispatch(settingActions.setSelectedMenu(MenuList.Scholarships));
    }
  }, [selectedMenu]);

  const renderSwitchStatement = () => {
    let component = ComingSoon;
    const findMenuKey = Object.keys(MenuList).find(
      (menu) => MenuList[menu].action === selectedMenu.action
    );

    if (findMenuKey) {
      component = MenuList[findMenuKey].Component;
    }
    return React.createElement(component);
  };

  const hideOrShowSideBar = () => {
    dispatch(settingActions.setIsToggled(!isToggled));
  };

  const getToggleMargin = () => {
    if (isMobileDevice) return 0;

    return isToggled ? 0 : 260;
  };

  return (
    <>
      <Helmet>
        <title>{selectedMenu?.title}</title>
      </Helmet>

      <Layout style={{ minHeight: '100vh' }} key={`currentStudentProgramme.id`}>{/* change key here */}
        {isMobileDevice ? (
          <Drawer
            title={<SideTitle />}
            placement="left"
            closable={false}
            onClose={hideOrShowSideBar}
            visible={isToggled}
            getContainer={false}
            className="p-0"
            bodyStyle={{ padding: 0 }}
            headerStyle={{ padding: '10px 10px' }}
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
            }}
          >
            <SideBar />
          </Drawer>
        ) : (
          <Sider
            theme="light"
            breakpoint="md"
            className="border-end"
            width={260}
            collapsible
            reverseArrow
            collapsedWidth={0}
            collapsed={isToggled}
            onCollapse={hideOrShowSideBar}
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
            }}
          >
            <div className="bg-white font600 p-2">
              <SideTitle />
            </div>
            <SideBar />
          </Sider>
        )}

        <Layout
          style={{
            marginLeft: getToggleMargin(),
            transition: 'all 0.2s',
          }}
        >
          <MainHeader />
          <Content>
            <HeaderComponent />
            <div className="p-3">{renderSwitchStatement()}</div>
          </Content>
          <Footer className="bg-white text-sm text-muted font600 py-3 border-top text-center">
            &copy; School System
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
