let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")

function speak(text) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;
    speech.lang = "en-US";
    const voices = window.speechSynthesis.getVoices();
    const maleVoice = voices.find(voice => voice.name.includes('Male')) || voices[0]; 
    speech.voice = maleVoice;
    window.speechSynthesis.speak(speech);
}

function wishMe(){
    let day=new Date()
    let hours=day.getHours()
    if(hours>=0 && hours<12){
        speak("Good Morning Sir")
    }
    else if(hours>=12 && hours <16){
        speak("Good afternoon Sir")
    }else{
        speak("Good Evening Sir")
    }
}

let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition 
let recognition =new speechRecognition()
recognition.onresult=(event)=>{
    let currentIndex=event.resultIndex
    let transcript=event.results[currentIndex][0].transcript
    content.innerText=transcript
   takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click",()=>{
    recognition.start()
    voice.style.display="block"
    btn.style.display="none"
})

function takeCommand(message){
   voice.style.display="none"
    btn.style.display="flex"
    if(message.includes("hello")||message.includes("hey")){
        speak("hello sir,what can i help you?")
    }
    else if(message.includes("who are you")){
        speak("i am virtual assistant ,created by Likith Yadav  Sir")
    }else if(message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com", "_blank");
    }else if(message.includes("search for")){
        let searchQuery = message.replace("search for", "").trim(); // Extract the search query
        let youtubeURL = "https://www.youtube.com/results?search_query=" + encodeURIComponent(searchQuery);
        speak("Searching YouTube for " + searchQuery + "...");
        window.open(youtubeURL, "_blank"); // Open the search in a new tab
    }
    else if(message.includes("open google")){
        speak("opening google...")
        window.open("https://www.google.com","_blank")
    }
    else if(message.includes("open facebook")){
        speak("opening facebook...")
        window.open("https://facebook.com/","_blank")
    }
    else if(message.includes("open instagram")){
        speak("opening instagram...")
        window.open("https://instagram.com/","_blank")
    }
    else if(message.includes("open calculator")){
        speak("opening calculator..")
        window.open("calculator://")
    }
    else if(message.includes("open whatsapp")){
        speak("opening whatsapp..")
        window.open("whatsapp://")
    }
    else if (message.includes("time")) {
        const currentTime = new Date().toLocaleTimeString('en-US'); 
        speak(`The current time is ${currentTime}`);
    }
    else if (message.includes("date")) {
        const currentDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
        speak(`Today's date is ${currentDate}`);
    }
    else{
        let finalText="this is what i found on internet regarding" + message.replace("shipra","") || message.replace("shifra","")
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message.replace("shipra","")}`,"_blank")
    }
}

document.getElementById('askBtn').addEventListener('click', async () => {
    const query = document.getElementById('userQuery').value;
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = 'Thinking...';

    const res = await fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    });
    const data = await res.json();
    responseDiv.innerHTML = data.answer;
});