console.log("Welcome to Melodify"); //to print melodify on console window

// Initialize the variables
let songIndex = 0; // Tracks the currently playing song index
let audioElement = new Audio('1.mp3'); // Creates a new audio element with the first song
let masterPlay = document.getElementById('masterPlay'); // Play/Pause button
let myProgressBar = document.getElementById('myProgressBar'); // Play/Pause button
let gif = document.getElementById('gif'); // GIF animation for playing song
let masterSongName = document.getElementById('masterSongName');  // Displays the song name
let songItems = Array.from(document.getElementsByClassName('songItem')); // Gets all song items

// Array containing songs with their names, file paths, and cover images
let songs = [
    {songName:"Let Me Love You",filePath:"1.mp3",coverPath :"cover1.jpg"},
    {songName:"Legion : It's Always Blue",filePath:"2.mp3",coverPath :"cover2.jpg"},
    {songName:"Trap Cratel",filePath:"3.mp3",coverPath :"cover3.jpg"},
    {songName:"They Mad Lowkey Pesci",filePath:"4.mp3",coverPath :"cover4.jpg"},
    {songName:"Rich The Kid - Plug Walk",filePath:"5.mp3",coverPath :"cover5.jpg"},
    {songName:"Song Titkes",filePath:"6.mp3",coverPath :"cover6.jpg"},
    {songName:"The Saftey Dance",filePath:"7.mp3",coverPath :"cover7.jpg"},
    {songName:"Back It Up",filePath:"8.mp3",coverPath :"cover8.jpg"},
    {songName:"Peaches - Justin ",filePath:"9.mp3",coverPath :"cover9.jpg"},
    {songName:"Ghost",filePath:"10.mp3",coverPath :"cover10.jpg"},
]

// Assign cover images and song names dynamically to the playlist items
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; // Assigns cover image
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;  // Assigns song name
});

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if (audioElement.paused || audioElement.currentTime <=0){
        // If the song is paused or hasn't started, play it
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity = 1; // Show the animation
    }
    else{
        // If the song is playing, pause it
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')
        gif.style.opacity = 0; // Hide the animation
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    //Update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})


// Seek functionality (when user changes progress bar)
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

// Function to reset all play buttons
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

// Play song when a song in the list is clicked
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => { 
    element.addEventListener('click', (e) => {
        console.log(e.target);
        makeAllPlays(); // Reset all other play buttons
        songIndex = parseInt(e.target.id);  // Get the clicked song index
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        masterSongName.innerText = songs[songIndex].songName; // Update song name display
        audioElement.src = `/${songIndex+1}.mp3`; // Change the song source
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1; // Show the animation
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    });
});

// Next Button Click Event
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >= 9){ // If last song, loop back to first
        songIndex = 0
    }
    else{
        songIndex +=1; // Otherwise, go to the next song
    }
    audioElement.src = `/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

// Previous Button Click Event
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <=0 ){ // If first song, stay at first
        songIndex = 0
    }
    else{
        songIndex -=1; // Otherwise, go to the previous song
    }
    audioElement.src = `/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
