// Establsh DOM elements as variables
const grocerySubmit = document.getElementById('addGrocery')
const list = document.getElementById('list')
const clearBtn = document.getElementById('clear')

// Instantiate default state value:
const initialState = {
    groceries: []
}

// Establish the reducer. Takes initial state value and 
// an action as arguments. 
const groceryReducer = (state = initialState.groceries, action) => {
    switch(action.type) {
        case 'grocery/add':
            return [
                ...state, 
                {
                    text: action.text
                }
            ]
        case 'grocery/clear':
            return []
        default: 
            return state
    }
}

// Establish store
let store = Redux.createStore(groceryReducer)

// Establish dispatch
const clearList = () => {
    document.getElementById('newItem').value = ''
    store.dispatch({
        type: 'grocery/clear'
    })
    console.log(store.getState())
}

const newGrocery = (e) => {
    e.preventDefault()
    let groceryText = document.getElementById('newItem').value
    store.dispatch({
        type: 'grocery/add', 
        text: groceryText
    })
    console.log(store.getState())
}

// Add event listeners
grocerySubmit.addEventListener('click', (e) => {newGrocery(e)})
clearBtn.addEventListener('click', clearList)

const renderList = (state) => {
    while(list.firstChild) {
        list.removeChild(list.firstChild)
    }
    
    state.forEach(grocery => {
        // Generate a new list element for each grocery item
        let li = document.createElement('li')

        // Append the new element to our list DOM element, we 
        // targeted it at the beginning of this code-along!
        list.appendChild(li)

        // Populate the text content of the list item
        li.textContent = grocery.text
    });
}

const render = () => {
    const state = store.getState()
    renderList(state)
}

store.subscribe(render)