let abc = new XMLHttpRequest();
abc.addEventListener('load', () => {
    console.log(abc.response);
});

abc.open('GET','https://supersimplebackend.dev/documentation');
abc.send();
    