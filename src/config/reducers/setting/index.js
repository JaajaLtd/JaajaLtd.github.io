import initialState from '../../initialState';

function settings(state = initialState.setting, action) {
  switch (action.type) {
    case 'SET_SELECTED_MENU':
      return {
        ...state,
        selectedMenu: action.payload,
      };

    case 'SWITCH_SIDE_MENU_TAB':
      return {
        ...state,
        sideMenuTab: action.payload,
      };

    case 'SET_SHOW_MODAL':
      return {
        ...state,
        showModal: action.payload,
      };

    case 'SET_IS_TOGGLED':
      return {
        ...state,
        isToggled: action.payload,
      };

    default:
      return state;
  }
}

export default settings;
