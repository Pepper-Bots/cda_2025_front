import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';

export const vendeurGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService)

  if (auth.role == "ROLE_VENDEUR" || auth.role == "ROLE_CHEF_RAYON") {
    return true
  }

  const router: Router = inject(Router);
  return router.parseUrl('/connexion')

};
