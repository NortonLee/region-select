var express = require('express');
var region = require('./controllers/region');
var router = express.Router();

router.get('/index', function (req, res) {
    res.render('index', {
        title: "省份"
    })
});

router.get('/api/getProvinceList', region.getProvinceList);
router.get('/api/getCityList/:provinceId', region.getCityList)
router.get('/api/getAreaList/:cityId', region.getAreaList)
router.get('/api/getTownList/:areaId', region.getTownList)

module.exports = router;