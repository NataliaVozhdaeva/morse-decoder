const MORSE_TABLE = {
  '.-': 'a',
  '-...': 'b',
  '-.-.': 'c',
  '-..': 'd',
  '.': 'e',
  '..-.': 'f',
  '--.': 'g',
  '....': 'h',
  '..': 'i',
  '.---': 'j',
  '-.-': 'k',
  '.-..': 'l',
  '--': 'm',
  '-.': 'n',
  '---': 'o',
  '.--.': 'p',
  '--.-': 'q',
  '.-.': 'r',
  '...': 's',
  '-': 't',
  '..-': 'u',
  '...-': 'v',
  '.--': 'w',
  '-..-': 'x',
  '-.--': 'y',
  '--..': 'z',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '-----': '0',
};

function decode(str) {
  let chunks = [];

  while (str) {
    if (str.length < 10) {
      chunks.push(str);
      break;
    } else {
      chunks.push(str.substr(0, 10));
      str = str.substr(10);
    }
  }

  const replaceFunction = (str) => {
    if (str === '10') {
      return str.replace('10', '.');
    }

    if (str === '11') {
      return str.replace('11', '-');
    }

    if (str === '**********') {
      return str.replace('**********', ' ');
    }
  };

  for (let i = 0; i < chunks.length; i++) {
    if (chunks[i].includes('*')) {
      chunks[i] = replaceFunction(chunks[i]);
    } else {
      chunks[i] = chunks[i].substring(chunks[i].indexOf('1'));

      chunks[i] = [...chunks[i]];
      let element = [];

      while (chunks[i].length > 0) {
        element.push(chunks[i].splice(0, 2).join(''));
      }

      chunks[i] = element.map((el) => {
        return replaceFunction(el.toString());
      });

      chunks[i] = chunks[i].join('');
    }
    for (const key in MORSE_TABLE) {
      if (key === chunks[i]) {
        chunks[i] = MORSE_TABLE[key];
      }
    }
  }

  return chunks.join('');
}

module.exports = {
  decode,
};
