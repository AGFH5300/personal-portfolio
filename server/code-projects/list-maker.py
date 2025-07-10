print("=== List Maker ===")
print("Convert your text into a list of words!")
print()

def convert(string):
  li = list(string.split(" "))
  return li


# Driver code
str1 = input('Enter text to convert to list: ')
print(convert(str1))

