document.addEventListener('DOMContentLoaded', function() {
    
    // Change ID attribute using setAttribute
    const navbarDiv = document.querySelector('#navBar');
    
        navbarDiv.setAttribute('id', 'socialNetworkNavigation');
        
        console.log("navbarDiv.outerHTML");
        
        
        // 2: Add new list item
        
        const ulElement = navbarDiv.querySelector('ul');
        
            const liElem = document.createElement('li');
            
            const logoutTextNode = document.createTextNode('Logout');
            
            // Append text to list item
            liElem.appendChild(logoutTextNode);
            
            // Append list item to unordered list
            ulElement.appendChild(liElem);
            
            console.log('New list item added successfully!');
            console.log('Updated UL:', ulElement.innerHTML + '\n');
            
            
            // 3: Retrieve first and last list items
            
            // Using firstElementChild
            const firstListItem = ulElement.firstElementChild;
            const firstItemText = firstListItem.textContent;
            
            // Using lastElementChild  
            const lastListItem = ulElement.lastElementChild;
            const lastItemText = lastListItem.textContent;
            
            console.log(`First menu item: ${firstItemText}`);
            console.log(`Last menu item: ${lastItemText}`);
            
            
            // Display in alert for visual confirmation
            setTimeout(() => {
                alert(`First item: ${firstItemText}\nLast item: ${lastItemText}`);
            }, 1000);

                  
    
});