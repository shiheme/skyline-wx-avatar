import type { ExecuteRule, Value } from '../interface';
import { format } from '../util';
import required from './required';
import getUrlRegex from './url';
/* eslint max-len:0 */

const pattern = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i,
};

const types = {
  integer(value: Value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  float(value: Value) {
    return types.number(value) && !types.integer(value);
  },
  array(value: Value) {
    return Array.isArray(value);
  },
  regexp(value: Value) {
    if (value instanceof RegExp) {
      return true;
    }
    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date(value: Value) {
    return (
      typeof value.getTime === 'function' &&
      typeof value.getMonth === 'function' &&
      typeof value.getYear === 'function' &&
      !isNaN(value.getTime())
    );
  },
  number(value: Value) {
    if (isNaN(value)) {
      return false;
    }
    return typeof value === 'number';
  },
  object(value: Value) {
    return typeof value === 'object' && !types.array(value);
  },
  method(value: Value) {
    return typeof value === 'function';
  },
  email(value: Value) {
    return (
      typeof value === 'string' &&
      value.length <= 320 &&
      !!value.match(pattern.email)
    );
  },
  url(value: Value) {
    return (
      typeof value === 'string' &&
      value.length <= 2048 &&
      !!value.match(getUrlRegex())
    );
  },
  hex(value: Value) {
    return typeof value === 'string' && !!value.match(pattern.hex);
  },
};

const type: ExecuteRule = (rule, value, source, errors, options) => {
  if (rule.required && value === undefined) {
    required(rule, value, source, errors, options);
    return;
  }
  const custom = [
    'integer',
    'float',
    'array',
    'regexp',
    'object',
    'method',
    'email',
    'number',
    'date',
    'url',
    'hex',
  ];
  const ruleType = rule.type;
  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(
        format(options.messages.types[ruleType], rule.fullField, rule.type),
      );
    }
    // straight typeof check
  } else if (ruleType && typeof value !== rule.type) {
    errors.push(
      format(options.messages.types[ruleType], rule.fullField, rule.type),
    );
  }
};

export default type;
