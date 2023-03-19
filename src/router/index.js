import { createRouter, createWebHistory } from 'vue-router'
import Top from '@/views/TopPage.vue'
import RecordAnalysis from '@/views/RecordAnalysis.vue'
import Login from '@/views/Login'
import Signup from '@/views/Signup'
import Mypage from '@/views/Mypage'
import Inquiry from '@/views/Inquiry'
import HouseholdAccountBook from '@/views/HouseholdAccountBook'

const routes = [
    {
        path: '/top',
        name: 'Top',
        component: Top
    },
    {
        path: '/record',
        name: 'RecordAnalysis',
        component: RecordAnalysis
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
    {
        path: '/mypage',
        name: 'Mypage',
        component: Mypage
    },
    {
        path: '/inquiry',
        name: 'Inquiry',
        component: Inquiry
    },
    {
        path: '/create',
        name: 'HouseholdAccountBook',
        component: HouseholdAccountBook
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router