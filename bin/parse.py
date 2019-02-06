import re

for obj in lib:
  # path = (obj file name)
  with open(path, 'r') as f:
  contents = f.read()

text_to_search = """
hello

abvdedadellladsfjeeasdf

abc 
4.1

GPA of 3.0"""

# METACHARACTERS (NEED TO BE ESCAPED)
# . ^ $ * + ? { } [ ] \ | / ( )

sentence = 'start a sentence and then bring it to and end'
pattern_gpa = re.compile(r'\bGPA')

matches = pattern_gpa.finditer(text_to_search)

for match in matches:
  print(match)
