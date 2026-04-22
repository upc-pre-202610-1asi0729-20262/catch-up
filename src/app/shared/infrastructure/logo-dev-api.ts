import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Infrastructure service for generating logo URLs via an external logo provider API.
 *
 * @remarks
 * This service implements the infrastructure layer, providing logo URLs for
 * news sources through an external logo provider service (Logo.dev). It acts
 * as a gateway to convert domain or website URLs into corresponding logo image
 * URLs. The service is configured through environment settings and is provided
 * as a singleton (root-level injection).
 *
 * The service is used primarily to enrich Source and Article entities with
 * visual assets during data assembly in the infrastructure layer.
 *
 * @example
 * ```typescript
 * constructor(private logoApi: LogoDevApi) {}
 *
 * const logoUrl = this.logoApi.getUrlToLogo('https://bbc.com');
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class LogoDevApi {
  /** Base URL for the logo provider API from environment configuration. */
  baseUrl = environment.logoProviderApiBaseUrl;

  /** API key or authentication token for the logo provider from environment configuration. */
  apiKey = environment.logoProviderPublishableKey;

  /**
   * Constructs the LogoDevApi service instance.
   *
   * @remarks
   * The constructor is intentionally empty as all configuration is provided
   * through environment settings. The service is stateless and safe to use
   * as a singleton.
   */
  constructor() {}

  /**
   * Generates a logo URL for a given domain using the external logo provider API.
   *
   * @remarks
   * This method constructs a complete logo URL by combining the provider's base
   * URL with the extracted hostname from the input domain URL and the API key.
   * It extracts the hostname using the browser's native URL API for robustness.
   *
   * @param domain - The full URL or domain name to fetch the logo for
   *                 (e.g., 'https://bbc.com' or 'bbc.com').
   *
   * @returns A complete URL string pointing to the logo image for the given domain.
   *          The URL includes authentication and formatting parameters required
   *          by the logo provider.
   *
   * @example
   * ```typescript
   * const logoUrl = this.logoApi.getUrlToLogo('https://example.com');
   * // Returns: 'https://logo.clearbit.com/example.com?token=abc123'
   * ```
   */
  getUrlToLogo(domain: string): string {
    return `${this.baseUrl}${new URL(domain).hostname}?token=${this.apiKey}`;
  }
}
