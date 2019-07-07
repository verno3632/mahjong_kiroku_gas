function doGet() {
  const members = getMembers().sort();

  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify(members));
  return output;
}
