try {
  const endpoint = "";
  chrome.runtime.onMessage.addListener(async (obj, sender, response) => {
    if (obj.tag === "back") {
      await fetchInterest(obj);
    }
    response({ status: "ok" });
  });

  async function fetchInterest(data) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${endpoint}/trends`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        data.tag = "front";
        sendToFront(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    return true;
  }

  function sendToFront(obj) {
    chrome.runtime.sendMessage(obj, () => {});
  }
} catch (e) {
  console.error(e);
}
