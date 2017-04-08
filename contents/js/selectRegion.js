var app = new Vue({
    el: '#app',
    data: {
        vm: {
            provinceList: {},
            provinceSelected: [],
            citySelected: [],
            areaSelected: [],
            townSelected: [],
            selectProvinceName: '请选择',
            selectCityName: '',
            selectAreaName: '',
            currentRegionLevel: 0
        }
    },
    methods: {
        init: function () {
            this.getProvinceList();
        },
        getProvinceList: function () {
            var _self = this;
            $.get('/api/getProvinceList', function (data) {
                _self.vm.provinceList = data.addressList;
            })
        },
        selectProvince: function (id) {
            var _self = this;
            this.vm.provinceSelected = [];
            this.vm.provinceSelected[id] = true;
            this.vm.selectProvinceName = this.getRegionNameById(this.vm.provinceList, id);
            $('.address-content').attr("style", "transform:translate(" + window.innerWidth * (_self.vm.currentRegionLevel + 1) * -1 + "px,0px) translateZ(0px);");
            _self.vm.selectCityName = '请选择';
            $.get('/api/getCityList/' + id, function (data) {
                _self.vm.cityList = data.addressList;
                _self.vm.currentRegionLevel = 1;
            })
        },
        selectCity: function (id) {
            var _self = this;
            this.vm.citySelected = [];
            this.vm.citySelected[id] = true;
            $('.address-content').attr("style", "transform:translate(" + window.innerWidth * (_self.vm.currentRegionLevel + 1) * -1 + "px,0px) translateZ(0px);");
            this.vm.selectCityName = this.getRegionNameById(this.vm.cityList, id);
            _self.vm.selectAreaName = '请选择';
            $.get('/api/getAreaList/' + id, function (data) {
                _self.vm.areaList = data.addressList;
                _self.vm.currentRegionLevel = 2;
            })
        },
        selectArea: function (id) {
            var _self = this;
            this.vm.areaSelected = [];
            this.vm.areaSelected[id] = true;
            $('.address-content').attr("style", "transform:translate(" + window.innerWidth * (_self.vm.currentRegionLevel + 1) * -1 + "px,0px) translateZ(0px);");
            this.vm.selectAreaName = this.getRegionNameById(this.vm.areaList, id);
            _self.vm.selectTownName = '请选择';
            $.get('/api/getTownList/' + id, function (data) {
                _self.vm.townList = data.addressList;
                _self.vm.currentRegionLevel = 3;
            })
        },
        selectTown: function (id) {
            var _self = this;
            this.vm.townSelected = [];
            this.vm.townSelected[id] = true;
            this.vm.selectTownName = this.getRegionNameById(this.vm.townList, id);
            alert("你选择的地址是：" + this.vm.selectProvinceName + " " + this.vm.selectCityName + " " + this.vm.selectAreaName + " " + this.vm.selectTownName);
        },
        getRegionNameById: function (list, id) {
            var name = '';
            list.forEach(function (item) {
                if (item.id == id) {
                    name = item.name;
                }
            });
            return name;
        },
        setCurrentRegionLevel: function (level) {
            this.vm.currentRegionLevel = level;
            switch (level) {
                case 0:
                    this.vm.selectProvinceName = '请选择';
                    this.vm.selectCityName = '';
                    this.vm.selectAreaName = '';
                    this.vm.selectTownName = '';
                    break;
                case 1:
                    this.vm.selectCityName = '请选择';
                    this.vm.selectAreaName = '';
                    this.vm.selectTownName = '';
                    break;
                case 2:
                    this.vm.selectAreaName = '请选择';
                    this.vm.selectTownName = '';
                    break;
            }
            $('.address-content').attr("style", "transform:translate(" + window.innerWidth * (level) * -1 + "px,0px) translateZ(0px);");
        }
    }
});

app.init();

$(".address-ul li").on('click', function () {
    $(this).addClass("checked-color");
    $(this).append("<span class='check-pic'></span>");
});