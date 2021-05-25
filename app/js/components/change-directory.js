const changeOnFourCubes = document.querySelector('.change-position__four-cubes')
const changeOnTwoCubes = document.querySelector('.change-position__two-cubes')


//style
changeOnFourCubes.addEventListener('mouseover', () => {
    changeOnFourCubes.style.left = '-10px'
})
changeOnFourCubes.addEventListener('mouseout', () => {
    changeOnFourCubes.style.left = '0px'
})

changeOnTwoCubes.addEventListener('mouseover', () => {
    changeOnTwoCubes.style.right = '-10px'
})
changeOnTwoCubes.addEventListener('mouseout', () => {
    changeOnTwoCubes.style.right = '0'
})

//click
let target = true
changeOnFourCubes.addEventListener('click', () => {
    changeOnTwoCubes.classList.remove('change-position__two-cubes--active')
    changeOnFourCubes.classList.add('change-position__four-cubes--active')
    target = false
})

changeOnTwoCubes.addEventListener('click', () => {
    changeOnFourCubes.classList.remove('change-position__four-cubes--active')
    changeOnTwoCubes.classList.add('change-position__two-cubes--active')
    target = true
})



export { changeOnFourCubes, changeOnTwoCubes, target }