function investHelperLog(msg) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let logSht = ss.getSheetByName('DebugLog'); 
  if (!logSht) {
    ss.insertSheet('DebugLog'); 
  }
    
  var nxtLogRow = logSht.getLastRow() + 1;
  logSht.getRange('A'+ nxtLogRow).setValue(msg);
}