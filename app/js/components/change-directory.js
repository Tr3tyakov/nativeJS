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

//phone

changeOnFourCubes.addEventListener('touchstart', () => {
    console.log(1);
})


//changeDirectory
let objTarget = {
    target: true
}

export { changeOnFourCubes, changeOnTwoCubes, objTarget }