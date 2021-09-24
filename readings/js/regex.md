# Regular Expressions (Regex)

A Regex is a pattern that describes a set of text.

It can:
- match text exactly
- match a character that is one of many characters
- match any single character
- match start or end of line
- match a character that is in a known category (such as a digit)
- require a number or range of repetitions of any part of the regex
- match a character that is NOT one of many characters
- match one of a collection of parts of the regex

## Reputation

I should warn you that Regexes have a reputation of being very hard and obscure.  I believe this reputation is exaggerated - it is a syntax of its own, but that syntax isn't terrible complex.  Most complexity comes from a combination of unfamiliarity and that most people are trying to solve their particular problem rather than learn the syntax. However, it is nonetheless a powerful system and mistakes can be hard to identify and, depending on what you are doing with the regex, can cause hidden bugs or slowdowns.

## When not to Regex

As powerful as regexes are, there are situations when they are the wrong tool for the job.  Recognizing these and not trying to use a regex in these cases will save you a lot of time.

- "Balanced" text.  Trying to match text inside, say, parens when there can be nested parens is a bad situation for regex.  This is true for all kinds of "paired" text, such as parens, braces, brackets, quotes, etc.
- emails.   You may think the rules for email address are pretty simple, but that's just because you are only thinking of simple email addresses.  It turns out the real rules for email are a nightmare.  Use specialty built libraries or tools to match email addresses.
- Too much "look ahead" or "look behind". (match X text when it appears before/after Y text but don't match Y)  or  While Regexes CAN match these (usually), the result is rarely worth the effort except in the most simple cases. 

## Tooling

There are numerous websites that offer ways to build or test a regex pattern.  These are very popular with those that find regexes very daunting, though I myself find they end up supporting the idea of regexes as complex, because they create another layer between the developer and the actual regex syntax and behavior.

Nonetheless, many people DO find them useful, so if you want some help or confirmation in dealing with regexes, there are many to help you out.

## Variations

Regexes exist in many languages and come in many varieties.  Complicating matters further, different languages have different levels of support.  And for a bit more complication, regexes use backslashed values to indicate certain matches.  Escaping in a string uses a backslash character, so different languages get more and more "ugly".

For example, JavaScript has "native" regex support, meaning that a regex pattern can be directly written.  Java, in comparison, has Regex support, but the patterns are treated like strings.  The regular presence of backslash characters in regex patterns means they have to be escaped in Java Strings, creating what is known as "Leaning Toothpick Syndrome".

Example regex pattern to match "/cats/index.html": 
- JS: `/\/cats\/index.html/`
- Java: `"/cats/index.html"`

Example regex pattern to match 3 digits:
- JS:  `/\d{3}/`
- Java: `"\\d{3}"`

Example regex to match a phone number like "(206) 555-2121":
- JS: `/\(\d{3}\) \d{3}-\d{4}/`
- Java: `"\\(\\d{3}\\) \\d{3}-\\d{4}"`

## Tokens

All tokens below use JS syntax, so a pattern will be between `//`.

Note that a match can occur ANYWHERE in the string - that is, of the full pattern can match somewhere in the string, then it matches, regardless of the rest of the string.  So a pattern that matches "cat" will also match "catacomb" or "scatter".  This can be avoided by using the start/end of string tokens below.

- Match any text: the text (escaping if the character appears as a pattern below
  - example: `/cat/` matches "cat"
- Match any single character: `.`
  - example: `/./` matches "c", "a", "t", or "!", along with every other single character (including spaces, tabs, etc)
- Create a "group" for a match (to use later): wrap matching pattern in parens:
  - example: `/(cat)/` will match "cat" and a group is created that holds "cat"
- Match a digit: `/\d`
  - example: `/\d/` matches "0", "1", "2", etc.
- Match whitespace: `/\s/` matches a space, a tab, etc.
- Match one of multiple tokens: place a `|` in between the tokens
  - example: `/\d|c/` matches "c" or a digit
  - example: `/cat|bird/` matches "cat" or "bird"
  - example: `/(cat|bird)-like/` matches "cat-like" or "bird-like"
    - Notice how the pipe character only impacts inside the group
- Match one of a set of characters: put `[]` around the characters:
  - example: `/[bcs]at/` matches "bat", "cat", or "sat"
- Match anything NOT of a set of characters: put a `^` as the first character inside a `[]` set
  - example: `/[^bs]at/` matches "cat" and "fat" but not "bat" or "sat"
- Match start of line: place the `^` character
  - example: `/^cat/` will match "catacomb" but not "scatter"
- Match end of line: place the `$` character
  - example: `/cat$/` will match "cat" or "scat" but not "catacomb" or "scatter"
  - example: `/^[bc]at$/` will match "cat" or "bat" but not "scat" or "sat" or "batter"

### Modifiers

You can take the tokens mentioned above and apply a modifer that alters the behavior

- Match a number of times: put the number of times inside `{}` after the pattern
  - example: `/\d{3}/` matches exactly 3 digits
- Match at least a minimum number of times, but more if you can: have a number followed by a comma inside `{}` 
  - example: `/\d{3,}/` matches "123", "1234", "12312", and so forth
- Match at no more than a maximum number of times, but as many as you can: have a number followed before a comma inside `{}` 
  - example: `/\d{,3}/` matches "123" but not "12".   "1234" would match the "123" part
- Match within a range of times, preferring the larges number allowed: put in both the minimum and maximum number of matches inside `{}`, separated by a comma:
  - example: `/\d{3,5}/` matches "111", "1111", and "11111".  It doesn't match "11" and only matches the first 5 characters of "123456"
- Match any number of times from 1 and up: add a `+` after a token:
  - Note: this is the same as `{1,}`
    - example: `/\d+/` is the same as `/\d{1,}/`
  - example: `/\d+/` matches "1", "11", "111", and so forth
- Match any number of times from 0 and up: add a `*` after a token:
  - Note: this is NOT the same as any character - this is a modifier, not a token
  - Note: this is the same as `{0,}`
    - example: `/\d*/` is the same as `/\d{0,}`
  - example: `/\d*/` matches "", "1", "11", and so forth
  - example: `/\d\+*/` matches "1", "1+", "1++", and so forth
- Optionally match if it can, but continue matching if it cannot: a `?` after the token
  - example: `/cat\d? is here/` matches "cat is here" or "cat5 is here"
  - example: `/cat(-like)?/` matches "cat" or "cat-like"

### Modifying a Modifier

You can make a modifier "non-greedy", that is, to have a token match as few times as it can and still have the pattern match.  To do this, add a `?` after the _modifier_ (note this is different than the optional modifier)

This is not an exhaustive list, but it covers the most common tokens and modifiers.  Hopefully you can see how regexes can easily describe how to match a wide range of text.

