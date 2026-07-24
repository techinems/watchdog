const {
  EPHEMERAL_FALLBACK_TEXT,
  isMonitoredChannel,
  isModerator,
  buildEphemeralBlocks,
} = require("../src/utilities/moderation.js");

describe("isMonitoredChannel", () => {
  const monitored = ["C123", "C456"];
  test("true for a monitored channel", () => {
    expect(isMonitoredChannel("C123", monitored)).toBe(true);
  });
  test("false for an unmonitored channel", () => {
    expect(isMonitoredChannel("C999", monitored)).toBe(false);
  });
  test("false when nothing is monitored", () => {
    expect(isMonitoredChannel("C123", [])).toBe(false);
  });
});

describe("isModerator", () => {
  test("true if user is an admin", () => {
    expect(isModerator("U1", ["U1"], [])).toBe(true);
  });
  test("true if user is a moderator", () => {
    expect(isModerator("U2", [], ["U2"])).toBe(true);
  });
  test("false if user is in neither group", () => {
    expect(isModerator("U3", ["U1"], ["U2"])).toBe(false);
  });
});

describe("buildEphemeralBlocks", () => {
  test("returns two mrkdwn sections and quotes the original text", () => {
    const blocks = buildEphemeralBlocks("hello world");
    expect(blocks).toHaveLength(2);
    expect(blocks[0].type).toBe("section");
    expect(blocks[0].text.type).toBe("mrkdwn");
    expect(blocks[1].text.text).toBe(">hello world");
  });
  test("fallback text is defined", () => {
    expect(EPHEMERAL_FALLBACK_TEXT).toMatch(/not an admin or a moderator/);
  });
});
