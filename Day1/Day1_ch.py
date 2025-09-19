# challange 1
n,l = input("Enter a number and length of series (seperated by ',') : ").split(",")
my_list = []
for i in range(1, int(l)+1):
            if len(my_list) <= int(l):
             my_list.append(int(n)*i)

print( f"number : {n} - lenght {l} ---> {my_list}")
    

#challange 2
string = input ("enter a string :")
result = []
prev_char = ""
for char in string:
        if char != prev_char:
            result.append(char)
            prev_char = char
    
result_word = ''.join(result)
print(result_word)