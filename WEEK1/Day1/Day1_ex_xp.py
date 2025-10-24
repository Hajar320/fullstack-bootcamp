#exercice 1
month = int(input("choose a month (1 to 12) :"))
if month in [3,4,5]:
    print(" the season of the month is spring")
elif month in [6,7,8]:
    print(" the season of the month is summer")
elif month in [9,10,11]:
    print(" the season of the month is autumn")
elif month in [12,1,2]:
   print(" the season of the month is winter")

print("\n\n")
# exercice 2

num = range(1,21)
for i in range(1,21):
    print (i)

my_list =list(num)

print("the elements with even indexes are :")
for i in my_list:
    if my_list.index(i) % 2 == 0:
        print(i)
   

print("\n\n")
# exercice 3

while 1:
    name = input("what is your name ? ")
    if name == "hajar":
         break
print("\n\n")
#exercice 4

names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']

name = input("enter your name : ")
if name in names :
    print (f"the index of your name is {names.index(name)}")


print("\n\n")
# exercice 5

a = input("Input the 1st number: ")
b = input("Input the 2nd number: ")
c = input("Input the 3rd number: ")

 print("The largest number is : ", max(a,b,c))


print("\n\n")
# exercice 6
import random
random_int = random.randint(1,9)
num = int(input("enter a number between 1 and 9 : "))
#print(f"the random number is : {random_int}")
if num == random_int:
    print("winner")
else :
    print("better luck next time")

#print("the random number is : " ,random_int)

print("\n\n")
# Bonus
import random
random_int = random.randint(1,9)
while 1:
    num = input("enter a number between 1 and 9 : ")
    if num == "quit":
        break


print("\n\n")
#Bonus2
import random
random_int = random.randint(1,9)
count1 = 0
count2 = 0
while 1:
    user_input = input("enter a number between 1 and 9 (or 0000 to quit): ")
    if user_input == "0000":
        break
    num = int(user_input)
    if num == random_int:
        count1 += 1
    else:
        count2 += 1

print("the number of wins : ",count1)
print("the number of loss : ",count2)

    
input()




 
 
  


