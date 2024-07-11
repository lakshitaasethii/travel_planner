document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const note = document.getElementById('message').value;

        try {
            const response = await fetch('http://ec2-15-223-1-70.ca-central-1.compute.amazonaws.com:3000/submitBooking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, phone, note }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit booking');
            }

            alert('Booking submitted successfully!');
            form.reset();
        } catch (error) {
            console.error('Error submitting booking:', error.message);
            alert('Failed to submit booking. Please try again later.');
        }
    });
});