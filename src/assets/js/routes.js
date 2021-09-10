import Home from "../../pages/Home";
import Writing from "../../pages/Writing";
import About from "../../pages/About";
import Ask from "../../pages/Ask";
import Control from "../../pages/Control";
import Friend from "../../pages/Friend";
import Pictures from "../../pages/Pictures";
import Videos from "../../pages/Videos";
import WritingDetail from "../../pages/WritingDetail";

import homeIcon from '../img/023-home.png';
import writingIcon from '../img/006-newsfeed.png';
import pictIcon from '../img/013-image.png';
import storyIcon from '../img/024-stories.png';
import aboutIcon from '../img/020-add friend.png';
import messageIcon from '../img/004-comment.png';
import friendIcon from '../img/017-friends.png';
import adminIcon from '../img/019-hashtag.png';

const writing = [
  {
    path: "/detail",
    exact: true,
    main: () => <WritingDetail></WritingDetail>
    //   sidebar: () => <div>home!</div>,
  }
]

const menus = [
  {},
  {
    path: "/",
    exact: true,
    icon: homeIcon,
    main: () => <Home></Home>
    //   sidebar: () => <div>home!</div>,
  },
  {
    path: "/control-goods",
    exact: true,
    icon: writingIcon,
    main: () => <Writing></Writing>
  //   sidebar: () => <div>bubblegum!</div>,
  },
  {
      path: "/control-production",
      icon: pictIcon,
      main: () => <Pictures></Pictures> 
      //   sidebar: () => <div>shoelaces!</div>,
  },
  {
      path: "/control-selling",
      icon: storyIcon,
      main: () => <Videos></Videos>
      //   sidebar: () => <div>shoelaces!</div>,
  },
  {
    path: "/report",
    icon: aboutIcon,
    main: () => <About></About>
  //   sidebar: () => <div>shoelaces!</div>,
  },
  // {
  //   path: "/ask",
  //   icon: messageIcon,
  //   main: () => <Ask></Ask>
  // //   sidebar: () => <div>shoelaces!</div>,
  // },
  // {
  //   path: "/friend",
  //   icon: friendIcon,
  //   main: () => <Friend></Friend>
  // //   sidebar: () => <div>shoelaces!</div>,
  // },
  // {
  //   path: "/control",
  //   icon: adminIcon,
  //   main: () => <Control></Control>
  // //   sidebar: () => <div>shoelaces!</div>,
  // }
];

const routes = {
   menus,
   writing
};





export default routes;