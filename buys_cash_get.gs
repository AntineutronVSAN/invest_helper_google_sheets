const buyCashCode = '3';
const buyCashSheetName = 'buys';

function getBuysCash() {

  var listOfBuys = [];

  var currentSheet = SpreadsheetApp.openById(openSheetName);
  var buysCashStatusesSheet = currentSheet.getSheetByName(buyCashSheetName);

  var rowsCount = buysCashStatusesSheet.getLastRow()+1;
  
  for(var i=2; i<rowsCount; i++) {
    var curModel = new BuyCashModel();
    var curRow = buysCashStatusesSheet.getRange(`${i}:${i}`).getValues()[0];
    curModel.fromRow(curRow);
    var curModelJson = curModel.toJson();
    listOfBuys.push(curModelJson);
  }


  var result = {
    "status": "success", 
    "result": listOfBuys,
  };

  return ContentService
  .createTextOutput(JSON.stringify(result))
  .setMimeType(ContentService.MimeType.JSON);
} 

const buyCashIdKey = 'id';
const buyCashDateKey = 'dateTime';
const buyCashPairKey = 'pair';
const buyCashCourseKey = 'course';
const buyCashValueKey = 'count';
const buyCashWhereKey = 'whereKeep';
const buyCashStatusKey = 'status';

var BuyCashModel = function() {

  this.id = -1;
  this.date = '01.01.1998';
  this.pair = 'usdusd';
  this.course = 0.01;
  this.value = 100.0;
  this.where = 'tinkoff';
  this.status = 1;

  this.fromJson = function(json) {
    this.id = json[buyCashIdKey];
    this.date = json[buyCashDateKey];
    this.pair = json[buyCashPairKey];
    this.course = json[buyCashCourseKey];
    this.value = json[buyCashValueKey];
    this.where = json[buyCashWhereKey];
    this.status = json[buyCashStatusKey];
  }

  this.toJson = function() {
    var result = {};
    result[buyCashStatusIdKey] = this.id;
    result[buyCashDateKey] = this.date;
    result[buyCashPairKey] = this.pair;
    result[buyCashCourseKey] = this.course;
    result[buyCashValueKey] = this.value;
    result[buyCashWhereKey] = this.where;
    result[buyCashStatusKey] = this.status;

    return result;
  }

  this.fromRow = function(row) {
    this.id = row[0];
    this.date = row[1];
    this.pair = row[2];
    this.course = row[3];
    this.value = row[4];
    this.where = row[5];
    this.status = row[6];
  }

  this.toRow = function() {
    var result = [];
    result.push(this.id);
    result.push(this.date);
    result.push(this.pair);
    result.push(this.course);
    result.push(this.value);
    result.push(this.where);
    result.push(this.status);
    return result;
  }



}