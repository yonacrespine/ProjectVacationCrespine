import "./HighlightText.css";

function HighlightText(text:string, term:string) {

  if (!term) return text;

  return text.replace(new RegExp(`(${term})`, 'gi'), '<span class="highlight">$1</span>');
    
}

export default HighlightText;
