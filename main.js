let resultElement = document.querySelector('.result')
let mainContainer = document.querySelector('.main-container')
let rowId = 1;
const arrayWordsFiveLetters = [
    'abeto',
    'dobla',
    'pobre',
    'agudo',
    'peras',
    'flota',
    'leona',
    'bueno',
    'bruma',
    'bicho',
    'chile',
    'monte',
    'naves'
];

// Genero un indice aleatorio entre 0 y la longitud del array - 1
const randomIndex = Math.floor(Math.random() * arrayWordsFiveLetters.length);

// Obtengo la palabra aleatoria del array
const randomWord = arrayWordsFiveLetters[randomIndex];
let word = randomWord;
let wordArray = word.toUpperCase().split('');
console.log(wordArray)

let actualRow = document.querySelector('.row')

drawSquares(actualRow);
listenImput (actualRow);
addFocus(actualRow)

function listenImput (actualRow) {
    let squares = actualRow.querySelectorAll('.square');
    //transformo a un array el nodeList
    squares = [...squares];

    let userInput = []

    squares.forEach(element => {
        element.addEventListener('input', event => {
            //Si no se ha borrado
            if(event.inputType !== 'deleteContentBackward'){
                //Recoger el ingreso del usuario
                userInput.push(event.target.value.toUpperCase())
                console.log(userInput)
                if (event.target.nextElementSibling) {
                    //con el metodo focus hago que pase a la siguiente casilla automaticamente
                    event.target.nextElementSibling.focus();
                } else {
                    // Crear un array con las letars llenas

                    let squaresFilled = document.querySelectorAll('.square')
                    squaresFilled = [...squaresFilled]
                    let lastFiveSquaresFilled = squaresFilled.slice(-5)
                    let finalUserInput = [];
                    lastFiveSquaresFilled.forEach(element => {
                        finalUserInput.push(element.value.toUpperCase())
                    })

                    //Comparar arrays para cambiar estilos
                    let rightIndex = compareArrays(wordArray, finalUserInput)
                    console.log(rightIndex);
                    rightIndex.forEach(element => {
                        squares[element].classList.add('green')
                    })

                    //Cambiar estilos si existe la letra pero no en posicion correcta
                    let existIndexArray = existLetter(wordArray, finalUserInput)
                    console.log(existIndexArray)
                    existIndexArray.forEach(element => {
                        squares[element].classList.add('gold')
                    })

                    //si son iguales
                    if (rightIndex.length == wordArray.length) {
                        showResult('Ganaste!')
                        /* Salgo de la funcion con el return */
                        return;
                    }
                    // crear una nueva linea
                    let actualRow = createRow()

                    if(!actualRow) {
                        return
                    }
                    drawSquares(actualRow)
                    listenImput(actualRow)
                    addFocus(actualRow)
                }
            }else {
                userInput.pop();
            }

        })
    })
}


//Funciones

function compareArrays(array1,array2){
    let equalsIndex = []

    array1.forEach((element, index)=>{
        if(element == array2[index]){
            console.log(`En la posicion ${index} si son iguales`);
            equalsIndex.push(index);
        }else {
            console.log(`En la posicion ${index} no son iguales`);
        }
    });
    return equalsIndex
}

function  existLetter(array1, array2) {
    let existIndexArray = []
    array2.forEach((element, index)=>{
        if(array1.includes(element)){
            existIndexArray.push(index)
        }
    })
    return existIndexArray
}
/* Funcion para crear un div replicando el div de la clase row */
function createRow(){
    rowId++
    if (rowId <= 5  ) {
        let newRow = document.createElement('div');
        newRow.classList.add('row')
        newRow.setAttribute('id', rowId)
        mainContainer.appendChild(newRow)
        return newRow
    }else {
        showResult(`Intentalo de nuevo, la respuesta correcta era "${word.toUpperCase()}"`)
    }
}

function drawSquares (actualRow) {
    wordArray.forEach((item, index) => {
        if (index === 0) {
            actualRow.innerHTML += '<input type="text" maxlength="1" class="square focus">'
        }else {
            actualRow.innerHTML += '<input type="text" maxlength="1" class="square">'
        }
    });
}

function addFocus(actualRow) {
    let focusElement = actualRow.querySelector('.focus')
    focusElement.focus();
}

function showResult(textMsg) {
    resultElement.innerHTML =
        `<p>${textMsg}</p>` + '<button class="button">Reiniciar</button>';

    let resetBtn = document.querySelector('.button')
    resetBtn.addEventListener('click', ()=>{
        location.reload();
    });
}
