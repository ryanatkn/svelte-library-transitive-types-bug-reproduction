// this works:
import {works_when_same_name} from 'fakepackage/works_when_same_name';
export const works_when_same_name_exported = works_when_same_name;

// this does not work - removing the `2` from the path here
// and in the package.json export generates correctly,
// so      `"./broken_when_different_name2": {`
// becomes `"./broken_when_different_name": {`
// and     `'fakepackage/broken_when_different_name2'`
// becomes `'fakepackage/broken_when_different_name'`
import {broken_when_different_name} from 'fakepackage/broken_when_different_name2';
export const broken_when_different_name_exported = broken_when_different_name;

// this also does not work - adding `dist/` to the aliased path here
// and in the package.json export generates correctly,
// so      `"./broken_when_different_path": {`
// becomes `"./dist/broken_when_different_path": {`
// and     `'fakepackage/broken_when_different_path'`
// becomes `'fakepackage/dist/broken_when_different_path'`
import {broken_when_different_path} from 'fakepackage/broken_when_different_path';
export const broken_when_different_path_exported = broken_when_different_path;
