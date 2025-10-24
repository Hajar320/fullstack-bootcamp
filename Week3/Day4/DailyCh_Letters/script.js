 const input = document.getElementById('lettersOnly');

        // Solution 1: Using input event with regex
        input.addEventListener('input', function(e) {
            // Remove any non-letter characters
            this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
            

            }
        );
