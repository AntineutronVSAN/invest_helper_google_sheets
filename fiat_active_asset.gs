const fiatActiveAssetIdJsonKey = 'id';
const fiatActiveAssetAssetJsonKey = 'asset';
const fiatActiveAssetSheetName = 'fiat_actives_pairs';

// Получить все имеющиеся пары из таблицы
// Вернёт список с json объектами
function getJsonAllFiatActivesAssets() {

}

// Модель данных фиатной валютной пары. Например usdrub.
// Хранятся в отдельной таблице
var FiatActiveAsset = function() {

  this.id = -1;
  this.asset = 'asset';

  this.fromJson = function(json) {
    this.id = json[fiatActiveAssetIdJsonKey];
    this.asset = json[fiatActiveAssetAssetJsonKey];
  }

  this.toJson = function() {
    var result = {};
    result[fiatActiveAssetIdJsonKey] = this.id;
    result[fiatActiveAssetAssetJsonKey] = this.asset;

    return result;
  }

  this.fromRow = function(row) {
    this.id = row[0];
    this.asset = row[1];
  }

  this.toRow = function() {
    var result = [];
    result.push(this.id);
    result.push(this.asset);
  }
}



