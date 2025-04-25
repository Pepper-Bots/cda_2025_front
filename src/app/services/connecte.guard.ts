import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';

// Ici pas sécurité mais ergonomie pour l'utilisateur
// le but d'un guard est de nous empêcher d'aller sur certaines pages
// -> si true on peut aller sur les pages, si false on ne peut pas
export const connecteGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService)

  if (auth.connecte) {
    return true;
  }

    const router : Router = inject(Router);
    return router.parseUrl('/connexion')

};
