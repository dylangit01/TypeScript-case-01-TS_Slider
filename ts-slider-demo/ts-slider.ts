let imgs: string[]
imgs = [
    'https://i.ytimg.com/vi/-VRHxkHL1vs/maxresdefault.jpg',
    'https://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/cyberpunk_2077_cover.jpeg?itok=tP6zJFmM',
    'https://ksassets.timeincuk.net/wp/uploads/sites/54/2019/06/video-poster-en-0590f399.jpg',
    'https://dontfeedthegamers.com/wp-content/uploads/2017/11/Cyberpunk-2077.jpg',
    'https://i.redd.it/piq1yetakc311.jpg',
    'https://4.bp.blogspot.com/-lTfvPYuFEJM/XPL5yPYqIII/AAAAAAAADlM/ROzwjKuxI80gb2yCYLtNawxvRkBavOsmQCKgBGAs/w914-h514-p-k-no-nu/cyberpunk-2077-v-uhdpaper.com-4K-47.jpg',
]

let imgCount: number = 0  //在TS里，所有的变量都需要定义类型吗？Yes,最好是这样。
let eleSlider: HTMLImageElement = <HTMLImageElement>document.getElementById('slider') //这里的HTMLElement类型需要写吗？
let playing: boolean = true

//下面这三行是为pause/play button 服务的
let btnControl: HTMLElement = document.getElementById('control')
const textPlay: string = '<i class="fas fa-pause"></i>'
const textPause: string = '<i class="fas fa-play"></i>'

//要控制定时器，先要拿到定时器的ID,且要先给这个ID一个空值,然后在31行让ID等于setInterval
let intervalID = null

//编程好习惯，先定义重复使用的变量，这样不容易出错
const indicatorID: string = 'xbtn'

//没有参数的时候，箭头函数是这么写吗？Yes！
let moveSlider = () => {
    if (playing) {
        let imgIndex = ++imgCount % imgs.length
        eleSlider.setAttribute('src', imgs[imgIndex])
        /*这一步是让内存变量btn拿到indicator的ID, ID的值是和当前显示图片ID一致，
        同时为了确保图片按顺序显示下去，让图片和indicator对应显示：
        用imgIndex= ++imgCount % img.length */
        let btn = document.getElementById(indicatorID + imgIndex)
        //下面的函数不是清除前面一个的highlight，是清除所有的highlight
        clearHighlight()
        btn.setAttribute('class', 'dots highlightDots')
    }
}

/*作用域的问题？arrow function规范的问题？是先写函数好？还是直接在setInterval里面写函数？
 这里在前或者在后，应该没什么问题，写在setInterval里面看的不是很方便*/
intervalID = setInterval(moveSlider, 1000) //在运行这行代码的时候，才能拿到interval的ID

////////////////////////////////////////////////
let clearHighlight = () => {
    //这个函数是瞬间完成所有图片的渲染的，也就是说这个函数是让所有的indicators成为dots的样式
    for (let i = 0; i < imgs.length; i++) {
        let btn = document.getElementById(indicatorID + i)
        btn.setAttribute('class', 'dots')
    }
}
////////////////////////////////////////////////
let startTimer = () => {
    if (!intervalID) {
        intervalID = setInterval(moveSlider, 1000)
    }
}

let stopTimer = () => {
    if (intervalID) {
        clearInterval(intervalID)
        intervalID = null
    }
}


////////////////////////////////////////////////
let eleIndicator: HTMLElement = document.getElementById('indicator')

/*这种分情况下的剪头函数和上面的普通函数也没节省什么啊？
  ➡️函数的作用主要是没有函数作用域，这个在后面做OOB练习的时候特别需要用到*/
let createIndicators = () => {
    for (let i = 0; i < imgs.length; i++) {
        let btn: HTMLElement = document.createElement('button')
        //下面的method是让新建的button属性附在eleIndicator上
        //在函数里let btn创建了button的功能，然后附给eleIndicator
        eleIndicator.appendChild(btn)
        // btn.innerHTML = 'O'

        //setAttribute永远都是qualifiedName + value：
        //系统提示下面函数一定是要string类型，可以用String转换类型,同时它的作用是同步img和indicator的数字
        btn.setAttribute('data-btn', String(i))
        /*下一行的作用是添加点击同步的事件,但是是由下面定义的onClickBtn函数定义的。
         这里要注意的是：在OOB class编译环境下，onclick对HTML不起作用，必须要用到addEventListener函数*/
        btn.setAttribute('onclick', 'onClickBtn(this)')
        /*下面这里没有提示，是因为'xbtn'是string，+ 任何类型都是string。*/
        btn.setAttribute('id', indicatorID + i)
        btn.setAttribute('class', 'dots')
    }
}
createIndicators()

