const map = [
    0,8,0,  0,1,3,  4,0,0,
    4,2,0,  6,8,0,  0,0,0,
    0,0,1,  0,5,4,  0,8,3,

    1,9,0,  0,0,8,  7,0,0,
    0,4,7,  0,0,2,  5,0,8,
    0,5,0,  0,0,9,  0,3,0,

    2,0,9,  3,0,5,  0,7,0,
    5,0,0,  7,2,0,  0,0,9,
    7,3,0,  0,0,0,  2,0,6,
];

const createHTML = () => {
    return `
        ${createSudokuHTML()}
        ${createGameControllHTML()}
    `;
};

const createSudokuHTML = () => {
    return `
        <div class="sudoku">
            ${[...new Array(9)].joinMap((_, blockNum) => createBlockHTML(blockNum))}
        </div>
    `;
};

const createBlockHTML = (blockNum) => {
    return `
        <div class="block">
            ${[...new Array(9)].joinMap((_, squareNum) => {
                const row = Math.floor(blockNum / 3) * 3 + Math.floor(squareNum / 3) + 1;
                const col = blockNum % 3 * 3 + squareNum % 3 + 1;
                const num = map[(row - 1) * 9 + col - 1];

                return createSquareHTML({block: blockNum + 1, row, col, num});
            })}
        </div>
    `;
};

const createSquareHTML = ({block, row, col, num}) => {
    return `
        <div
            data-block="${block}"
            data-row="${row}"
            data-col="${col}"
            class="
                square
                ${block === 1 && row === 1 && col === 1 ? 'active' : ''}
                ${block === 1 || row === 1 || col === 1 ? 'affected' : ''}
            "
            onClick="handleSquareClick(this);"
        >
            <div
                class="
                    answer
                    ${num > 0 ? 'original' : ''}
                    ${!(row === 1 && col === 1) && num !== 0 && num === map[0] ? 'selectedNumber' : ''}
                "
            >${num > 0 ? num : ''}</div>
            <div class="candidate">
                ${[...new Array(9)].joinMap((_, idx) => `
                    <div class="candidateNumber">${idx + 1}</div>
                `)}
            </div>
        </div>
    `;
};

