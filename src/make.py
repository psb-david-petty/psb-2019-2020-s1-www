#!/usr/bin/env python3
#
# make.py
#

"""Create 2019-2020 BHS schedule webpage."""

import collections
import csv
import datetime
import os
import re
import sys

__author__ = "David C. Petty & 2019-2020 S1 WWW"
__copyright__ = "Copyright 2019, David C. Petty"
__license__ = "https://creativecommons.org/licenses/by-nc-sa/4.0/"
__version__ = "0.0.1"
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
    <link href="./styles/pages.css" rel="stylesheet">
    <script src="./scripts/schedule.js"></script>
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


def collect(start="..", top='..', html='index.html'):
    """Return list of links below top containing html whose top component
    is start, instead of top."""
    links = list()
    for root, dirs, files in os.walk(top):
        path = root.split(os.sep)
        if html in files:
            links.append(os.path.normpath(os.path.join(
                os.sep.join([start] + [d for d in path if d != top]), '')))
    return sorted(links)


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


def _lists(nested, link=list(), indent=3):
    """Return formatted, nested, HTML unordered lists matching nested dicts."""
    if nested:
        items = ''
        for key in sorted(nested):
            nest = nested[key]
            items += _li_format.format(
                text=(key if nest else '') + _lists(
                    nest, link + [key], indent + 1),
                indent=(indent + 1) * 2 * ' ')
        return _ul_format.format(items=items, indent=indent * 2 * ' ').strip()
    else:
        uri = os.sep.join(link + [''])
        return f'<a href="{uri}">{link[-1]}</a>'


def format_main(files, heading='', text=_default_text):
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
        write(format_main(collect()).lstrip(), '../www/students.html')
