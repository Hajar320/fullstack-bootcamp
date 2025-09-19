class BankAccount :
    def __init__(self,username,password,balance,authenticated = False ):
        self.balance = balance
        self.username = username
        self.password = password
        self.authenticated = authenticated

    def deposit(self,x):
        if self.authenticated == True:
         if x <0 :
            raise Exception("........")
         else:
          self.balance += x
          return self.balance
        else:
           raise Exception ("........")

    def withdraw(self,y):
        if self.authenticated == True:
         if y <0 :
            raise Exception ("........")
         elif y > self.balance :
          raise Exception ("........")
         else:
            self.balance -= y
            return self.balance
        else:
         raise Exception("Authentication required")
           
    def authenticate(self,user_name,pass_word):
    
       if (user_name == self.username and pass_word ==self.password):
           self.authenticated = True
           return True
       return False    

class MinimumBalanceAccount(BankAccount):
   def __init__(self,username,password,balance,minimum_balance =0,authenticated=False):
      super().__init__(username,password,balance,authenticated )
      self.minimum_balance = minimum_balance
    
   def withdraw(self, y):
      
      if self.authenticated == True:
         if y < 0:
            raise Exception("Cannot withdraw negative amount")
        
         if y > self.balance:
            raise Exception("Insufficient funds")
        
         if (self.balance -y) < self.minimum_balance:
            raise Exception("Withdrawal would violate minimum balance requirement")
        
         else :
          self.balance -= y
          return self.balance
      else:
       raise Exception("Authentication required")

class ATM():
   def __init__(self,account_list ,try_limit):
      if not all(isinstance(account, (BankAccount, MinimumBalanceAccount)) for account in account_list):
            raise Exception("account_list must contain only BankAccount or MinimumBalanceAccount instances")
      
      try :
        try_limit <0
        raise ValueError
      except (ValueError, TypeError):
            print("Invalid try_limit provided. Setting to default value of 2.")
            try_limit = 2
      
      self.account_list = account_list
      self.try_limit = try_limit
      self.current_tries = 0
        
      self.show_main_menu()
    
   def show_main_menu(self):
      while 1:
         print("*** Menu ***")
         print("1. Log in")
         print("2. Exit")
             
      choice = input("Please select an option (1-2): ")
         
      if choice == "1":
                username = input("Enter username: ")
                password = input("Enter password: ")
                self.log_in(username, password)
      elif choice == "2":
                print("Thank you for using the ATM. Goodbye!")
                exit()
      else:
                print("Invalid option. Please try again.")

   def log_in(self,username,password):
      
      if self.current_tries >= self.try_limit:
            print("Maximum login attempts reached. ATM is shutting down.")
            exit()
      
      for account in self.account_list:
            if account.authenticate(username, password):
                print(f"Login successful! Welcome {username}.")
                self.show_account_menu(account)
                return
            
      self.current_tries += 1
      remaining_tries = self.try_limit - self.current_tries
        
      if remaining_tries > 0:
        print(f"Invalid username or password. {remaining_tries} attempt(s) remaining.")

        username = input("Enter username: ")
        password = input("Enter password: ")
        self.log_in(username, password)  # Recursive call to try again
      else:
        print("Maximum login attempts reached. ATM is shutting down.")
      exit()
         
   def show_account_menu(self):
       
       



my_bank = BankAccount("hajar","popopo",1000,True)
print(my_bank.deposit(50))
print(my_bank.withdraw(50))
print(my_bank.withdraw(500))

#MinimumBalanceAccount("hajar","popopo",1000,400,False)
min = MinimumBalanceAccount("hajar","popopo",1000,400,True)

print(min.deposit(50))
print(min.withdraw(400))