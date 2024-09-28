# packaged-transitive-types-bug-reproduction

This is a reproduction of types generating incorrectly
with `svelte-package` for transitive dependencies.
It appears that mismatches between file names/paths
and package.json `exports` aliases causes this.

(this is a fresh install of a `npm create svelte@latest` library project -
the same problem happens with Svelte 5)

1. Run this command: (does not work on Windows, the script is simple to do manually)

```bash
npm run repro # copies `./fakepackage` to `node_modules` and runs `npm run package`
```

2. Inspect [dist/index.d.ts](/dist/index.d.ts):

```ts
// index.d.ts
export declare const works_when_same_name_exported: "works_when_same_name";
export declare const broken_when_different_name_exported: any;
export declare const broken_when_different_path_exported: any;
```

Expected:

```diff
- export declare const broken_when_different_name_exported: any;
- export declare const broken_when_different_path_exported: any;
+ export declare const broken_when_different_name_exported: "broken_when_different_name";
+ export declare const broken_when_different_path_exported: "broken_when_different_path";
```

To see the first of the `any`s generate correctly, remove the `2`
in [src/lib/index.ts](/src/lib/index.ts) (the imported path)
and [fakepackage/package.json](/fakepackage/package.json) (the `"exports"` key),
then run `npm run repro` again and see the `any` changed in [dist/index.d.ts](/dist/index.d.ts).

To see the second generate correctly, add `dist/`
in [src/lib/index.ts](/src/lib/index.ts) (the imported path)
and [fakepackage/package.json](/fakepackage/package.json) (the `"exports"` key),
then run `npm run repro` again and see the `any` changed in [dist/index.d.ts](/dist/index.d.ts).

Instructions to see these imports work are also in [src/lib/index.ts](/src/lib/index.ts).

## Next steps

This may be a problem with [`dts-buddy`](https://github.com/Rich-Harris/dts-buddy)
or how SvelteKit is using it,
one next step is trying to reproduce directly with `dts-buddy`.