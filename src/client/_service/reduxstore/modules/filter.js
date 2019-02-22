import Immutable from "immutable";

const initialState = Immutable.fromJS({
  agentid: "",
  groupby: "ApplicationCategory",
  starttime: Math.trunc(new Date().getTime() / 1000) - 60 * 30,
  endtime: Math.trunc(new Date().getTime() / 1000),
  quickrange: 900,
  quickrangetext:"Last 15 minutes",
  //actually query value, used by submit
  query_agentid: "",
  query_groupby: "ApplicationCategory",
  query_starttime: Math.trunc(new Date().getTime() / 1000) - 60 * 30,
  query_endtime: Math.trunc(new Date().getTime() / 1000),
});

// action types
export const types = {
  AGENTID: "FILTER/AGENTID",
  GROUPBY: "FILTER/GROUPBY",
  STARTTIME: "FILTER/STARTTIME", //StartTime
  ENDTIME: "FILTER/ENDTIME", //EndTime
  QUICKRANGE: "FILTER/QUICKRANGE",
  UPDATEFILTER: "FILTER/UPDATEFILTER"
};

// action creators
export const actions = {
  agentid: (ip) => {
    return dispatch => {
      dispatch(actions.setAgentID(ip));
    };
  },

  groupby: (keytype) => {
    return dispatch => {
      dispatch(actions.setGroupBy(keytype));
    };
  },


  quickrange: (value,text) => {
    return dispatch => {
      dispatch(actions.setQuickRange(value,text));
    };
  },

  starttime: (starttime) => {
    return dispatch => {
      dispatch(actions.setStartTime(starttime));
    };
  },

  endtime: (endtime) => {
    return dispatch => {
      dispatch(actions.setEndTime(endtime));
    };
  },
  updatefilter: (data) => {
    return dispatch => {
      dispatch(actions.setFilter(data));
    };
  },
  
  setAgentID: (data) => ({
    type: types.AGENTID,
    agentid: data
  }),
  setGroupBy: (data) => ({
    type: types.GROUPBY,
    groupby: data
  }),
  setQuickRange: (value,text) => ({
    type: types.QUICKRANGE,
    quickrange: value,
    quickrangetext:text
  }),
  setStartTime: (data) => ({
    type: types.STARTTIME,
    starttime: data
  }),
  setEndTime: (data) => ({
    type: types.ENDTIME,
    endtime: data
  }),
  setFilter: (data) => ({
    type: types.UPDATEFILTER,
    value: data
  })
};

// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AGENTID:
      return state.merge({
        agentid: action.agentid,
      });
    case types.GROUPBY:
      return state.merge({
        groupby: action.groupby,
      });
    case types.QUICKRANGE:
      return state.merge({
        quickrange: action.quickrange,
        quickrangetext: action.quickrangetext,
      });      
    case types.STARTTIME:
      return state.merge({
        quickrange: 0,
        quickrangetext: "",
        starttime: Math.trunc(action.starttime),
      });
    case types.ENDTIME:
      return state.merge({
        quickrange: 0,
        quickrangetext: "",
        endtime: Math.trunc(action.endtime),
      });
    case types.UPDATEFILTER:
      return state.merge({
        quickrange: action.value.quickrange,
        quickrangetext: action.value.quickrangetext,
        query_agentid: action.value.query_agentid,
        query_groupby: action.value.query_groupby,
        query_starttime: action.value.query_starttime,
        query_endtime: action.value.query_endtime,
      });
    default:
      return state;
  }
};

export default reducer;

// selectors
export const getDateRange = state => {
  return state.get("filter");
};