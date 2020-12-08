module.exports = {
    fioToShort(fio, del = ' ') {
        try {
            if(!fio) return '';
            let [a, b, c] = fio.split(del);
            
            return `${a || ''}${(b ? ' '+b.substr(0,1)+'.' : '')}${(c ? ' '+c.substr(0,1)+'.' : '')}`.toLowerCase();
        } catch (e) {
            console.log(e, fio);
            return fio;
        }
    },
    cutNameIfLongerThan(string, length = 30, ending = '...')
    {
      if(!string) return '';
      else {
          if(string.length < length) return string;
          else {
            return string.substr(0, length)+ending;
          }
      }
    },
}