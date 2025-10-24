// Get the form element and buttons
        const form = document.getElementById('libform');
        const shuffleButton = document.getElementById('shuffle-button');
        
        // Store user words globally so shuffle can access them
        let userWords = {};
        
        // Array of different story templates
        const storyTemplates = [
            
            `In a world full of surprises, {person} discovered that the {place} was home to 
            a truly {adjective} {noun}. Without thinking twice, {person} decided to {verb} 
            right then and there. The {adjective} {noun} responded by starting to {verb} as well! 
            Now, whenever someone visits the {place}, they always ask about the time {person} 
            found the {noun} and taught it to {verb}.`,

            "Yesterday, I saw {person} with a {adjective} {noun}. They tried to {verb} at the {place}, and it was absolutely wild!",

            "The {adjective} {noun} that {person} found could {verb} better than anyone at the {place}. It was truly remarkable!",
            
            "Legend has it that {person} once used a {adjective} {noun} to {verb} at the {place}. The results were spectacular!",
            
            `Deep within the heart of the {place}, {person} made an incredible discovery: 
            a {adjective} {noun} that could {verb} better than anyone! The {noun} showed 
            {person} how to truly {verb}, and soon the entire {place} was filled with 
            the joy of their {adjective} adventure. People say that if you listen carefully 
            at the {place}, you can still hear {person} and the {noun} {verb} in harmony.`
        ];

        // Add event listener for form submission
        form.addEventListener('submit', function(event) {
            console.log("Form submitted!");
            
            // Prevent the form from submitting normally
            event.preventDefault();
            
            try {
                // Get the value of each input
                const noun = document.getElementById('noun').value.trim();
                const adjective = document.getElementById('adjective').value.trim();
                const person = document.getElementById('person').value.trim();
                const verb = document.getElementById('verb').value.trim();
                const place = document.getElementById('place').value.trim();
                
                console.log("Input values:", { noun, adjective, person, verb, place });
                
                // Make sure values are not empty
                if (!noun || !adjective || !person || !verb || !place) {
                    throw new Error("Please fill in all fields!");
                }
                
                console.log("All fields are filled correctly");
                
                // Store user words for shuffling
                userWords = { noun, adjective, person, verb, place };
                
                // Generate and display the first story
                generateStory();
                
                // Show the shuffle button
                shuffleButton.classList.remove('hidden');
                console.log("Shuffle button is now visible");
                
            } catch (error) {
                console.error("Error occurred:", error.message);
                alert("Error: " + error.message);
            }
        });
        
        // Add event listener for shuffle button
        shuffleButton.addEventListener('click', function() {
            console.log("Shuffle button clicked!");
            
            // Check if we have user words stored
            if (Object.keys(userWords).length === 0) {
                console.error("No user words available for shuffling");
                alert("Please generate a story first using 'Lib it!'");
                return;
            }
            
            // Generate a new story with the same words
            generateStory();
            console.log("New story generated with shuffle");
        });
        
        // Function to generate a random story
        function generateStory() {
            // Select a random story template
            const randomIndex = Math.floor(Math.random() * storyTemplates.length);
            const selectedTemplate = storyTemplates[randomIndex];
            
            console.log(`Selected story template ${randomIndex + 1} of ${storyTemplates.length}`);
            
            // Replace placeholders with user words
            let story = selectedTemplate
                .replace(/{noun}/g, userWords.noun)
                .replace(/{adjective}/g, userWords.adjective)
                .replace(/{person}/g, userWords.person)
                .replace(/{verb}/g, userWords.verb)
                .replace(/{place}/g, userWords.place);
            
            // Display the story
            document.getElementById('story').textContent = story;
            console.log("Story displayed successfully");
        }
        
        // Page load error checking
        window.addEventListener('load', function() {
            console.log("Page loaded successfully");
            
            if (!shuffleButton) console.error("Shuffle button not found!");
        });