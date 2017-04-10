var xlsx = require("node-xlsx");
var fs = require('fs');

var sheet = xlsx.parse("Region.xls");
if (!sheet || sheet.length == 0) {
    console.log('No Data');
    return;
}

var list = sheet[0].data;
var sql = 'set global max_allowed_packet = 2*1024*1024*10;\n';
sql += 'INSERT INTO config_region VALUES \n';
var provinceList = [];
var regionId = 1;
list.forEach(function (item) {
    if (item[2] == 0) {
        provinceList.push({ name: item[1], parentId: 0, sourceRegionId: item[0] });
    }
})

//1.初始化省份数据
provinceList.forEach(function (item) {
    var name = item.name.indexOf("省") > 0 || item.name.indexOf("市") > 0 ? item.name.substring(0, item.name.length - 1) : item.name;
    sql += "(" + regionId + "," + item.parentId + ",'" + name + "', 1, 0, 0, sysdate(), 0, 1),\n";
    var provinceId = regionId;
    regionId++;
})

regionId = 101;//省份初始化完，100以内预留将来添加省份信息
provinceList.forEach(function (item, index) {
    var provinceId = index + 1;
    //2.初始化城市信息
    list.forEach(function (subItem) {
        if (subItem[2] == item.sourceRegionId) {
            sql += "(" + regionId + "," + provinceId + ",'" + subItem[1] + "', 1, 0, 0, sysdate(), 0, 1),\n";
            var cityId = regionId;
            regionId++;
            //3.初始化地区/县信息
            list.forEach(function (sssubItem) {
                if (subItem[0] == sssubItem[2]) {
                    sql += "(" + regionId + "," + cityId + ",'" + sssubItem[1] + "', 1, 0, 0, sysdate(), 0, 1),\n";
                    regionId++;
                }
            })
        }
    })
    regionId++;
    console.log(item.name + " Done");
})

fs.writeFile('sql/initRegion.sql', sql, function (err) {
    if (err) throw err;
    console.log('finished');
});
