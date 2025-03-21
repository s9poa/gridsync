document.addEventListener('DOMContentLoaded', () => {
    const dBox = document.querySelector('.dialog-sorry-msg-box'),
          dShell = document.querySelector('.dialog-shell');
    let lastFocus = null,
        trap = null,
        fElems = [],
        openFlag = false;
  
    const open = () => {
      lastFocus = document.activeElement;
      dBox.style.display = 'grid';
      openFlag = true;
      fElems = Array.prototype.slice.call(
        dBox.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])')
      );
      if (fElems.length) fElems[0].focus();
      trap = e => {
        if (e.key === 'Tab') {
          const first = fElems[0],
                last = fElems[fElems.length - 1];
          if (e.shiftKey && document.activeElement === first) { 
            e.preventDefault(); 
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) { 
            e.preventDefault(); 
            first.focus();
          }
        } else if (e.key === 'Escape') {
          close();
        }
      };
      dBox.addEventListener('keydown', trap);
    };
  
    const close = () => {
      dBox.style.display = 'none';
      openFlag = false;
      if (trap) { dBox.removeEventListener('keydown', trap); trap = null; }
      if (lastFocus) lastFocus.focus();
    };
  
    document.addEventListener('click', e => {
      const t = e.target;
      if (t.closest('.open-dialog-box')) { open(); return; }
      if (t.closest('.close-dialog')) { close(); return; }
      if (openFlag && !dShell.contains(t)) { close(); }
    });
  });
  