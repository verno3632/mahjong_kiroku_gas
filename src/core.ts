//
// SpreadSheetを使っていてテストできない
//

const targetSheet = "season4";
const userRowNum = 1;
const userStartColumnNum = 4;
const dateCellNum = 1;
const winnerCellNum = 2;
const looserCellNum = 3;
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

function getUserColumnNumMap(){
  const lastColumn = sheet.getLastColumn();
  const userNumMap = {};
  for(let i = userStartColumnNum; i <= lastColumn; i++) {
    const value = sheet.getRange(userRowNum, i).getValue();
    userNumMap[value] = i;
  }
  return userNumMap;
}
