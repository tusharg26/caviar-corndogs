/**
 * Caviar & Corndogs — signup collector
 *
 * Paste this into Extensions → Apps Script from your Google Sheet,
 * then Deploy → New deployment → Web app:
 *     Execute as:      Me
 *     Who has access:  Anyone          ← must be "Anyone", not "Anyone with Google account"
 * Copy the /exec URL it gives you into FORM_ENDPOINT in index.html.
 *
 * Every signup appends a row to a tab called "Signups". Duplicates are
 * ignored, so someone submitting twice doesn't clutter the list.
 */

// ── Optional: get an email each time someone signs up ──────────────────
// Put your address here to be notified. Leave "" for no notifications.
const NOTIFY_EMAIL = "";

const SHEET_NAME = "Signups";


function doPost(e) {
  try {
    const raw = (e && e.postData && e.postData.contents) || "{}";
    const data = JSON.parse(raw);
    const email = String(data.email || "").trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return json({ ok: false, error: "invalid email" });
    }

    const sheet = getSheet_();

    // Skip if we already have this address (case-insensitive).
    if (!hasEmail_(sheet, email)) {
      sheet.appendRow([
        new Date(),
        email,
        String(data.source || ""),
      ]);

      if (NOTIFY_EMAIL) {
        MailApp.sendEmail({
          to: NOTIFY_EMAIL,
          subject: "New signup: " + email,
          body: email + "\n\nSee the full list:\n" +
                SpreadsheetApp.getActiveSpreadsheet().getUrl(),
        });
      }
    }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}


/** Lets you sanity-check the deployment by opening the /exec URL in a tab. */
function doGet() {
  return json({ ok: true, message: "Caviar & Corndogs signup endpoint is live." });
}


// ── helpers ────────────────────────────────────────────────────────────

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Email", "Source"]);
    sheet.getRange("A1:C1").setFontWeight("bold");
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 170);
    sheet.setColumnWidth(2, 280);
  }
  return sheet;
}

function hasEmail_(sheet, email) {
  const last = sheet.getLastRow();
  if (last < 2) return false;

  const needle = email.toLowerCase();
  const rows = sheet.getRange(2, 2, last - 1, 1).getValues();

  for (let i = 0; i < rows.length; i++) {
    if (String(rows[i][0]).trim().toLowerCase() === needle) return true;
  }
  return false;
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