///////////////////////////////////////////////
//onClickBtn函数是回应上面onclick事件，clickBtn = this
let onClickBtn = clickBtn => {
    let index = Number(clickBtn.getAttribute('data-btn'))
    eleSlider.setAttribute('src', imgs[index])
    let btn = document.getElementById(indicatorID + index)
    //下面的clear函数为什么可以匹配点击的图片呢？因为clear函数是完成所有indicators的渲染
    clearHighlight()
    btn.setAttribute('class', 'dots highlightDots')
    /*下面几行的作用是当点击某张图片后，让计数器重新开始计数，并且当点击停止的时候，不要让timer启动
    另外imgCount = index的作用是点击某张图片后，计数器开始从点击的那张图片开始，不是按照原来的顺序滚动*/
    imgCount = index
    /*如果interval是运动的，就是ID有值的情况，先暂停计数，然后开始计数，
    这样点击每个图片，会按照setInterval的时间间隔从新循环*/
    if (intervalID) {
        stopTimer()
        startTimer()
    } else {    //如果interval本身是停止的，就保持停止状态
        stopTimer()
    }
}

////////////////////////////////////////////////
//这里firstImg函数一定要放在createIndicators函数后面，因为，如果放在前面，系统找不到btn.setAttribute
let firstImg = () => {
    eleSlider.setAttribute('src', imgs[0])
    let btn = document.getElementById(indicatorID + imgCount)
    btn.setAttribute('class', 'dots highlightDots')
}
firstImg()

///////////////////////////////////////////////
//第一种暂停的方法：
let pauseOrPlaySlider = () => {
    playing = !playing
    btnControl.innerHTML = playing ? textPlay : textPause
}

//第二张暂停的方法：当intervalID有值的时候，清空这个值，且为了代码的建造性，他人也可能在用这个代码，所以要人为的赋空值
let pauseOrPlaySlider2 = () => {
    if (intervalID) {
        clearInterval(intervalID)
        intervalID = null
        btnControl.innerHTML = textPause
    } else {
        intervalID = setInterval(moveSlider, 1000) //在else的情况下，仍然要赋一个新ID给这个函数
        btnControl.innerHTML = textPlay
    }
}

//////////////////////////////////////////////
let moveControlToEnd = () => {
    let node = document.getElementById('control')
    let list = document.getElementById('indicator')
    list.insertBefore(node, null)
}

moveControlToEnd()

let moveArrowRightToEnd = () => {
    let node = document.getElementById('rightarrow')
    let list = document.getElementById('indicator')
    list.insertBefore(node, null)
}
moveArrowRightToEnd()

///////////////////////////////////////////////
let moveImgs = (direction: string) => {
    if (direction === 'after') {
        let index01 = ++imgCount % imgs.length
        eleSlider.setAttribute('src', imgs[index01])
        let btn = document.getElementById(indicatorID + index01)
        clearHighlight()
        btn.setAttribute('class', 'dots highlightDots')
        if (intervalID) {
            stopTimer()
            startTimer()
        } else {
            stopTimer()
        }
    } else if (direction === 'pres') {
        let index02 = --imgCount % imgs.length
        if (index02 < 0) {
            //当往前遍历到第一张图片，再往前的时候，强制跳到最后一张图片
            index02 = imgs.length - 1
            //这一步很重要，这样上面行的"--imgCount"不会一直减下去
            imgCount = index02
        }
        eleSlider.setAttribute('src', imgs[index02])
        let btn = document.getElementById(indicatorID + index02)
        clearHighlight()
        btn.setAttribute('class', 'dots highlightDots')
        if (intervalID) {
            stopTimer()
            startTimer()
        } else {
            stopTimer()
        }
    }
}















































































