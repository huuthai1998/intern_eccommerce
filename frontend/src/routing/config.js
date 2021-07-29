import ForgotPassword from 'component/ForgotPassword'
import Login from 'component/Login'
import Register from 'component/Register'
import AddProduct from 'pages/AddProduct/AddProduct'
import Home from 'pages/Home'
import ResetPassword from 'pages/ResetPassword'
import SellerLogin from 'pages/SellerLogin/SellerLogin'
import AddCategory from 'pages/SellerCategories/AddCategory'
import SellerProducts from 'pages/SellerProducts/SellerProducts'
import routePaths from 'routing/paths'
import SellerCategories from 'pages/SellerCategories/SellerCategories'
import Browse from 'pages/Browse/Browse'
import Product from 'pages/Product/Product'
import EditProduct from 'pages/EditProduct/EditProduct'
import Cart from 'pages/Cart/Cart'
import Orders from 'pages/Orders/Orders'

const config = [
  { path: routePaths.HOME, exact: true, component: Home },
  {
    path: routePaths.LOGIN,
    component: Login,
    unAuthOnly: true,
    redirect: routePaths.HOME,
  },
  {
    path: routePaths.REGISTER,
    component: Register,
    redirect: routePaths.HOME,
    unAuthOnly: true,
  },
  {
    path: routePaths.SELLER_LOGIN,
    component: SellerLogin,
    unAuthOnly: true,
    redirect: routePaths.HOME,
  },
  { path: routePaths.RESET_PASSWORD, component: ResetPassword },
  { path: routePaths.FORGOT_PASSWORD, component: ForgotPassword },
  {
    path: routePaths.ADD_PRODUCT,
    component: AddProduct,
    authOny: true,
    adminOnly: true,
    name: 'Add product',
    redirect: routePaths.HOME,
  },
  {
    path: routePaths.EDIT_PRODUCT,
    component: EditProduct,
    authOny: true,
    adminOnly: true,
    name: 'Edit product',
    redirect: routePaths.HOME,
  },
  {
    path: routePaths.SELLER_PRODUCTS,
    component: SellerProducts,
    authOny: true,
    adminOnly: true,
    name: 'Products',
    redirect: routePaths.SELLER_LOGIN,
  },
  {
    path: routePaths.ORDERS,
    component: Orders,
    authOny: true,
    adminOnly: true,
    name: 'Orders',
    redirect: routePaths.SELLER_LOGIN,
  },
  {
    path: routePaths.ADD_CATEGORY,
    component: AddCategory,
    authOny: true,
    adminOnly: true,
    name: 'Categories',
    redirect: routePaths.SELLER_LOGIN,
  },
  {
    path: routePaths.SELLER_CATEGORY,
    component: SellerCategories,
    authOny: true,
    adminOnly: true,
    name: 'Categories',
    redirect: routePaths.SELLER_LOGIN,
  },
  {
    path: routePaths.BROWSE,
    component: Browse,
  },
  {
    path: routePaths.PRODUCT,
    component: Product,
  },
  {
    path: routePaths.CART,
    component: Cart,
  },
]

export default config
