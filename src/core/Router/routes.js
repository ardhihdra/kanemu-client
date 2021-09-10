import Home from "../../pages/Home";
import About from "../../pages/About";
import Pictures from "../../pages/Pictures";

import homeIcon from '../../assets/img/023-home.png';
import pictIcon from '../../assets/img/013-image.png';
import aboutIcon from '../../assets/img/020-add friend.png';

const menus = [
  {
    path: "/",
    exact: true,
    icon: homeIcon,
    main: () => <Home></Home>
  },
  {
    path: "/catalogue",
    icon: pictIcon,
    main: () => <Pictures></Pictures> 
    //   sidebar: () => <div>shoelaces!</div>,
  },
  {
    path: "/about",
    exact: true,
    icon: aboutIcon,
    main: () => <About></About>
  },
];

const routes = {
   menus
};

export default routes;