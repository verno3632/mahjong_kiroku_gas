import { getMembers, writeLog, writeResult } from "./core";
import { userResultsFromJson } from "./lib";

function responseToChallengeRequest(challenge: string) {
  const json = JSON.stringify({challenge: challenge});
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

function createDialog(trigger_id: string, token: string){
  const options = getMembers().map(m => {
    return {
      label: m,
      value: m,
    };
  });
  return {
    token,
    trigger_id,
    dialog: JSON.stringify({
      callback_id: "dialog_send",
      title: "麻雀記録",
      submit_label: "記録する",
      notify_on_cancel: false,
      state: "Limo",
      elements: [
        {
          type: "select",
          label: "雀士1",
          name: "user1",
          options
        },
        {
          type: "text",
          label: "スコア1",
          name: "score1",
          placeholder: "40 +10"
        },
        {
          type: "select",
          label: "雀士2",
          name: "user2",
          options
        },
        {
          type: "text",
          label: "スコア2",
          name: "score2",
          placeholder: "10 -10"
        },
        {
          type: "select",
          label: "雀士3",
          name: "user3",
          options
        },
        {
          type: "text",
          label: "スコア3",
          name: "score3",
          placeholder: "-20"
        },
        {
          type: "select",
          label: "雀士4",
          name: "user4",
          options
        },
        {
          type: "text",
          label: "スコア4",
          name: "score4",
          placeholder: "-30"
        },
      ],
    }),
  };
}

function openDialog(trigger_id: string, token: string){
  const slackUrl = "https://slack.com/api/dialog.open";
  const response = UrlFetchApp.fetch(slackUrl, {
    contentType: "application/x-www-form-urlencoded",
    method: "post",
    payload: createDialog(trigger_id, token),
  });
  writeLog(trigger_id);
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}

export function doPost(e) {
  const data = e.parameters;
  if (data.challenge && data.challenge.length > 0) {
    responseToChallengeRequest(data.challenge);
  } else if (data.trigger_id && data.trigger_id.length > 0) {
    openDialog(data.trigger_id[0], "xoxb-6646773781-668656856550-XpaREMYCtf8NLbcHWNtzsAjh");
  } else if (data.payload && data.payload.type === "dialog_submission") {
    const sub = data.submission;
    writeLog(sub);
    writeResult(sub);
  }
}
