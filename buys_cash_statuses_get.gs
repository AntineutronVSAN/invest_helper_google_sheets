const buyCashStatesesCode = '2';
const buyCashStatesesSheetName = 'buys_status';

function getBuyCashStatuses() {

  var listOfStatuses = [];

  var currentSheet = SpreadsheetApp.openById(openSheetName);
  var buysCashStatusesSheet = currentSheet.getSheetByName(buyCashStatesesSheetName);

  var rowsCount = buysCashStatusesSheet.getLastRow()+1;
  
  for(var i=2; i<rowsCount; i++) {
    var curModel = new BuyCashStatusModel();
    var curRow = buysCashStatusesSheet.getRange(`${i}:${i}`).getValues()[0];
    curModel.fromRow(curRow);
    var curModelJson = curModel.toJson();
    listOfStatuses.push(curModelJson);
  }


  var result = {
    "status": "success", 
    "result": listOfStatuses,
  };

  return ContentService
  .createTextOutput(JSON.stringify(result))
  .setMimeType(ContentService.MimeType.JSON);
} 


const buyCashStatusIdKey = 'id';
const buyCashStatusNameKey = 'name';
const buyCashStatusDescriptionKey = 'description';

var BuyCashStatusModel = function() {

  this.id = -1;
  this.name = 'name';
  this.description = 'description';

  this.fromJson = function(json) {
    this.id = json[buyCashStatusIdKey];
    this.name = json[buyCashStatusNameKey];
    this.description = json[buyCashStatusDescriptionKey];
  }

  this.toJson = function() {
    var result = {};
    result[buyCashStatusIdKey] = this.id;
    result[buyCashStatusNameKey] = this.name;
    result[buyCashStatusDescriptionKey] = this.description;

    return result;
  }

  this.fromRow = function(row) {
    this.id = row[0];
    this.name = row[1];
    this.description = row[2];
  }

  this.toRow = function() {
    var result = [];
    result.push(this.id);
    result.push(this.name);
    result.push(this.description);
  }



}