const createGameControllHTML = () => {
    return `
        <div class="gameControllsWrapper">
            <div class="gameControlls">
                <div class="gameControllBtnWrapper">
                    <button class="gameControllBtn undoBtn" title="元に戻す" onclick="handleUndoBtnClick();">
                        <svg xmlns="http://www.w3.org/2000/svg" class="gameControllBtnIcon" viewBox="0 0 30 31">
                            <path fill="#0072E3" d="M13.71 2.46a1 1 0 01.14 1.32l-.08.1-2.15 2.32 3.41.02a10 10 0 11-10 10 1 1 0 112 0 8 8 0 108.25-8h-.25l-3.48-.02 2.28 2.53a1 1 0 01.01 1.32l-.09.1a1 1 0 01-1.32 0l-.09-.08-3.76-4.18a1 1 0 01-.07-1.25l.08-.1 3.7-4.02a1 1 0 011.42-.06z"></path>
                        </svg>
                    </button>
                    <span class="gameContorollBtnText">元に戻す</span>
                </div>
                <div class="gameControllBtnWrapper">
                    <button class="gameControllBtn eraseBtn" title="消す" onclick="handleEraseBtnClick();">
                        <svg xmlns="http://www.w3.org/2000/svg" class="gameControllBtnIcon" viewBox="0 0 30 31">
                            <path fill="#0072E3" fill-rule="evenodd" d="M27.13 25.11a1 1 0 01.12 2h-6.9a1 1 0 01-.11-2H27.13zM21.48 4.08l.17.14.16.15 3.76 3.76a4 4 0 01.15 5.5l-.15.16-11.32 11.32h2.04a1 1 0 011 .89v.11a1 1 0 01-.88 1H6.52a3 3 0 01-1.98-.74l-.14-.14-2.23-2.22a4 4 0 01-.15-5.5l.15-.16L16.15 4.37a4 4 0 015.33-.29zm-11.52 9.3l-6.38 6.38a2 2 0 00-.11 2.7l.11.13 2.23 2.23a1 1 0 00.58.28l.13.01h4.9l5.13-5.13-6.59-6.6zm7.87-7.82l-.14.1-.13.13-6.18 6.18 6.59 6.6 6.19-6.2a2 2 0 00.11-2.7l-.11-.12-3.77-3.76a2 2 0 00-2.56-.22z"></path>
                        </svg>
                    </button>
                    <span class="gameContorollBtnText">消す</span>
                </div>
                <div class="gameControllBtnWrapper">
                    <button class="gameControllBtn memoBtn" title="メモ" onclick="handleMemoBtnClick(this);">
                        <svg xmlns="http://www.w3.org/2000/svg" class="gameControllBtnIcon" viewBox="0 0 30 31">
                            <path fill="#0072E3" d="M25.43 4.76a5.42 5.42 0 01.19 7.52l-.18.2-13.5 13.48a.91.91 0 01-1.21.08l-.1-.08-5.07-5.08-.59 4.34 3.25-.44c.44-.05.84.2 1 .58l.03.11.02.11c.06.47-.24.91-.7 1.03l-.1.02-4.45.6a.94.94 0 01-.79-.27.92.92 0 01-.26-.65v-.13l1-7.4a.92.92 0 01.19-.44l.08-.09L17.71 4.76a5.45 5.45 0 017.72 0zm.35 20.08a1 1 0 110 2h-8.7a1 1 0 010-2h8.7zM21.4 10.18L9.43 22.13 11.3 24l11.95-11.95-1.86-1.86zm-3.23-3.23L6.2 18.91l1.92 1.91L20.07 8.86l-1.9-1.9zm3.42-1.93c-.69 0-1.35.2-1.92.56l-.15.1 5.01 5 .1-.14c.33-.5.51-1.09.55-1.7l.01-.22a3.58 3.58 0 00-3.6-3.6z"></path>
                        </svg>
                    </button>
                    <span class="gameContorollBtnText">メモ</span>
                </div>
                <div class="gameControllBtnWrapper">
                    <button class="gameControllBtn hintBtn" title="ヒント" onclick="handleHintBtnClick();">
                        <svg xmlns="http://www.w3.org/2000/svg" class="gameControllBtnIcon" viewBox="0 0 30 31">
                            <path fill="#0072E3" d="M17.3 25.91c.5 0 .91.48.91 1.08 0 .59-.4 1.07-.91 1.07h-4.6c-.5 0-.91-.48-.91-1.07 0-.6.4-1.08.91-1.08zM15 2.34a9.68 9.68 0 019.64 9.71c0 3.5-1.86 6.7-4.83 8.41-.23.14-.4.39-.5.82a3.21 3.21 0 01-3.13 2.5H13.5a3.21 3.21 0 01-3.17-2.68c-.08-.45-.17-.65-.12-.62a9.72 9.72 0 01-4.85-8.43c0-5.36 4.31-9.7 9.64-9.7zm0 2.15a7.53 7.53 0 00-7.5 7.56 7.57 7.57 0 003.78 6.57c.65.38.99 1.1 1.16 2.12.1.51.54.89 1.06.89h2.68c.5 0 .94-.35 1.05-.83.23-.98.73-1.73 1.5-2.19a7.57 7.57 0 003.77-6.56A7.53 7.53 0 0015 4.5z"></path>
                        </svg>
                    </button>
                    <span class="gameContorollBtnText">ヒント</span>
                </div>
            </div>
            <div class="numPadWrapper">
                ${[...new Array(9)].joinMap((_, idx) => `
                    <button class="numPadBtn" onclick="handleNumPadBtnClick(this);">${idx + 1}</button>
                `)}
            </div>
            <button class="startBtn" onclick="handleStartBtnClick();">開始</button>
        </div>
    `;
};

