import Home from '../components/Home.vue';
import Header from '../Components/Header.vue';
import SignUp from '../Components/SignUp.vue';

const List = resolve => {
    require.ensure(['../Components/List.vue'], () => {
        resolve(require('../Components/List.vue'));
    });
};

export const routes = [
    { path: '/',
      name: 'myHome',
      components: {
        default: Home,
        'header-top': Header
        }
    },
    { path: '/list',
     name: 'myList',
     components: {
        default: List,
        'header-top': Header
        }
    },
    { path: '/login',
      name: 'myLogin',
      components: {
        default: SignUp
        }
    },
    { path: '/*', redirect: '/' }
];
