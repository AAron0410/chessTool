document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'q':
            document.getElementById('piece1').click();
            break;
        case 'w':
            document.getElementById('piece2').click();
            break;
        case 'e':
            document.getElementById('piece3').click();
            break;
        case 'r':
            document.getElementById('piece4').click();
            break;
        case 't':
            document.getElementById('piece5').click();
            break;
        case 'y':            
            document.getElementById('piece6').click();
            break;
        case 'u':
            document.getElementById('piece7').click();
            break;
        case 'a':
            document.getElementById('piece8').click();
            break;
        case 's':
            document.getElementById('piece9').click();
            break;
        case 'd':
            document.getElementById('piece10').click();
            break;
        case 'f':
            document.getElementById('piece11').click();
            break;
        case 'g':
            document.getElementById('piece12').click();
            break;
        case 'h':
            document.getElementById('piece13').click();
            break;
        case 'j':
            document.getElementById('piece14').click();
            break;
        case 'Delete':
            document.getElementById('undo').click();
            break;
        default:
            break;
    }
});
let pieces = {
    'images/C_P_0.png': 1, 
    'images/C_P_1.png': 2,
    'images/C_P_2.png': 2, 
    'images/C_P_3.png': 2, 
    'images/C_P_4.png': 2, 
    'images/C_P_5.png': 2, 
    'images/C_P_6.png': 5,  
    'images/C_P_7.png': 1, 
    'images/C_P_8.png': 2, 
    'images/C_P_9.png': 2, 
    'images/C_P_10.png': 2, 
    'images/C_P_11.png': 2, 
    'images/C_P_12.png': 2, 
    'images/C_P_13.png': 5 
};
let originalPieces = {
    'images/C_P_0.png': 1, 
    'images/C_P_1.png': 2, 
    'images/C_P_2.png': 2, 
    'images/C_P_3.png': 2, 
    'images/C_P_4.png': 2, 
    'images/C_P_5.png': 2, 
    'images/C_P_6.png': 5, 
    'images/C_P_7.png': 1, 
    'images/C_P_8.png': 2,
    'images/C_P_9.png': 2, 
    'images/C_P_10.png': 2, 
    'images/C_P_11.png': 2, 
    'images/C_P_12.png': 2, 
    'images/C_P_13.png': 5  
};
let currentSlot = 1;
let history = [];

function placePiece(imageUrl) {
    if (pieces[imageUrl] > 0) {
        var slotId = 'slot' + currentSlot;
        var slot = document.getElementById(slotId);

        if (slot && ((currentBoard === 'A' && currentSlot <= 33) || (currentBoard === 'B' && currentSlot <= 38))) {
            slot.style.backgroundImage = `url('${imageUrl}')`;
            pieces[imageUrl]--;
           
            history.push({ slotId: slotId, imageUrl: imageUrl });

            currentSlot++; 

            
            if (slotId === 'slot4') {
                moveImageFromSlot4ToSlot33();
            }

            /*if (pieces[imageUrl] === 0) {
                let button = document.getElementById(imageUrl);
                button.style.opacity = '0.5';
                button.style.pointerEvents = 'none';
            }*/
        }
    } else {
        alert("棋子已無剩餘。");
    }
}


function moveImageFromSlot4ToSlot33() {
    var slot4 = document.getElementById('slot4');
    var slot33 = document.getElementById('slot33');
    if (slot4 && slot33) {
        slot33.style.backgroundImage = slot4.style.backgroundImage;        
    }
}

function undo() {
    if (history.length > 0) {
        let lastMove = history.pop();
        let slot = document.getElementById(lastMove.slotId);
        if (slot) {
            slot.style.backgroundImage = '';
            pieces[lastMove.imageUrl]++; 
            currentSlot--;

           /* let button = document.getElementById(lastMove.imageUrl);
            button.style.opacity = '1';
            button.style.pointerEvents = 'auto';*/
        }
    } else {
        alert("無法再執行上一步了");
    }
}




let currentBoard = 'A';

function switchChessboard() {
    let chessboard = document.getElementById('chessboard');

    
    document.querySelectorAll('.chess-slot').forEach(slot => {
        slot.style.backgroundImage = ''; 
    });
    document.querySelectorAll('.chess-slot2').forEach(slot => {
        slot.style.backgroundImage = ''; 
    });
   
    for (let key in pieces) {
        pieces[key] = originalPieces[key];
    }

    if (currentBoard === 'A') {
       
        chessboard.style.backgroundImage = "url('images/B_B_1.png')";
        chessboard.style.width = '20vw'; 
        chessboard.style.height = '20vw';
        currentBoard = 'B';
        currentSlot = 34;
    } else {
        
        chessboard.style.backgroundImage = "url('images/B_B_0.jpg')";
        chessboard.style.width = '8vw'; 
        chessboard.style.height = '45.2vw'; 
        chessboard.style.gridTemplateColumns = 'repeat(17, 1fr)'; 
        chessboard.style.gridTemplateRows = 'repeat(3, 1fr)';
        currentBoard = 'A';
        currentSlot = 1;
    }
}



function captureAndDownload(boardType) {
    var chessboardElement = document.getElementById('chessboard');

   
    setTimeout(() => {
        domtoimage.toBlob(chessboardElement)
            .then(function (blob) {
                window.saveAs(blob, boardType === 'A' ? 'chessboardA.png' : 'chessboardB.png');
            })
            .catch(function (error) {
                console.error('Oops, something went wrong!', error);
            });
    }, 500); 
}
