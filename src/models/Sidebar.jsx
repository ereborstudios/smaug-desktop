import { action } from 'easy-peasy';

const model = {
  sidebar: {
    open: true,
  },

  openSidebar: action((state, payload) => {
    state.sidebar.open = true;
  }),

  closeSidebar: action((state, payload) => {
    state.sidebar.open = false;
  }),
};

export default model;
