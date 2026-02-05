function onReady(){
	const targets = document.querySelectorAll('.feature, .hero-content');
	const io = new IntersectionObserver((entries)=>{
		entries.forEach(entry=>{
			if(entry.isIntersecting){
				entry.target.classList.add('reveal');
			}
		});
	},{threshold:0.15});
	targets.forEach(t=>io.observe(t));
}

if(document.readyState === 'loading'){
	document.addEventListener('DOMContentLoaded', onReady);
} else onReady();
