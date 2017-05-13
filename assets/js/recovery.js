
const userdata = {user_id: user_id, name: user_name, img: user_img, language: 0};
localStorage.setItem('userdata', JSON.stringify(userdata));

const root = document.getElementById("root");
root.outerHTML = `

<div class="ui blue message">
	<div class="ui medium header">Your profile has been successful recovered!</div>
	<h2>Enjoy The Events with us!</h2>
</div>`;

setTimeout(()=>{
	window.location.href = "/";
}, 3000);