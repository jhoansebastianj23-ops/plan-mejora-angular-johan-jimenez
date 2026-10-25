import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { jwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [provideHttpClient(withInterceptors([jwtInterceptor]))],
})
export class CoreModule {}