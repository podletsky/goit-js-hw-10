import './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import './css/styles.css';
const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryFullInfo = document.querySelector('.country-info')


searchBox.addEventListener('input',debounce(onInput,DEBOUNCE_DELAY))

function onInput(evt) {
    const inputText = evt.target.value.trim();
    if (inputText === "") {
        countryFullInfo.innerHTML = '' 
        countryList.innerHTML = ""

    }
    fetchCountries(inputText)
        .then(response => {
            if (response.length > 10) {
               Notiflix.Notify.info(
                    'Too many matches found. Please enter a more specific name.'
                );
            
            } {
                if (response.length >=2  && response.length <=10) {
                 
                     countrySearchList(response)
                        
                } if(response.length===1) {
                    countryMarkupInfo(response);
                     countryList.innerHTML =""
                }
            }
        })
        .catch(error => { })

    function countrySearchList(name) {
      const searchList = name
            .map(({ name, flags }) => {
                return `<li>
    <img src="${flags.svg}" 
    alt="${name}" 
    width = "25" 
    height = "15" />
  <p>${name}</p>
</li>`;
            })
            .join('');
    

        countryList.innerHTML =searchList
    }
}

function countryMarkupInfo(name) {
  const markupInfo = name
    .map(({ name, flags, capital, population, languages }) => {
      return `
      <img src="${flags.svg}" alt="${name}" width = "25" height = "15" />
      <span>${name}</span>
          <p>Capital: ${capital}</p>
          <p>Population: ${population}</p>
          <p>Languages: ${languages.map(el => el.name).join('')}</p>`;
    })
    .join('');
countryFullInfo.innerHTML = markupInfo;


}

