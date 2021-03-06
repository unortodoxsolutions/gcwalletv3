var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { GCApp } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { EmailNotificationsProvider } from '../providers/email-notifications/email-notifications';
import { ProfileProvider } from '../providers/profile/profile';
import { ProvidersModule } from './../providers/providers.module';
describe('GCApp', () => {
    let fixture;
    let component;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GCApp],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                IonicModule.forRoot(GCApp),
                ProvidersModule,
                HttpClientTestingModule,
                TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
                })
            ],
            providers: [{ provide: 'console', useValue: { log: () => undefined } }]
        });
    }));
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        fixture = TestBed.createComponent(GCApp);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    afterEach(() => {
        spyOn(component, 'ngOnDestroy');
        fixture.destroy();
    });
    it('should be created', () => {
        expect(component instanceof GCApp).toBe(true);
    });
    describe('Methods', () => {
        describe('onProfileLoad', () => {
            let emailNotificationsProvider;
            beforeEach(() => {
                emailNotificationsProvider = TestBed.get(EmailNotificationsProvider);
                spyOn(emailNotificationsProvider, 'init');
            });
            it('should init email notifications', () => {
                component.onProfileLoad({});
                expect(emailNotificationsProvider.init).toHaveBeenCalled();
            });
            it('should create a new profile if none returned', () => {
                const profileProvider = TestBed.get(ProfileProvider);
                spyOn(profileProvider, 'createProfile');
                component.onProfileLoad();
                expect(profileProvider.createProfile).toHaveBeenCalled();
            });
        });
        describe('handleDeepLinksNW', () => {
            beforeEach(() => {
                window.require = () => {
                    return {
                        App: {
                            on: () => { },
                            argv: ['URL']
                        }
                    };
                };
                window._urlHandled = false;
            });
            afterEach(() => {
                delete window.require;
                delete window._urlHandled;
            });
            it('should not try to handle deeplinks if was already handled', () => {
                jasmine.clock().install();
                const spy = spyOn(component, 'handleOpenUrl');
                component.handleDeepLinksNW();
                jasmine.clock().tick(1001);
                component.handleDeepLinksNW();
                jasmine.clock().tick(1001);
                expect(spy).toHaveBeenCalledTimes(1);
                jasmine.clock().uninstall();
            });
        });
    });
});
//# sourceMappingURL=app.component.spec.js.map