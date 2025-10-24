 # exercice 1 and exercice 2

birthdays ={
  "omar":"1/1/1964",
  "nouzha":"12/1/1966",
   "amina":"23/4/1996",
  "yassir":"17/10/2000",
  "khaoula":"4/4/2003"

}
print('welcome :')
#print(birthdays['amina'])
print(f"the list names are : {list(birthdays.keys())}")

user_name = input("enter the chosen name : ")
if user_name in list(birthdays.keys()) : 
        b_u = birthdays[user_name]
        print(f"{user_name} birthday is *** {b_u}***")
else :
        print(f"“Sorry, we dont have the birthday information for {user_name}")
print("\n")
# exercice 3

x_value =input("input x : ")
def num_def(x):
        res = int(x)+int(x*2)+int(x*3)+int(x*4)
        print(f" the reslut is : {res}")


num_def(x_value)

print("\n")

# exercice 4
import random

def throw_dice():
    return random.randint(1, 6)

def throw_until_doubles():
    throws_list = []  
    count_throws = 0

    while True:
        count_throws += 1
        die1 = throw_dice()
        die2 = throw_dice()
        current_throw = (die1, die2)
        throws_list.append(current_throw)
        
        if die1 == die2:
            return count_throws  

def main():
    throws_count = []  
    
    for i in range(100):
        count_needed = throw_until_doubles()
        throws_count.append(count_needed)
    
    total_throws = sum(throws_count)
    average_throws = total_throws / len(throws_count)
    
    
    print(f"Total throws across all experiments: {total_throws}")
    print(f"Average throws per experiment: {average_throws:.2f}")
  

# Run the program
main()