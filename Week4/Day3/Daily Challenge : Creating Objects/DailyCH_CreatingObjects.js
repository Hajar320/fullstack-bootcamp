

class video{
    constructor(title,uploader,time){
        this.title=title;
        this.uploader=uploader;
        this.time=time;
    }


watch() {
    return `${this.uploader} watched all ${this.time} seconds of ${this.title}!`;
  }
}

// First instance
const video1 = new Video('Learn JavaScript Fast', 'CodeMaster', 7200);
console.log(video1.watch());

// Second instance  
const video2 = new Video('Perfect Chocolate Cake', 'ChefMaria', 1800);
console.log(video2.watch());

// Array of objects containing video data
const videoData = [
  { title: 'JavaScript Masterclass', uploader: 'CodePro', time: 7200 },
  { title: 'Yoga Morning Routine', uploader: 'WellnessGuru', time: 1800 },
  { title: 'Italian Pasta Recipes', uploader: 'ChefMarco', time: 2400 },
  { title: 'Photography Basics', uploader: 'PhotoExpert', time: 3200 },
  { title: 'Guitar for Beginners', uploader: 'MusicMentor', time: 4800 }
];

// Loop through array to instantiate Video instances
const videoInstances = videoData.map(data => new Video(data.title, data.uploader, data.time));

// Call watch() method on all instances
videoInstances.forEach(video => {
  console.log(video.watch());
});