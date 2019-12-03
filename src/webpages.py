#!/usr/bin/env python3
#
# make.py
#

"""Used in 2019-2020 WWW class to create students.html & files.txt."""

import datetime
import os
import pathlib
import re
import sys
import urllib.parse

__author__ = "David C. Petty & 2019-2020 S1 WWW"
__copyright__ = "Copyright 2019, David C. Petty"
__license__ = "https://creativecommons.org/licenses/by-nc-sa/4.0/"
__version__ = "0.0.4"
__maintainer__ = "David C. Petty"
__email__ = "david_petty@psbma.org"
__status__ = "Hack"


class Webpages:
    """Generates HTML for student webpage directories below abs_top, linked to
    rel_top, that contain any of _defaults and include all files below those
    directories with _extensions. Also generates a list of such files.
    write_webpage writes the webpage. write_files writes the file list."""

    # TO_DO: _default_output_filename should be linked to its directory and
    #        its relation to rel_top.

    _defaults = ['index.html', 'index.md', ]
    _extensions = ['.html', '.md', '.css', '.js',
                   '.gif', 'jpg', '.png',
                   '.eot', '.ttf', '.otf', '.woff', '.woff2', '.svg', ]
    _default_heading = '2019-2020 S1 &mdash; WWW Design'
    _default_text = """      <p>These are links to student websites:</p>"""
    _default_comment = ''
    _default_output_filename = 'students.html'

    def __init__(self, abs_top=r'../..', rel_top=r'..'):
        """Initialize webpages fields."""
        self._abs_top = self._path(abs_top)
        self._rel_top = self._path(rel_top)
        self._paths = self._collect_paths(self.abs_top, self.defaults)
        self._files = self._collect_files(self.paths, self.extensions)

        # Symbolic constants
        self._webpage_format = """
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
        <h1><a href="http://bhs.brookline.k12.ma.us/career--technology-education.html">Brookline High School</a></h1>
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
        self._main_format = """
{text}
{links}
"""
        self._ul_format = """
{indent}<ul>
{items}
{indent}</ul>
"""
        self._li_format = """
{indent}<li>{text}</li>
"""
        self._extra_format = """
{indent}<p>The main documentation is <a href="{link}">here</a>.</p>
"""
        self._webpage = self._format_main(self.paths).lstrip()

    @property
    def abs_top(self):
        """Return top directory relative to this file."""
        return self._abs_top

    @property
    def rel_top(self):
        """Return top directory relative to outfile."""
        return self._rel_top

    @property
    def paths(self):
        """Return list of paths that contain one of self._default_files."""
        return self._paths

    @property
    def files(self):
        """Return list of files in paths that end with self._file_extensions."""
        return self._files

    @property
    def defaults(self):
        """Return list of website default file names."""
        return self._defaults

    @property
    def extensions(self):
        """Return list of extensions for files to be added to self._files."""
        return self._extensions

    @property
    def webpage(self):
        """Return webpage string of formatted webpages and their links."""
        return self._webpage

    @staticmethod
    def _path(*components, **oldnew):
        """Return normal path of joined components with old prefix replaced
        by new."""
        old, new = oldnew.get('old', ''), oldnew.get('new', '')
        return os.path.normpath(re.sub('^' + re.escape(old), new,
                                       os.path.join(*components)))

    @staticmethod
    def _collect_paths(abs_top, defaults):
        """Return list of paths below abs_top containing any of defaults."""
        paths, top_path = list(), pathlib.Path(abs_top)
        for default in defaults:
            glob = os.path.join(r'**/', default)
            paths += list(sorted(Webpages._path(os.path.dirname(p))
                          for p in top_path.glob(glob)))
        return paths

    @staticmethod
    def _collect_files(paths, extensions):
        """Return list of files below each of paths w/ extensions."""
        files = list()
        for ext in extensions:
            for path in paths:
                index_path, glob = pathlib.Path(path), r'**/*' + ext
                files += index_path.glob(glob)
        return [str(f) for f in sorted(set(files))]

    @staticmethod
    def _nest(path, cds):
        """Return nested dictionaries of components of path list."""
        if path:
            cds[path[0]] = Webpages._nest(path[1:], cds.get(path[0], dict()))
        return cds

    @staticmethod
    def _create(links):
        """Create nested dict made up of components of links paths."""
        nested = dict()
        for link in links:
            nested = Webpages._nest(link.split(os.sep), nested)
        return nested

    @staticmethod
    def _has_default(directory, defaults):
        """Return true if directory has any of defaults."""
        return any(os.path.isfile(os.path.join(directory, default))
                   for default in defaults)

    def _lists(self, nested, link=list(), indent=3):
        """Return formatted, nested, HTML ULs matching nested dicts. link is a
        list of directory components up until nested. indent is UL indent level.
        Each branch and leaf is made an anchor with self.abs_top replaced by
        self.rel_top if that directory has any of self.defaults."""
        abs_top, rel_top, defaults = self.abs_top, self.rel_top, self.defaults
        if nested:
            items = ''
            for key in sorted(nested):
                nest = nested[key]
                uri = self._path(*link + [key] + [''], old=abs_top, new=rel_top)
                has_default = self._has_default(    # check absolute directory
                    self._path(uri, old=rel_top, new=abs_top), defaults)
                # URI is link if has default, or key if more nested, else blank.
                text = (f'<a href="{urllib.parse.quote(uri)}">{key}</a>'
                        if has_default else key) \
                    if nest else ''
                items += self._li_format.format(
                    text=text + self._lists(nest, link + [key], indent + 1),
                    indent=(indent + 1) * 2 * ' ')
            return self._ul_format.format(items=items, indent=indent * 2 * ' ')\
                .strip()
        else:
            # Leaf URI guaranteed to have html.
            uri = self._path(*link + [''], old=abs_top, new=rel_top)
            return f'<a href="{urllib.parse.quote(uri)}">{link[-1]}</a>'

    def _format_main(self, files, heading=_default_heading, text=_default_text):
        """Return html for links as formatted, nested, unordered lists."""
        comment, filename = self._default_comment, self._default_output_filename
        links = self._lists(self._create(files))
        main = self._main_format.format(text=text, links=3 * 2 * ' ' + links)
        # TO_DO: this link is relative to the created file and self._rel_top
        extra = self._extra_format.format(indent=10 * ' ', link=self.rel_top)
        return self._webpage_format.format(
            comment=comment, heading=heading,
            main=main.rstrip(), extra=extra, filename=filename,
            date_time=datetime.datetime.now().strftime('%c')
        ).replace('\n\n', '\n')

    def write_webpage(self, outpath=None):
        """Write webpage to outpath, or print if outpath is None."""
        if outpath:
            with open(outpath, 'w') as outfile:
                outfile.write(self.webpage)
            print(outpath)
        else:
            print(self.webpage)

    def write_files(self, outpath=None):
        """Write files list to outpath, or print if outpath is None."""
        files = '\n'.join(self.files + [''])
        if outpath:
            with open(outpath, 'w') as outfile:
                outfile.write(files)
            print(outpath)
        else:
            print(files)


if __name__ == '__main__':
    is_idle, is_pycharm, is_jupyter = (
        'idlelib' in sys.modules,
        int(os.getenv('PYCHARM', 0)),
        '__file__' not in globals()
    )
    if is_idle or is_pycharm or is_jupyter:
        # Write formatted student webpage links to students.html
        abs_path, rel_path = '../', '../../'
        htmlfile = Webpages._path(abs_path, r'./www/github/students.html')
        txtfile = Webpages._path(abs_path, r'./src/files.txt')
        webpages = Webpages(abs_path, rel_path)
        webpages.write_webpage(htmlfile)
        webpages.write_files(txtfile)
