class BankAccount:

    def __init__(self,username,password,authentificated = False):
        self.username =username
        self.password =password
        self.authentificated = authentificated
        self.balance = 0

    def authentificate(self,use_username,use_password):
        if use_username == self.username and use_password ==self.password :
            self.authentificated = True
            return True
        else:
            self.authentificated = False
            return False
        
        
    
     
    def deposit(self,x) :
     if self.authentificated ==True :

        if x <= 0 :
            raise Exception("the variable is not positive")
        else :
            self.balance += x  # Update instance balance
        return self.balance

     else:
         raise Exception("noo authentification")
    def withraw(self,y):
     if self.authentificated ==True :
        if y < 0:
            raise Exception("the variable is not positive")
        else :
            self.balance += y  # Update instance balance
        return self.balance
     else:
         raise Exception("noo authentification")

class MinimumBalanceAccount(BankAccount):
    def __init__(self,minimum_balance = 0):
        super().__init__(username,password ,authentificated)
        self.minimum_balance = minimum_balance
    
    def withraw(self,y):
       if BankAccount.balance > self.minimum_balance :
           wit = y + BankAccount.balance
           print(wit)
        
       else :
           raise Exception("the variable is not positive")
            






