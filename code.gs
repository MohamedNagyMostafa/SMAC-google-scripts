function doGet(e) {
  // Logger.log(ManageSheet(e));
  return ManageSheet(e);
}

function ManageSheet(e)
{
  var sheet_id    = e.parameters.sheet_id;
  var sheet_name  = e.parameters.sheet_name;
  var func        = e.parameters.func;

  // var sheet_id    = "18eUqMxm7CYUpdvvohaRTTqlNTJfoiVjilG9ixsP1eAM";
  // var sheet_name  = "Sheet1";
  // var func  = "clear";

  var googleSheet = SpreadsheetApp.openById(sheet_id).getSheetByName(sheet_name);

  if(func == "read")
  {
    return readData(googleSheet);
  }
  else if(func == "clear")
  {
    return clearData(googleSheet);
  }
  else if(func == "append")
  {
    return appendData(googleSheet, e.parameters.data);
  }
  else if(func == "deleteRow")
  {
    return deleteRowById(googleSheet, e.parameters.rowId);
  }
    
  return ContentService.createTextOutput("").setMimeType(ContentService.MimeType.TEXT);
}

function readData(googleSheet)
{
  if(googleSheet.getLastColumn() < 1)
  {
    return ContentService.createTextOutput("").  setMimeType(ContentService.MimeType.TEXT);
  }
    var values = googleSheet.getRange(1, 1, googleSheet.getLastRow(), googleSheet.getLastColumn()).getValues();

    return ContentService.createTextOutput(values).  setMimeType(ContentService.MimeType.TEXT);

}

function clearData(googleSheet)
{
    googleSheet.clear();
    return ContentService.createTextOutput("success").  setMimeType(ContentService.MimeType.TEXT);
}

function appendData(googleSheet, data)
{
  googleSheet.appendRow(JSON.parse(data));

  return ContentService.createTextOutput("success").  setMimeType(ContentService.MimeType.TEXT);
}

function deleteRowById(googleSheet, id)
{
  googleSheet.deleteRow(id);
  return ContentService.createTextOutput("success").  setMimeType(ContentService.MimeType.TEXT);
}
