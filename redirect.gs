
 function myFunction() {
   getAllOrders();
}

// Тестовый документ
const openSheetName = "1CCKpZpvbKF5HT5y90_5LDMn3iKHxrUGJAkW3TV369JU"; 
// Продакшен
//const openSheetName = "1NQ4AzIzzMvKidpa96F7d7gwwv2trSTY8_MpwRl91EVo"; 




// Получить общее число ордеров
const orderCode = '0';
// Получить все ордеры
const allOrdersCode = '1';

function doGet(request) {
  var requestType = request.parameter.type;
  
  if (!handleAccessToken(request)) {
    var result = {
      "status": "error",
      "statusCode": 403,
      "message": "invalid access token", 
    };
    return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
  }

  switch(requestType) {
    case orderCode:
      return getOrdersCount();
    case allOrdersCode:
      return getAllOrders();
    case buyCashStatesesCode:
      return getBuyCashStatuses();
    case buyCashCode:
      return getBuysCash();
  }
  var result = {
    "status": "error",
    "message": "unknow type", 
  };
  return ContentService
  .createTextOutput(JSON.stringify(result))
  .setMimeType(ContentService.MimeType.JSON);
}

///////////////// ------------------------------ ---------------------------------- ------------------------------ /////////////////
///////////////// ------------------------------ TODO Убрать это в отдельный скрипт ------------------------------ /////////////////
///////////////// ------------------------------ ---------------------------------- ------------------------------ /////////////////
function getAllOrders() {
  var sheet = SpreadsheetApp.openById(openSheetName);

  // С первого индекса, так как нулевого там нет
  var index = 1;
  var listOfOrders = [];

  while(true) {
    var currentOrder = {};

    var range = index.toString() + ":" + index.toString();
    var column = sheet.getRange(range).getValues();

    if (column[0][0] == '' || column[0][0] == undefined) {
      break;
    }
    if (index > 20000) {
      console.log("Превышение уровня.");
      break;
    }

    if (index > 1) {
      currentOrder['orderNumber'] = column[0][0];
      currentOrder['orderState'] = column[0][1];
      currentOrder['comment'] = column[0][2].toString();
      currentOrder['dateTime'] = column[0][3];
      currentOrder['whereCrypto'] = column[0][4];
      currentOrder['pair'] = column[0][5];
      currentOrder['buyedValue'] = column[0][6];
      currentOrder['buyedCource'] = column[0][7];
      currentOrder['usdEq'] = column[0][8];
      currentOrder['comission'] = column[0][9];

      var sellData = [];
      var currentSellDataNumber = 0;
      var sellDataSize = 8;
      while(true) {
        var itemIndex = 10 + sellDataSize*currentSellDataNumber;
        if (column[0][itemIndex] == '' || column[0][itemIndex] == undefined) {
          break;
        }

        var currentSellData = {};

        currentSellData['minIncomePercent'] = column[0][10+sellDataSize*currentSellDataNumber+0];
        currentSellData['minPiceSellPercent'] = column[0][10+sellDataSize*currentSellDataNumber+1];
        currentSellData['planedSellCource'] = column[0][10+sellDataSize*currentSellDataNumber+2];
        currentSellData['planedSellValue'] = column[0][10+sellDataSize*currentSellDataNumber+3];
        currentSellData['hasSellDate'] = column[0][10+sellDataSize*currentSellDataNumber+4];

        var hasSellCource = column[0][10+sellDataSize*currentSellDataNumber+5];
        if (hasSellCource == '') {
          hasSellCource = null;
        }

        currentSellData['hasSellCourse'] = hasSellCource;
        currentSellData['totalPredicted'] = column[0][10+sellDataSize*currentSellDataNumber+6];
        currentSellData['totalFact'] = column[0][10+sellDataSize*currentSellDataNumber+7];

        sellData.push(currentSellData);



        currentSellDataNumber++;


        if (currentSellDataNumber > 100) {
          console.log("Превышение уровня.");
          break;
        }
      }
      currentOrder['orderSellData'] = sellData;

      listOfOrders.push(currentOrder);

    }
    index++;
  }

  var result = {
    "status": "success", 
    "result": listOfOrders,
  };

  return ContentService
  .createTextOutput(JSON.stringify(result))
  .setMimeType(ContentService.MimeType.JSON);

}

function getOrdersCount() {
  // Open Google Sheet using ID
  var sheet = SpreadsheetApp.openById(openSheetName);
  console.log(sheet.getName());
  var notEmptyColumns = [];
  var index = 1;
  while(true) {
    
    var range = index.toString() + ":" + index.toString();
    var column = sheet.getRange(range).getValues();
    if (column[0][0] == '') {
      break;
    }
    if (index > 20000) {
      console.log("Превышение уровня.");
      break;
    }
    index++;
    notEmptyColumns.push(column);
  }

  var count = notEmptyColumns.length;

  var result = {
    "status": "SUCCESS", 
    "result": {
      "ordersCount": count,
  }};

  // Return result
  return ContentService
  .createTextOutput(JSON.stringify(result))
  .setMimeType(ContentService.MimeType.JSON);
}


// ------------------------------------ POSET REQUEST HANDLING -----------------------------------------
function doPost(request) {

  if (!handleAccessToken(request)) {
      var result = {
        "status": "error",
        "message": "invalid access token", 
        "statusCode": 403,
      };
      return result;
  }

  //createNewOrder('asdf');
  
  const { parameter, postData: { contents, type } = {} } = request;
  const { source } = parameter;

  var contentParse = JSON.parse(contents);
  var requestBodyType = contentParse['type'];
  var requestBodyData = contentParse['data'];

  switch(requestBodyType) {
    case createOrderCode:
      investHelperLog('create order');
      return createNewOrder(requestBodyData);
    case createMeanedOrderCode:
      investHelperLog('Mean order');
      return createNewMeanedOrder(requestBodyData);
    case createBuysCashCode:
      return addBuysCash(requestBodyData);
  }
  investHelperLog('unknown type');
  var result = {
      "status": "success",
      "message": "unknown type", 
  };

  return result;
}
// ------------------------------------------------------------------------------------------------------






