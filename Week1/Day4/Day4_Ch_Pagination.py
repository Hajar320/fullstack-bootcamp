import math
class Pagination :
    def __init__(self,items=None,page_size =10):
        self.items = items if items is not None else []
        self.page_size = page_size
        self.current_idx = 0

        if self.page_size > 0:
           self.total_pages = math.ceil(len(self.items)/self.page_size)
        else :
            self.total_pages = 0


    def get_visible_items(self):
        
        start = (self.current_idx * self.page_size)
        end   =  (start + self.page_size) 
        return self.items[start:end]
    
    def go_to_page(self,page_num):
         if page_num < 1 :
            raise ValueError("Page number out of range")
         elif page_num > self.total_pages:
            self.current_idx = self.total_pages - 1  
            return self.get_visible_items()
         else:
            self.current_idx = page_num - 1
            return self.get_visible_items()
         
    def first_page(self):

        self.current_idx = 0
        return self.get_visible_items()
    
    def last_page(self):
        self.current_idx =self.total_pages -1 
        return self.get_visible_items()
    def next_page(self):
        if self.current_idx < self.total_pages -1 :
            self.current_idx += 1
        return self.get_visible_items()
        
    def prev_page(self):
        if self.current_idx > 0 :
                self.current_idx -= 1
        return self.get_visible_items()
       
    def __str__(self):
        res = ""
        for item in self.get_visible_items() :
            res += f"{item}"
        return res
        
        

"""
my_items =["aa","bbbb","fff","azef","azf","aze"]
Randy = Pagination(my_items,2)

print(f"\n{Pagination.go_to_page(Randy,1)}")
print(f"{Randy.next_page()}")
print(f"{Randy.next_page()}")
print(f"\n{Pagination.go_to_page(Randy,2)}")

print(f"{Randy.next_page()}")
print(f"{Randy.prev_page()}")
print(f"\n{Pagination.go_to_page(Randy,3)}")
print(f"{Randy.next_page()}")
print(f"{Randy.prev_page()}")

Randy.__str__()
"""

alphabetList = list("abcdefghijklmnopqrstuvwxyz")
p = Pagination(alphabetList, 4)

print(p.get_visible_items())
# ['a', 'b', 'c', 'd']

p.next_page()
print(p.get_visible_items())
# ['e', 'f', 'g', 'h']

p.last_page()
print(p.get_visible_items())
# ['y', 'z']

p.go_to_page(10)
print(p.current_idx +1 )
# Output: 7

p.go_to_page(0)
# Raises ValueError
