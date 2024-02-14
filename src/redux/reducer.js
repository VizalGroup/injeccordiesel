const initialState = {
  categories: [],
  categoryDetail: [],
  subcategories: [],
  subcategoryDetail: [],
  products: [],
  productDetail: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };

    case "GET_ID_CATEGORY":
      return {
        ...state,
        categoryDetail: action.payload,
      };

    case "POST_CATEGORY":
      return {
        ...state,
      };

    case "UPDATE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((f) => {
          return f.id === action.payload.id ? action.payload : f;
        }),
      };

    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter((f) => f.id !== action.payload),
      };

    case "GET_SUBCATEGORIES":
      return {
        ...state,
        subcategories: action.payload,
      };

    case "GET_ID_SUBCATEGORY":
      return {
        ...state,
        subcategoryDetail: action.payload,
      };

    case "POST_SUBCATEGORY":
      return {
        ...state,
      };

    case "UPDATE_SUBCATEGORY":
      return {
        ...state,
        subcategories: state.subcategories.map((f) => {
          return f.id === action.payload.id ? action.payload : f;
        }),
      };

    case "DELETE_SUBCATEGORY":
      return {
        ...state,
        subcategories: state.categories.filter((f) => f.id !== action.payload),
      };

      case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };

      case "GET_ID_PRODUCT":
      return {
        ...state,
        productDetail: action.payload,
      };

      case "POST_PRODUCT":
      return {
        ...state,
      };

      case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((f) => {
          return f.id === action.payload.id ? action.payload : f;
        }),
      };

      case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((f) => f.id !== action.payload),
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
