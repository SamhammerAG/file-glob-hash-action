const core = require("@actions/core");
const util = require("./util");

try {
  core.debug(`start file-glob-hash-action`);
  let paths = util.getInputs("path", {
    required: true,
  });
  core.debug(`paths: ${paths}`);
  util.getHashFromPatterns(paths)
    .then((data) => {
      core.debug(`folder hash ${data}`);
      core.setOutput("hash", data);
    })
    .catch((error) => {
      core.error(`get hash error: ${error.message}`);
      core.setFailed(error.message);
    });
} catch (error) {
  core.setFailed(error.message);
}
