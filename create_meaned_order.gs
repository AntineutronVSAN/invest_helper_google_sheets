const createMeanedOrderCode = '1';

function createNewMeanedOrder(data) {

  var currentOrderData = data["order"];
  var currentMeanedOrderData = data["meaned"];

  var sheet = SpreadsheetApp.openById(openSheetName);
  var order = new InvestHelperOrder();

  order.fromJson(currentOrderData);

  // Инкремент номера строки
  var lastRowNumber = sheet.getLastRow();
  order.number = lastRowNumber + 1;
  console.log(order);
  var row = order.toRowData();
  
  sheet.appendRow(row);

  for(var i=0; i<currentMeanedOrderData.length; i++) {
    var currentValue = currentMeanedOrderData[i];
    sheet.getRange("B" + currentValue).setValue("усреднён");
    sheet.getRange("C" + currentValue).setValue("Усреднение -> " + order.number.toString());
  }
}

function createNewMeanedOrderTest() {
  var testMeanedList = [34, 35, 36];
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

  for(var i=0; i<testMeanedList.length; i++) {
    var currentValue = testMeanedList[i];
    sheet.getRange("B" + currentValue).setValue("усреднён");
    sheet.getRange("C" + currentValue).setValue("Усреднение -> " + order.number.toString());
  }

}


