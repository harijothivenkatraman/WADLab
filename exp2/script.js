// Course Details and Fees
const courses = {
    'cs101': { name: 'Computer Science', fee: 50000 },
    'cs201': { name: 'Data Structures', fee: 60000 },
    'cs301': { name: 'MCA', fee: 70000 },
    'cs401': { name: 'Ph.D', fee: 90000 },
    };

// Course selection event
document.getElementById('course-select').addEventListener('change', function () {
    const courseId = this.value;
    const descriptionElement = document.getElementById('course-description');
    const feeElement = document.getElementById('fees-detail');
    
    if (courseId !== 'null') {
        descriptionElement.innerText = `You selected: ${courses[courseId].name}`;
        feeElement.innerText = `Course Fee: Rs.${courses[courseId].fee}`;
    } else {
        descriptionElement.innerText = 'Select a course to view details.';
        feeElement.innerText = '';
    }
});

// Registration form
document.getElementById('registration-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('Phone').value;
    const course = document.getElementById('course-registration').value;

    if (name === '' || email === '' || phone === ' ' ||course === 'null') {
        alert('Please fill out all fields.');
    } else {
        const confirmationMessage = `Thank you ${name}! You have successfully registered for the course: ${courses[course].name}.`;
        document.getElementById('confirmation-message').innerText = confirmationMessage;
        this.reset();
    }
});
