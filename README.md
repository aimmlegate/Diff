Проект Вычислитель отличий

[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/codeclimate/codeclimate/test_coverage)

[![Build Status](https://travis-ci.org/aimmlegate/project-lvl2-s233.svg?branch=master)](https://travis-ci.org/aimmlegate/project-lvl2-s233)

# Утилита для поиска отличий в конфигурационных файлах.

Возможности утилиты:

1. Поддержка разных форматов
2. Генерация отчета в виде plain text, pretty и json
3. Форматы данных: json, yaml, ini

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