const handleSquareClick = (targetSquare) => {
    const block = targetSquare.dataset.block;
    const row = targetSquare.dataset.row;
    const col = targetSquare.dataset.col;
    const number = targetSquare.querySelector('.answer').textContent || null;
    const squareList = [...document.querySelectorAll('.square')];

    for(const square of squareList){
        square.classList.remove('affected');
        square.classList.remove('active');
        square.querySelector('.answer').classList.remove('selectedNumber')
    }

    squareList
    .filter((square) => square.dataset.block === block || square.dataset.row === row || square.dataset.col === col)
    .forEach((square) => square.classList.add('affected'));

    squareList
    .filter((square) => square !== targetSquare && square.querySelector('.answer').textContent === number)
    .forEach((square) => square.querySelector('.answer').classList.add('selectedNumber'));

    targetSquare.classList.add('active');

    return;
};

const handleUndoBtnClick = () => {
    return;
};

const handleEraseBtnClick = () => {
    const answer = document.querySelector('.square.active > .answer');
    const candidate = document.querySelector('.square.active > .candidate');

    if(answer.classList.contains('original')){
        return;
    }

    answer.textContent = '';
    answer.classList.remove('userInput');
    [...candidate.children].forEach((candidateNumber) => candidateNumber.classList.remove('show'));

    return;
};

const handleMemoBtnClick = (memoBtn) => {
    memoBtn.classList.toggle('active');

    if(memoBtn.classList.contains('active')){
        [...document.querySelectorAll('.numPadBtn')].forEach((numPadBtn) => numPadBtn.classList.add('forMemo'));
    }else{
        [...document.querySelectorAll('.numPadBtn')].forEach((numPadBtn) => numPadBtn.classList.remove('forMemo'));
    }

    return;
};

const handleHintBtnClick = () => {
    return;
};

const handleNumPadBtnClick = (numPadBtn) => {
    const num = numPadBtn.textContent;
    const square = document.querySelector('.square.active');
    const answer = square.querySelector('.answer');
    const candidate = square.querySelector('.candidate');
    const memoBtn = document.querySelector('.memoBtn');

    if(answer.classList.contains('original')){
        return;
    }

    if(memoBtn.classList.contains('active')){
        answer.textContent = '';
        candidate.classList.add('show');
        [...candidate.children].find((candidateNumber) => candidateNumber.textContent === num).classList.toggle('show');
    }else{
        candidate.classList.remove('show');
        [...candidate.children].forEach((candidateNumber) => candidateNumber.classList.remove('show'));

        if(answer.textContent === num){
            answer.textContent = '';
            answer.classList.remove('userInput');
        }else{
            answer.textContent = num;
            answer.classList.add('userInput');
        }

        [...document.querySelectorAll('.square')]
        .filter((_square) => _square !== square && _square.querySelector('.answer').textContent === num)
        .forEach((_square) => _square.querySelector('.answer').classList.add('selectedNumber'));
    }

    hideFinishedNumPad();
    highlightErrorSquares();

    return;
};

const handleStartBtnClick = () => {
    return;
};

const isSharedSquare = (square1, square2) => {
    return (
        square1.dataset.block === square2.dataset.block
        || square1.dataset.row === square2.dataset.row
        || square1.dataset.col === square2.dataset.col
    );
};

const getSquaresOfSameBlock = (block) => {
    return [...document.querySelectorAll(`.square[data-block=${block}]`)];
};

const getSquaresOfSameRow = (row) => {
    return [...document.querySelectorAll(`.square[data-row=${row}]`)];
};

const getSquaresOfSameColumn = (col) => {
    return [...document.querySelectorAll(`.square[data-col=${col}]`)];
};

const hideFinishedNumPad = () => {

};

const highlightErrorSquares = () => {

    // if(isSharedSquare(square, _square)){
    //     _square.querySelector('.answer').classList.add('error');
    //     square.querySelector('.answer').classList.add('error');
    // }

    return;
};