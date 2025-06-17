let tabs = document.querySelectorAll(".tab");
let activeTab = 1;
let p = document.querySelector(".p");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((btn) => {
      btn.classList.remove("active");
      btn.style = "color:#444;";
    });	
    activeTab = tab.getAttribute("data-tab-id");
    tab.style = `color:black;`;
    tab.classList.add("active");
    switch (activeTab) {
      case '1':
        p.textContent = `First Tab content to be displayed here.`;
        break;
      case '2':
				p.textContent = `Second Tab content to be displayed here.`;
				break;
			case '3':
				p.textContent = `Third Tab content to be displayed here.`;
				break;
			case '4':
				p.textContent = `Fourth Tab content to be displayed here.`;
				break;
    }
  });
});
