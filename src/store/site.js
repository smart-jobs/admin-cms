import * as types from './.mutation.js';
import config from '@frame/config';
const { pageSize = 10 } = config;

const api = {
  config: '/cms/site/config',
  query: '/cms/site/query',
  create: '/cms/site/create',
  delete: '/cms/site/delete',
  update: '/cms/site/update',
  fetch: '/cms/site/fetch',
};
// initial state
export const state = () => ({
  items: [],
  current: null,
  total: 0,
});
export const actions = {
  async getConfig() {
    const res = await this.$axios.$get(api.config);
    return res;
  },
  async setConfig({ commit }, { data }) {
    const res = await this.$axios.$post(api.config, data);
    return res;
  },
  async query({ commit }, { paging = {} }) {
    const { page = 1, size = pageSize } = paging;
    const skip = Math.max(0, (page - 1) * size);
    const res = await this.$axios.$get(api.query, { skip, size });
    if (res.errcode === 0) {
      commit(types.LOADED, res);
    } else {
      commit(types.LOADED, { data: [], total: 0 });
    }
    return res;
  },
  async create({ commit }, { data }) {
    const res = await this.$axios.$post(api.create, data);
    if (res.errcode === 0) commit(types.CREATED, res.data);
    return res;
  },
  async update({ commit }, { site, data }) {
    const res = await this.$axios.$post(api.update, data, { site });
    if (res.errcode === 0) commit(types.UPDATED, res.data);
    return res;
  },
  async fetch({ commit }, { site }) {
    const res = await this.$axios.$get(api.fetch, { site });
    if (res.errcode === 0) commit(types.SELECTED, res.data);
    return res;
  },
  async delete({ commit }, { site }) {
    const res = await this.$axios.$post(api.delete, {}, { site });
    if (res.errcode === 0) commit(types.DELETED, { site });
    return res;
  },
};

// mutations
export const mutations = {
  [types.LOADED](state, { data, total }) {
    state.items = data;
    state.total = total;
  },
  [types.SELECTED](state, payload) {
    state.current = payload;
  },
  [types.CREATED](state, payload) {
    state.items.push(payload);
  },
  [types.UPDATED](state, payload) {
    const idx = state.items.findIndex(p => p.site === payload.site);
    state.items.splice(idx, 1, payload);
  },
  [types.DELETED](state, { site }) {
    const idx = state.items.findIndex(p => p.site === site);
    state.items.splice(idx, 1);
  },
};
export const namespaced = true;
