//
// SpreadSheetを使っていてテストできない
//

const targetSheet = "season4";
const userRowNum = 1;
const userStartColumnNum = 4;
const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
const sheet = activeSpreadSheet.getSheetByName(targetSheet);

function getMembers() {
  const lastColumn = sheet.getLastColumn();
  const array = [];
  for (let index = userStartColumnNum; index < lastColumn; index++) {
    array.push(sheet.getRange(userRowNum, index).getValue());
  }

  return array;
}
