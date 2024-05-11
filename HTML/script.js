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
    'images/C_P_0.png': 1, // 帥/將
    'images/C_P_1.png': 2, // 士
    'images/C_P_2.png': 2, // 象/相
    'images/C_P_3.png': 2, // 馬
    'images/C_P_4.png': 2, // 車
    'images/C_P_5.png': 2, // 炮
    'images/C_P_6.png': 5,  // 兵/卒
    'images/C_P_7.png': 1, // 帥/將
    'images/C_P_8.png': 2, // 士
    'images/C_P_9.png': 2, // 象/相
    'images/C_P_10.png': 2, // 馬
    'images/C_P_11.png': 2, // 車
    'images/C_P_12.png': 2, // 炮
    'images/C_P_13.png': 5  // 兵/卒
};
let originalPieces = {
    'images/C_P_0.png': 1, // 帥/將
    'images/C_P_1.png': 2, // 士
    'images/C_P_2.png': 2, // 象/相
    'images/C_P_3.png': 2, // 馬
    'images/C_P_4.png': 2, // 車
    'images/C_P_5.png': 2, // 炮
    'images/C_P_6.png': 5,  // 兵/卒
    'images/C_P_7.png': 1, // 帥/將（对方）
    'images/C_P_8.png': 2, // 士（对方）
    'images/C_P_9.png': 2, // 象/相（对方）
    'images/C_P_10.png': 2, // 馬（对方）
    'images/C_P_11.png': 2, // 車（对方）
    'images/C_P_12.png': 2, // 炮（对方）
    'images/C_P_13.png': 5  // 兵/卒（对方）
};
let currentSlot = 1;
let history = [];

function placePiece(imageUrl) {
    if (pieces[imageUrl] > 0) {
        var slotId = 'slot' + currentSlot;
        var slot = document.getElementById(slotId);

        if (slot && ((currentBoard === 'A' && currentSlot <= 33) || (currentBoard === 'B' && currentSlot <= 38))) {
            slot.style.backgroundImage = `url('${imageUrl}')`;
            pieces[imageUrl]--; // 减少棋子数量
            // 添加操作到历史记录
            history.push({ slotId: slotId, imageUrl: imageUrl });

            currentSlot++; // 移动到下一个槽位

            // 检查是否刚放置了第四颗棋子，如果是，则复制到第33位置
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
        let lastMove = history.pop(); // 获取并移除最后一次操作
        let slot = document.getElementById(lastMove.slotId);
        if (slot) {
            slot.style.backgroundImage = ''; // 清除棋子图像
            pieces[lastMove.imageUrl]++; // 恢复棋子数量
            currentSlot--;

           /* let button = document.getElementById(lastMove.imageUrl);
            button.style.opacity = '1';
            button.style.pointerEvents = 'auto';*/
        }
    } else {
        alert("無法再執行上一步了");
    }
}


// 添加撤销按钮的事件监听
//document.getElementById('undoButton').addEventListener('click', undo);

let currentBoard = 'A'; // 初始设置为棋盤A

function switchChessboard() {
    let chessboard = document.getElementById('chessboard');

    // 清空所有棋子和重置计数器
    document.querySelectorAll('.chess-slot').forEach(slot => {
        slot.style.backgroundImage = ''; // 清除棋子
    });
    document.querySelectorAll('.chess-slot2').forEach(slot => {
        slot.style.backgroundImage = ''; // 清除棋子
    });
    // 重置棋子计数
    for (let key in pieces) {
        pieces[key] = originalPieces[key]; // 使用 originalPieces 重置棋子计数
    }

    if (currentBoard === 'A') {
        // 切换到棋盘B
        chessboard.style.backgroundImage = "url('images/B_B_1.png')";
        chessboard.style.width = '20vw'; // 恢复棋盘A的宽度
        chessboard.style.height = '20vw'; // 恢复棋盘A的高度
        currentBoard = 'B';
        currentSlot = 34; // 开始填充棋盘B的第一个槽位
    } else {
        // 切换回棋盘A
        chessboard.style.backgroundImage = "url('images/B_B_0.jpg')";
        chessboard.style.width = '8vw'; // 恢复棋盘A的宽度
        chessboard.style.height = '45.2vw'; // 恢复棋盘A的高度
        chessboard.style.gridTemplateColumns = 'repeat(17, 1fr)'; // 恢复棋盘A的列配置
        chessboard.style.gridTemplateRows = 'repeat(3, 1fr)'; // 恢复棋盘A的行配置
        currentBoard = 'A';
        currentSlot = 1; // 重新开始填充棋盘A的第一个槽位
    }
}

//document.getElementById('switchButton').addEventListener('click', switchChessboard);

function captureAndDownload(boardType) {
    var chessboardElement = document.getElementById('chessboard');

    // 延迟执行截图操作，确保背景图加载完成
    setTimeout(() => {
        domtoimage.toBlob(chessboardElement)
            .then(function (blob) {
                window.saveAs(blob, boardType === 'A' ? 'chessboardA.png' : 'chessboardB.png');
            })
            .catch(function (error) {
                console.error('Oops, something went wrong!', error);
            });
    }, 500); // 延迟500毫秒
}
