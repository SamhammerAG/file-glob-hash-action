const core = require("@actions/core");
const glob = require("@actions/glob");
const crypto = require("crypto");
const fs = require("fs");
const util = require("util");

async function getHashFromPatterns(patterns) {
  core.debug(`pattern options: ${patterns}`);
  const globber = await glob.create(patterns);
  let files = await globber.glob();
  files = files.filter(f => fs.existsSync(f) && fs.statSync(f).isFile());
  core.debug(`valid files ${files}`);

  if (files.length === 0) {
    core.info("no files extracted from patterns.");
    return "";
  }

  const hashPromises = files.map(calculateHash);
  const singleFileHashes = await Promise.all(hashPromises);
  const shasum = crypto.createHash("sha1");
  shasum.update(singleFileHashes.join(","));
  return shasum.digest("hex");
}

function getInputs(name, options) {
  return core.getInput(name, options)
    .split("\n")
    .map((s) => s.trim())
    .filter((x) => x !== "")
    .join("\n");
}

async function calculateHash(file) {
  const content = await util.promisify(fs.readFile)(file);
  const hash = crypto.createHash("sha1").update(content).digest("hex");
  core.debug(`file hash ${file} ${hash}`);
  return hash;
}

exports.getHashFromPatterns = getHashFromPatterns;
exports.getInputs = getInputs;
