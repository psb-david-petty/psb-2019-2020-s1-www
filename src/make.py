#!/usr/bin/env python3
#
# make.py
#

"""Used in 2019-2020 WWW class to create students.html & files.txt."""

import collections
import csv
import datetime
import os
import pathlib
import re
import sys

__author__ = "David C. Petty & 2019-2020 S1 WWW"
__copyright__ = "Copyright 2019, David C. Petty"
__license__ = "https://creativecommons.org/licenses/by-nc-sa/4.0/"
__version__ = "0.0.2"
__maintainer__ = "David C. Petty"
__email__ = "david_petty@psbma.org"
__status__ = "Hack"

_webpage_format = """
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="description" content="Brookline High School 2019-2020 S1 WWW">
    <meta name="keyword" content="Brookline High School,2019-2020 S1,WWW">
    <title>2019-2020 BHS 2019-2020 S1 WWW</title>
    <link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Saira+Extra+Condensed:200,400&display=swap" rel="stylesheet">
    <link href="./styles/students.css" rel="stylesheet">
    <script src="./scripts/students.js"></script>
  </head>
  <!-- http://patorjk.com/software/taag/    # ASCII art generator

 /$$$$$$$  /$$   /$$  /$$$$$$        /$$      /$$ /$$      /$$ /$$      /$$                                  
| $$__  $$| $$  | $$ /$$__  $$      | $$  /$ | $$| $$  /$ | $$| $$  /$ | $$                                  
| $$  \ $$| $$  | $$| $$  \__/      | $$ /$$$| $$| $$ /$$$| $$| $$ /$$$| $$                                  
| $$$$$$$ | $$$$$$$$|  $$$$$$       | $$/$$ $$ $$| $$/$$ $$ $$| $$/$$ $$ $$                                  
| $$__  $$| $$__  $$ \____  $$      | $$$$_  $$$$| $$$$_  $$$$| $$$$_  $$$$                                  
| $$  \ $$| $$  | $$ /$$  \ $$      | $$$/ \  $$$| $$$/ \  $$$| $$$/ \  $$$                                  
| $$$$$$$/| $$  | $$|  $$$$$$/      | $$/   \  $$| $$/   \  $$| $$/   \  $$                                  
|_______/ |__/  |__/ \______/       |__/     \__/|__/     \__/|__/     \__/                                  



  /$$$$$$   /$$$$$$    /$$    /$$$$$$          /$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$         /$$$$$$    /$$  
 /$$__  $$ /$$$_  $$ /$$$$   /$$__  $$        /$$__  $$ /$$$_  $$ /$$__  $$ /$$$_  $$       /$$__  $$ /$$$$  
|__/  \ $$| $$$$\ $$|_  $$  | $$  \ $$       |__/  \ $$| $$$$\ $$|__/  \ $$| $$$$\ $$      | $$  \__/|_  $$  
  /$$$$$$/| $$ $$ $$  | $$  |  $$$$$$$ /$$$$$$ /$$$$$$/| $$ $$ $$  /$$$$$$/| $$ $$ $$      |  $$$$$$   | $$  
 /$$____/ | $$\ $$$$  | $$   \____  $$|______//$$____/ | $$\ $$$$ /$$____/ | $$\ $$$$       \____  $$  | $$  
| $$      | $$ \ $$$  | $$   /$$  \ $$       | $$      | $$ \ $$$| $$      | $$ \ $$$       /$$  \ $$  | $$  
| $$$$$$$$|  $$$$$$/ /$$$$$$|  $$$$$$/       | $$$$$$$$|  $$$$$$/| $$$$$$$$|  $$$$$$/      |  $$$$$$/ /$$$$$$
|________/ \______/ |______/ \______/        |________/ \______/ |________/ \______/        \______/ |______/
{comment}
  -->
  <body>
    <!-- HEADER -->
    <header>
      <section>
        <h1>Brookline High School &mdash; 2019-2020 S1 WWW</h1>
      </section>
    </header>
    <!-- NAV --><!--
    <nav>
      <section>
        <h2>Nav</h2>
        <article>
          <p>Content...</p>
        </article>
      </section>
    </nav> -->
    <!-- ASIDE --><!--
    <aside>
      <section>
        <h2>Aside</h2>
        <article>
          <p>Content...</p>
        </article>
      </section>
    </aside> -->
    <!-- MAIN -->
    <main>
      <h2>{heading}</h2>
{main}
    </main>
    <!-- FOOTER -->
    <footer>
      <section>
        <h2>{filename} &mdash; {date_time}</h2>
        <article>
          <p>This file is available on <a href="https://github.com/psb-david-petty/psb-2019-2020-s1-www">Github</a>&hellip;</p>
{extra}
        </article>
      </section>
    </footer>
  </body>
</html>
"""
_main_format = """
{text}
{links}
"""
_ul_format = """
{indent}<ul>
{items}
{indent}</ul>
"""
_li_format = """
{indent}<li>{text}</li>
"""
_default_text = """      <p>These are links to student websites:</p>"""


