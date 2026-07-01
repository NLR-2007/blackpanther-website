/**
 * Google Apps Script Web App for BlackPanthers Club applications.
 * This script intercepts submissions from the portal, saves the pitch deck file to 
 * your Google Drive folder, and appends the registration details (with the unique link)
 * to your Google Sheet.
 * 
 * Setup Instructions:
 * 1. Open your Google Sheet (Black-Panthers-Members).
 * 2. In the top menu, go to Extensions -> Apps Script.
 * 3. Delete any default code in the editor, copy this entire file's content, and paste it here.
 * 4. Click the Save icon (floppy disk).
 * 5. Click Deploy -> New deployment.
 * 6. Select "Web app" as the deployment type.
 * 7. Set configuration:
 *    - Description: BlackPanthers Form Handler
 *    - Execute as: Me (your-email)
 *    - Who has access: Anyone
 * 8. Click Deploy, authorize any requested permissions, and you are ready!
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    // 1. Save pitch deck file to your specified Google Drive folder
    var fileUrl = "";
    if (data.file && data.file.base64) {
      // Your Google Drive folder ID
      var folderId = "15cPfnkcBtDfOMllfW0IqiNhcU1UvA-fR";
      var folder = DriveApp.getFolderById(folderId);
      
      // Decode base64 file data
      var contentType = data.file.mimeType || "application/octet-stream";
      var base64Data = data.file.base64.split(",")[1] || data.file.base64;
      var decoded = Utilities.base64Decode(base64Data);
      var blob = Utilities.newBlob(decoded, contentType, data.file.filename);
      
      var file = folder.createFile(blob);
      // Make the file viewable by anyone with the link so you can access it easily
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      fileUrl = file.getUrl();
    }
    
    // 2. Write details to your Google Sheet (Black-Panthers-Members)
    var spreadsheetId = "12GNT_6rQFGYHG5xsb4nMxsKpBDb7M4WEQbNJvF79gDk";
    var sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // Append headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", 
        "Team Name", 
        "Total Members", 
        "Founder Name", 
        "Founder Email", 
        "Leader is Co-Founder", 
        "Leader Email", 
        "Co-Founder Email", 
        "Teammates Details", 
        "Pitch Deck Drive Link"
      ]);
    }
    
    // Format teammates details as a bulleted string
    var teammatesStr = "";
    if (data.teammates && data.teammates.length > 0) {
      teammatesStr = data.teammates.map(function(t, i) {
        return (i + 1) + ". " + t.name + " (" + t.roll + ")";
      }).join("\n");
    }
    
    // Append the row
    sheet.appendRow([
      new Date(),
      data.teamName,
      data.totalMembers,
      data.founderName,
      data.founderEmail,
      data.leaderIsCofounder ? "Yes" : "No",
      data.leaderIsCofounder ? "" : data.leaderEmail,
      data.leaderIsCofounder ? "" : data.cofounderEmail,
      teammatesStr,
      fileUrl
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Application saved successfully",
      fileUrl: fileUrl
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
