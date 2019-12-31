var imgs;
imgs = [
    'https://i.ytimg.com/vi/-VRHxkHL1vs/maxresdefault.jpg',
    'https://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/cyberpunk_2077_cover.jpeg?itok=tP6zJFmM',
    'https://ksassets.timeincuk.net/wp/uploads/sites/54/2019/06/video-poster-en-0590f399.jpg',
    'https://dontfeedthegamers.com/wp-content/uploads/2017/11/Cyberpunk-2077.jpg',
    'https://i.redd.it/piq1yetakc311.jpg',
    'https://4.bp.blogspot.com/-lTfvPYuFEJM/XPL5yPYqIII/AAAAAAAADlM/ROzwjKuxI80gb2yCYLtNawxvRkBavOsmQCKgBGAs/w914-h514-p-k-no-nu/cyberpunk-2077-v-uhdpaper.com-4K-47.jpg',
];
var imgCount = 0; //在TS里，所有的变量都需要定义类型吗？
var eleSlider = document.getElementById('slider'); //这里的HTMLElement类型需要写吗？
var playing = true;
//下面这三行是为pause/play button 服务的
var btnControl = document.getElementById('control');
var textPlay = '<i class="fas fa-pause"></i>';
var textPause = '<i class="fas fa-play"></i>';
//要控制定时器，先要拿到定时器的ID,且要先给这个ID一个空值,然后在31行让ID等于setInterval
var intervalID = null;
//编程好习惯，先定义重复使用的变量，这样不容易出错
var indicatorID = 'xbtn';
//没有参数的时候，箭头函数是这么写吗？
var moveSlider = function () {
    if (playing) {
        var imgIndex = ++imgCount % imgs.length;
        eleSlider.setAttribute('src', imgs[imgIndex]);
        /*这一步是让内存变量btn拿到indicator的ID, ID的值是和当前显示图片ID一致，同时为了确保图片按顺序显示下去，
      用imgIndex= ++imgCount % img.length */
        var btn = document.getElementById(indicatorID + imgIndex);
        clearHighlight();
        btn.setAttribute('class', 'dots highlightDots');
    }
};
//作用域的问题？arrow function规范的问题？是先写函数好？还是直接在setInterval里面写函数？
intervalID = setInterval(moveSlider, 1000); //在运行这行代码的时候，才能拿到interval的ID
////////////////////////////////////////////////
var clearHighlight = function () {
    //这个函数是瞬间完成所有图片的渲染的，也就是说这个函数是让所有的indicators成为dots的样式
    for (var i = 0; i < imgs.length; i++) {
        var btn = document.getElementById(indicatorID + i);
        btn.setAttribute('class', 'dots');
    }
};
////////////////////////////////////////////////
var startTimer = function () {
    if (!intervalID) {
        intervalID = setInterval(moveSlider, 1000);
    }
};
var stopTimer = function () {
    if (intervalID) {
        clearInterval(intervalID);
        intervalID = null;
    }
};
////////////////////////////////////////////////
var eleIndicator = document.getElementById('indicator');
//这种分情况下的剪头函数和上面的普通函数也没节省什么啊？
var createIndicators = function () {
    for (var i = 0; i < imgs.length; i++) {
        var btn = document.createElement('button');
        eleIndicator.appendChild(btn); //这里是让新建的button属性附在eleIndicator上
        // btn.innerHTML = 'O'
        btn.setAttribute('data-btn', String(i)); //这里系统提示这一函数一定是要string类型的
        btn.setAttribute('onclick', 'onClickBtn(this)');
        btn.setAttribute('id', indicatorID + i); //这里没有提示，是因为'xbtn'是string，+ 任何类型都是string
        btn.setAttribute('class', 'dots');
    }
};
createIndicators();
///////////////////////////////////////////////
//onClickBtn函数是回应上面onclick事件
var onClickBtn = function (clickbtn) {
    var index = parseInt(clickbtn.getAttribute('data-btn'), 10);
    eleSlider.setAttribute('src', imgs[index]);
    var btn = document.getElementById(indicatorID + index);
    //下面的clear函数为什么可以匹配点击的图片呢？因为clear函数是完成所有indicators的渲染
    clearHighlight();
    btn.setAttribute('class', 'dots highlightDots');
    /*下面几行的作用是当点击某张图片后，让计数器重新开始计数，并且当点击停止的时候，不要让timer启动
    另外imgCount = index的作用是点击某张图片后，计数器开始从点击的那张图片开始，不是按照原来的顺序滚动*/
    imgCount = index;
    if (intervalID) {
        stopTimer();
        startTimer();
    }
    else {
        stopTimer();
    }
};
////////////////////////////////////////////////
//这里firstImg函数一定要放在createIndicators函数后面，因为，如果放在前面，系统找不到btn.setAttribute
var firstImg = function () {
    eleSlider.setAttribute('src', imgs[0]);
    var btn = document.getElementById(indicatorID + imgCount);
    btn.setAttribute('class', 'dots highlightDots');
};
firstImg();
///////////////////////////////////////////////
//第一种暂停的方法：
var pauseOrPlaySlider = function () {
    playing = !playing;
    btnControl.innerHTML = playing ? textPlay : textPause;
};
//第二张暂停的方法：当intervalID有值的时候，清空这个值，且为了代码的建造性，他人也可能在用这个代码，所以要人为的赋空值
var pauseOrPlaySlider2 = function () {
    if (intervalID) {
        clearInterval(intervalID);
        intervalID = null;
        btnControl.innerHTML = textPause;
    }
    else {
        intervalID = setInterval(moveSlider, 1000); //在else的情况下，仍然要赋一个新ID给这个函数
        btnControl.innerHTML = textPlay;
    }
};
//////////////////////////////////////////////
var moveControlToEnd = function () {
    var node = document.getElementById('control');
    var list = document.getElementById('indicator');
    list.insertBefore(node, null);
};
moveControlToEnd();
var moveArrowRightToEnd = function () {
    var node = document.getElementById('rightarrow');
    var list = document.getElementById('indicator');
    list.insertBefore(node, null);
};
moveArrowRightToEnd();
///////////////////////////////////////////////
var moveImgs = function (direction) {
    if (direction === 'after') {
        var index01 = ++imgCount % imgs.length;
        eleSlider.setAttribute('src', imgs[index01]);
        var btn = document.getElementById(indicatorID + index01);
        clearHighlight();
        btn.setAttribute('class', 'dots highlightDots');
        if (intervalID) {
            stopTimer();
            startTimer();
        }
        else {
            stopTimer();
        }
    }
    else if (direction === 'pres') {
        var index02 = --imgCount % imgs.length;
        if (index02 < 0) {
            index02 = imgs.length - 1;
            imgCount = index02;
        }
        eleSlider.setAttribute('src', imgs[index02]);
        var btn = document.getElementById(indicatorID + index02);
        clearHighlight();
        btn.setAttribute('class', 'dots highlightDots');
        if (intervalID) {
            stopTimer();
            startTimer();
        }
        else {
            stopTimer();
        }
    }
};
var bmiCalculator = function (weight, height) {
    var kg = weight;
    var m = height;
    var BMI = kg / (Math.pow(m, 2));
    return BMI;
};
var result = bmiCalculator(70, 1.75);
console.log(result);
