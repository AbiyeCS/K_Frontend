document.getElementById('productForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;

    const product = {
        name: name,
        description:description,
        price: parseFloat(price)
    };

    try {
        const response = await fetch('/add-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if (response.ok) {
            const savedProduct = await response.json();
            console.log('Product saved successfully:', savedProduct);
            alert('Product added successfully!');
        } else {
            console.error('Failed to save product:', response.statusText);
            alert('Failed to add product.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the product.');
    }
});
