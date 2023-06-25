import { createRouter, createWebHistory } from 'vue-router'
import Top from '@/views/TopPage.vue'
import RecordAnalysis from '@/views/RecordAnalysis.vue'
import Inquiry from '@/views/Inquiry'
import HouseholdAccountBook from '@/views/HouseholdAccountBook'
import NarrowDown from '@/views/NarrowDown'

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
        path: '/inquiry',
        name: 'Inquiry',
        component: Inquiry
    },
    {
        path: '/create',
        name: 'HouseholdAccountBook',
        component: HouseholdAccountBook
    },
    {
        path: '/narrowDown',
        name: 'NarrowDown',
        component: NarrowDown
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router