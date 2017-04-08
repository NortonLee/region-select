var https = require("https");
var format = require("string-template");

exports.getProvinceList = function (req, res, next) {
    var _self = res;
    https.get('https://home.m.jd.com/maddress/selectProvince.action', function (req, res) {
        var datas = [];
        var size = 0;
        req.on('data', function (data) {
            datas.push(data);
            size += data.length;
        });
        req.on('end', function (res) {
            var buff = Buffer.concat(datas, size);
            _self.writeHead(200, { 'Content-Type': 'application/json;charset=UTF-8' });
            return _self.end(buff);
        });
    });
};
exports.getCityList = function (req, res, next) {
    var _self = res;
    https.get('https://home.m.jd.com/maddress/selectCity.action?idProvince=' + req.params.provinceId, function (req, res) {
        var datas = [];
        var size = 0;
        req.on('data', function (data) {
            datas.push(data);
            size += data.length;
        });
        req.on('end', function (res) {
            var buff = Buffer.concat(datas, size);
            _self.writeHead(200, { 'Content-Type': 'application/json;charset=UTF-8' });
            return _self.end(buff);
        });
    });
};
exports.getAreaList = function (req, res, next) {
    var _self = res;
    https.get('https://home.m.jd.com/maddress/selectArea.action?idCity=' + req.params.cityId, function (req, res) {
        var datas = [];
        var size = 0;
        req.on('data', function (data) {
            datas.push(data);
            size += data.length;
        });
        req.on('end', function (res) {
            var buff = Buffer.concat(datas, size);
            _self.writeHead(200, { 'Content-Type': 'application/json;charset=UTF-8' });
            return _self.end(buff);
        });
    });
};
exports.getTownList = function (req, res, next) {
    var _self = res;
    https.get('https://home.m.jd.com/maddress/selectTown.action?idArea=' + req.params.areaId, function (req, res) {
        var datas = [];
        var size = 0;
        req.on('data', function (data) {
            datas.push(data);
            size += data.length;
        });
        req.on('end', function (res) {
            var buff = Buffer.concat(datas, size);
            _self.writeHead(200, { 'Content-Type': 'application/json;charset=UTF-8' });
            return _self.end(buff);
        });
    });
};