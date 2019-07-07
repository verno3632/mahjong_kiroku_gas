
function getActiveUsers(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('season4');
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  const dateRange = sheet.getRange(4, 1, lastRow, 1).getValues();
  var nameRange = sheet.getRange(1, 4, 1, lastColumn).getValues();
  const halfDayBefore = new Date().setHours(new Date().getHours() - 48);
  var users = [];
  for(var i = dateRange.length; i > 0; i--){
    if(dateRange[i-1][0] != "" && Date.parse(dateRange[i-1][0]) > halfDayBefore){
      var scoreRange = sheet.getRange(i, 4, i, lastColumn).getValues();
      
      for(var j = 4; j < lastColumn; j++){
        if(scoreRange[0][j] != ""){
          
          Logger.log(nameRange[0][j]);
        }
      }
    }
  }
}

// function doGet(e) {
//   var ss = SpreadsheetApp.getActiveSpreadsheet();
//   var sheet = ss.getSheetByName('season4');

//   const lastColumn = sheet.getLastColumn();
//   Logger.log(lastColumn);
//   var nameRange = sheet.getRange(1, 4, 1, lastColumn);
//   var array = [];
//   for(var i = 4; i <= lastColumn; i++) {
//     var value = sheet.getRange(1, i).getValue()
//     array.push(value);
//   }
//   const output = ContentService.createTextOutput();
//   output.setMimeType(ContentService.MimeType.JSON);
//   output.setContent(JSON.stringify(array.sort()));
//   return output;
// }

// function dateString() {
//   var date = new Date();
//   var year = date.getFullYear();
//   var month = date.getMonth() + 1;
//   if(month < 10){
//     month = "0" + month;
//   };
//   var day = date.getDate();
//   if(day < 10){
//     day = "0"+ day;
//   }
//   var hour = date.getHours();
//   if(hour < 10){
//     hour = "0"+hour;
//   }
//   var minute = date.getMinutes();
//   if(minute < 10){
//     minute = "0"+minute;
//   }

//   return year + "/" + month + "/" + day + " " + hour + ":" + minute;
// }

// function doPost(e) {
//   Logger.log(e);
//   var ss = SpreadsheetApp.getActiveSpreadsheet();
//   var sheet = ss.getSheetByName('season4');

//   Logger.log(sheet);
//   var lastColumn = sheet.getLastColumn();
//   var userNumMap = {};
//   for(var i = 4; i <= lastColumn; i++) {
//     var value = sheet.getRange(1, i).getValue()
//     userNumMap[value] = i;
//   }
//   Logger.log(userNumMap);
//   var data = JSON.parse(e.postData.contents);

//   var targetRow = sheet.getLastRow() + 1;
  
//   var date = dateString();
//   var dateCell = sheet.getRange(targetRow, 1);
//   dateCell.setValue(date);
  
//   var winnerCell = sheet.getRange(targetRow, 2);
//   winnerCell.setValue("=INDEX(D$1:$1, MATCH(MAX(D"+targetRow+":"+targetRow+"), D"+targetRow+":"+targetRow+", 0))");
  
//   var looserCell = sheet.getRange(targetRow, 3);
//   looserCell.setValue("=INDEX(D$1:$1, MATCH(MIN(D"+targetRow+":"+targetRow+"), D"+targetRow+":"+targetRow+", 0))");
//   Logger.log(date);
//   for(var i = 0; i < data.length; i++){
//     var name = data[i]["user"];
//     var cell = sheet.getRange(targetRow, userNumMap[name]);
//     cell.setValue(data[i]["value"]);
//   }
//   Logger.log("done");
// }