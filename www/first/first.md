# Introduction

![Monty](https://drive.google.com/uc?id=1qDpzukQfYF-Cgg3V9RihZf8qdB0JI-ri) My name is [Mr. Petty](http://j.mp/psb_david_petty). I am a computer-science teacher at [Brookline High School](http://bhs.brookline.k12.ma.us/). My first year in Brookline is 2018-2019. Over the years I have taught computer science (at four different levels), engineering, robotics, WWW design, and mathematics. I have also coached the [Botball](http://botball.org/) and [BattleBotsIQ](https://battlebots.com/) robotics teams, the [Technovation Challenge](http://technovationchallenge.org/), the [Real World Design Challenge](http://realworlddesignchallenge.org/) and clubs in computer science and entrepreneurship. I am **excited** to be in Brookline!

# Favorites

My favorite [genres](https://en.wikipedia.org/wiki/List_of_popular_music_genres) of music are (in alphabetical order):

- Alternative & Punk
- Blues
- Classical
- Electronic
- Funk
- Jazz
- R&B
- Rock
- Soul
- Traditional
- World

# Recipe

![bunny salad](https://drive.google.com/uc?id=1F2zVrWaUSjdw0rGR_0d9jjBdKlYCk2hh)

Bunny Salad

1. Place crisp lettuce leaf on plate.
1. On top of it, place upside down — 1 chilled pear half
1. Make bunny, using narrow end for face.
   - Eyes — 2 raisins
   - Nose — 1 red cinnamon candy
   - Ears — 2 blanched almonds
   - For his tail — cottage cheese ball

From *[Betty Crocker's Cook Book for Boys and Girls](http://isbn.nu/9780764526343)* © 1957.

# Block quotation

> The report of my death was an exaggeration. — [Mark Twain](http://oupacademic.tumblr.com/post/48310773463/misquotation-reports-of-my-death-have-been)

# Preformatted `code` block

Preformatted [Python](https://python.org/) code block for the greatest common divisor and the least common multiple of two integers.

```python
# https://en.wikipedia.org/wiki/Greatest_common_divisor
def gcd(m, n):
    """Return GCD of m and n. GCD is defined for all integers."""
    return abs(m) if n == 0 else gcd(n, m % n)          # abs allows m & n to be any integers

# https://en.wikipedia.org/wiki/Least_common_multiple
def lcm(m, n):
    """Return LCM of m and n. LCM is defined for all integers."""
    return 0 if m * n == 0 else abs(m // gcd(m, n) * n) # abs allows m & n to be any integers
                                                        # divide first to reduce overflow
```
