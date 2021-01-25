function takeDefault(module) {
  if (module.__esModule) {
    return module.default;
  }
  return module;
}

function splitPath(path) {
  const result = [];

  const parts = path.split("/");
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part === ".." && result.length > 0) {
      result.pop();
    } else if (part !== ".") {
      result.push(part);
    }
  }

  if (result.length > 0) {
    let last = result.pop();
    const dot = last.lastIndexOf(".");
    if (dot >= 0) {
      last = last.slice(0, dot);
    }
    result.push(last);
  }

  return result;
}

function parsePathPart(part) {
  const match = part.match(/^(_?[a-z][-_a-z0-9]*)|(?:\[([a-z][_a-z0-9]*)\])$/);
  if (!match) {
    return null;
  }
  const [, nonDynamic, dynamic] = match;
  return nonDynamic || ":" + dynamic;
}

function split(key) {
  return splitPath(key).map((part) => {
    const parsed = parsePathPart(part.toLowerCase());
    if (!parsed) {
      throw new Error(`invalid path ${JSON.stringify(part)}`);
    }
    return parsed;
  });
}

function byKeys([a], [b]) {
  if (a === b) {
    return 0;
  }
  return a < b ? -1 : 1;
}

function assignMeta(meta) {
  return (component) => {
    if (component.route) {
      Object.assign(meta, component.route.meta);
    }
    return component;
  };
}

function routify(map, _fullPath = []) {
  const entries = Object.keys(map).map((key) => [key, map[key]]);
  const sorted = [
    ...entries.filter(([e]) => !e.startsWith(":")).sort(byKeys),
    ...entries.filter(([e]) => e.startsWith(":")).sort(byKeys),
  ];

  const results = [];
  sorted.forEach(([part, info]) => {
    const path = part === "index" ? "" : part;
    const fullPath = path ? [..._fullPath, path] : _fullPath;
    const meta = {};
    if (!info.nested) {
      results.push({
        path,
        name: "/" + fullPath.join("/"),
        meta,
        component: () => info.component().then(assignMeta(meta)),
      });
    } else if (!info.component) {
      results.push(
        ...routify(info.children, fullPath).map((route) => {
          return {
            ...route,
            path: [path, route.path].filter((p) => p).join("/"),
          };
        })
      );
    } else {
      results.push({
        path,
        meta,
        component: () => info.component().then(assignMeta(meta)),
        children: routify(info.children, fullPath),
      });
    }
  });
  return results;
}

export default function makeRoutes(context) {
  const root = {
    nested: true,
    resolved: null,
    component: null,
    children: Object.create(null),
  };

  context.keys().forEach((key) => {
    const path = split(key);
    const lastPart = path.pop();
    if (lastPart.startsWith("_") && lastPart !== "_layout") {
      return;
    }
    if (path.some((part) => part.startsWith("_"))) {
      return;
    }

    let step = root;
    path.forEach((part) => {
      let next = step.children[part];
      if (next && !next.nested) {
        throw new Error();
      }
      if (!next) {
        next = {
          nested: true,
          resolved: null,
          component: null,
          children: Object.create(null),
        };
        step.children[part] = next;
      }
      step = next;
    });

    if (lastPart !== "_layout") {
      let next = step.children[lastPart];
      if (next && next.nested) {
        throw new Error();
      }
      if (!next) {
        next = {
          nested: false,
          resolved: null,
          component: null,
        };
        step.children[lastPart] = next;
      }
      step = next;
    }
    if (step.resolved !== null) {
      throw new Error(
        `${JSON.stringify(step.resolved)} conflicts with ${JSON.stringify(key)}`
      );
    }
    step.resolved = key;
    step.component = () => Promise.resolve(context(key)).then(takeDefault);
  });

  const routes = Object.create(null);
  routes[""] = root;
  return routify(routes).map((route) => {
    return {
      ...route,
      path: "/" + route.path,
    };
  });
}
