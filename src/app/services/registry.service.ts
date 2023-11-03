import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RegistryResource } from '../models/registry-resource';

@Injectable()
export class RegistryService {

  private baseUrl = environment.baseUrl.concat('/registry');

  constructor(private httpClient: HttpClient) {}

  getLastRegistration(): Observable<RegistryResource> {
    return this.getHttpClient().get<RegistryResource>(`${this.baseUrl}/last-registration`);
  }

  registerEntry(): Observable<string> {
    return this.getHttpClient().post<string>(`${this.baseUrl}/entry`, null);
  }

  registerExit(): Observable<string> {
    return this.getHttpClient().post<string>(`${this.baseUrl}/exit`, null);
  }

  private getHttpClient(): HttpClient {
    return this.httpClient;
  }

}
