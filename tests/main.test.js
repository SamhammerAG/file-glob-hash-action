const util = require("../util");

test("get folder hash", async () => {
  const hash = await util.getHashFromPatterns("tests/fixtures/folder-hash/**");
  expect(hash).toBe("10a34637ad661d98ba3344717656fcc76209c2f8");
});

test("get empty folder hash", async () => {
  const hash = await util.getHashFromPatterns("tests/fixtures/folder-hash-not-exist");
  expect(hash).toBe("");
});
