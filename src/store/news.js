import * as types from './.mutation.js';
import config from '@frame/config';
const { pageSize = 10 } = config;

const api = {
  create: '/cms/news/create',
  update: '/cms/news/update',
  delete: '/cms/news/delete',
  fetch: '/cms/news/fetch',
  query: '/cms/news/query',
};
// initial state
export const state = () => ({
  items: [],
  current: null,
  total: 0,
  column: null,
});
export const actions = {
  async query({ commit, state }, { column, paging = {} }) {
    // 栏目变化时先清空列表
    if (state.column != column) {
      commit(types.LOADED, { data: [], total: 0, column });
    }

    const { page = 1, size = pageSize } = paging;
    const skip = Math.max(0, (page - 1) * size);
    const res = await this.$axios.$get(api.query, { column, skip, size });
    if (res.errcode === 0) {
      commit(types.LOADED, res);
    } else {
      commit(types.LOADED, { data: [], total: 0 });
    }
    return res;
  },
  async create({ commit }, { column, data }) {
    const res = await this.$axios.$post(api.create, data, { column });
    if (res.errcode === 0) commit(types.CREATED, res.data);
    return res;
  },
  async update({ commit }, { id, column, data }) {
    const res = await this.$axios.$post(api.update, data, { id, column });
    if (res.errcode === 0) commit(types.UPDATED, res.data);
    return res;
  },
  async fetch({ commit }, { id, column }) {
    const res = await this.$axios.$get(api.fetch, { id, column });
    if (res.errcode === 0) commit(types.SELECTED, res.data);
    return res;
  },
  async delete({ commit }, { id, column }) {
    const res = await this.$axios.$post(api.delete, {}, { id, column });
    if (res.errcode === 0) commit(types.DELETED, { id });
    return res;
  },
};

// mutations
export const mutations = {
  [types.LOADED](state, { data, total, column }) {
    state.items = data;
    state.total = total;
    if (column) state.column = column;
  },
  [types.SELECTED](state, payload) {
    state.current = payload;
  },
  [types.CREATED](state, payload) {
    state.items.push(payload);
  },
  [types.UPDATED](state, payload) {
    const idx = state.items.findIndex(p => p.id === payload.id);
    state.items.splice(idx, 1, payload);
  },
  [types.DELETED](state, { id }) {
    const idx = state.items.findIndex(p => p.id === id);
    state.items.splice(idx, 1);
  },
};
export const namespaced = true;
