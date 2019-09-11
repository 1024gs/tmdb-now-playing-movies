/**
 * HOISTED
 */
const def = (x) => typeof x !== 'undefined';
const undef = (x) => !def(x);
const length = (xs) => xs.length;
const concat = (b, a) => a.concat(b);

/**
 * Composition
 */
const noop = () => {};
const id = (x) => x;
const always = (val) => () => val;
const on = (f, g) => (a, b) => f(g(a), g(b));
const pipe = (...fns) => (init) => fns.reduce((a, fn) => fn(a), init);
const curry = (fn, a = []) => (...b) => {
  const args = concat(b, a);
  if (length(args) < length(fn)) {
    return curry(fn, args);
  }
  return fn(...args);
};

/**
 * Boolean
 */
const isNil = (x) => undef(x) || x === null;
const isArray = (x) => Array.isArray(x);
const isEmpty = (x) => length(x) === 0;
/* eslint-disable-next-line no-self-compare */
const defaultTo = (x, val) => (isNil(val) || val !== val ? x : val);
const equals = (a, b) => a === b;
const gte = (b, a) => a >= b;

/**
 * Math
 */
const max = (a, b) => Math.max(a, b);
const compare = (a, b) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

/**
 * Lists
 */
const copy = (xs) => xs.slice(0);
const head = (xs) => xs[0];
const tail = (xs) => xs.slice(1);
const map = (fn, xs) => xs.map((x) => fn(x));
const includesAll = (b, a) => b.every((x) => a.includes(x));
const append = (x, xs) => xs.concat(x);
const remove = (x, xs) => xs.filter((y) => y !== x);
const ascend = (fn) => (a, b) => compare(fn(a), fn(b));
const descend = (fn) => (b, a) => compare(fn(a), fn(b));
const sortBy = (fn, xs) => copy(xs).sort(fn);

/**
 * Objects
 */
const prop = (x, obj) => obj[x];
const mergeAll = (objs) => Object.assign({}, ...objs);
const serialize = (obj) => {
  var r = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      r.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  }
  return r.join('&');
};

const _ = {
  def,
  undef,

  noop,
  id,
  always,
  on: curry(on),
  pipe,
  curry,

  isNil,
  isArray,
  isEmpty,
  defaultTo: curry(defaultTo),
  equals: curry(equals),
  gte: curry(gte),

  max: curry(max),

  head,
  tail,
  length,
  concat: curry(concat),
  map: curry(map),
  includesAll: curry(includesAll),
  append: curry(append),
  remove: curry(remove),
  ascend: ascend,
  descend: descend,
  sortBy: curry(sortBy),

  prop: curry(prop),
  mergeAll,
  serialize,
};

export default _;
