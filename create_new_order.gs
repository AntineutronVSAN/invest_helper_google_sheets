const createOrderCode = '0';


function createNewOrder(data) {

  var sheet = SpreadsheetApp.openById(openSheetName);
  var order = new InvestHelperOrder();

  order.fromJson(data);

  // Инкремент номера строки
  var lastRowNumber = sheet.getLastRow();
  order.number = lastRowNumber + 1;

  var row = order.toRowData();

  sheet.appendRow(row);

  return {
    "status": "success",
  }
}


function createNewOrderTest() {
  var sheet = SpreadsheetApp.openById(openSheetName);
  var order = new InvestHelperOrder();
  console.log(order.number);
  var testData = orderTestModel;
  order.fromJson(testData);
  // Инкремент номера строки
  var lastRowNumber = sheet.getLastRow();
  order.number = lastRowNumber + 1;
  console.log(order);
  var row = order.toRowData();
  console.log(row);
  
  sheet.appendRow(row);
  investHelperLog('row appenned');
}
