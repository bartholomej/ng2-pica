var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { Ng2PicaService } from './ng2-pica.service';
import { ImgExifService } from './img-exif.service';
var Ng2PicaModule = /** @class */ (function () {
    function Ng2PicaModule() {
    }
    Ng2PicaModule = __decorate([
        NgModule({
            providers: [
                { provide: Ng2PicaService, useClass: Ng2PicaService },
                { provide: ImgExifService, useClass: ImgExifService }
            ]
        })
    ], Ng2PicaModule);
    return Ng2PicaModule;
}());
export { Ng2PicaModule };
//# sourceMappingURL=ng2-pica.module.js.map