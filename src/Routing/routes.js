import Home from '../components/Home.vue';
import Header from '../Components/Header.vue';
import SignUp from '../Components/SignUp.vue';
import Footer from '../Components/Footer.vue';

const List = resolve => {
    require.ensure(['../Components/List.vue'], () => {
        resolve(require('../Components/List.vue'));
    });
};

export const routes = [    
    { path: '/', name: 'myHome', components: {
        default: Home,
        'header-top': Header,
        'app-footer': Footer  
    } },
    { path: '/list', name: 'myList', components: {
        default: List,
        'header-top': Header,
        'app-footer': Footer
    } },
    { path: '/login', name: 'myLogin', components: {
        default: SignUp
    } },
    // { path: '/user', components: {
    //     default: User,
    //     'header-bottom': Header
    // }, children: [
    //     { path: '', component: UserStart },
    //     { path: ':id', component: UserDetail, beforeEnter: (to, from, next) => {
    //         console.log('inside route setup');
    //         next();
    //     } },
    //     { path: ':id/edit', component: UserEdit, name: 'userEdit' }
    // ] },
    { path: '/*', redirect: '/' }
];