/**
 *  Reducer to all local state related stuff
 */
import { action } from "easy-peasy";


/** 
 * Intial app state
 * @param initialValue @description the value to initiate the data field with (e.g. [] or {})
 */
export const initialState = initialValue => ({
    data: initialValue,
    isLoading: false,
    isRefreshing: false,
    isPaginating: false,
    isError: false,
    isListCompleted: false,
    errorMessage: "",
    successMessage: "",
    page: 0
  });
  
/** 
 * Actions to all local state related stuff
 */
export const actions = initialValue => ({
    startLoading: action((state, _) => ({
      ...state,
      isLoading: true,
      isError: false,
      isPaginating: false,
      isListCompleted: false,
      errorMessage: "",
      successMessage: "",
      page: 0
    })),
    stopLoading: action((state, _) => ({
      ...state,
      isLoading: false
    })),
    // Overwrites the current data object
    saveData: action((state, payload) => {
      // Check if the data to save has the same type as the saved data
      if (
        (Array.isArray(payload) && !Array.isArray(state.data)) ||
        (!Array.isArray(payload) && Array.isArray(state.data)) ||
        typeof payload != typeof state.data
      ) {
        return {
          ...state,
          isError: true,
          errorMessage: "Data is of different type",
          isLoading: false,
          isRefreshing: false
        };
      }
      return {
        ...state,
        data: payload,
        isLoading: false,
        isRefreshing: false
      };
    }),
    // Updates a field in the data object
    updateField: action((state, payload) => {
  
      return {
        ...state,
        data: {
          ...state.data,
          [payload.key]: payload.value
        }
      };
    }),
  
    // Appends to the current data list
    addToList: action((state, payload) => {
      if (!Array.isArray(state.data)) {
        return {
          ...state,
          isError: true,
          errorMessage: "Data is not a list",
          isLoading: false,
          isPaginating: false
        };
      }
      return {
        ...state,
        data: [...state.data, ...payload],
        isLoading: false,
        isPaginating: false
      };
    }),
    // Removes from the current data list by a specific condition
    removeFromList: action((state, payload) => {
      if (!Array.isArray(state.data)) {
        return {
          ...state,
          isError: true,
          errorMessage: "Data is not a list",
          isLoading: false,
          isPaginating: false
        };
      }
      const newData = state.data.filter(item => payload.removeCondition(item));
  
      return {
        ...state,
        data: newData,
        isLoading: false,
        isPaginating: false
      };
    }),
  
    // Updates a specific item in data list by a specific condition
    updateListItem: action((state, payload) => {
      if (!Array.isArray(state.data)) {
        return {
          ...state,
          isError: true,
          errorMessage: "Data is not a list",
          isLoading: false,
          isPaginating: false
        };
      }
      const newData = state.data.map(item => {
        if (payload.updateCondition(item)) return payload.data;
        else return item;
      });
  
      return {
        ...state,
        data: newData,
        isLoading: false,
        isPaginating: false
      };
    }),
    // Updates a specific item field in data list by a specific condition
    updateListItemField: action((state, payload) => {
      if (!Array.isArray(state.data)) {
        return {
          ...state,
          isError: true,
          errorMessage: "Data is not a list",
          isLoading: false,
          isPaginating: false
        };
      }
      const newData = state.data.map(item => {
        if (payload.updateCondition(item))
          return {
            ...item,
            [payload.key]: payload.value
          };
        else return item;
      });
  
      return {
        ...state,
        data: newData,
        isLoading: false,
        isPaginating: false
      };
    }),
    resetState: action(() => initialState(initialValue)),
    // Pagination
    resetPage: action((state, _) => ({
      ...state,
      page: 0
    })),
    startPaginating: action((state, _) => ({
      ...state,
      isPaginating: true,
      page: state.page + 1,
      isListCompleted: false,
      isLoading: false,
      isError: false,
      errorMessage: "",
      successMessage: ""
    })),
    stopPaginating: action((state, _) => ({
      ...state,
      isPaginating: false
    })),
    // set list as completed
    setCompleted: action((state, _) => ({
      ...state,
      isListCompleted: true,
      isPaginating: false,
      page: Math.max(state.page - 1, 0)
    })),
    // Refreshing
    startRefreshing: action((state, _) => ({
      ...state,
      isRefreshing: true,
      isLoading: false,
      isPaginating: false,
      isError: false,
      errorMessage: "",
      page: 0
    })),
    stopRefreshing: action((state, _) => ({
      ...state,
      isRefreshing: false
    })),
    // Alerts Handling
    setErrorMessage: action((state, payload) => ({
      ...state,
      isError: true,
      errorMessage: payload,
      successMessage: "",
      isLoading: false,
      isRefreshing: false,
      isPaginating: false
    })),
    setSuccessMessage: action((state, payload) => {
      return {
        ...state,
        successMessage: payload
      };
    }),
    dismissAlert: action((state, onDismiss) => {
      if (onDismiss) return onDismiss();
      return {
        ...state,
        isError: false,
        errorMessage: "",
        successMessage: ""
      };
    })
  });
  