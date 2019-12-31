let imgs = [
    'https://i.ytimg.com/vi/-VRHxkHL1vs/maxresdefault.jpg',
    'https://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/cyberpunk_2077_cover.jpeg?itok=tP6zJFmM',
    'https://ksassets.timeincuk.net/wp/uploads/sites/54/2019/06/video-poster-en-0590f399.jpg',
    'https://dontfeedthegamers.com/wp-content/uploads/2017/11/Cyberpunk-2077.jpg',
    'https://i.redd.it/piq1yetakc311.jpg'
]
let imgCount = 0
let playing = true
const playText = '<i class="fas fa-pause"></i>'
const pauseText = '<i class="fas fa-play"></i>'
let intervalSlider = null
let eleSliders = document.getElementById('sliders')
let eleplayorpause = document.getElementById('playorpause')
const indicatorID = 'xbtn'

function moveSliders() {
    if (playing) {
        let index = ++imgCount % imgs.length //++:第一张图片不会显示2次
        eleSliders.setAttribute('src', imgs[index])
        let btn = document.getElementById(indicatorID + index)
        clearIndicatorSign()
        btn.setAttribute('class', 'dot highlightDot')
    }
}
//////////////////////////////////////以下两个函数的作用是保证点击图片后，timer重新开始2秒计数
function startTimer() {
    if(!intervalSlider) {
        intervalSlider = setInterval(moveSliders,1000)
    }
}

function stopTimer() {
    if(intervalSlider) {
        clearInterval(intervalSlider)
        intervalSlider = null
    }
}
/////////////////////////////////////// How to relate between imgs and buttons?
function onClickImgs(clickImg) {
    // console.log(xxx)
    // console.log(xxx.getAttribute('data-btn'))
        let index = parseInt(clickImg.getAttribute('data-btn'), 10)
        let imgIndex = imgs[index] //这里的imgIndex拿的是图片，不是数字， index拿的才是数字
        clearIndicatorSign()
        eleSliders.setAttribute('src', imgIndex)
        let btn = document.getElementById(indicatorID + index)
        btn.setAttribute('class', 'dot highlightDot')
        // debugger
        imgCount = index
    //下面的逻辑是在当点击pause按钮的时候，保证slider不会自己启动timer往后运行
        if (intervalSlider){
            stopTimer()
            startTimer()
        } else {
            stopTimer()
        }

}

createIndicators()
//firstImg()一定要放在createIndicators（）后面，因为indicatorID是在那个函数里定义的，如果放在上面，系统就找不到
firstImg()
function firstImg(){
    eleSliders.setAttribute('src', imgs[0])
    let btn = document.getElementById(indicatorID + imgCount)
    btn.setAttribute('class', 'dot highlightDot')
}
intervalSlider = setInterval(moveSliders,1000)

////////////////////////////////////
function createIndicators() {
    let eleIndicator = document.getElementById('indicator')
    for (let i = 0; i < imgs.length; i++) {
        let btn = document.createElement('button')
        btn.setAttribute('data-btn', i)
        btn.setAttribute('onclick', 'onClickImgs(this)')
        eleIndicator.appendChild(btn)
        btn.setAttribute('id', indicatorID + i)
        btn.setAttribute('class', 'dot')
    }
}

//////////////////////////////////////////////
function playOrPause() {

    playing = !playing
    eleplayorpause.innerHTML = playing ? playText : pauseText
}

//以下这种方式是通过clearInterval来实现
function playOrPause2() {
    if (intervalSlider) {
        clearInterval(intervalSlider)
        intervalSlider = null
        eleplayorpause.innerHTML = pauseText
    } else {
        intervalSlider = setInterval(moveSliders, 1000)
        eleplayorpause.innerHTML = playText
    }
}

///////////////////////////////////////////////
function clearIndicatorSign() {
    for (let i = 0; i < imgs.length; i++) {
        let btn = document.getElementById(indicatorID + i)
        btn.setAttribute('class', 'dot')
    }
}

//////////////////////////////////////
movePausebtnToEnd()

function movePausebtnToEnd() {
    let node = document.getElementById('playorpause')
    let list = document.getElementById('indicator')
    list.insertBefore(node, null)  //or (node, lastChild[length-1])
}

/////////////////////////////////////
arrowRightToEnd()

function arrowRightToEnd() {
    let node = document.getElementById('arrowRight')
    let list = document.getElementById('indicator')
    list.insertBefore(node, null)
}

///////////////////////////////////////
//Adding previous & next button:
function moveImgs(direction) {
    if (direction === 'next') {
        clearIndicatorSign()
        let index1 = ++imgCount % imgs.length
        eleSliders.setAttribute('src', imgs[index1])
        let btn1 = document.getElementById(indicatorID + index1)
        btn1.setAttribute('class', 'dot highlightDot')
        if (intervalSlider){
            stopTimer()
            startTimer()
        } else {
            stopTimer()
        }
    } else if (direction === 'prev') { //点击的第一下不起作用？怎么改进？
        clearIndicatorSign()
        // debugger
        let index2 = --imgCount % imgs.length
        if (imgCount < 0) {
            imgCount = imgs.length - 1
            index2 = imgCount
        }
        eleSliders.setAttribute('src', imgs[index2])
        let btn2 = document.getElementById(indicatorID + index2)
        btn2.setAttribute('class', 'dot highlightDot')
        if (intervalSlider){
            stopTimer()
            startTimer()
        } else {
            stopTimer()
        }
    }
}







