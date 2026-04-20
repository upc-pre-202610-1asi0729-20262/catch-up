import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogoDevApi {
  baseUrl = environment.logoProviderApiBaseUrl;
  apKey = environment.logoProviderPublishableKey;

  constructor() {}
  // TODO: Implement getUrlToLogo(source: Source)
}
