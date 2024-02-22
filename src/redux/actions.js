import axios from "axios";

export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_ID_CATEGORY = "GET_ID_CATEGORY";
export const POST_CATEGORY = "POST_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";

export const GET_SUBCATEGORIES = "GET_SUBCATEGORIES";
export const GET_ID_SUBCATEGORY = "GET_ID_SUBCATEGORY";
export const POST_SUBCATEGORY = "POST_SUBCATEGORY";
export const UPDATE_SUBCATEGORY = "UPDATE_SUBCATEGORY";
export const DELETE_SUBCATEGORY = "DELETE_SUBCATEGORY";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_ID_PRODUCT = "GET_ID_PRODUCT";
export const POST_PRODUCT = "POST_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
//DEV

const categoriesURL = import.meta.env.VITE_API_CATEGORIES_URL;
const subcategoriesURL = import.meta.env.VITE_API_SUBCATEGORIES_URL;
const productsURL = import.meta.env.VITE_API_PRODUCTS_URL;

// Actions  de Categorias

export const GetCategories = () => {
  return async function (dispatch) {
    try {
      var response = await axios.get(categoriesURL);
      if (response.data !== null) {
        return dispatch({
          type: GET_CATEGORIES,
          payload: response.data,
        });
      } else {
        return dispatch({
          type: GET_CATEGORIES,
          payload: [],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const GetCategoriesDetail = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${categoriesURL}?id=${id}`);
      if (response.data) {
        return dispatch({
          type: GET_ID_CATEGORY,
          payload: response.data,
        });
      } else {
        return dispatch({
          type: GET_ID_CATEGORY,
          payload: [],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const PostCategory = (atributos) => {
  return async function (dispatch) {
    try {
      var f = new FormData();
      f.append("METHOD", "POST");
      f.append("title", atributos.title);
      f.append("picture", atributos.picture);
      var response = await axios.post(categoriesURL, f);
      console.log("Categoria Creando en: ", response.data);
      return dispatch({
        type: POST_CATEGORY,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const UpdateCategory = (id, atributos) => {
  return async function (dispatch) {
    try {
      var f = new FormData();
      f.append("METHOD", "PUT");
      f.append("title", atributos.title);
      f.append("picture", atributos.picture);
      var response = await axios.post(categoriesURL, f, { params: { id: id } });
      return dispatch({
        type: UPDATE_CATEGORY,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const DeleteCategory = (id) => {
  return async function (dispatch) {
    try {
      var f = new FormData();
      f.append("METHOD", "DELETE");
      var response = await axios.post(categoriesURL, f, { params: { id: id } });
      return dispatch({
        type: DELETE_CATEGORY,
        payload: response.id,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

//Actions de Subcategorias

export const GetSubcategories = () => {
  return async function (dispatch) {
    try {
      var response = await axios.get(subcategoriesURL);
      if (response.data !== null) {
        return dispatch({
          type: GET_SUBCATEGORIES,
          payload: response.data,
        });
      } else {
        return dispatch({
          type: GET_SUBCATEGORIES,
          payload: [],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const GetSubcategoriesDetail = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${subcategoriesURL}?id=${id}`);
      if (response.data) {
        return dispatch({
          type: GET_ID_SUBCATEGORY,
          payload: response.data,
        });
      } else {
        return dispatch({
          type: GET_ID_SUBCATEGORY,
          payload: [],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const PostSubcategory = (atributos) => {
  return async function (dispatch) {
    try {
      var f = new FormData();
      f.append("METHOD", "POST");
      f.append("title", atributos.title);
      f.append("picture", atributos.picture);
      f.append("id_category", atributos.id_category);
      var response = await axios.post(subcategoriesURL, f);
      console.log("Categoria Creando en: ", response.data);
      return dispatch({
        type: POST_CATEGORY,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const UpdatesubCategory = (id, atributos) => {
  return async function (dispatch) {
    try {
      var f = new FormData();
      f.append("METHOD", "PUT");
      f.append("title", atributos.title);
      f.append("id_category", atributos.id_category);
      f.append("picture", atributos.picture);
      var response = await axios.post(subcategoriesURL, f, {
        params: { id: id },
      });
      return dispatch({
        type: UPDATE_SUBCATEGORY,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const DeleteSubcategory = (id) => {
  return async function (dispatch) {
    try {
      var f = new FormData();
      f.append("METHOD", "DELETE");
      var response = await axios.post(subcategoriesURL, f, {
        params: { id: id },
      });
      return dispatch({
        type: DELETE_CATEGORY,
        payload: response.id,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

//actions de Productos

export const GetProducts = () => {
  return async function (dispatch) {
    try {
      var response = await axios.get(productsURL);
      if (response.data !== null) {
        return dispatch({
          type: GET_PRODUCTS,
          payload: response.data,
        });
      } else {
        return dispatch({
          type: GET_PRODUCTS,
          payload: [],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const GetProductDetail = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${productsURL}?id=${id}`);
      if (response.data) {
        return dispatch({
          type: GET_ID_PRODUCT,
          payload: response.data,
        });
      } else {
        return dispatch({
          type: GET_ID_PRODUCT,
          payload: [],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const PostProduct = (atributos) => {
  return async function (dispatch) {
    try {
      var f = new FormData();
      f.append("METHOD", "POST");
      f.append("title", atributos.title);
      f.append("summary", atributos.summary);
      f.append("code", atributos.code);
      f.append("id_subcategory", atributos.id_subcategory);
      f.append("picture", atributos.picture);
      var response = await axios.post(productsURL, f);
      console.log("Producto Creado en: ", response.data);
      return dispatch({
        type: POST_PRODUCT,
        payload: response.data,
      });
    } catch (error) {
      console.log("Error al publicar el producto:", error);
      throw error; // Lanzar el error para que se maneje en el componente
    }
  };
};


export const UpdateProduct = (id, atributos) => {
  return async function (dispatch) {
    try {
      var f = new FormData();
      f.append("METHOD", "PUT");
      f.append("title", atributos.title);
      f.append("summary", atributos.summary);
      f.append("code", atributos.code);
      f.append("id_subcategory", atributos.id_subcategory);
      f.append("picture", atributos.picture);
      var response = await axios.post(productsURL, f, {
        params: { id: id },
      });
      return dispatch({
        type: UPDATE_PRODUCT,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const DeleteProduct = (id) => {
  return async function (dispatch) {
    try {
      var f = new FormData();
      f.append("METHOD", "DELETE");
      var response = await axios.post(productsURL, f, {
        params: { id: id },
      });
      return dispatch({
        type: DELETE_PRODUCT,
        payload: response.id,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

