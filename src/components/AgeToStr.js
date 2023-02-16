const AgeToStr = ({age}) => {
    let txt = '';
    let count = age % 100;
    count >= 5 && count <= 20 ? txt = 'лет' : count = count % 10;
    count === 1 ? txt = 'год' : (count >= 2 && count <= 4) ? txt = 'года' : txt = 'лет';
    return txt;
}

export default AgeToStr;