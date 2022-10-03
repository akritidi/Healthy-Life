document.getElementById('bmibtn').addEventListener('click', bmiCalc);

const box = document.getElementById('bmibox');
const resultp = document.createElement('p');
var heightInput = document.getElementById('height');
var weightInput = document.getElementById('weight');

function bmiCalc() {
    
    let weight = parseFloat(weightInput.value);
    let height = parseFloat(heightInput.value)/100;
    let bmi = weight/(height*height);

    if (isNaN(bmi) || bmi <= 0 || height <= 0) {

        resultp.style.margin = '0px';
        resultp.style.color = 'white';
        resultp.style.fontSize = '20px';
        resultp.style.textAlign = 'center';
        resultp.style.backgroundColor = 'rgba(0, 128, 0, 0.904)';
        resultp.textContent = `Please enter valid numbers before calculating`;
        
        box.appendChild(resultp);
        return;
    }

    resultp.style.margin = '0px';
    resultp.style.color = 'white';
    resultp.style.fontSize = '20px';
    resultp.style.textAlign = 'center';
    resultp.textContent = `Your BMI is: ${bmi.toFixed(1)}%`;
    resultp.style.backgroundColor = 'rgba(0, 128, 0, 0.904)';
    
    box.appendChild(resultp);
    return;
}