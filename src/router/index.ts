/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { accessService } from '@/services/accessService';
import { useAlertStore, useUserStore } from '@/stores'
import { SYSTEM_MESSAGES } from '@/constants/messages';

const PUBLIC_ROUTES = ['/']
const SUPERUSER_ROUTES = [
  '/administracao',
  '/administracao/clientes',
  '/administracao/usuarios',
  '/administracao/sistemas',
];
routes.forEach((route) => {
  if (PUBLIC_ROUTES.includes(route.path)) {
    route.meta = { ...route.meta, public: true }
  }
  if (SUPERUSER_ROUTES.includes(route.path)) {
    route.meta = { ...route.meta, superuser: true };
  }
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

// Guard para bloquear acesso não autenticado
router.beforeEach(async (to, from, next) => {
  const isPublic = to.meta.public === true;
  const isAuthenticated = !!accessService.getAccess();

  if (isPublic) {
    return next();
  }

  if (!isAuthenticated) {
    const alertStore = useAlertStore();
    alertStore.setMessage(SYSTEM_MESSAGES.ERROR.PAGE_NOT_FOUND);
    return next({ path: '/' });
  }

  const userStore = useUserStore();
  
  try {
    if (!userStore.myUser) {
      await userStore.fetchMyUser();
    }

    const requiresSuperuser = to.meta.superuser === true;
    if (requiresSuperuser && !userStore.myUser?.is_superuser) {
      const alertStore = useAlertStore();
      alertStore.setMessage(SYSTEM_MESSAGES.ERROR.PAGE_NOT_FOUND); 
      return next({ path: '/financeiro' });
    }

  } catch (error) {
    accessService.removeAccess();
    userStore.resetState();
    return next({ path: '/' });
  }
  
  next();
});

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
