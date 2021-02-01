import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import modules from './modules';
import persistedStateConfig from './persistence.config';

export default createStore({
	modules,
	plugins: [createPersistedState(persistedStateConfig)],
});
