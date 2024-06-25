const form =document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const message = form.elements.message.value;
    alert(`Thank you ${name}! We will get back to you at ${email}.`);
    form.reset();
});