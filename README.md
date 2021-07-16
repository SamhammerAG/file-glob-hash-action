# File Glob Hash Action

The action can help you get a single hash from file globs. You can use it to generate cache key, etc...

## Feture

- support multiple globs

## Inputs

### `path`

**Required**  A list of files, and wildcard patterns to cache and restore. See [`@actions/glob`](https://github.com/actions/toolkit/tree/master/packages/glob) for supported patterns. 

## Outputs

### `hash`

The hash calculated by folder

## Example usage

```yaml
uses: SamhammerAG/file-glob-hash-action@v1
with:
  path: |
    .cache
    public
```

Inspired by https://github.com/theowenyoung/folder-hash
