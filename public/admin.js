
async function main() {
// fetching books from server
    let response = await fetch('http://localhost:3001/listBooks')

    let books = await response.json()

    books.forEach(renderBook)
}

function renderBook(book) {
    let root = document.querySelector('#root')

    let li = document.createElement('li')
    li.textContent = book.title
// creates input and button function
    let quantityInput = document.createElement('input')
    quantityInput.value = book.quantity
// saves my books and updates them
    let saveButton = document.createElement('button')
    saveButton.textContent = 'Save'
// click event that saves books
    saveButton.addEventListener('click', () => {
        fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: book.id,
                quantity: quantityInput.value
            })
        })
    })

    li.append(quantityInput, saveButton)

    root.append(li)
}

main();