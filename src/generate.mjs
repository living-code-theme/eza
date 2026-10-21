// This port owns its application mappings. Inputs come only from the pinned local palette.


function yamlValue(v, indent) {
  const pad = "  ".repeat(indent);
  return Object.entries(v).map(([k, x]) => (x && typeof x === "object"
    ? `${pad}${k}:\n${yamlValue(x, indent + 1)}`
    : `${pad}${k}: ${typeof x === "string" ? `"${x}"` : x}`)).join("\n");
}

function ezaTheme(f) {
  const t = (fg, extra = {}) => ({ foreground: fg, ...extra });
  const dir = f.r("accent"), exec = f.r("success"), link = f.r("link"), dim = f.r("fgSubtle");
  const doc = {
    colourful: true,
    filekinds: {
      normal: t(f.r("fg")), directory: t(dir, { is_bold: true }), symlink: t(link), pipe: t(f.r("warning")),
      block_device: t(f.r("warning"), { is_bold: true }), char_device: t(f.r("warning"), { is_bold: true }),
      socket: t(f.c("orchid")), special: t(f.c("orchid")), executable: t(exec, { is_bold: true }), mount_point: t(f.r("info"), { is_bold: true }),
    },
    perms: {
      user_read: t(f.r("warning")), user_write: t(f.r("error")), user_execute_file: t(exec, { is_underline: true }),
      user_execute_other: t(exec), group_read: t(f.r("warning")), group_write: t(f.r("error")), group_execute: t(exec),
      other_read: t(f.r("warning")), other_write: t(f.r("error")), other_execute: t(exec),
      special_user_file: t(f.c("orchid")), special_other: t(f.c("orchid")), attribute: t(f.r("fgMuted")),
    },
    size: {
      major: t(f.r("fgMuted")), minor: t(f.r("fgMuted")), number_byte: t(f.r("success")), number_kilo: t(f.r("success")),
      number_mega: t(f.r("warning")), number_giga: t(f.c("copper")), number_huge: t(f.r("error")),
      unit_byte: t(f.r("fgMuted")), unit_kilo: t(f.r("fgMuted")), unit_mega: t(f.r("fgMuted")), unit_giga: t(f.r("fgMuted")), unit_huge: t(f.r("fgMuted")),
    },
    users: {
      user_you: t(f.r("warning")), user_root: t(f.r("error")), user_other: t(f.c("orchid")),
      group_yours: t(f.r("warning")), group_other: t(f.r("fgMuted")), group_root: t(f.r("error")),
    },
    links: { normal: t(link), multi_link_file: t(f.c("copper")) },
    git: {
      new: t(f.r("added")), modified: t(f.r("modified")), deleted: t(f.r("removed")), renamed: t(f.r("info")),
      ignored: t(dim), conflicted: t(f.r("error")),
    },
    git_repo: {
      branch_main: t(f.r("success")), branch_other: t(f.c("orchid")), git_clean: t(f.r("success")), git_dirty: t(f.r("warning")),
    },
    security_context: {
      colon: t(dim), user: t(f.r("info")), role: t(f.c("orchid")), typ: t(f.r("warning")), range: t(f.r("fgMuted")),
    },
    file_type: {
      image: t(f.c("copper")), video: t(f.c("orchid")), music: t(f.c("aqua")), crypto: t(f.r("error")),
      document: t(f.r("fgAlt")), compressed: t(f.r("error")), temp: t(dim), compiled: t(f.r("info")),
      build: t(f.r("warning"), { is_bold: true }), source: t(f.r("function")),
    },
    punctuation: t(dim),
    date: t(f.r("info")),
    inode: t(f.r("fgMuted")),
    blocks: t(f.r("fgMuted")),
    header: t(f.r("fgAlt"), { is_underline: true }),
    octal: t(f.c("copper")),
    flags: t(f.c("orchid")),
    symlink_path: t(link),
    control_char: t(f.r("error")),
    broken_symlink: t(f.r("error")),
    broken_path_overlay: t(f.r("error"), { is_underline: true }),
  };
  return doc;
}

function ezaYaml(f) {
  const doc = ezaTheme(f);
  const { colon, user, role, typ, range } = doc.security_context;
  doc.security_context = { selinux: { colon, user, role, typ, range }, none: doc.punctuation };
  delete doc.colourful;
  return `# ${f.name}: https://github.com/living-code-theme/eza\n${yamlValue(doc, 0)}\n`;
}

const eza = {
files: (f) => [{ path: `${f.slug}.yml`, content: ezaYaml(f) }]
};

export function generate(flavors) {
  return [...flavors.flatMap(f => eza.files(f)), ...(eza.all?.(flavors) ?? [])].filter(f => !["LICENSE", "README.md", "package.json", "extension.toml"].includes(f.path.split("/").at(-1)));
}
