const settings = {
  setSelectedMenu: (e) => ({
    type: 'SET_SELECTED_MENU',
    payload: e,
  }),

  switchSideMenuTab: (e) => ({
    type: 'SWITCH_SIDE_MENU_TAB',
    payload: e,
  }),

  setShowModal: (e) => ({
    type: 'SET_SHOW_MODAL',
    payload: e,
  }),

  setIsToggled: (e) => ({
    type: 'SET_IS_TOGGLED',
    payload: e,
  }),
};

export default settings;
