# exercise 1
for i in range(1,5):
  print ("Hello world") 

# exercide 2

print(f"the result of (99)**3 * 8 is {(99**3)*8}")

# exercice 3

name = input("Enter your name: ")
if name == "hajar":
    print("let's be friends")
else: 
    print(f"Hello {name}")

# exercice 4

height = int(input("enter your height in cm :"))
if height > 145 :
    print("you are tall enough to ride")
else :
    print("you need to grow more to ride the roller coaster")

# exercice 5

my_fav_numbers = {4,23,48,151}
my_fav_numbers.update([22,10])
print(my_fav_numbers)
removed_element = my_fav_numbers.remove(151)
print(my_fav_numbers)
friend_fav_numbers = {3,6,9}
our_fav_num = my_fav_numbers.union(friend_fav_numbers)
print(our_fav_num)

# exercice 6

my_tuple =(1,5,8,10)
print(my_tuple)
# tuples can not be changed

# exercice 7
basket = ["banana","apple", "orange","Blueberry"]
basket.remove("banana")
print(basket)
basket.remove("Blueberry")
print(basket)
basket.append("kiwi")
print(basket)
basket.insert(0,"apple")
print(basket)
print(f" the number of apples in the basket : {basket.count("apple")}" )
basket.clear()
print(basket)

# exercice 8

sandwich_orders = ["Tuna sandwich", "Pastrami sandwich", "Avocado sandwich", "Pastrami sandwich", "Egg sandwich", "Chicken sandwich", "Pastrami sandwich"]

while "Pastrami sandwich" in sandwich_orders:
    sandwich_orders.remove("Pastrami sandwich")
print(sandwich_orders)

finished_sandwiches = []
while sandwich_orders:
    finished_sandwiches.append(sandwich_orders.pop(0))

#print("sanndwich_orders : ",sandwich_orders)
#print("finished_sandwiches : ",finished_sandwiches)

for sandwich in finished_sandwiches:
   print(f"i made your {sandwich} ")
  



