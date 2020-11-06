//小圆点跟随
//小圆点点击事件
//添加动画
//添加定时器
let list = document.querySelector('.banner-pic-list')//获取图片
let buttons = document.querySelectorAll('.btn-list li')
let index = 1
let timer = null
let animated = false
console.log( buttons)


let animate = function(offset) {
    let speed = offset / 59
    let newLeft = parseInt(list.style.left) + offset
    animated = true

    function startAnimate() {
        if ((speed > 0 && parseInt(list.style.left) < newLeft) || (speed < 0 && parseInt(list.style.left) > newLeft)) {
            list.style.left = parseInt(list.style.left) + speed + 'px'

            setTimeout(startAnimate, 10)
        } else {
            animated = false
            if (newLeft > -590) {   
                list.style.left = -2360 + 'px' //图片总数的宽度
            }

            if (newLeft < -2360) {
                list.style.left = -590 + 'px'
            }
        }
    }

    startAnimate()
}


var initbuttons = function () {
	for(let i=0;i<buttons.length; i++){
		buttons[i].className=""
	}
	buttons[index-1].className ="active"
}
//小圆点点击事件
for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function() {
        if (this.className === 'active') {
            return
        }

        let myIndex = parseInt(this.getAttribute('index'))
        let offset = -590 * (myIndex - index)
        animate(offset)
        index = myIndex
        initbuttons()
    }
}

 function next() {
    if (!animated) {
        if (index === 4) {
            index = 1
        } else {
            index = index + 1
        }
        animate(-590)
        initbuttons()
    }

}



let container = document.querySelector('.pic-box')


let play = function() {
    timer = setInterval(() => {
        next()
    }, 2000)
}

let stop = function() {
    clearInterval(timer)
}
container.onmouseover = stop
container.onmouseout = play
play()