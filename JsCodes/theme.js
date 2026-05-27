const themeToggle = document.querySelectorAll('.themeToggle'); // hay bytsyavu ka node list
const htmlElement = document.documentElement; // hay losal lal html tag

function changeLogo(isDark){
    themeToggle.forEach(element =>{
        element.children[0].innerHTML = isDark ? '☽' : '☀';
    });
};

themeToggle.forEach(element => {
    element.addEventListener('click', () => {
        const isDark = htmlElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light'); //theme is name of the variable in the storage , then value
        changeLogo(isDark);
    });   
});


if (localStorage.getItem('theme') === 'dark') {
    // htmlElement.classList.add('dark');
    changeLogo(true);
};