
setTimeout(init('.range', '.range__btn-left', '.range__between-btn', '.range__btn-right', '.inputs-number__number1', '.inputs-number__number2'), 0)

function init(sldr, lft, btwn, rght, inp1, inp2) {
    let slider = document.querySelector(sldr)
    let left = document.querySelector(lft)
    let right = document.querySelector(rght)
    let between = document.querySelector(btwn)


    let input1 = document.querySelector(inp1)
    let input2 = document.querySelector(inp2)

    let min = input1.min;
    let max = input2.max;


    let sliderCoords = getParametrs(slider);
    left.style.marginLeft = '0px';
    right.style.marginLeft = (slider.offsetWidth - left.offsetWidth) + 'px';
    between.style.width = (slider.offsetWidth - left.offsetWidth) + 'px';
    input1.value = min;
    input2.value = max;

    input1.onchange = function (evt) {
        if (parseInt(input1.value) < min)
            input1.value = min;
        if (parseInt(input1.value) > max)
            input1.value = max;
        if (parseInt(input1.value) > parseInt(input2.value)) {
            let temp = input1.value;
            input1.value = input2.value;
            input2.value = temp;
        }

        let sliderCoords = getParametrs(slider);
        let per1 = parseInt(input1.value - min) * 100 / (max - min);
        let per2 = parseInt(input2.value - min) * 100 / (max - min);
        let left1 = per1 * (slider.offsetWidth - left.offsetWidth) / 100;
        let left2 = per2 * (slider.offsetWidth - left.offsetWidth) / 100;

        left.style.marginLeft = left1 + 'px';
        right.style.marginLeft = left2 + 'px';

        if (left1 > left2) {
            between.style.width = (left1 - left2) + 'px';
            between.style.marginLeft = left2 + 'px';
        }
        else {
            between.style.width = (left2 - left1) + 'px';
            between.style.marginLeft = left1 + 'px';
        }
    }
    input2.onchange = function (evt) {
        if (parseInt(input2.value) < min)
            input2.value = min;
        if (parseInt(input2.value) > max)
            input2.value = max;
        if (parseInt(input1.value) > parseInt(inpt2.value)) {
            var temp = input1.value;
            input1.value = input2.value;
            input2.value = temp;
        }

        let sliderCoords = getParametrs(slider);
        let per1 = parseInt(input1.value - min) * 100 / (max - min);
        let per2 = parseInt(input2.value - min) * 100 / (max - min);
        let left1 = per1 * (slider.offsetWidth - left.offsetWidth) / 100;
        let left2 = per2 * (slider.offsetWidth - left.offsetWidth) / 100;

        left.style.marginLeft = left1 + 'px';
        right.style.marginLeft = left2 + 'px';

        if (left1 > left2) {
            between.style.width = (left1 - left2) + 'px';
            between.style.marginLeft = left2 + 'px';
        }
        else {
            between.style.width = (left2 - left1) + 'px';
            between.style.marginLeft = left1 + 'px';
        }
    }

    left.onmousedown = function (e) {
        let sliderCords = getParametrs(slider)
        let leftCords = getParametrs(left)
        let rightCords = getParametrs(right)
        let betweenCords = getParametrs(between)
        let pageX = e.pageX - leftCords.left

        document.onmousemove = function (e) {
            let marginLeft = e.pageX - pageX - sliderCords.left
            let insideSlider = slider.offsetWidth - left.offsetWidth

            if (marginLeft > rightCords.left - right.offsetWidth - sliderCords.left) {
                marginLeft = rightCords.left - right.offsetWidth - sliderCords.left
            }

            if (marginLeft > insideSlider) marginLeft = insideSlider
            if (marginLeft < 0) marginLeft = 0
            left.style.marginLeft = marginLeft + 'px'


            let diff = e.pageX - rightCords.left

            let marginRight = e.pageX - diff - sliderCords.left
            let per_min = 0;
            let per_max = 0;
            if (marginLeft < marginRight) {
                between.style.marginLeft = marginLeft + 'px'
                between.style.width = (marginRight - marginLeft) + 'px'
                per_min = marginLeft * 100 / (slider.offsetWidth - left.offsetWidth);
                per_max = marginRight * 100 / (slider.offsetWidth - left.offsetWidth);
            }
            input1.value = (parseInt(min) + Math.round((max - min) * per_min / 100));
            input2.value = (parseInt(min) + Math.round((max - min) * per_max / 100));
        }
        document.onmouseup = () => {
            document.onmousemove = document.onmouseup = null
        }
        return false
    }

    right.onmousedown = function (e) {
        let sliderCords = getParametrs(slider)
        let leftCords = getParametrs(left)
        let rightCords = getParametrs(right)
        let betweenCords = getParametrs(between)

        let pageX = e.pageX - rightCords.left
        document.onmousemove = function (e) {
            let marginLeft = e.pageX - pageX - sliderCords.left
            let inside = slider.offsetWidth - right.offsetWidth


            console.log('marginLeft', marginLeft);
            console.log('leftCords', (leftCords.left + left.offsetWidth - sliderCords.left));
            if (marginLeft < leftCords.left + left.offsetWidth - sliderCords.left) {
                marginLeft = leftCords.left + left.offsetWidth - sliderCords.left
            }

            if (marginLeft > inside) marginLeft = inside
            if (marginLeft < 0) marginLeft = 0
            let per_min = 0
            let per_max = 0


            right.style.marginLeft = marginLeft + 'px'


            let diff = e.pageX - leftCords.left
            let btw = e.pageX - diff - sliderCords.left


            if (marginLeft > btw) {

                between.style.width = (marginLeft - btw) + 'px'
                per_min = btw * 100 / (slider.offsetWidth - left.offsetWidth);
                per_max = marginLeft * 100 / (slider.offsetWidth - left.offsetWidth);
            }
            input1.value = (parseInt(min) + Math.round((max - min) * per_min / 100));
            input2.value = (parseInt(min) + Math.round((max - min) * per_max / 100));
        }
        document.onmouseup = () => {
            document.onmousemove = document.onmouseup = null
        }
        return false

    }

    function getParametrs(element) {
        let value = element.getBoundingClientRect()
        return {
            left: value.left,
            top: value.top,
        }
    }

}


export default 'range-unput'