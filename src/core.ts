//
// SpreadSheetを使っていてテストできない
//
import { dateString, getLooser, getWinner, userResultsFromJson } from "./lib";

const TARGET_SHEET_NAME = "season4";
const USER_ROW_NUM = 1;
const USER_COLUMN_START_NUM = 4;
const DATE_CELL_NUM = 1;
const WINNER_CELL_NUM = 2;
const LOOSER_CELL_NUM = 3;
const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
const sheet = activeSpreadSheet.getSheetByName(TARGET_SHEET_NAME);

export function getMembers(): string[] {
  const lastColumn = sheet.getLastColumn();
  const array: string[] = [];
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

export function writeLog(log: string){
  sheet.getRange(1, 1).setValue(log);
}

export function writeResult(submission: any){
  const userColumnNumMap = getUserColumnNumMap();

  writeLog(submission);
  const userResults = userResultsFromJson(submission);

  const targetRow = sheet.getLastRow() + 1;

  const date = dateString(new Date());
  const dateCell = sheet.getRange(targetRow, DATE_CELL_NUM);
  dateCell.setValue(date);

  const winnerCell = sheet.getRange(targetRow, WINNER_CELL_NUM);
  winnerCell.setValue(getWinner(userResults).name);

  const looserCell = sheet.getRange(targetRow, LOOSER_CELL_NUM);
  looserCell.setValue(getLooser(userResults).name);

  for (const userResult of userResults) {
    const name = userResult.name;
    const cell = sheet.getRange(targetRow, userColumnNumMap[name]);
    cell.setValue(userResult.score);
  }
}