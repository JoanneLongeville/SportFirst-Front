import { createRouter, createWebHistory } from 'vue-router';
import ResetPassword from '../components/ResetPassword.vue';
import Home from '../views/Home.vue';
import SignUp from '../components/SignUp.vue';
import Session from '../components/Session.vue';
import PricingCourse from '../components/PricingCourse.vue';
import ProfilePage from '../components/ProfilePage.vue';

const routes = [
    { path: '/', name: 'Home', component : Home },
    { path: '/signup', name: 'SignUp', component: SignUp },
    { path: '/session/:userId', name: 'Session', component: Session, props: true },
    { path: '/reset-password', name: 'ResetPassword', component: ResetPassword },
    { path: '/pricing', name: 'PricingCourse', component: PricingCourse },
    { path: '/profile-page', name: 'ProfilePage', component: ProfilePage },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
