// Message Handling
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.type === "GET_MODE") {
    chrome.storage.sync.get(["mode"], (res) => {
      sendResponse({ mode: res.mode || "light" });
    });
    return true;
  }

  if (req.type === "SET_MODE") {
    chrome.storage.sync.set({ mode: req.mode }, () => {
      sendResponse({ success: true });
    });
    return true;
  }
});

// Badge Logic
const getColor = (length) =>
  length <= 4 ? "#28a745" : length <= 7 ? "#ffc107" : "#dc3545";

const setBadge = (value) => {
  const num = Number(value);

  chrome.action.setBadgeText({ text: value }, () => {
    chrome.action.setBadgeBackgroundColor({
      color: getColor(num)
    });
  });
};

// Event Listeners 
chrome.windows.onCreated.addListener(() => {
  chrome.storage.sync.get(["tasks"], (res) => {
    setBadge(res.tasks?.length ? res.tasks.length.toString() : "");
  });
});


// init badge on install and startup
const initBadge = () => {
  chrome.storage.sync.get(["tasks"], (res) => {
    const length = res.tasks?.length || 0;
    setBadge(length ? length.toString() : "");
  });
};

// events
chrome.runtime.onInstalled.addListener(initBadge);
chrome.runtime.onStartup.addListener(initBadge);
chrome.windows.onCreated.addListener(initBadge);

// storage change
chrome.storage.onChanged.addListener((changes) => {
  const tasksChange = changes.tasks;
  if (!tasksChange) return;

  const length = tasksChange.newValue?.length || 0;
  setBadge(length ? length.toString() : "");
});
