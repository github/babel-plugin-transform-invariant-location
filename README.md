# transform-invariant-location

A Babel plugin to annotate [Flow `invariant()` calls](https://github.com/zertosh/invariant) with an additional string argument detailing the current file and line number. This is useful to track down exceptions that are raised by `invariant()` in minified bundles at runtime.

Before:

```js
invariant(foo)
invariant(foo, "foo is missing")
```

After:

```js
invariant(foo, "path/to/source.js:42")
invariant(foo, "foo is missing -- path/to/source.js:42")
```
