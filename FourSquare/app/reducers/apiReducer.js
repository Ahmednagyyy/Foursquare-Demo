import { thunk } from "easy-peasy";
import { initialState, actions } from "./localReducer";

/**
* REST Api reducer for all api related stuff
 * @param defaultConfig @description Default configurations
 * isPaginated: boolean
 * sortBy: [fieldName,"ASC" or "DESC"])
*/

// Pagination item are 10 by default
var PAGINATION_COUNT = 10;

const asyncActions = defaultConfig => ({
  getData: thunk(async (actions, payload = {}, helpers) => {
    const {
      startLoading,
      stopLoading,
      stopRefreshing,
      stopPaginating,
      saveData,
      addToList,
      setErrorMessage,
      setCompleted
    } = actions;
    const {
      url,
      apiConfig = {},
      searchText,
      onSuccess,
      onError,
      disableLoading
    } = payload;
    const {
      injections: { apiClient },
      getState
    } = helpers;
    const { isPaginated, sortBy } = defaultConfig;
    try {
      if (
        !getState().isPaginating &&
        !getState().isRefreshing &&
        !disableLoading
      )
        startLoading();

      const page = getState().page;
      const config = {
        ...apiConfig,
        params: {
          ...(isPaginated && { page, count: PAGINATION_COUNT }),
          ...(sortBy && {
            sort: sortBy.key,
            direction: sortBy.direction || "ASC" // Defaults to ASC
          }),
          ...(searchText && {
            query: searchText
          }),
          ...(apiConfig.params || {})
        }
      };

      // Execute request
      const res = await apiClient.get(url, config);

      // Execute any onSuccess given after the request
      if (onSuccess) {
        if (getState().isRefreshing) stopRefreshing();
        if (getState().isPaginating) stopPaginating();
        if (getState().isLoading) stopLoading();
        return onSuccess(res);
      }
      // Else by default save the fetched data
      else if (getState().isPaginating) {
        // If the latest response is empty, mark list as completed
        if (res.length === 0) {
          setCompleted();
        } else addToList(res);
      } else if (getState().isLoading || getState().isRefreshing) saveData(res);
      // Else by default add to list if paginated
      return res;
    } catch (err) {
      if (onError) return onError(err);
      else setErrorMessage(err);
    }
  }),
  getNextPage: thunk(async (actions, payload = {}, helpers) => {
    const { getData, startPaginating } = actions;
    const { getState } = helpers;
    const {
      isLoading,
      isListCompleted,
      isRefreshing,
      isPaginating
    } = getState();

    if (!isLoading && !isListCompleted && !isRefreshing && !isPaginating) {
      startPaginating();
      return getData(payload);
    }
  }),
  searchData: thunk(async (actions, payload = {}) => {
    const { getData, resetPage } = actions;
    resetPage();
    return getData(payload);
  }),
  postData: thunk(async (actions, payload = {}, helpers) => {
    const { startLoading, stopLoading, setErrorMessage } = actions;
    const {
      url,
      body = {},
      apiConfig = {},
      onSuccess,
      onError,
      disableLoading
    } = payload;
    const { apiClient } = helpers.injections;

    try {
      if (!disableLoading) startLoading();
      const res = await apiClient.post(url, body, apiConfig);
      stopLoading();
      if (onSuccess) return onSuccess(res);
      return res;
    } catch (err) {
      if (onError) return onError(err);
      else setErrorMessage(err);
    }
  }),
  uploadData: thunk(async (actions, payload = {}, helpers) => {

    const { startLoading, stopLoading, setErrorMessage } = actions;
    const {
      body = {},
      onSuccess,
      onError,
      disableLoading
    } = payload;

    const { apiClient } = helpers.injections;

    try {
      if (!disableLoading) startLoading();
      const res = await apiClient.uploadClient(body);
      stopLoading();
      if (onSuccess) return onSuccess(res);
      return res;
    } catch (err) {
      if (onError) return onError(err);
      else setErrorMessage(err);
    }
  }),
  putData: thunk(async (actions, payload = {}, helpers) => {
    const { startLoading, stopLoading, setErrorMessage } = actions;
    const {
      url,
      body = {},
      apiConfig = {},
      onSuccess,
      onError,
      disableLoading
    } = payload;
    const { apiClient } = helpers.injections;

    try {
      if (!disableLoading) startLoading();
      const res = await apiClient.put(url, body, apiConfig);
      stopLoading();
      if (onSuccess) return onSuccess(res);
      return res;
    } catch (err) {
      if (onError) return onError(err);
      else setErrorMessage(err);
    }
  }),
  patchData: thunk(async (actions, payload = {}, helpers) => {
    const { startLoading, stopLoading, setErrorMessage } = actions;
    const {
      url,
      body = {},
      apiConfig = {},
      onSuccess,
      onError,
      disableLoading
    } = payload;
    const { apiClient } = helpers.injections;

    try {
      if (!disableLoading) startLoading();
      const res = await apiClient.patch(url, body, apiConfig);
      stopLoading();
      if (onSuccess) return onSuccess(res);
      return res;
    } catch (err) {
      if (onError) return onError(err);
      else setErrorMessage(err);
    }
  }),
  deleteData: thunk(async (actions, payload = {}, helpers) => {
    const { startLoading, stopLoading, setErrorMessage } = actions;
    const { url, apiConfig = {}, onSuccess, onError, disableLoading } = payload;
    const { apiClient } = helpers.injections;
    try {
      if (!disableLoading) startLoading();
      const res = await apiClient.delete(url, apiConfig);
      stopLoading();
      if (onSuccess) return onSuccess(res);
      return res;
    } catch (err) {
      if (onError) return onError(err);
      else setErrorMessage(err);
    }
  })
});

export const apiReducer = (initialValue = {}, defaultConfig = {}) => ({
  ...initialState(initialValue),
  ...actions(initialValue),
  ...asyncActions(defaultConfig)
});

export const setPaginationCount = (payload = {}) => {
  PAGINATION_COUNT = payload
};

