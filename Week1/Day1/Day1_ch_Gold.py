from datetime import  date
import calendar

user_bdate = input("what is your birthdate : (DD/MM/YYYY) : ")
day,month,year = user_bdate.split('/')
today = date.today().year
#formatted_date = today.strftime("%d/%m/%Y")
#thisyear = formatted_date.year
#user_age = formatted_date.year - user_bdate.year
#print(formatted_date)
#print(thisyear)
#print(today)
#print(year)


user_age = today-int(year)
print("your age is : " ,user_age)
print("your birth year is a leap year : " ,calendar.isleap(int(year)))
num = list(str(user_age))
num_candles = num[-1]
#print(num)
#print(num[-1])

if calendar.isleap(int(year)):
      for i in range(2):
        l2 = int(num_candles) * 2
        print(" " * 4 + ("i" * int(num_candles)).center(l2, "_"))
        print(" " * 4 + "|" + ":H:A:P:P:Y".center(l2 - 2, " ") + "|")
        print(" " * 4 + "|" + " ".center(l2 - 2, " ") + "|")
        print("-".center(l2 + 8, "-"))
        print("|" + "^".center(l2 + 6, "^") + "|")
        print("|" + ":B:i:r:t:h:d:a:y".center(l2 + 6, " ") + "|")
        print("|" + " ".center(l2 + 6, " ") + "|")
        print("~".center(l2 + 8, "~"))
else :
    l2 = int(num_candles) * 2
    print(" " * 4 + ("i" * int(num_candles)).center(l2, "_"))
    print(" " * 4 + "|" + ":H:A:P:P:Y".center(l2 - 2, " ") + "|")
    print(" " * 4 + "|" + " ".center(l2 - 2, " ") + "|")
    print("-".center(l2 + 8, "-"))
    print("|" + "^".center(l2 + 6, "^") + "|")
    print("|" + ":B:i:r:t:h:d:a:y".center(l2 + 6, " ") + "|")
    print("|" + " ".center(l2 + 6, " ") + "|")
    print("~".center(l2 + 8, "~"))




