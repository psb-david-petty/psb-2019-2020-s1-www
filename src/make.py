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
      <ul>
{items}
      </ul>
"""


def collect(start=".", top=['..', 'www'], html='index.html'):
    """Return list of links below top containing html whose top component
    is start, instead of top."""
    links = list()
    for root, dirs, files in os.walk('..'):
        path = root.split(os.sep)
        if html in files:
            links.append(os.path.join(
                os.sep.join([start] + [d for d in path if d not in top])))
    return links


def format_main(files,
                heading='',
                text='      <p>These are links to student websites:</p>'):
    """Return html for links as an unordered list."""
    items = ''
    for link in files:
        items += f'        <li><a href="{link}">{link}</a></li>\n'
    comment = ''
    links = _ul_format.format(items=items.rstrip())
    main = _main_format.format(text=text.rstrip(), links=links.rstrip())
    extra = 10 * ' ' + '<p>The main documentation is <a href="..">here</a>'
    return _webpage_format.format(
        comment=comment, heading=heading, main=main.rstrip(), extra=extra,
        filename='students.html', date_time=datetime.datetime.now().strftime('%c')
    )


def write(page, outpath=None):
    """Write page to outpath, or print if outpath is None."""
    # Write or print self.code.
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
        write(format_main(collect()), '../www/students.html')
