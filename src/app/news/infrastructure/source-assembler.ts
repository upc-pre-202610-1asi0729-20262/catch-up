import { LogoDevApi } from '../../shared/infrastructure/logo-dev-api';
import { SourceResource, SourcesResponse } from './sources-response';
import { Source } from '../domain/model/source.entity';

export class SourceAssembler {
  static logoApi: LogoDevApi;

  static withLogoApi(logoApi: LogoDevApi) {
    this.logoApi = logoApi;
    return this;
  }

  static toEntityFromResource(resource: SourceResource): Source {
    return {
      id: resource.id,
      name: resource.name,
      url: resource.url || '',
      urlToLogo: this.logoApi.getUrlToLogo(resource.url || ''),
    }
  }

  static toEntitiesFromResponse(response: SourcesResponse): Source[] {
    return response.sources.map((source) => this.toEntityFromResource(source));
  }
}
