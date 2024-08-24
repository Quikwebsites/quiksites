
// page: home, user, admin
export const initialState = {
    page: "home",
    visable: false,
    prompt_visable:false,
    req_box_visable: false,
    sub_page: "DelSet",
    admin_view: "AdminMain",
    admin_user: ""
};
  
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PAGE":
      return {
        ...state,
        page: action.page
      };
      case "SET_NAV_VIZ":
        return {
          ...state,
          visable: action.visable
        };
      case "SET_PROMPT_VIZ":
        return {
          ...state,
          prompt_visable: action.prompt_visable
        };
      case "SET_REQ_BOX_VIZ":
        return {
          ...state,
          req_box_visable: action.req_box_visable
        }
      case "SET_SUB_PAGE":{
        return{
          ...state,
          sub_page: action.sub_page
        }
      }
      case "SET_ADMIN_VIEW": {
        return {
          ...state,
          admin_view: action.admin_view
        }
      }
      case "SET_ADMIN_USER": {
        return {
          ...state,
          admin_user: action.admin_user
        }
      }
      default:
        return state;
    }
  };
  
  export default reducer;

  