// Native format regressions, exercised through this port's generator.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import {resolveAll,ANSI_ORDER} from '../scripts/palette.mjs';
import {generate} from '../src/generate.mjs';

const flavors = resolveAll();

const unquote = (v) => v.replace(/^(['"])(.*)\1$/, "$2");

function parseYaml(text) {
  const root = {}, stack = [{ indent: -1, node: root }];
  const lines = text.split("\n").filter((l) => l.trim() && !l.trim().startsWith("#"));
  for (const [n, raw] of lines.entries()) {
    const indent = raw.match(/^ */)[0].length, line = raw.trim();
    while (stack.at(-1).indent >= indent) stack.pop();
    const parent = stack.at(-1).node;
    if (line.startsWith("- ")) { assert.ok(Array.isArray(parent), `list item outside a list: ${raw}`); parent.push(unquote(line.slice(2))); continue; }
    const m = line.match(/^([\w.-]+):(?: (.*))?$/);
    assert.ok(m, `not a YAML mapping line: ${raw}`);
    if (m[2] === undefined) {
      const next = lines[n + 1]?.trim().startsWith("- ") ? [] : {};
      parent[m[1]] = next;
      stack.push({ indent, node: next });
    } else parent[m[1]] = unquote(m[2]);
  }
  return root;
}

const ezaYaml=f=>generate([f])[0].content;

const HEX = /^#[0-9a-f]{6}$/i;

const eza = {files: f=>generate([f]).filter(x=>x.path!=='living-code.json'), all: fs=>generate(fs).filter(x=>x.path==='living-code.json'||x.path==='theme.css'||x.path.startsWith('snippets/')), install:readFileSync(new URL('../README.md',import.meta.url),'utf8')};

test("eza themes are YAML using eza's section names and ANSI-independent hex colors", () => {
  const sections = ["filekinds", "perms", "size", "users", "links", "git", "git_repo", "security_context", "file_type", "punctuation", "date", "inode", "blocks", "header", "octal", "flags", "control_char", "broken_symlink", "broken_path_overlay"];
  for (const f of flavors) {
    const y = parseYaml(ezaYaml(f));
    for (const s of sections) assert.ok(y[s], s);
    assert.ok(y.security_context.selinux.role && y.security_context.none);
    assert.equal(y.filekinds.directory.foreground, f.r("accent"));
    assert.equal(y.filekinds.directory.is_bold, "true");
    assert.equal(y.git.modified.foreground, f.r("modified"));
    const colors = [...ezaYaml(f).matchAll(/foreground: "([^"]+)"/g)].map((m) => m[1]);
    assert.ok(colors.length > 60);
    for (const c of colors) assert.match(c, HEX);
  }
  assert.match(eza.install, /Library\/Application Support\/eza/);
  assert.match(eza.install, /XDG_CONFIG_HOME/);
});
