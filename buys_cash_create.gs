const createBuysCashCode = 'createBuysCashCode';
const createBuysCashCodeBuDataKey = 'buy';

const testBuyCashModel = {
  "id":-1,"dateTime":"20.05.2022",
  "pair":"usdrub","course":86.27899450101265,
  "count":2000.0,"whereKeep":"Тинькофф","status":1};

function addBuysCash(data) {
  
  var currentSheet = SpreadsheetApp.openById(openSheetName);
  var buysCashStatusesSheet = currentSheet.getSheetByName(buyCashSheetName);

  var buy = new BuyCashModel();

  var buyJsonData = data[createBuysCashCodeBuDataKey];

  buy.fromJson(buyJsonData);

  // Инкремент номера строки
  var lastRowNumber = buysCashStatusesSheet.getLastRow();
  buy.id = lastRowNumber + 1;

  var row = buy.toRow();

  buysCashStatusesSheet.appendRow(row);

  return {
    "status": "success",
  }

}


function testAddBuysCash() {

  var data = testBuyCashModel;

  var result = addBuysCash({'buy': data});

  console.log(result);

}
