//
// SpreadSheetを使っていてテストできない
//

const TARGET_SHEET_NAME = "season4";
const USER_ROW_NUM = 1;
const USER_COLUMN_START_NUM = 4;
const DATE_CELL_NUM = 1;
const WINNER_CELL_NUM = 2;
const LOOSER_CELL_NUM = 3;
const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
const sheet = activeSpreadSheet.getSheetByName(TARGET_SHEET_NAME);

function getMembers() {
  const lastColumn = sheet.getLastColumn();
  const array = [];
  for (let index = USER_COLUMN_START_NUM; index < lastColumn; index++) {
    array.push(sheet.getRange(USER_ROW_NUM, index).getValue());
  }

  return array;
}

function getUserColumnNumMap(){
  const lastColumn = sheet.getLastColumn();
  const userNumMap = {};
  for(let i = USER_COLUMN_START_NUM; i <= lastColumn; i++) {
    const value = sheet.getRange(USER_ROW_NUM, i).getValue();
    userNumMap[value] = i;
  }
  return userNumMap;
}
