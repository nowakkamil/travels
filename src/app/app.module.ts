import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app.component';
import { TravelsComponent } from './components/travels/travels.component';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { NzFormModule } from 'ng-zorro-antd/form';

import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { HttpClientModule } from '@angular/common/http';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_GB } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { TripComponent } from './components/trip/trip.component';
import { TripRatingComponent } from './components/trip-rating/trip-rating.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { TripCreationComponent } from './components/trip-creation/trip-creation.component';
import { FilterComponent } from './components/filter/filter.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { AuthComponent } from './components/auth/auth.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    TravelsComponent,
    TripComponent,
    TripRatingComponent,
    ShoppingCartComponent,
    TripCreationComponent,
    FilterComponent,
    TripDetailsComponent,
    AuthComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NzButtonModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatBadgeModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzFormModule,
    NzRateModule,
    NzMessageModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NzSliderModule,
    NzDatePickerModule,
    NzInputModule,
    NzInputNumberModule,
    NzCarouselModule,
    NzCardModule,
    NzPopconfirmModule,
    NzBadgeModule,
    NzDescriptionsModule,
    NzCommentModule,
    NzModalModule,
    NzTagModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_GB }, AngularFireDatabaseModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
