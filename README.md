Проект Вычислитель отличий

[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/codeclimate/codeclimate/test_coverage)

[![Build Status](https://travis-ci.org/aimmlegate/Diff.svg?branch=master)](https://travis-ci.org/aimmlegate/Diff)

# Утилита для поиска отличий в конфигурационных файлах.

Возможности утилиты:

1. Генерация отчета в виде plain text, pretty и json
2. Форматы данных: json, yaml, ini

```
npm install -g aimml-gendiff
```

```
  Usage: gendiff [options] <firstConfig> <secondConfig>

  Compares two configuration files and shows a difference.

  Options:

    -V, --version        output the version number
    -f, --format [type]  Output format [tree (default), plain, json]
    -h, --help           output usage information

```

```
gendiff <firstConfig> <secondConfig>

{
   common: {
       setting1: Value 1
     - setting2: 200
     + setting3: {
           key: value
       }
     - setting3: true
       setting6: {
           key: value
         + ops: vops
       }
     + setting4: blah blah
     + setting5: {
           key5: value5
       }
   }
 - group2: {
       abc: 12345
   }
 + group3: {
       fee: 100500
   }
}
```
```
gendiff --format plain <firstConfig> <secondConfig>

Property 'common.setting2' was removed
Property 'common.setting3' was updated. From: 'true' to complex value
Property 'common.setting6.ops' was added with value: 'vops'
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with complex value
Property 'group2' was removed
Property 'group3' was added with complex value

```