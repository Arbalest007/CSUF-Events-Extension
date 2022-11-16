###### Project: CSUF Events Google Chrome Extension
###### Authors: Sami Bajwa, Patrick Lin, Nicholas Jones
###### Current Version: 0.92

# About
- **You can clone this github repo or download and extract the folder onto your machine.**

- **It is required to run the AnswersDB.py and WordsDB.py files before running the procfile! _This is to create and initialize the databases if they do not already exist._**
<br> `$ python3 AnswersDB.py`
<br> `$ python3 WordsDB.py`

- **Then you run the procfile using foreman**
<br> `$ foreman start`
![VirtualBox_Tuffix 2020 Edition_08_04_2022_19_58_09](https://user-images.githubusercontent.com/39601543/162554364-03d65d09-02ec-4de7-83a5-5adcbb0efc2d.png)

# Answer Checker Microservice
> Commands in File "AnswerValidation.py"<br>
> Description: 'AnswerValidation.py' handles the database of possible answers, and is responsible for
              setting the color values of each letter for a user's given guess.
              
              /checkAnswer/    - sets color values of letters for a given guess against the daily word
              /change-answer/  - update future answers

1. /checkAnswer/
      The 'check-answer' command will call the "answerCheck()" function to initialize 3 empty
   lists which will be used to store the current guess's letter colors.  Firstly, a loop
   will iterate through the word and check for matching letters, and it will record those indexes to
   be green if they match the daily word.  The next loop iterates through the word again while skipping
   any previously set indexes (green indexes).  The loop will then record the indexes of yellow and gray
   letters.  The JSON object holding these 3 lists showing what indexes should be what colors will be returned.
   
   ![Game1](https://user-images.githubusercontent.com/39601543/162555378-559a8df8-fec9-4eea-b641-0cad3bc822e6.png)
   ![Game2](https://user-images.githubusercontent.com/39601543/162555394-7ddcbe9c-501a-41c0-a9db-c8b0362bf823.png)
   ![GameSolution](https://user-images.githubusercontent.com/39601543/162555413-3daf41c0-a23e-47c6-b8f6-09cecc682c79.png)
   
2. /change-answer/
      The 'change-answer' command will connect to the "answers.db", which is the answers database, 
   and attempt to update the row containing the specified Game ID with a new word using the UPDATE SQL command.
   
   ![ChangeWord](https://user-images.githubusercontent.com/39601543/162555424-1e28ee79-c2f7-4078-ab45-7944017b405d.png)
   ![DBA1](https://user-images.githubusercontent.com/39601543/162555430-b365e090-fc0e-4203-afa7-cfb57e4ba6cf.png)
   ![DBA2](https://user-images.githubusercontent.com/39601543/162555440-afd352f3-9813-4f5e-be86-8d4de8b09d40.png)

# Guess Validation Microservice
> Commands in File "WordValidation.py" <br>
> Description: 'WordValidation.py' handles the database of possible words, and is responsible for
              validating if a user guess is valid.

              /validate/     - checks if user guess is valid word
              /add-guess/    - adds a new possible guess to the database
              /remove-guess/ - removes a guess from the database

1. /validate/
      The 'validate' command will connect to the 'words_ms.db', and it will check whether a guess is a
    valid word.  It compares the guess against the database to see if it exists as a potential guess. It either returns true if the word is a valid guess, or false if it is invalid.
    
    ![Validate](https://user-images.githubusercontent.com/39601543/162555446-a85782bd-295c-4ec5-9f52-d6e8f65c33f8.png)
    
2. /add-guess/
      The 'add-guess' command will connect to the 'words_ms.db'. It takes in a list of words and it will check through the database
    for each word to see if it can be added.  If it already exists it will not be added, but if it doesnt
    then it will be.
    
    ![Add-Guess](https://user-images.githubusercontent.com/39601543/162555453-3084ad0f-e01d-4a4f-9a51-950a874501d1.png)
    ![Database1](https://user-images.githubusercontent.com/39601543/162555464-51d1fdf7-7b4c-4df8-ad75-c2254745a089.png)

3. /remove-guess/
      The 'remove-guess' command will connect to the 'words_ms.db'. It takes in a list of words and it will check through the database
    for each word to see if it can be deleted.  If the word cannot be found then the command will return
    that the word was unable to be deleted.  Otherwise, the command will remove the word from the database.

    ![Remove_Guess](https://user-images.githubusercontent.com/39601543/162555473-22d69a97-aca0-4de3-83a5-522a66c5194d.png)
    ![Database2](https://user-images.githubusercontent.com/39601543/162555483-dda06801-d110-4e2e-a125-af797f46cd33.png)