def _collect_paths(top='..', start="..", html=r'index.html'):
    """Return list of paths below top containing html with top replaced
    by start."""
    norm_top, norm_start = map(os.path.normpath, (top, start))
    top_path, glob = pathlib.Path(norm_top), os.path.join(r'**/', html)
    paths = list(sorted(os.path.dirname(p).replace(norm_top, norm_start)
        for p in top_path.glob(glob)))
    return paths


def _collect_files(paths, exts=['.html', '.css', '.js', 'jpg', '.png', ]):
    """Return list of files below each of paths w/ extensions from exts."""
    files = list()
    for ext in exts:
        for path in paths:
            index_path, glob = pathlib.Path(path), r'**/*' + ext
            files += index_path.glob(glob)
    return [str(f) for f in sorted(set(files))]


def _nest(path, dictionary):
    """Return nested dictionaries of components of path list."""
    if path:
        dictionary[path[0]] = _nest(path[1:], dictionary.get(path[0], dict()))
    return dictionary


def _create(links):
    """Create nested dict made up of components of links paths."""
    nested = dict()
    for link in links:
        nested = _nest(link.split(os.sep), nested)
    return nested


def _lists(nested, link=list(), indent=3, html=r'index.html'):
    """Return formatted, nested, HTML ULs matching nested dicts. link is a list
    of directory components up until nested. indent is UL indent level. index
    is default HTML filename."""
    if nested:
        items = ''
        for key in sorted(nested):
            nest = nested[key]
            uri = os.sep.join(link + [key] + [''])
            # Branch URI is link if has html or key if more nested, else blank.
            has_index = os.path.isfile(os.path.join(uri, html))
            text = (f'<a href="{uri}">{key}</a>' if has_index else key) \
                if nest else ''
            items += _li_format.format(
                text=text + _lists(nest, link + [key], indent + 1),
                indent=(indent + 1) * 2 * ' ')
        return _ul_format.format(items=items, indent=indent * 2 * ' ').strip()
    else:
        # Leaf URI guaranteed to have html.
        uri = os.sep.join(link + [''])
        return f'<a href="{uri}">{link[-1]}</a>'


def _format_main(files, heading='', text=_default_text):
    """Return html for links as formatted, nested, unordered lists."""
    comment, filename = '', 'students.html'
    links = _lists(_create(files))
    main = _main_format.format(text=text, links=3 * 2 * ' ' + links) \
        .replace('\n\n', '\n')
    extra = 10 * ' ' + '<p>The main documentation is <a href="..">here</a>'
    return _webpage_format.format(
        comment=comment, heading=heading,
        main=main.rstrip(), extra=extra, filename=filename,
        date_time=datetime.datetime.now().strftime('%c')
    )


def write(page, outpath=None):
    """Write page to outpath, or print if outpath is None."""
    if outpath:
        with open(outpath, 'w') as outfile:
            outfile.write(page)
        print(outpath)
    else:
        print(page)


if __name__ == '__main__':
    is_idle, is_pycharm, is_jupyter = (
        'idlelib' in sys.modules,
        int(os.getenv('PYCHARM', 0)),
        '__file__' not in globals()
    )
    if is_idle or is_pycharm or is_jupyter:
        # Write formatted student webpage links to ../www/students.html
        path = '../'
        htmlfile = os.path.normpath(os.path.join(path, r'./www/students.html'))
        txtfile = os.path.normpath(os.path.join(path, r'./src/files.txt'))
        paths = _collect_paths()
        write(_format_main(paths).lstrip(), htmlfile)

        # Create and write txtfile.
        files = _collect_files(paths)
        with open(txtfile, 'w') as outfile:
            outfile.write('\n'.join(files + ['']))
        print(txtfile)
