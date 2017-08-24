var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, Inject, forwardRef } from '@angular/core';
import { Subject } from 'rxjs';
import * as pica from 'bergben-pica';
import { ImgExifService } from './img-exif.service';
var Ng2PicaService = /** @class */ (function () {
    function Ng2PicaService(imageExifService) {
        this.imageExifService = imageExifService;
    }
    Ng2PicaService.prototype.resize = function (files, width, height, keepAspectRatio) {
        var _this = this;
        if (keepAspectRatio === void 0) { keepAspectRatio = false; }
        var resizedFile = new Subject();
        files.forEach(function (file) {
            _this.resizeFile(file, width, height, keepAspectRatio).then(function (returnedFile) {
                resizedFile.next(returnedFile);
            }).catch(function (error) {
                resizedFile.error(error);
            });
        });
        return resizedFile.asObservable();
    };
    Ng2PicaService.prototype.resizeCanvas = function (from, to, options) {
        var result = new Promise(function (resolve, reject) {
            var curPica = pica;
            if (!curPica || !curPica.resizeCanvas) {
                curPica = window.pica;
            }
            curPica.resizeCanvas(from, to, options, function (error) {
                //resize complete
                if (error) {
                    reject(error);
                }
                else {
                    //success
                    resolve(to);
                }
            });
        });
        return result;
    };
    Ng2PicaService.prototype.resizeBuffer = function (options) {
        var result = new Promise(function (resolve, reject) {
            var curPica = pica;
            if (!curPica || !curPica.resizeCanvas) {
                curPica = window.pica;
            }
            curPica.resizeBuffer(options, function (error, output) {
                //resize complete
                if (error) {
                    reject(error);
                }
                else {
                    //success
                    resolve(output);
                }
            });
        });
        return result;
    };
    Ng2PicaService.prototype.resizeFile = function (file, width, height, keepAspectRatio) {
        var _this = this;
        if (keepAspectRatio === void 0) { keepAspectRatio = false; }
        var result = new Promise(function (resolve, reject) {
            var fromCanvas = document.createElement('canvas');
            var ctx = fromCanvas.getContext('2d');
            var img = new Image();
            img.onload = function () {
                _this.imageExifService.getOrientedImage(img).then(function (orientedImg) {
                    window.URL.revokeObjectURL(img.src);
                    fromCanvas.width = orientedImg.width;
                    fromCanvas.height = orientedImg.height;
                    ctx.drawImage(orientedImg, 0, 0);
                    var imageData = ctx.getImageData(0, 0, orientedImg.width, orientedImg.height);
                    if (keepAspectRatio) {
                        var ratio = Math.min(width / imageData.width, height / imageData.height);
                        width = Math.round(imageData.width * ratio);
                        height = Math.round(imageData.height * ratio);
                    }
                    var useAlpha = true;
                    if (file.type === "image/jpeg" || (file.type === "image/png" && !_this.isImgUsingAlpha(imageData))) {
                        //image without alpha
                        useAlpha = false;
                        ctx = fromCanvas.getContext('2d', { 'alpha': false });
                        ctx.drawImage(orientedImg, 0, 0);
                    }
                    var toCanvas = document.createElement('canvas');
                    toCanvas.width = width;
                    toCanvas.height = height;
                    _this.resizeCanvas(fromCanvas, toCanvas, { 'alpha': useAlpha })
                        .then(function (resizedCanvas) {
                        resizedCanvas.toBlob(function (blob) {
                            var newFile = _this.generateResultFile(blob, file.name, file.type, new Date().getTime());
                            resolve(newFile);
                        }, file.type);
                    })
                        .catch(function (error) {
                        reject(error);
                    });
                });
            };
            img.src = window.URL.createObjectURL(file);
        });
        return result;
    };
    Ng2PicaService.prototype.isImgUsingAlpha = function (imageData) {
        for (var i = 0; i < imageData.data.length; i += 4) {
            if (imageData.data[i + 3] !== 255) {
                return true;
            }
        }
        return false;
    };
    Ng2PicaService.prototype.generateResultFile = function (blob, name, type, lastModified) {
        var resultFile = new Blob([blob], { type: type });
        return this.blobToFile(resultFile, name, lastModified);
    };
    Ng2PicaService.prototype.blobToFile = function (blob, name, lastModified) {
        var file = blob;
        file.name = name;
        file.lastModified = lastModified;
        //Cast to a File() type
        return file;
    };
    Ng2PicaService = __decorate([
        Injectable(),
        __param(0, Inject(forwardRef(function () { return ImgExifService; })))
    ], Ng2PicaService);
    return Ng2PicaService;
}());
export { Ng2PicaService };
//# sourceMappingURL=ng2-pica.service.js.map