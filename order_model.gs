// Ключи данных ордера
const orderNumberKey = 'orderNumber';
const orderStateKey = 'orderState';
const commentKey = 'comment';
const dateTimeKey = 'dateTime';
const whereCryptoKey = 'whereCrypto';
const pairKey = 'pair';
const buyedValueKey = 'buyedValue';
const buyedCourceKey = 'buyedCource';
const usdEqKey = 'usdEq';
const comissionKey = 'comission';
const orderSellDataKey = 'orderSellData';

// Ключи данных продажи
const minIncomePercentKey = 'minIncomePercent';
const minPiceSellPercentKey = 'minPiceSellPercent';
const planedSellCourceKey = 'planedSellCource';
const planedSellValueKey = 'planedSellValue';
const hasSellDateKey = 'hasSellDate';
const hasSellCourseKey = 'hasSellCourse';
const totalPredictedKey = 'totalPredicted';
const totalFactKey = 'totalFact';


// Модель данных ордера
var InvestHelperOrder = function(){
  
  this.number = 1;
  this.activity = 'активен';
  this.commet = '';
  this.date = '05.05.1997';
  this.where = 'binance';
  this.pair = 'usdtusdt';
  this.buyed = 0.0;
  this.buyedCurse = 0.0;
  this.usdtEqls = 0.0;
  this.comission = '';

  this.sellsData = [];


  this.fromJson = function(json){
    
    this.number = json[orderNumberKey];
    this.activity = json[orderStateKey];
    this.commet = json[commentKey];
    this.date = json[dateTimeKey];
    this.where = json[whereCryptoKey];
    this.pair = json[pairKey];
    this.buyed = json[buyedValueKey];
    this.buyedCurse = json[buyedCourceKey];
    this.usdtEqls = json[usdEqKey];
    this.comission = json[comissionKey];

    this.sellsData = []

    var currentSellsData = json[orderSellDataKey];

    for(var i=0; i<currentSellsData.length; i++) {
      var sellData = new InvestHelperSellData();
      sellData.fromJson(currentSellsData[i]);
      this.sellsData.push(sellData);
    }
  }

  this.toRowData = function() {
    var result = [];

    result.push(this.number);
    result.push(this.activity);
    result.push(this.commet);
    result.push(this.date);
    result.push(this.where);
    result.push(this.pair);
    result.push(this.buyed);
    result.push(this.buyedCurse);
    result.push(this.usdtEqls);
    result.push(this.comission);

    for(var i=0; i<this.sellsData.length; i++) {
      var currentSellData = this.sellsData[i];
      result.push(currentSellData.profitPercent);
      result.push(currentSellData.sellPercent);
      result.push(currentSellData.sellCursePlanned);
      result.push(currentSellData.sellValue);
      result.push(currentSellData.sellDate);
      result.push(currentSellData.sellCurseFact);
      result.push(currentSellData.resultCalculated);
      result.push(currentSellData.resultFact);
    }

    return result;
  }

};

// Модель данных продажи
var InvestHelperSellData = function(){
  
  this.profitPercent = 0;
  this.sellPercent = 0;
  this.sellCursePlanned = 0.0;
  this.sellValue = 0.0;
  this.sellDate = '';
  this.sellCurseFact = 0.0;
  this.resultCalculated = 0.0;
  this.resultFact = 0.0;

  this.fromJson = function(json) {
    
    this.profitPercent = json[minIncomePercentKey];
    this.sellPercent = json[minPiceSellPercentKey];
    this.sellCursePlanned = json[planedSellCourceKey];
    this.sellValue = json[planedSellValueKey];
    this.sellDate = '';
    this.sellCurseFact = '';
    this.resultCalculated = json[totalPredictedKey];
    this.resultFact = json[totalFactKey];

  }
};

// Тестовая модель данных
const orderTestModel = {"orderNumber":-1,"orderState":"активен","comment":"создан из МП","dateTime":"2022-04-30 11:11:33.557535","whereCrypto":"binance","pair":"BTCUSDT","buyedValue":0.0013180681727241199,"buyedCource":38539.98,"usdEq":50.79832101542413,"comission":"","orderSellData":[{"minIncomePercent":0,"minPiceSellPercent":100,"planedSellCource":38539.98,"planedSellValue":0.0013180681727241199,"hasSellDate":null,"hasSellCourse":null,"totalPredicted":0.0,"totalFact":0.0}]};
