# exercice 1

#x = (1 == True)
#y = (1 == False)
#a = True + 4
#b = False + 10

#print("x is", x)
#print("y is", y)
#print("a:", a)
#print("b:", b)
print(" x  is  1==True  => True \n y  is  1==False => False \n true is 1 and false is 0 \n a = 1 + 4 => 5 \n b = 0 + 10 => 10")

print("\n")
# exercice 2

longest = ""
while 1:
       user_input = input("enter the longest sentence you can without the character “A” :" )
       if len(user_input) > len(longest):
           print("congratulation")
           longest = user_input
       else :
             continue


# exercice 3

para ="trees play an important role in our ecosystem .\n trees provide shade shelter oxygen and many even produce fruit .\n there are over 60000 species of trees that come in all shapes and sizes .\n from majestic cedars to smaller fruit trees and shrubs ."

print("number of characters : ",len(para))
print("number of sentences : ", para.count("."))
print("number of words :" ,len(para.split()))
print("number of unique words : ",len(set(para.split())))

#bonus 


sentences = para.split(".")
white_spaces = para.count(" ") + para.count("\n")
print("number of non whitespace characters : ",len(para) - white_spaces)

print("the average number of words per sentence :")
for sentence in sentences:
  if len(sentence) > 0:
    num_words_per_sentence = len(sentence.split())
    aver_word_para = num_words_per_sentence/len(sentences)
    print( aver_word_para)

print("the number of non-unique words : ", len(para.split()) - len(set(para.split())) )